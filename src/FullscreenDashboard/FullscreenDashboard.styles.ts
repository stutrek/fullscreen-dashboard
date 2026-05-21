import { css } from 'preact-homeassistant';

css`
  ha-card {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
  }

  .fullscreen-dashboard-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 44px;
    height: 44px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--primary-text-color);
    border-radius: var(--ha-card-border-radius, 12px);
  }

  .fullscreen-dashboard-btn:hover {
    background: var(--state-icon-hover-color, rgba(0, 0, 0, 0.08));
  }
`;
