import * as admin from 'firebase-admin';

const serviceAccount = require('../iglesia-942a5-firebase-adminsdk-lgtdk-fe821674da.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

export {db};