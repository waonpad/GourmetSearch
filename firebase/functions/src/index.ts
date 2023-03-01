// import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp();

import * as mediaPosts from './MediaPosts';
import * as posts from './Posts';
import * as gameClip from './game-clip';

exports.posts = { ...posts };
exports.mediaPosts = { ...mediaPosts };
exports.gameClip = { ...gameClip };
