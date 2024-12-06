// pages/api/testFirebaseAdmin.ts

import type { NextApiRequest, NextApiResponse } from 'next';
import admin from '@/utils/firebaseAdmin';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    // **Test Firestore Database Write**
    const firestore = admin.firestore();
    const docRef = firestore.collection('testCollection').doc('testDoc');
    await docRef.set({ message: 'Hello from Firebase Admin SDK!' });
    const doc = await docRef.get();
    const firestoreData = doc.data();

    // **Test Storage File Upload**
    const bucket = admin.storage().bucket();
    const file = bucket.file('test-folder/test-file.txt');
    await file.save('Hello from Firebase Admin SDK Storage!');
    const [metadata] = await file.getMetadata();

    res.status(200).json({
      message: 'Firebase Admin SDK test successful',
      firestoreData,
      storageMetadata: metadata,
    });
  } catch (error) {
    console.error('Error testing Firebase Admin SDK:', error);
    if (error instanceof Error) {
      res.status(500).json({ error: error.message });
    } else {
      res.status(500).json({ error: String(error) });
    }
  }
  
}
