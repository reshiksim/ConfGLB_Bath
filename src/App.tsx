import { useEffect, useMemo, useState } from 'react';
import { ConfiguratorPopup } from './components/ConfiguratorPopup';
import { createInitialConfiguration } from './config/createConfiguration';
import { BATH_MODELS, DEFAULT_MODEL } from './config/models';
import type {
  BathConfiguration,
  BathConfiguratorLaunchOptions,
} from './types/configuration';

const OPEN_EVENT_NAME = 'bath-configurator:open';

function createOpenEvent(options: BathConfiguratorLaunchOptions) {
  return new CustomEvent<BathConfiguratorLaunchOptions>(OPEN_EVENT_NAME, {
    detail: options,
  });
}

export default function App() {
  const initialConfiguration = useMemo(() => createInitialConfiguration(DEFAULT_MODEL), []);
  const [configuration, setConfiguration] = useState<BathConfiguration>(initialConfiguration);
  const [isOpen, setIsOpen] = useState(false);

  const openConfigurator = (options: BathConfiguratorLaunchOptions) => {
    setConfiguration(createInitialConfiguration(options));
    setIsOpen(true);
  };

  useEffect(() => {
    const handleOpenEvent = (event: Event) => {
      const { detail } = event as CustomEvent<BathConfiguratorLaunchOptions>;
      openConfigurator(detail);
    };

    window.openBathConfigurator = (options) => {
      window.dispatchEvent(createOpenEvent(options));
    };

    window.addEventListener(OPEN_EVENT_NAME, handleOpenEvent);

    return () => {
      window.removeEventListener(OPEN_EVENT_NAME, handleOpenEvent);
      delete window.openBathConfigurator;
    };
  }, []);

  return (
    <div className="app-shell">
      <main className="launch-panel">
        <div className="brand-block">
          <span className="brand-mark" aria-hidden="true" />
          <div>
            <p>Stage 1 prototype</p>
            <h1>GLB Bath Configurator</h1>
          </div>
        </div>
        <p className="launch-copy">
          Configure the base production options for a Rhino-exported GLB bathtub model.
        </p>
        <div className="model-launch-list">
          {BATH_MODELS.map((model) => (
            <button
              className="primary-button"
              type="button"
              key={model.modelId}
              onClick={() => openConfigurator(model)}
            >
              Configure {model.modelName}
            </button>
          ))}
        </div>
      </main>

      <ConfiguratorPopup
        configuration={configuration}
        isOpen={isOpen}
        onChange={setConfiguration}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
}
