// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

import * as posts from "./Posts";
import * as mediaPosts from "./MediaPosts";

exports.posts = {...posts};
exports.mediaPosts = {...mediaPosts};
