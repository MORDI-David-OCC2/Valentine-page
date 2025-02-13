export function playCustomAnimation(name="Random", message=None) {
  console.log(`Trying to play animation for: ${name}`);

  const animationElement = document.getElementById("animationPlayer");
  const messageDiv = document.getElementById("message");

  if (!animationElement || !messageDiv) {
    console.error("❌ Animation or message container not found!");
    return;
  }

  const animationSources = {
      Djibril: "assets/AOM Djibril.mp4",
      Emilie: "assets/AOM Emilie.mp4",
      Fabien: "assets/AOM Fabien.mp4",
      Rayan: "assets/AOM Rayan.mp4",
      Ryu: "assets/AOM Ryu.mp4",
      Ulysse: "assets/AOM Ulysse.mp4",
      Wiam: "assets/AOM Wiam.mp4",
      Creation: "assets/ACM.mp4",
      Random: "assets/ACM.mp4"
  };

  // Select correct animation or use default
  const videoSrc = animationSources[name] || animationSources["Random"];
  animationElement.src = videoSrc;
  animationElement.style.display = "block";
  animationElement.play().catch(error => console.error("❌ Error playing animation:", error));

  // 🔹 When animation ends, hide it and show the message
  animationElement.onended = () => {
    console.log("✅ Animation finished, replacing with message.");

    // Fade out animation
    animationElement.style.transition = "opacity 0.5s ease-out";
    animationElement.style.opacity = "0";

    // Wait for fade-out, then hide animation & show message
    setTimeout(() => {
      animationElement.style.display = "none"; // Hide video
      animationElement.style.opacity = "1";   // Reset opacity

      // 🔹 Show the message in the same place
      messageDiv.innerHTML = `💌 ${message} 💌`;
      messageDiv.style.display = "block";
    }, 500);
  };
}
