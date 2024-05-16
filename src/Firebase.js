

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL ,uploadBytesResumable} from 'firebase/storage';

import { useState, useEffect } from "react";

const firebaseConfig = {
  apiKey: "<your-api-key>",
  authDomain: "<your-auth-domain>",
  projectId: "<your-project-id>",
  storageBucket: "<your-storage-bucket>",
  messagingSenderId: "<your-messaging-sender-id>",
  appId: "<your-app-id>",
  measurementId: "<your-measurement-id>"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app)
const auth = getAuth(app);

 function signup(email,password) {
  return createUserWithEmailAndPassword(auth,email,password);

}

export function Login(email,password){
  return signInWithEmailAndPassword(auth,email,password);
}

export function logout(){
return signOut(auth);
}

export function useAuth() {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, user => setCurrentUser(user));
    return unsub;
  }, [])

  return currentUser;
}

export async function upload(file, currentUser, setLoading, setUploadProgress, setUploadSuccess) {
  const filePath = `users/${currentUser.uid}/${file.name}`;
  const fileRef = ref(storage, filePath);
  const uploadTask = uploadBytesResumable(fileRef, file);

  uploadTask.on(
    'state_changed',
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setUploadProgress(Math.round(progress));
    },
    (error) => {
      console.error('Error uploading file:', error);
      setLoading(false);
    },
    async () => {
      const downloadURL = await getDownloadURL(fileRef);
      await updateProfile(currentUser, { photoURL: downloadURL });
      setLoading(false);
      setUploadSuccess(true); // Set upload success state
    }
  );

  setLoading(true);

  try {
    await uploadTask;
  } catch (error) {
    console.error('Error uploading file:', error);
    setLoading(false);
  }
}

export { signup };
