// Git repo: https://github.com/twitchtv/igdb-api-node
// IGDB API docs: https://api-docs.igdb.com/

import igdb from 'igdb-api-node';

import {
  APP_ENV,
  TWITCH_CLIENT_ID,
  TWITCH_APP_ACCESS_TOKEN,
  IGDB_API_URL,
  IGDB_API_PROXY,
} from '@/config';

export const igdbClient = igdb(TWITCH_CLIENT_ID, TWITCH_APP_ACCESS_TOKEN, {
  baseURL:
    APP_ENV === 'development'
      ? `${location.protocol}//${location.host}${IGDB_API_PROXY}`
      : IGDB_API_URL,
});
