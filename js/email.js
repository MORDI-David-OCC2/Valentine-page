window.emailjs.init("EerYy8lVdytZqhnNC");

export function sendEmail(recipient, email, message, password) {
  const templateParams = {
    to_email: email,
    from_name: "Secret Valentine",
    recipient: recipient,
    message: message,
    password: password,
    link: "https://secret-valentine.netlify.app/"
  };

  emailjs.send('service_gnvcx5e', 'template_q89lj9b', templateParams)
  .then(() => {
    console.log("✅ Email sent successfully!");
  })
  .catch(error => {
    console.error('❌ Erreur lors de l\'envoi de l\'e-mail:', error);
    alert("Erreur lors de l'envoi de l'email. Vérifiez la console.");
  });

}