import type { BathConfiguratorLaunchOptions } from './configuration';

declare global {
  interface Window {
    openBathConfigurator?: (options: BathConfiguratorLaunchOptions) => void;
  }
}

export {};
