import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, setDoc, doc, addDoc } from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyDiIoAzPqJRs9_ZQA9HnsxuTWpe8Jy3vCc",
  authDomain: "bedava-elmas.firebaseapp.com",
  projectId: "bedava-elmas",
  storageBucket: "bedava-elmas.firebasestorage.app",
  messagingSenderId: "420394280922",
  appId: "1:420394280922:web:c072c5b5f1ec75ebad42e3",
  measurementId: "G-Y4L9Y92L9H"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app)

export const getUsers = async () => {
  const usersCol = collection(db, 'users')
  const userSnapshot = await getDocs(usersCol)
  const userList = userSnapshot.docs.map(user => user.data())
  return userList
}

export const addUser = async (username: string, phone: number, email: string) => {
  const usersCol = collection(db, 'users')
  await addDoc(usersCol, {
    username,
    phone,
    email
  })
  return `Added new user with following credentials: phone: ${phone}, username: ${username}, email: ${email}`
}