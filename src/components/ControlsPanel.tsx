import { colorToSelection } from '../config/createConfiguration';
import { VIEWER_SCENE_PRESETS, type ViewerScenePresetId } from '../config/viewerScene';
import type {
  BathConfiguration,
  FinishType,
  HardwareFinish,
  SelectedOuterColor,
  StandardColor,
} from '../types/configuration';
import { ColorSelector } from './ColorSelector';
import { FinishSelector } from './FinishSelector';
import { HardwareSelector } from './HardwareSelector';

type ControlsPanelProps = {
  configuration: BathConfiguration;
  scenePresetId: ViewerScenePresetId;
  onChange: (configuration: BathConfiguration) => void;
  onScenePresetChange: (presetId: ViewerScenePresetId) => void;
};

export function ControlsPanel({
  configuration,
  scenePresetId,
  onChange,
  onScenePresetChange,
}: ControlsPanelProps) {
  const updateConfiguration = (patch: Partial<BathConfiguration>) => {
    onChange({
      ...configuration,
      ...patch,
    });
  };

  const handleColorChange = (color: StandardColor) => {
    updateConfiguration({
      outerColor: colorToSelection(color),
    });
  };

  const handleCustomNcsChange = (outerColor: SelectedOuterColor) => {
    updateConfiguration({ outerColor });
  };

  return (
    <aside className="controls-panel" aria-label="Bath configuration controls">
      <ColorSelector
        value={configuration.outerColor}
        onChange={handleColorChange}
        onCustomNcsChange={handleCustomNcsChange}
      />
      <FinishSelector
        id="outer-finish"
        label="Exterior finish"
        helperText="Gloss is best visible in Finish Check View or while rotating the model."
        value={configuration.outerFinish}
        onChange={(outerFinish: FinishType) => updateConfiguration({ outerFinish })}
      />
      <FinishSelector
        id="inner-finish"
        label="Interior finish"
        value={configuration.innerFinish}
        onChange={(innerFinish: FinishType) => updateConfiguration({ innerFinish })}
      />
      <HardwareSelector
        value={configuration.hardwareFinish}
        onChange={(hardwareFinish: HardwareFinish) => updateConfiguration({ hardwareFinish })}
      />
      <fieldset className="control-group">
        <legend>Scene</legend>
        <select
          className="scene-select"
          value={scenePresetId}
          onChange={(event) => onScenePresetChange(event.target.value as ViewerScenePresetId)}
        >
          {Object.values(VIEWER_SCENE_PRESETS).map((scene) => (
            <option key={scene.id} value={scene.id}>
              {scene.label}
            </option>
          ))}
        </select>
      </fieldset>
    </aside>
  );
}
