import { initializeApp } from 'firebase/app';
import {
  connectAuthEmulator,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
} from 'firebase/auth';
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
} from '@/config';

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
FIREBASE_EMULATE === 'true' && connectAuthEmulator(auth, 'http://localhost:9009');

const db = getFirestore();
FIREBASE_EMULATE === 'true' && connectFirestoreEmulator(db, 'localhost', 8080);

const firebaseAuthProviders = {
  github: new GithubAuthProvider(),
  google: new GoogleAuthProvider(),
};

export { firebase, auth, db, firebaseAuthProviders };
