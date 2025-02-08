// Firebase SDK'yı içe aktar
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Firebase yapılandırması
const firebaseConfig = {
  apiKey: "AIzaSyDiIoAzPqJRs9_ZQA9HnsxuTWpe8Jy3vCc",
  authDomain: "bedava-elmas.firebaseapp.com",
  projectId: "bedava-elmas",
  storageBucket: "bedava-elmas.appspot.com",
  messagingSenderId: "420394280922",
  appId: "1:420394280922:web:c072c5b5f1ec75ebad42e3",
  measurementId: "G-Y4L9Y92L9H"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

// Formu dinle ve veriyi Firestore'a kaydet
document.getElementById("responseForm").addEventListener("submit", async function(event) {
    event.preventDefault(); // Sayfanın yenilenmesini engelle

    // Formdan gelen verileri al
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const message = document.getElementById("message").value;

    try {
        // Firestore'a veri ekle
        await addDoc(collection(db, "responses"), {
            username: username,
            email: email,
            message: message,
            timestamp: new Date()
        });

        alert("Yanıtınız kaydedildi!");
    } catch (error) {
        console.error("Hata:", error);
        alert("Bir hata oluştu.");
    }
});
