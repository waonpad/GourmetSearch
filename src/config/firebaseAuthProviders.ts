import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

export const firebaseAuthProviders = {
  github: new GithubAuthProvider(),
  google: new GoogleAuthProvider(),
};
