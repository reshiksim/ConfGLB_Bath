import type { BathConfiguratorLaunchOptions } from '../types/configuration';

export const BATH_MODELS = [
  {
    modelId: import.meta.env.VITE_DEFAULT_MODEL_ID || 'libero',
    modelName: import.meta.env.VITE_DEFAULT_MODEL_NAME || 'Libero',
    glbUrl: import.meta.env.VITE_DEFAULT_GLB_URL || '/models/libero.glb',
  },
  {
    modelId: 'selene',
    modelName: 'Selene',
    glbUrl: '/models/selene.glb',
  },
] as const satisfies readonly BathConfiguratorLaunchOptions[];

export const DEFAULT_MODEL = BATH_MODELS[0];
