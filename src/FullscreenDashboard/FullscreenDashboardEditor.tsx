import type { HomeAssistant } from 'preact-homeassistant';
import type { FullscreenDashboardConfig } from './FullscreenDashboard';

interface EditorProps {
  hass: HomeAssistant;
  config: FullscreenDashboardConfig;
  onConfigChanged: (config: FullscreenDashboardConfig) => void;
}

export function FullscreenDashboardEditor(_props: EditorProps) {
  return <div class="fullscreen-dashboard-editor">No configuration needed.</div>;
}
