import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { playCustomAnimation } from "./animations.js";
import { sendEmail } from "./email.js";  // ✅ Import the email function

let app;
const firebaseConfig = {
  apiKey: "AIzaSyBWRQcZeNMGcuB2I2eF6yKv3Nfx9_jXduY",
  authDomain: "secret-valentine-d0646.firebaseapp.com",
  databaseURL: "https://secret-valentine-d0646-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "secret-valentine-d0646",
  storageBucket: "secret-valentine-d0646.appspot.com",
  messagingSenderId: "597717292866",
  appId: "1:597717292866:web:b8f905933ea7e973a7dadb",
  measurementId: "G-0G4QJ69NPR"
};
try {
  app = initializeApp(firebaseConfig);
} catch (error) {
  console.warn("⚠️ Firebase already initialized or failed:", error.message);
  app = getApps()[0]; // Use existing app
}

const database = getDatabase();
const availableAnimations = ["Djibril", "Emilie", "Fabien", "Rayan", "Ryu", "Ulysse", "Wiam"];
document.addEventListener("DOMContentLoaded", function() {
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const recipient = getQueryParam("recipient");
  const body = document.body;
});

// 📌 Handle message creation
document.getElementById('createMessageForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const recipient = document.getElementById('recipient').value.trim();
  const password = document.getElementById('newPassword').value.trim();
  const message = document.getElementById('newMessage').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!recipient || !password || !message || !email) {
    alert("❌ Remplis tous les champs !");
    return;
  }

  const messageId = new Date().getTime().toString();
  
  try {
    await set(ref(database, `messages/${recipient}/${messageId}`), {
      password: password,
      message: message
    });

    // 🎬 Play ACM.mp4 animation when a message is created
    playCustomAnimation("Creation", "Message bien envoyé");

    // 📧 Send an email notification
    sendEmail(recipient, email, message, password);

  } catch (error) {
    console.error("❌ Erreur :", error);
    alert("❌ Une erreur est survenue lors de l'enregistrement.");
  }
});
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("createMessageForm");

  if (!form) {
    console.error("❌ Form with id='createMessageForm' not found!");
    return;
  }

  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    console.log("✅ Form submitted!");
  });
});

// 📌 Handle message retrieval
document.getElementById('passwordForm').addEventListener('submit', async function(event) {
  event.preventDefault();
  
  const target = document.getElementById('target').value.trim();
  const passwordInput = document.getElementById('password').value.trim();

  if (!target || !passwordInput) {
    alert("❌ Veuillez remplir tous les champs !");
    return;
  }

  try {
    const snapshot = await get(child(ref(database), `messages/${target}`));
    
    if (!snapshot.exists()) {
      alert("❌ Message introuvable.");
      return;
    }

    let messageFound = false;

    snapshot.forEach((messageSnapshot) => {
      const data = messageSnapshot.val();
      if (data.password === passwordInput) {
        // 🔗 Redirect to new page before playing animation
        window.location.href = `message.html?recipient=${encodeURIComponent(target)}&message=${encodeURIComponent(data.message)}`;
        messageFound = true;
        return true; 
      }
    });

    if (!messageFound) {
      alert("❌ Mot de passe incorrect !");
    }

  } catch (error) {
    console.error("❌ Erreur :", error);
    alert("❌ Une erreur est survenue lors de la récupération du message.");
  }
});