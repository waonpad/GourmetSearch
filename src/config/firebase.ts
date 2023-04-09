import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';

import {
  FIREBASE_EMULATE,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  RECAPTCHA_PUBLIC_KEY,
} from '@/config';

const EMULATE_AUTH_URL = 'http://localhost:9099';
const EMULATE_FIRESTORE_HOST = 'localhost';
const EMULATE_FIRESTORE_PORT = 8080;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth();
FIREBASE_EMULATE === 'true' && connectAuthEmulator(auth, EMULATE_AUTH_URL);

const db = getFirestore();
FIREBASE_EMULATE === 'true' &&
  connectFirestoreEmulator(db, EMULATE_FIRESTORE_HOST, EMULATE_FIRESTORE_PORT);

const firebaseAuthProviders = {
  google: new GoogleAuthProvider(),
};

self.FIREBASE_APPCHECK_DEBUG_TOKEN = FIREBASE_EMULATE === 'true' ? true : undefined;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const appCheck = initializeAppCheck(firebaseApp, {
  provider: new ReCaptchaV3Provider(RECAPTCHA_PUBLIC_KEY),
  isTokenAutoRefreshEnabled: true,
});

export { firebaseApp, auth, db, firebaseAuthProviders };

declare let self: {
  FIREBASE_APPCHECK_DEBUG_TOKEN: boolean | undefined;
};
