import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCXnXTk7Jfogw46sj6rOEcPkBui-b0bbTE",
  authDomain: "z-connector.firebaseapp.com",
  projectId: "z-connector",
  storageBucket: "z-connector.appspot.com",
  messagingSenderId: "273566253893",
  appId: "1:273566253893:web:db91ae28ee738f3c70f42c",
  measurementId: "G-S66DX6RHFR",
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
