// Git repo: https://github.com/twitchtv/igdb-api-node
// IGDB API docs: https://api-docs.igdb.com/

import igdb from 'igdb-api-node';

import {
  FIREBASE_PROJECT_ID,
  FIREBASE_EMULATE,
  TWITCH_CLIENT_ID,
  TWITCH_APP_ACCESS_TOKEN,
  IGDB_API_PROXY,
} from '@/config';

export const igdbClient = igdb(TWITCH_CLIENT_ID, TWITCH_APP_ACCESS_TOKEN, {
  baseURL:
    FIREBASE_EMULATE === 'true'
      ? `http://127.0.0.1:5001/${FIREBASE_PROJECT_ID}/us-central1/${IGDB_API_PROXY}`
      : `https://us-central1-${FIREBASE_PROJECT_ID}.cloudfunctions.net/${IGDB_API_PROXY}`,
});
