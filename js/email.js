window.emailjs.init("tBq9tvEuD9XKUu0XI");

export function sendEmail(recipient, email, message, password) {
  const templateParams = {
    to_email: email,
    from_name: "Secret Valentine",
    recipient: recipient,
    message: message,
    password: password,
    link: "https://secret-valentine.netlify.app/"
  };

  emailjs.send('service_5o3c34a', 'template_z1jvuel', templateParams)
  .then(() => {
    console.log("✅ Email sent successfully!");
  })
  .catch(error => {
    console.error('❌ Erreur lors de l\'envoi de l\'e-mail:', error);
    alert("Erreur lors de l'envoi de l'email. Vérifiez la console.");
  });

}