import { useEntity } from 'preact-homeassistant';
import './FullscreenDashboard.styles';

export interface FullscreenDashboardConfig {
  entity: string;
}

export function FullscreenDashboard({ config }: { config: FullscreenDashboardConfig }) {
  const entity = useEntity(config.entity);

  if (!config.entity) {
    return (
      <ha-card>
        <div class="card-content fullscreen-dashboard__empty">
          No entity configured. Pick one in the card editor.
        </div>
      </ha-card>
    );
  }

  if (!entity) {
    return (
      <ha-card>
        <div class="card-content fullscreen-dashboard__empty">
          Waiting for <code>{config.entity}</code>...
        </div>
      </ha-card>
    );
  }

  return (
    <ha-card>
      <div class="card-content fullscreen-dashboard">
        <h2 class="fullscreen-dashboard__heading">{entity.attributes?.friendly_name ?? config.entity}</h2>
        <p class="fullscreen-dashboard__entity-id">{entity.entity_id}</p>
        <p class="fullscreen-dashboard__state">
          {entity.state}
          {entity.attributes?.unit_of_measurement
            ? ` ${entity.attributes.unit_of_measurement}`
            : ''}
        </p>
        <pre class="fullscreen-dashboard__attributes">{JSON.stringify(entity.attributes, null, 2)}</pre>
      </div>
    </ha-card>
  );
}
