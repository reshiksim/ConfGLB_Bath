import { HARDWARE_FINISHES } from '../config/hardwareFinishes';
import type { HardwareFinish } from '../types/configuration';

type HardwareSelectorProps = {
  value: HardwareFinish;
  onChange: (finish: HardwareFinish) => void;
};

export function HardwareSelector({ value, onChange }: HardwareSelectorProps) {
  return (
    <fieldset className="control-group">
      <legend>Hardware</legend>
      <div className="hardware-list">
        {Object.entries(HARDWARE_FINISHES).map(([finish, config]) => (
          <button
            type="button"
            key={finish}
            aria-pressed={value === finish}
            onClick={() => onChange(finish as HardwareFinish)}
          >
            <span className="swatch hardware-swatch" style={{ backgroundColor: config.color }} />
            <span>{config.label}</span>
          </button>
        ))}
      </div>
    </fieldset>
  );
}
