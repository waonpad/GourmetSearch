// import * as functions from "firebase-functions";
import * as admin from 'firebase-admin';
admin.initializeApp();

import * as api from './api';
import * as gameClip from './game-clip';

exports.api = { ...api };
exports.gameClip = { ...gameClip };
