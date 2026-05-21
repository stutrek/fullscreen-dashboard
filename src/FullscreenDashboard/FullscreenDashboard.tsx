import { useEffect, useState } from 'preact/hooks';
import './FullscreenDashboard.styles';

export interface FullscreenDashboardConfig {}

function findHuiViewContainer(): Element | null {
  function search(root: Document | ShadowRoot): Element | null {
    const found = root.querySelector('hui-view-container');
    if (found) return found;
    for (const el of root.querySelectorAll('*')) {
      const sr = (el as Element & { shadowRoot?: ShadowRoot }).shadowRoot;
      if (sr) {
        const r = search(sr);
        if (r) return r;
      }
    }
    return null;
  }
  return search(document);
}

export function FullscreenDashboard(_props: { config: FullscreenDashboardConfig }) {
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);

  useEffect(() => {
    const handler = () => {
      const isNowFullscreen = !!document.fullscreenElement;
      setIsFullscreen(isNowFullscreen);
      const container = findHuiViewContainer();
      if (container) {
        if (isNowFullscreen) {
          (container as HTMLElement).style.setProperty('padding', '0', 'important');
        } else {
          (container as HTMLElement).style.removeProperty('padding');
        }
      }
    };
    document.addEventListener('fullscreenchange', handler);
    return () => document.removeEventListener('fullscreenchange', handler);
  }, []);

  const toggle = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      (findHuiViewContainer() ?? document.documentElement).requestFullscreen();
    }
  };

  return (
    <ha-card>
      <button
        class="fullscreen-dashboard-btn"
        onClick={toggle}
        title={isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        <ha-icon icon={isFullscreen ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'} />
      </button>
    </ha-card>
  );
}
