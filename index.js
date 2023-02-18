var backgrounds = ["/Images/main1_bg.jpg"];
var currentBackground = 0;
var backgroundElement = document.getElementById("main_bg");

function changeBackground() {
  currentBackground++;
  if (currentBackground > backgrounds.length - 1) {
    currentBackground = 0;
  }
  backgroundElement.style.backgroundImage = "url('" + backgrounds[currentBackground] + "')";
}

setInterval(changeBackground, 3000);
