import { useEffect, useMemo, useState } from 'react';
import { findNcsColor, isValidNcsFormat, ncsToSelection, normalizeNcsCode } from '../lib/ncs';
import type { SelectedOuterColor } from '../types/configuration';

type NcsInputProps = {
  value: SelectedOuterColor;
  onChange: (selection: SelectedOuterColor) => void;
};

export function NcsInput({ value, onChange }: NcsInputProps) {
  const [inputValue, setInputValue] = useState(value.type === 'custom_ncs' ? value.code : '');
  const normalized = useMemo(() => normalizeNcsCode(inputValue), [inputValue]);
  const validFormat = inputValue.trim().length > 0 && isValidNcsFormat(inputValue);
  const match = validFormat ? findNcsColor(inputValue) : null;

  useEffect(() => {
    if (value.type === 'custom_ncs') {
      setInputValue(value.code);
    }
  }, [value.code, value.type]);

  const applyCustomNcs = () => {
    if (!validFormat) {
      return;
    }

    onChange(ncsToSelection(inputValue));
  };

  return (
    <fieldset className="control-group ncs-input-group">
      <legend>Custom NCS</legend>
      <label className="ncs-input-label">
        <span>NCS code</span>
        <input
          type="text"
          value={inputValue}
          placeholder="S 3050-Y80R"
          onChange={(event) => setInputValue(event.target.value)}
          onBlur={applyCustomNcs}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              applyCustomNcs();
            }
          }}
        />
      </label>
      <button className="secondary-button" type="button" disabled={!validFormat} onClick={applyCustomNcs}>
        Apply NCS
      </button>

      {inputValue.trim().length > 0 && !validFormat ? (
        <p className="input-warning" role="alert">
          Invalid NCS format. Try S 3050-Y80R or 0500-N.
        </p>
      ) : null}

      {validFormat && !match ? (
        <p className="input-warning" role="status">
          {normalized} is valid and will be saved, but no local preview HEX is available.
        </p>
      ) : null}

      {match ? (
        <p className="input-success" role="status">
          {match.code} found. Preview HEX {match.hex}.
        </p>
      ) : null}
    </fieldset>
  );
}
