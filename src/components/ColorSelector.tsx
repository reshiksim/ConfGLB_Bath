import { STANDARD_COLORS } from '../config/standardColors';
import type { SelectedOuterColor, StandardColor } from '../types/configuration';
import { NcsInput } from './NcsInput';

const isDev = import.meta.env.DEV;

type ColorSelectorProps = {
  value: SelectedOuterColor;
  onChange: (color: StandardColor) => void;
  onCustomNcsChange: (selection: SelectedOuterColor) => void;
};

export function ColorSelector({ value, onChange, onCustomNcsChange }: ColorSelectorProps) {
  return (
    <>
      <fieldset className="control-group">
        <legend>Exterior colour</legend>
        <div className="swatch-list">
          {STANDARD_COLORS.map((color) => {
            const selected = value.type === color.type && value.code === color.code;
            const shouldShowCode = isDev || !color.code.startsWith('#');

            return (
              <button
                className="swatch-button"
                type="button"
                key={color.code}
                aria-pressed={selected}
                onClick={() => onChange(color)}
              >
                <span className="swatch" style={{ backgroundColor: color.hex }} />
                <span>
                <strong>{color.label}</strong>
                <small>{color.group}</small>
                {shouldShowCode ? <small>{color.code}</small> : null}
              </span>
              </button>
            );
          })}
        </div>
      </fieldset>
      <NcsInput value={value} onChange={onCustomNcsChange} />
    </>
  );
}
