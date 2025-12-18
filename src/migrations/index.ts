import * as migration_20251126_131731 from './20251126_131731';
import * as migration_20251127_072048 from './20251127_072048';
import * as migration_20251211_131739 from './20251211_131739';
import * as migration_20251218_064236 from './20251218_064236';

export const migrations = [
  {
    up: migration_20251126_131731.up,
    down: migration_20251126_131731.down,
    name: '20251126_131731',
  },
  {
    up: migration_20251127_072048.up,
    down: migration_20251127_072048.down,
    name: '20251127_072048',
  },
  {
    up: migration_20251211_131739.up,
    down: migration_20251211_131739.down,
    name: '20251211_131739',
  },
  {
    up: migration_20251218_064236.up,
    down: migration_20251218_064236.down,
    name: '20251218_064236'
  },
];
