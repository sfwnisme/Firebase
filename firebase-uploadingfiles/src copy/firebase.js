import { initializeApp } from "firebase/app";

import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDWr_CqzOz9ZgPSC6t9YH7Gik0WIt7bAQs",
  authDomain: "upload-files-e883b.firebaseapp.com",
  projectId: "upload-files-e883b",
  storageBucket: "upload-files-e883b.appspot.com",
  messagingSenderId: "648595319678",
  appId: "1:648595319678:web:c61088182d13bb6538212f"
};

const app = initializeApp(firebaseConfig)

export const storage = getStorage(app)