import { registerPreactCard } from 'preact-homeassistant';
import { FullscreenDashboard, type FullscreenDashboardConfig } from './FullscreenDashboard';
import { FullscreenDashboardEditor } from './FullscreenDashboardEditor';

registerPreactCard<FullscreenDashboardConfig>({
  type: 'fullscreen-dashboard',
  name: 'Fullscreen Dashboard',
  description: 'A starter card that displays a sensor entity and its attributes',
  Component: FullscreenDashboard,
  ConfigComponent: FullscreenDashboardEditor,
  getStubConfig: () => ({ entity: '' }),
});
