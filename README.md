# Fullscreen Dashboard

A small Home Assistant button card that toggles the dashboard view fullscreen.
Clicking it fullscreens only the Lovelace view content — the sidebar and header
disappear, the background is included, and pressing Escape or clicking again
exits.

## Installation

### HACS (recommended)

1. HACS → three dots → Custom repositories → add `https://github.com/stutrek/fullscreen-dashboard`, category `Dashboard`.
2. Install from the HACS list and restart HA.

### Manual

Download `fullscreen-dashboard.js` from the [latest release](https://github.com/stutrek/fullscreen-dashboard/releases/latest),
place it in `config/www/`, and add a Lovelace resource:

```yaml
url: /local/fullscreen-dashboard.js
type: module
```

## Usage

Add the card to any dashboard view. It has no required configuration:

```yaml
type: custom:fullscreen-dashboard
```

The card defaults to 2 columns × 1 row in the HA grid.

## Development

```bash
pnpm install
pnpm dev        # Vite dev server with HMR
pnpm test       # Vitest
pnpm build      # produces dist/fullscreen-dashboard.js
```

## License

MIT
