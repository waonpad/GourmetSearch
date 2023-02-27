import { initializeApp } from 'firebase/app';
import { connectAuthEmulator, getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { connectStorageEmulator, getStorage } from 'firebase/storage';

import {
  FIREBASE_EMULATE,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
} from '@/config';

const EMULATE_AUTH_URL = 'http://localhost:9099';
const EMULATE_FIRESTORE_HOST = 'localhost';
const EMULATE_FIRESTORE_PORT = 8080;
const EMULATE_STORAGE_HOST = 'localhost';
const EMULATE_STORAGE_PORT = 9199;

const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: FIREBASE_AUTH_DOMAIN,
  projectId: FIREBASE_PROJECT_ID,
  storageBucket: FIREBASE_STORAGE_BUCKET,
  messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
  appId: FIREBASE_APP_ID,
  measurementId: FIREBASE_MEASUREMENT_ID,
};

const firebase = initializeApp(firebaseConfig);

const auth = getAuth();
FIREBASE_EMULATE === 'true' && connectAuthEmulator(auth, EMULATE_AUTH_URL);

const db = getFirestore();
FIREBASE_EMULATE === 'true' &&
  connectFirestoreEmulator(db, EMULATE_FIRESTORE_HOST, EMULATE_FIRESTORE_PORT);

const storage = getStorage();
FIREBASE_EMULATE === 'true' &&
  connectStorageEmulator(storage, EMULATE_STORAGE_HOST, EMULATE_STORAGE_PORT);

const firebaseAuthProviders = {
  google: new GoogleAuthProvider(),
};

export { firebase, auth, db, storage, firebaseAuthProviders };
