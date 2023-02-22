import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

export const deleteWithStorage = functions.firestore
  .document("users/{userId}/mediaPosts/{mediaPostId}")
  .onDelete((snap) => {
    const deletedData = snap.data();
    const bucket = admin.storage().bucket();
    deletedData.files.map((file: { fullPath: string; }) => {
      const filePath = file.fullPath;
      return bucket.file(filePath).delete();
    });
  });
