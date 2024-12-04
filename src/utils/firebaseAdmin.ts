// src/utils/firebaseAdmin.ts

import admin from 'firebase-admin';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: "cleo-plumbing",
      clientEmail: "firebase-adminsdk-abcde@cleo-plumbing.iam.gserviceaccount.com",
      privateKey: "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkq...IDAQAB\n-----END PRIVATE KEY-----\n",
    }),
    // databaseURL: "https://cleo-plumbing-default-rtdb.firebaseio.com", // Optional
  });
}

export default admin;
