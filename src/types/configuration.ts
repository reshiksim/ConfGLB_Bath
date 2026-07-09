export type FinishType = 'matte' | 'gloss';

export type HardwareFinish = 'chrome' | 'black' | 'white' | 'gold';

export type ColourSelectionType = 'standard' | 'custom_ncs';

export type NcsColor = {
  code: string;
  hex: string;
  rgb?: [number, number, number];
  cmyk?: [number, number, number, number];
  approximate: true;
};

export type StandardColor = {
  label: string;
  code: string;
  hex: string;
  group?: string;
  type: 'standard';
};

export type SelectedOuterColor = {
  type: ColourSelectionType;
  code: string;
  hex: string | null;
  label?: string;
  previewIsApproximate: boolean;
};

export type BathConfiguration = {
  modelId: string;
  modelName: string;
  glbUrl: string;
  outerColor: SelectedOuterColor;
  outerFinish: FinishType;
  innerFinish: FinishType;
  hardwareFinish: HardwareFinish;
  screenshotDataUrl?: string;
  customer?: {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
  };
  dealer?: {
    name?: string;
    email?: string;
  };
  createdAt: string;
};

export type BathConfiguratorLaunchOptions = {
  modelId: string;
  modelName: string;
  glbUrl: string;
};
