import { registerPreactCard } from 'preact-homeassistant';
import { FullscreenDashboard, type FullscreenDashboardConfig } from './FullscreenDashboard';
import { FullscreenDashboardEditor } from './FullscreenDashboardEditor';

registerPreactCard<FullscreenDashboardConfig>({
  type: 'fullscreen-dashboard',
  name: 'Fullscreen Dashboard',
  description: 'A button that toggles fullscreen mode for the entire dashboard',
  Component: FullscreenDashboard,
  ConfigComponent: FullscreenDashboardEditor,
  getStubConfig: () => ({ layout_options: { grid_columns: 2, grid_rows: 1 } }),
});
