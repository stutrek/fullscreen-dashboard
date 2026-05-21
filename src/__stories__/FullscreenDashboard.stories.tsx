import type { Meta, StoryObj } from '@storybook/preact-vite';
import { getAllStyles } from 'preact-homeassistant';
import { FullscreenDashboard } from '../FullscreenDashboard/FullscreenDashboard';
import '../__test-utils__/ha-stubs';

const meta: Meta<typeof FullscreenDashboard> = {
  title: 'FullscreenDashboard',
  component: FullscreenDashboard,
};

export default meta;
type Story = StoryObj<typeof FullscreenDashboard>;

export const Default: Story = {
  render: () => (
    <>
      <style>{getAllStyles()}</style>
      <FullscreenDashboard config={{}} />
    </>
  ),
};
