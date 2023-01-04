// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: 'AIzaSyC5GiunlslzXox26Jb2umdHxvG52pkoQeQ',
  authDomain: 'final-clothing-store.firebaseapp.com',
  projectId: 'final-clothing-store',
  storageBucket: 'final-clothing-store.appspot.com',
  messagingSenderId: '126500956430',
  appId: '1:126500956430:web:bd680705cc5fb4fd678f5f',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)

export default app
