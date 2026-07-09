import { type CSSProperties, useEffect, useRef, useState } from 'react';
import { FINISHES } from '../config/finishes';
import { HARDWARE_FINISHES } from '../config/hardwareFinishes';
import { MATERIAL_NAMES } from '../config/materials';
import type { RenderDebugValues, ViewerScenePreset } from '../config/viewerScene';
import type { BathConfiguration } from '../types/configuration';

type ModelViewerElement = HTMLElement & {
  model?: {
    materials?: ModelMaterial[];
  };
};

type ModelMaterial = {
  name: string;
  pbrMetallicRoughness?: {
    baseColorTexture?: unknown;
    setBaseColorFactor?: (color: string | [number, number, number, number]) => void;
    setMetallicFactor?: (value: number) => void;
    setRoughnessFactor?: (value: number) => void;
  };
};

type MaterialApplyResult = {
  applied: string[];
  missing: string[];
  available: string[];
};

type ModelViewerProps = {
  configuration?: BathConfiguration;
  scene: ViewerScenePreset;
  renderDebugValues: RenderDebugValues;
};

function findMaterial(viewer: ModelViewerElement | null, name: string) {
  return viewer?.model?.materials?.find((material) => material.name === name) ?? null;
}

export const applyMaterialBaseColor = (material: ModelMaterial | null, hex: string) => {
  const pbr = material?.pbrMetallicRoughness;

  if (!pbr) {
    return;
  }

  pbr.setBaseColorFactor?.(hex);
};

function applyMaterialSettings(
  material: ModelMaterial | null,
  color: string | null,
  metallic: number,
  roughness: number,
) {
  const pbr = material?.pbrMetallicRoughness;

  if (!pbr) {
    return;
  }

  if (color) {
    applyMaterialBaseColor(material, color);
  }

  pbr.setMetallicFactor?.(metallic);
  pbr.setRoughnessFactor?.(roughness);
}

function applyConfigurationToMaterials(
  viewer: ModelViewerElement | null,
  configuration: BathConfiguration,
  renderDebugValues: RenderDebugValues,
): MaterialApplyResult {
  const materialNames = viewer?.model?.materials?.map((material) => material.name) ?? [];
  const outerMaterial = findMaterial(viewer, MATERIAL_NAMES.outer);
  const innerMaterial = findMaterial(viewer, MATERIAL_NAMES.inner);
  const hardwareMaterial = findMaterial(viewer, MATERIAL_NAMES.hardware);
  const materialChecks: Array<[string, ModelMaterial | null]> = [
    [MATERIAL_NAMES.outer, outerMaterial],
    [MATERIAL_NAMES.inner, innerMaterial],
    [MATERIAL_NAMES.hardware, hardwareMaterial],
  ];
  const missing = materialChecks
    .filter(([, material]) => material === null)
    .map(([name]) => name);
  const applied = materialChecks
    .filter(([, material]) => material !== null)
    .map(([name]) => name);
  const outerFinish = FINISHES[configuration.outerFinish];
  const innerFinish = FINISHES[configuration.innerFinish];
  const hardwareFinish = HARDWARE_FINISHES[configuration.hardwareFinish];

  applyMaterialSettings(
    outerMaterial,
    configuration.outerColor.hex,
    outerFinish.metallic,
    renderDebugValues.outerRoughness,
  );
  applyMaterialSettings(
    innerMaterial,
    '#f8f8f5',
    innerFinish.metallic,
    renderDebugValues.innerRoughness,
  );
  applyMaterialSettings(
    hardwareMaterial,
    hardwareFinish.color,
    hardwareFinish.metallic,
    hardwareFinish.roughness,
  );

  return {
    applied,
    missing,
    available: materialNames,
  };
}

function isHtmlFallback(buffer: ArrayBuffer) {
  const prefix = new TextDecoder().decode(buffer.slice(0, 32)).trimStart().toLowerCase();

  return prefix.startsWith('<!doctype') || prefix.startsWith('<html');
}

function hasGlbSignature(buffer: ArrayBuffer) {
  const prefix = new TextDecoder().decode(buffer.slice(0, 4));

  return prefix === 'glTF';
}

export function ModelViewer({ configuration, scene, renderDebugValues }: ModelViewerProps) {
  const src = configuration?.glbUrl ?? '';
  const modelName = configuration?.modelName ?? 'Selected model';
  const viewerRef = useRef<ModelViewerElement | null>(null);
  const [status, setStatus] = useState<'checking' | 'loading' | 'ready' | 'error'>('checking');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [missingMaterials, setMissingMaterials] = useState<string[]>([]);
  const [verifiedSrc, setVerifiedSrc] = useState<string | null>(null);
  const [modelViewerLoaded, setModelViewerLoaded] = useState(false);
  const [availableMaterials, setAvailableMaterials] = useState<string[]>([]);
  const canMountModel =
    modelViewerLoaded && verifiedSrc === src && (status === 'loading' || status === 'ready');

  useEffect(() => {
    let cancelled = false;

    async function checkModelSource() {
      setStatus('checking');
      setErrorMessage(null);
      setMissingMaterials([]);
      setAvailableMaterials([]);
      setVerifiedSrc(null);
      setModelViewerLoaded(false);

      try {
        if (!src) {
          throw new Error('No GLB URL was provided.');
        }

        const response = await fetch(src, {
          method: 'GET',
          cache: 'no-store',
          headers: {
            Range: 'bytes=0-31',
          },
        });
        const contentType = response.headers.get('content-type') ?? '';
        const buffer = await response.arrayBuffer();

        if (!response.ok) {
          throw new Error(`Model request failed with HTTP ${response.status}.`);
        }

        if (contentType.includes('text/html') || isHtmlFallback(buffer)) {
          throw new Error('Model URL returned HTML instead of a GLB file.');
        }

        if (src.toLowerCase().endsWith('.glb') && !hasGlbSignature(buffer)) {
          throw new Error('Model URL did not return a valid GLB binary.');
        }

        if (!cancelled) {
          setVerifiedSrc(src);
        }

        await import('@google/model-viewer');

        if (!cancelled) {
          setModelViewerLoaded(true);
          setStatus('loading');
        }
      } catch (error) {
        if (!cancelled) {
          setStatus('error');
          setVerifiedSrc(null);
          setModelViewerLoaded(false);
          setErrorMessage(error instanceof Error ? error.message : 'Model preview unavailable.');
        }
      }
    }

    void checkModelSource();

    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (!canMountModel) {
      return;
    }

    const viewer = viewerRef.current;

    if (!viewer) {
      return;
    }

    const handleLoad = () => {
      setStatus('ready');
    };
    const handleError = () => {
      setStatus('error');
      setErrorMessage('Model viewer could not load this GLB file.');
    };

    viewer.addEventListener('load', handleLoad);
    viewer.addEventListener('error', handleError);

    return () => {
      viewer.removeEventListener('load', handleLoad);
      viewer.removeEventListener('error', handleError);
    };
  }, [canMountModel]);

  useEffect(() => {
    if (!canMountModel || !configuration || verifiedSrc !== src) {
      return;
    }

    let cancelled = false;
    let retryId: number | undefined;
    let attempt = 0;

    const applyWhenMaterialsExist = () => {
      if (cancelled) {
        return;
      }

      const viewer = viewerRef.current;
      const materials = viewer?.model?.materials ?? [];

      if (materials.length === 0 && attempt < 20) {
        attempt += 1;
        retryId = window.setTimeout(applyWhenMaterialsExist, 100);
        return;
      }

      const result = applyConfigurationToMaterials(viewer, configuration, renderDebugValues);

      setStatus('ready');
      console.info('GLB material names:', result.available);
      console.info('Applied GLB materials:', result.applied);

      if (result.missing.length > 0) {
        console.warn('Missing GLB materials:', result.missing);
      }

      setAvailableMaterials(result.available);
      setMissingMaterials(result.missing);
    };

    applyWhenMaterialsExist();

    return () => {
      cancelled = true;
      if (retryId !== undefined) {
        window.clearTimeout(retryId);
      }
    };
  }, [canMountModel, configuration, renderDebugValues, src, verifiedSrc]);

  return (
    <section
      className="viewer-panel"
      aria-label="3D model preview"
      style={{ '--viewer-bg': scene.backgroundColor } as CSSProperties}
    >
      {canMountModel ? (
        <model-viewer
          ref={viewerRef}
          key={src}
          className="model-viewer"
          src={src}
          alt={`${modelName} bathtub 3D preview`}
          camera-controls
          touch-action="pan-y"
          auto-rotate
          shadow-intensity={String(renderDebugValues.shadowIntensity)}
          shadow-softness={String(renderDebugValues.shadowSoftness)}
          exposure={String(renderDebugValues.exposure)}
          environment-image={scene.environmentImage}
          tone-mapping={scene.toneMapping}
          camera-orbit={scene.cameraOrbit}
          camera-target={scene.cameraTarget}
          field-of-view={scene.fieldOfView}
        />
      ) : null}
      {missingMaterials.length > 0 ? (
        <div className="material-warning" role="status">
          {missingMaterials.map((materialName) => (
            <span key={materialName}>Model material missing: {materialName}</span>
          ))}
          {availableMaterials.length > 0 ? (
            <span>Available materials: {availableMaterials.join(', ')}</span>
          ) : null}
        </div>
      ) : null}
      {status === 'checking' || status === 'loading' ? (
        <div className="viewer-status" role="status">
          {status === 'checking' ? 'Checking 3D model file...' : 'Loading 3D model...'}
        </div>
      ) : null}
      {status === 'error' ? (
        <div className="viewer-status viewer-status-error" role="alert">
          Model preview unavailable. Add the GLB file at <strong>{src}</strong>.
          {errorMessage ? <span>{errorMessage}</span> : null}
        </div>
      ) : null}
    </section>
  );
}
