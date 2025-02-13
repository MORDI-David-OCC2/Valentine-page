export function playCustomAnimation(name) {
  console.log(`Trying to play animation: ${name}`);

  // Get the video element
  const animationElement = document.getElementById("animationPlayer");

  if (!animationElement) {
      console.error("❌ Animation element not found in the DOM!");
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

  if (!animationSources[name]) {
    animationElement.src = animationSources["Random"];
    animationElement.load();  // Reload the video to apply new source
    animationElement.play();
    console.error(`❌ No animation found for: ${name}`);
    return;
  }

  // Set the source of the video
  animationElement.src = animationSources[name];
  animationElement.style.display = "block"; // Show the video when it starts
  animationElement.load();  // Reload the video to apply new source
  animationElement.play().catch(error => console.error("❌ Error playing animation:", error));

  // 🔹 Hide the animation when it finishes playing
  animationElement.onended = () => {
    animationElement.style.display = 'none'; // ✅ Corrected line
    console.log("✅ Animation finished, hiding the player.");
  };
}