import { FINISHES } from '../config/finishes';
import { HARDWARE_FINISHES } from '../config/hardwareFinishes';
import { PREVIEW_DISCLAIMER } from '../config/disclaimers';
import type { BathConfiguration } from '../types/configuration';

type ConfigurationSummaryProps = {
  configuration: BathConfiguration;
};

export function ConfigurationSummary({ configuration }: ConfigurationSummaryProps) {
  return (
    <section className="summary-panel" aria-label="Configuration summary">
      <div>
        <h2>Summary</h2>
        <p className="summary-model">
          {configuration.modelName} <span>{configuration.modelId}</span>
        </p>
      </div>

      <dl className="summary-list">
        <div>
          <dt>Exterior colour</dt>
          <dd>
            {configuration.outerColor.label ?? 'Custom NCS'} ({configuration.outerColor.code})
          </dd>
        </div>
        <div>
          <dt>Preview HEX</dt>
          <dd>{configuration.outerColor.hex ?? 'Unavailable'}</dd>
        </div>
        <div>
          <dt>Exterior finish</dt>
          <dd>{FINISHES[configuration.outerFinish].label}</dd>
        </div>
        <div>
          <dt>Interior finish</dt>
          <dd>{FINISHES[configuration.innerFinish].label}</dd>
        </div>
        <div>
          <dt>Hardware</dt>
          <dd>{HARDWARE_FINISHES[configuration.hardwareFinish].label}</dd>
        </div>
      </dl>

      <p className="disclaimer">{PREVIEW_DISCLAIMER}</p>
    </section>
  );
}
