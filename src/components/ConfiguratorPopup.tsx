import { useEffect, useState } from 'react';
import { ControlsPanel } from './ControlsPanel';
import { ConfigurationSummary } from './ConfigurationSummary';
import { ModelViewer } from './ModelViewer';
import { RenderDebugPanel } from './RenderDebugPanel';
import { FINISHES } from '../config/finishes';
import {
  createRenderDebugValues,
  DEFAULT_VIEWER_SCENE_PRESET_ID,
  VIEWER_SCENE_PRESETS,
  type RenderDebugValues,
  type ViewerScenePresetId,
} from '../config/viewerScene';
import type { BathConfiguration } from '../types/configuration';

type ConfiguratorPopupProps = {
  configuration: BathConfiguration;
  isOpen: boolean;
  onChange: (configuration: BathConfiguration) => void;
  onClose: () => void;
};

export function ConfiguratorPopup({
  configuration,
  isOpen,
  onChange,
  onClose,
}: ConfiguratorPopupProps) {
  const [scenePresetId, setScenePresetId] = useState<ViewerScenePresetId>(
    DEFAULT_VIEWER_SCENE_PRESET_ID,
  );
  const scene = VIEWER_SCENE_PRESETS[scenePresetId];
  const [renderDebugValues, setRenderDebugValues] = useState<RenderDebugValues>(() =>
    createRenderDebugValues(scene, configuration.outerFinish, configuration.innerFinish),
  );

  useEffect(() => {
    setRenderDebugValues((currentValues) => ({
      ...currentValues,
      exposure: scene.exposure,
      shadowIntensity: scene.shadowIntensity,
      shadowSoftness: scene.shadowSoftness,
    }));
  }, [scene]);

  useEffect(() => {
    setRenderDebugValues((currentValues) => ({
      ...currentValues,
      outerRoughness: FINISHES[configuration.outerFinish].roughness,
      innerRoughness: FINISHES[configuration.innerFinish].roughness,
    }));
  }, [configuration.innerFinish, configuration.outerFinish]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    document.body.classList.add('modal-open');

    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="popup-backdrop" role="presentation">
      <section className="popup-shell" role="dialog" aria-modal="true" aria-labelledby="popup-title">
        <header className="popup-header">
          <div>
            <p>GLB bath configurator</p>
            <h1 id="popup-title">{configuration.modelName}</h1>
          </div>
          <button className="icon-button" type="button" aria-label="Close configurator" onClick={onClose}>
            x
          </button>
        </header>

        <main className="popup-content">
          <ModelViewer
            configuration={configuration}
            scene={scene}
            renderDebugValues={renderDebugValues}
          />
          <ControlsPanel
            configuration={configuration}
            scenePresetId={scenePresetId}
            onChange={onChange}
            onScenePresetChange={setScenePresetId}
          />
        </main>

        <RenderDebugPanel values={renderDebugValues} onChange={setRenderDebugValues} />
        <ConfigurationSummary configuration={configuration} />
      </section>
    </div>
  );
}
