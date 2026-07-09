import { STANDARD_COLORS } from './standardColors';
import type {
  BathConfiguration,
  BathConfiguratorLaunchOptions,
  StandardColor,
} from '../types/configuration';

export function colorToSelection(color: StandardColor) {
  return {
    type: color.type,
    code: color.code,
    hex: color.hex,
    label: color.label,
    previewIsApproximate: true,
  } as const;
}

export function createInitialConfiguration(
  model: BathConfiguratorLaunchOptions,
): BathConfiguration {
  return {
    modelId: model.modelId,
    modelName: model.modelName,
    glbUrl: model.glbUrl,
    outerColor: colorToSelection(STANDARD_COLORS[0]),
    outerFinish: 'matte',
    innerFinish: 'gloss',
    hardwareFinish: 'chrome',
    createdAt: new Date().toISOString(),
  };
}
