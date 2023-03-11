import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

export * from './site';

const LISTENING_PATH = '/users/{userId}/gameClips/{gameClipId}';
const LISTENING_DOC = functions.firestore.document(LISTENING_PATH);

// export const onWriteGameClip = LISTENING_DOC.onWrite(async (snap) => {
//   const gameClip = snap.after.data();
// });

// export const onCreateGameClip = LISTENING_DOC.onCreate(async (snap) => {
//   const gameClip = snap.data();
// });

// export const onUpdateGameClip = LISTENING_DOC.onUpdate(async (snap) => {
//   const gameClip = snap.after.data();
// });

export const onDeleteGameClip = LISTENING_DOC.onDelete(async (snap) => {
  // サブコレクションの再帰処理は後から設定する

  // const gameClip = snap.data();

  const likedGameClipsSnapshot = await admin
    .firestore()
    .collectionGroup('likedGameClips')
    .where('originRef', '==', snap.ref)
    .get();

  const batchList: admin.firestore.WriteBatch[] = [];
  let batchIndex = 0;
  batchList.push(admin.firestore().batch());
  const operationLimit = 500;
  let operationCounter = 0;

  likedGameClipsSnapshot.docs.forEach((doc) => {
    batchList[batchIndex].delete(doc.ref);
    operationCounter++;

    if (operationCounter === operationLimit - 1) {
      batchList.push(admin.firestore().batch());
      batchIndex++;
      operationCounter = 0;
    }
  });

  for (const batch of batchList) {
    await batch.commit();
  }
});
