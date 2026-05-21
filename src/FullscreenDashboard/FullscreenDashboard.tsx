import { useEffect, useState } from 'preact/hooks';
import './FullscreenDashboard.styles';

export type FullscreenDashboardConfig = {};

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

function findHaHeader(): Element | null {
  function search(root: Document | ShadowRoot): Element | null {
    const found = root.querySelector('app-header');
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

function applyFakeFullscreenStyles() {
  const container = findHuiViewContainer();
  const header = findHaHeader();
  if (container) (container as HTMLElement).style.setProperty('padding', '0', 'important');
  if (header) (header as HTMLElement).style.setProperty('display', 'none', 'important');
}

function removeFakeFullscreenStyles() {
  const container = findHuiViewContainer();
  const header = findHaHeader();
  if (container) (container as HTMLElement).style.removeProperty('padding');
  if (header) (header as HTMLElement).style.removeProperty('display');
}

export function FullscreenDashboard(_props: { config: FullscreenDashboardConfig }) {
  const [isFullscreen, setIsFullscreen] = useState(!!document.fullscreenElement);
  const [isFakeFullscreen, setIsFakeFullscreen] = useState(false);

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

  useEffect(() => {
    if (!isFakeFullscreen) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        removeFakeFullscreenStyles();
        setIsFakeFullscreen(false);
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [isFakeFullscreen]);

  const toggle = () => {
    if (isFakeFullscreen) {
      removeFakeFullscreenStyles();
      setIsFakeFullscreen(false);
      return;
    }
    if (document.fullscreenElement) {
      document.exitFullscreen();
      return;
    }
    if (!document.fullscreenEnabled) {
      applyFakeFullscreenStyles();
      setIsFakeFullscreen(true);
      return;
    }
    (findHuiViewContainer() ?? document.documentElement).requestFullscreen().catch(() => {
      applyFakeFullscreenStyles();
      setIsFakeFullscreen(true);
    });
  };

  const active = isFullscreen || isFakeFullscreen;

  return (
    <ha-card>
      <button
        type="button"
        class="fullscreen-dashboard-btn"
        onClick={toggle}
        title={active ? 'Exit fullscreen' : 'Enter fullscreen'}
      >
        <ha-icon icon={active ? 'mdi:fullscreen-exit' : 'mdi:fullscreen'} />
      </button>
    </ha-card>
  );
}
