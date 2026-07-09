import { FINISHES } from './finishes';
import type { FinishType } from '../types/configuration';

export type ViewerScenePresetId =
  | 'neutralProduct'
  | 'salesPresentation'
  | 'colourCheck'
  | 'finishCheck';

export type ViewerScenePreset = {
  id: ViewerScenePresetId;
  label: string;
  environmentImage: string;
  exposure: number;
  shadowIntensity: number;
  shadowSoftness: number;
  toneMapping: 'aces' | 'linear' | 'agx';
  cameraOrbit: string;
  cameraTarget?: string;
  fieldOfView?: string;
  backgroundColor: string;
};

export type RenderDebugValues = {
  exposure: number;
  shadowIntensity: number;
  shadowSoftness: number;
  outerRoughness: number;
  innerRoughness: number;
};

export const VIEWER_SCENE_PRESETS: Record<ViewerScenePresetId, ViewerScenePreset> = {
  neutralProduct: {
    id: 'neutralProduct',
    label: 'Neutral Product View',
    environmentImage: 'neutral',
    exposure: 1,
    shadowIntensity: 1.1,
    shadowSoftness: 0.6,
    toneMapping: 'agx',
    cameraOrbit: '25deg 72deg 2.5m',
    backgroundColor: '#f2f2f2',
  },
  salesPresentation: {
    id: 'salesPresentation',
    label: 'Sales Presentation View',
    environmentImage: 'neutral',
    exposure: 0.95,
    shadowIntensity: 1.25,
    shadowSoftness: 0.45,
    toneMapping: 'agx',
    cameraOrbit: '30deg 70deg 2.35m',
    backgroundColor: '#eeeeec',
  },
  colourCheck: {
    id: 'colourCheck',
    label: 'Colour Check View',
    environmentImage: 'neutral',
    exposure: 0.75,
    shadowIntensity: 0.8,
    shadowSoftness: 0.7,
    toneMapping: 'linear',
    cameraOrbit: '25deg 72deg 2.5m',
    backgroundColor: '#f2f2f2',
  },
  finishCheck: {
    id: 'finishCheck',
    label: 'Finish Check View',
    environmentImage: '/environments/neutral-reflection-studio.jpg',
    exposure: 1,
    shadowIntensity: 1.15,
    shadowSoftness: 0.5,
    toneMapping: 'agx',
    cameraOrbit: '30deg 70deg 2.35m',
    backgroundColor: '#f2f2f2',
  },
};

export const DEFAULT_VIEWER_SCENE_PRESET_ID: ViewerScenePresetId = 'neutralProduct';

export function createRenderDebugValues(
  scene: ViewerScenePreset,
  outerFinish: FinishType,
  innerFinish: FinishType,
): RenderDebugValues {
  return {
    exposure: scene.exposure,
    shadowIntensity: scene.shadowIntensity,
    shadowSoftness: scene.shadowSoftness,
    outerRoughness: FINISHES[outerFinish].roughness,
    innerRoughness: FINISHES[innerFinish].roughness,
  };
}
