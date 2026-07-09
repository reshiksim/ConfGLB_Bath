import { FINISHES } from '../config/finishes';
import type { FinishType } from '../types/configuration';

type FinishSelectorProps = {
  id: string;
  label: string;
  helperText?: string;
  value: FinishType;
  onChange: (finish: FinishType) => void;
};

export function FinishSelector({ id, label, helperText, value, onChange }: FinishSelectorProps) {
  return (
    <fieldset className="control-group">
      <legend>{label}</legend>
      {helperText ? <p className="control-helper">{helperText}</p> : null}
      <div className="segmented-control" id={id}>
        {Object.entries(FINISHES).map(([finish, config]) => (
          <button
            type="button"
            key={finish}
            aria-pressed={value === finish}
            onClick={() => onChange(finish as FinishType)}
          >
            {config.label}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
