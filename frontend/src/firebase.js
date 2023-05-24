// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAdKjUgF_SbV03-GEJldbXQPgaCL_8Dyc4",
  authDomain: "store-b581c.firebaseapp.com",
  projectId: "store-b581c",
  storageBucket: "store-b581c.appspot.com",
  messagingSenderId: "1022674456208",
  appId: "1:1022674456208:web:e8dcf4973472499e201215",
  measurementId: "G-YB1HHW44VC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;