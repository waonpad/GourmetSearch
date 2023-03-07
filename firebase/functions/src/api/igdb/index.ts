import axios from 'axios';
import * as cors from 'cors';
import * as functions from 'firebase-functions';

export const igdb = functions.https.onRequest(async (req, res) => {
  // req.bodyは { [フロントから投げたデータ]: '' } の形式で送られてくる
  cors({ origin: true })(req, res, async () => {
    const response = await axios.post(req.url, Object.keys(req.body)[0], {
      baseURL: 'https://api.igdb.com/v4',
      headers: {
        Authorization: req.headers.authorization,
        'client-id': req.headers['client-id'],
      },
    });

    res.send(response.data);
  });
});
