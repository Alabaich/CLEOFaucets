// components/FirebaseTestComponent.tsx

import React from 'react';
import { db, storage, auth } from '../utils/firebaseConfig';
import { collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { ref as storageRef, uploadString, getDownloadURL } from 'firebase/storage';
import { signInAnonymously } from 'firebase/auth';

const FirebaseTestComponent: React.FC = () => {
  const testFirebase = async () => {
    try {
      // Sign in anonymously (if security rules require authentication)
      await signInAnonymously(auth);

      // Test Firestore
      const testDocRef = doc(collection(db, 'clientTestCollection'), 'testDoc');
      await setDoc(testDocRef, { message: 'Hello from Client SDK!' });
      const docSnap = await getDoc(testDocRef);
      const firestoreData = docSnap.data();
      console.log('Firestore Data:', firestoreData);

      // Test Storage
      const testStorageRef = storageRef(storage, 'client-test-folder/test-file.txt');
      await uploadString(testStorageRef, 'Hello from Client SDK Storage!');
      const url = await getDownloadURL(testStorageRef);
      console.log('Storage File URL:', url);
    } catch (error) {
      console.error('Error testing Firebase Client SDK:', error);
    }
  };

  return (
    <div>
      <button onClick={testFirebase}>Test Firebase Client SDK</button>
    </div>
  );
};

export default FirebaseTestComponent;
