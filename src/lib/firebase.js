import { initializeApp } from 'firebase/app'
import { getStorage } from 'firebase/storage'
const firebaseConfig = {
  apiKey: 'AIzaSyASUPM-6ABTWDUB1ieZEY0RcPau1hmGxcE',
  authDomain: 'omanaakfa2024.firebaseapp.com',
  projectId: 'omanaakfa2024',
  storageBucket: 'omanaakfa2024.appspot.com',
  messagingSenderId: '983531578587',
  appId: '1:983531578587:web:8a51f7c293a0d55bfe58fe',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)
