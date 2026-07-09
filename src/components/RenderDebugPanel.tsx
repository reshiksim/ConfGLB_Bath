import { useState } from 'react';
import type { RenderDebugValues } from '../config/viewerScene';

const isDev = import.meta.env.DEV;

type RenderDebugPanelProps = {
  values: RenderDebugValues;
  onChange: (values: RenderDebugValues) => void;
};

type SliderConfig = {
  key: keyof RenderDebugValues;
  label: string;
  min: number;
  max: number;
  step: number;
};

const SLIDERS: SliderConfig[] = [
  { key: 'exposure', label: 'Exposure', min: 0.5, max: 1.5, step: 0.01 },
  { key: 'shadowIntensity', label: 'Shadow intensity', min: 0, max: 2, step: 0.05 },
  { key: 'shadowSoftness', label: 'Shadow softness', min: 0, max: 1, step: 0.05 },
  { key: 'outerRoughness', label: 'Outer roughness', min: 0.05, max: 1, step: 0.01 },
  { key: 'innerRoughness', label: 'Inner roughness', min: 0.05, max: 1, step: 0.01 },
];

export function RenderDebugPanel({ values, onChange }: RenderDebugPanelProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!isDev) {
    return null;
  }

  const updateValue = (key: keyof RenderDebugValues, value: number) => {
    onChange({
      ...values,
      [key]: value,
    });
  };

  return (
    <section className="render-debug-panel" aria-label="Render debug controls">
      <button
        type="button"
        className="render-debug-toggle"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((current) => !current)}
      >
        Render Debug
      </button>

      {isOpen ? (
        <div className="render-debug-controls">
          {SLIDERS.map((slider) => (
            <label key={slider.key} className="render-debug-slider">
              <span>
                {slider.label}
                <strong>{values[slider.key].toFixed(2)}</strong>
              </span>
              <input
                type="range"
                min={slider.min}
                max={slider.max}
                step={slider.step}
                value={values[slider.key]}
                onChange={(event) => updateValue(slider.key, Number(event.target.value))}
              />
            </label>
          ))}
        </div>
      ) : null}
    </section>
  );
}
