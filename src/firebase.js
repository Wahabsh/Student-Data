// Import Firebase SDK functions
import { initializeApp } from "firebase/app";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth"; 
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; 

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDyMmxDCelkfDJYXD8DVop9O-d2xRLLu3A",
  authDomain: "fir-8cf73.firebaseapp.com",
  projectId: "fir-8cf73",
  storageBucket: "fir-8cf73.appspot.com",
  messagingSenderId: "419395465777",
  appId: "1:419395465777:web:740456ebbe3c9d4584db10"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app); // Initialize authentication
const db = getFirestore(app); // Initialize Firestore

// Function to set up Recaptcha for phone authentication
const setUpRecaptcha = () => {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
      size: "invisible",
      callback: (response) => {
        console.log("reCAPTCHA verified!", response);
      },
      "expired-callback": () => {
        console.error("reCAPTCHA expired. Please refresh.");
      },
    });
  }
  return window.recaptchaVerifier;
};

// Function to send OTP
const sendOTP = async (phoneNumber) => {
  try {
    setUpRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return confirmationResult;
  } catch (error) {
    console.error("Error sending OTP:", error);
    throw error;
  }
};

// Function to add student data to Firestore
const addStudent = async (studentData) => {
  try {
    const docRef = await addDoc(collection(db, "students"), studentData);
    console.log("Student added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
};

// Function to get all student data from Firestore
const getStudents = async () => {
  try {
    const querySnapshot = await getDocs(collection(db, "students"));
    const students = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    return students;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};
export { app };
export { auth, db, setUpRecaptcha, sendOTP, addStudent, getStudents };
