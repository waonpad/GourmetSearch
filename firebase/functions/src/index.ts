// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

// eslint-disable-next-line node/no-missing-import
import * as posts from "./Posts";
// eslint-disable-next-line node/no-missing-import
import * as mediaPosts from "./MediaPosts";

exports.posts = {...posts};
exports.mediaPosts = {...mediaPosts};
