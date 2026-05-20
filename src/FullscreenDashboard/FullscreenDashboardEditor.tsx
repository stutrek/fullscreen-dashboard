import type { HomeAssistant } from 'preact-homeassistant';
import { useCallbackStable } from 'preact-homeassistant';
import type { FullscreenDashboardConfig } from './FullscreenDashboard';

interface EditorProps {
  hass: HomeAssistant;
  config: FullscreenDashboardConfig;
  onConfigChanged: (config: FullscreenDashboardConfig) => void;
}

// Use HA's modern <ha-form> with selectors. HA renders the right control for
// each field (entity picker, text input, number, boolean, etc.) and themes
// them consistently. Avoid the older <ha-select> + <ha-list-item> pattern —
// HA replaced ha-select's internals (ha-dropdown / wa-popup) and arbitrary
// list-item children no longer participate in selection.
//
// To add fields, extend SCHEMA. Selector reference:
//   https://www.home-assistant.io/docs/blueprint/selectors/
const SCHEMA = [
  { name: 'entity', required: true, selector: { entity: { domain: 'sensor' } } },
] as const;

const LABELS: Record<string, string> = {
  entity: 'Sensor entity',
};

export function FullscreenDashboardEditor({ hass, config, onConfigChanged }: EditorProps) {
  const handleValueChanged = useCallbackStable((e: Event) => {
    const next = (e as CustomEvent).detail?.value as Partial<FullscreenDashboardConfig> | undefined;
    if (!next) return;
    onConfigChanged({ ...config, ...next });
  });

  const computeLabel = useCallbackStable(
    (schema: { name: string }) => LABELS[schema.name] ?? schema.name,
  );

  return (
    <ha-form
      hass={hass}
      data={config}
      schema={SCHEMA}
      computeLabel={computeLabel}
      onvalue-changed={handleValueChanged}
    />
  );
}
