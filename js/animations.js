export function playCustomAnimation(target) {
    const animationDiv = document.getElementById('customAnimation');
    const animationVideo = document.getElementById('animationVideo');
    
    const animations = {
        "Creation": "assets/ACM.mp4",
        "Random": "assets/ACM/mp4",
      "Djibril": "assets/AOM Djibril.mp4",
      "Emilie": "assets/AOM Emilie.mp4",
      "Fabien": "assets/AOM Fabien.mp4",
      "Rayan": "assets/AOM Rayan.mp4",
      "Ryu": "assets/AOM Ryu.mp4",
      "Ulysse": "assets/AOM Ulysse.mp4",
      "Wiam": "assets/AOM Wiam.mp4"
    };
    
    if (animations[target]) {
      animationVideo.src = animations[target];
      animationDiv.style.display = 'block';
      animationVideo.play();
  
      animationVideo.onended = function() {
        animationDiv.style.display = 'none';
      };
    }
  }