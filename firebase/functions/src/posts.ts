import * as functions from "firebase-functions";
// import * as admin from 'firebase-admin';

export const test = functions.firestore
  .document("users/{userId}/posts/{postId}")
  .onCreate((change) => {
    const newValue = change.data();
    return change.ref.set(
      {...newValue, body: `${newValue?.body} Cloud Functionsによって処理された！`},
      {merge: true},
    );
  });
