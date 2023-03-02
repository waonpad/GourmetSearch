// import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp();

import * as mediaPosts from './MediaPosts';
import * as gameClip from './game-clip';

exports.mediaPosts = { ...mediaPosts };
exports.gameClip = { ...gameClip };
