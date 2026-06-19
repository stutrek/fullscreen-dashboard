import { fireEvent, render, screen } from '@testing-library/preact';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { FullscreenDashboard } from './FullscreenDashboard';

describe('FullscreenDashboard', () => {
  beforeEach(() => {
    Object.defineProperty(document, 'fullscreenElement', {
      value: null,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document, 'fullscreenEnabled', {
      value: true,
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document.documentElement, 'requestFullscreen', {
      value: vi.fn().mockResolvedValue(undefined),
      writable: true,
      configurable: true,
    });
    Object.defineProperty(document, 'exitFullscreen', {
      value: vi.fn(),
      writable: true,
      configurable: true,
    });
  });

  it('renders a fullscreen button', () => {
    render(<FullscreenDashboard config={{}} />);
    expect(screen.getByTitle('Enter fullscreen')).toBeTruthy();
  });

  it('calls requestFullscreen when fullscreen is supported', () => {
    render(<FullscreenDashboard config={{}} />);
    fireEvent.click(screen.getByTitle('Enter fullscreen'));
    expect(document.documentElement.requestFullscreen).toHaveBeenCalled();
  });

  it('calls exitFullscreen when already fullscreen', () => {
    Object.defineProperty(document, 'fullscreenElement', {
      value: document.documentElement,
      configurable: true,
    });
    render(<FullscreenDashboard config={{}} />);
    fireEvent.click(screen.getByTitle('Exit fullscreen'));
    expect(document.exitFullscreen).toHaveBeenCalled();
  });

  it('hides the header and removes padding when fullscreen is not supported', () => {
    Object.defineProperty(document, 'fullscreenEnabled', {
      value: false,
      configurable: true,
    });
    const header = document.createElement('app-header');
    document.body.appendChild(header);
    const container = document.createElement('hui-view-container');
    document.body.appendChild(container);

    render(<FullscreenDashboard config={{}} />);
    fireEvent.click(screen.getByTitle('Enter fullscreen'));

    expect(header.style.getPropertyValue('display')).toBe('none');
    expect(container.style.getPropertyValue('padding')).toBe('0px');

    document.body.removeChild(header);
    document.body.removeChild(container);
  });

  it('hides the modern hui-root .header (not app-header) in fake fullscreen', () => {
    // Modern HA has no <app-header>; the toolbar is `.header` inside hui-root's
    // shadow root. This is the case the original code missed.
    Object.defineProperty(document, 'fullscreenEnabled', {
      value: false,
      configurable: true,
    });
    const huiRoot = document.createElement('hui-root');
    const shadow = huiRoot.attachShadow({ mode: 'open' });
    const header = document.createElement('div');
    header.className = 'header';
    shadow.appendChild(header);
    document.body.appendChild(huiRoot);
    const container = document.createElement('hui-view-container');
    document.body.appendChild(container);

    render(<FullscreenDashboard config={{}} />);
    fireEvent.click(screen.getByTitle('Enter fullscreen'));

    expect(header.style.getPropertyValue('display')).toBe('none');
    expect(container.style.getPropertyValue('padding')).toBe('0px');

    fireEvent.click(screen.getByTitle('Exit fullscreen'));
    expect(header.style.getPropertyValue('display')).toBe('');

    document.body.removeChild(huiRoot);
    document.body.removeChild(container);
  });

  it('restores header and padding when exiting fake fullscreen', () => {
    Object.defineProperty(document, 'fullscreenEnabled', {
      value: false,
      configurable: true,
    });
    const header = document.createElement('app-header');
    document.body.appendChild(header);
    const container = document.createElement('hui-view-container');
    document.body.appendChild(container);

    render(<FullscreenDashboard config={{}} />);
    fireEvent.click(screen.getByTitle('Enter fullscreen'));
    fireEvent.click(screen.getByTitle('Exit fullscreen'));

    expect(header.style.getPropertyValue('display')).toBe('');
    expect(container.style.getPropertyValue('padding')).toBe('');

    document.body.removeChild(header);
    document.body.removeChild(container);
  });
});
