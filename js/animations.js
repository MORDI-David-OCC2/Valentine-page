export function playCustomAnimation(name, message) {
  console.log(`Trying to play animation for: ${name}`);

  const animationElement = document.getElementById("animationPlayer");
  const Joker= "Null";
  console.log(`Trying to play animation for: ${animationElement}`)
  const messageDiv = document.getElementById("message");
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
  // If animationElement is missing, play the "Creation" animation in the center of the screen
  if (!animationElement) {
    console.warn("⚠️ animationPlayer element not found! Playing 'Creation' animation in the center.");

    const creationVideo = document.createElement("video");
    creationVideo.src = animationSources["Creation"];
    creationVideo.style.display = "block";
    creationVideo.style.position = "fixed";
    creationVideo.style.top = "50%";
    creationVideo.style.left = "50%";
    creationVideo.style.transform = "translate(-50%, -50%)";
    creationVideo.style.zIndex = "1000";  // Ensure it appears on top
    creationVideo.style.maxWidth = "80%";
    creationVideo.style.maxHeight = "80%";
    creationVideo.controls = true;  // Optional: add controls for user interaction

    document.body.appendChild(creationVideo);

    // Play the "Creation" animation and catch errors
    creationVideo.play().catch(error => {
      console.error("❌ Error playing 'Creation' animation:", error);
    });

    // Remove the video element when it ends
    creationVideo.onended = () => {
      console.log("✅ 'Creation' animation finished.");
      creationVideo.remove();
    };

    return;
  }

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
