import { getDatabase, ref, set, get, child } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-database.js";
import { playCustomAnimation } from "./animations.js";
import { sendEmail } from "./email.js";  // ✅ Import the email function

const database = getDatabase();
const availableAnimations = ["Djibril", "Emilie", "Fabien", "Rayan", "Ryu", "Ulysse", "Wiam"];

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
  const messageDiv = document.getElementById('message');

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
        if (availableAnimations.includes(target)){
        playCustomAnimation(target);
        }
        else {
            playCustomAnimation("Creation");
        }
        setTimeout(() => {
          messageDiv.innerHTML = `💌 ${data.message} 💌`;
          messageDiv.style.display = 'block';
        }, 3000);
        
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
