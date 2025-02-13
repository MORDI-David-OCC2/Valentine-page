import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { playCustomAnimation } from "./animations.js";
import { sendEmail } from "./email.js";  // ✅ Import the email function

const database = getDatabase();
const availableAnimations = ["Djibril", "Emilie", "Fabien", "Rayan", "Ryu", "Ulysse", "Wiam"];
const backgroundColors = {
  "Djibril": "#047CA4",
  "Fabien": "#047CA4",
  "Rayan": "#047CA4", 
  "Ulysse": "#047CA4",  
  "default": "#14041C"
};

document.addEventListener("DOMContentLoaded", function() {
  // Function to get URL parameters
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  const recipient = getQueryParam("recipient");

  if (recipient) {
    console.log(`🎨 Changing background for: ${recipient}`);

    // Apply the recipient's background color or use default
    document.body.style.backgroundColor = backgroundColors[recipient] || backgroundColors["default"];
  }
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
    playCustomAnimation("Creation");

    // 📧 Send an email notification
    sendEmail(recipient, email, message, password);

  } catch (error) {
    console.error("❌ Erreur :", error);
    alert("❌ Une erreur est survenue lors de l'enregistrement.");
  }
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