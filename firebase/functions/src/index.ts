// import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
admin.initializeApp();

import * as posts from "./posts";
import * as mediaPosts from "./mediaPosts";

exports.posts = { ...posts };
exports.mediaPosts = { ...mediaPosts };