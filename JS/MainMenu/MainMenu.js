import background_Image_Names from "./ImageRefrences.js";

/*
Info on how to do the next code found on multiple websites:

How to wait in a script:
https://stackoverflow.com/questions/16873323/javascript-sleep-wait-before-continuing

How to pick a random child from an array:
https://stackoverflow.com/questions/7350363/select-a-random-string-from-an-array
*/

const bgImg = document.getElementById("bgImg");
const base_Path = "https://raw.githubusercontent.com/cheesymuffin8/Website_GMod_Project/main/Backgrounds/"

// PRELOAD ALL BACKGROUND IMAGES
function preloadBackgroundImages() {
  const promises = background_Image_Names.map(name => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = reject;
      img.src = base_Path + name;
    });
  });

  return Promise.all(promises)
    .then(() => console.log("All background images preloaded"))
    .catch(err => console.error("Error preloading some images:", err));
}

function startBackgroundLoop() {
  // Initial background image
  bgImg.src = base_Path + background_Image_Names[Math.floor(Math.random() * background_Image_Names.length)];
  bgImg.style.transition = "transform 15s linear, rotate 15s linear";
  bgImg.style.transform = "scale(1.15)";
  bgImg.style.rotate = "4deg";

  function BackgroundLoop() {
    setTimeout(function() {
      console.log("Changing Background");

      // Pick random image
      const randomImgNum = Math.floor(Math.random() * background_Image_Names.length);
      bgImg.src = base_Path + background_Image_Names[randomImgNum];

      // Reset scale instantly
      bgImg.style.transition = "transform 0s";
      bgImg.style.transform = "scale(1)";
      bgImg.style.rotate = "0deg";

      // Small delay to let browser reset the transform and rotate
      setTimeout(() => {
        bgImg.style.transition = "transform 15s linear, rotate 15s linear";
        bgImg.style.transform = "scale(1.15)";
        bgImg.style.rotate = "4deg";
      }, 50);

      BackgroundLoop();
    }, 15000);
  }

  BackgroundLoop();
}

window.addEventListener("DOMContentLoaded", () => {
  preloadBackgroundImages().then(startBackgroundLoop);
});

//Hover Sounds

//Found how to do this on https://css-tricks.com/play-sound-on-hover
//And chatgpt helped with the code for deleting the audio after its used

$(".MM_Button").mouseenter(function(){
	const audio = $("<audio></audio>").attr({ 
		'src':'../../Sounds/mp3/ui_hover.mp3', 
		'autoplay':'autoplay'
	}).prop("volume", 0.5).appendTo("body");
    audio.on("ended", function () {
        audio.remove();
    });
});

$(".MM_Button").mouseleave(function(){
	const audio = $("<audio></audio>").attr({ 
		'src':'../../Sounds/mp3/ui_hover.mp3',
		'autoplay':'autoplay'
	}).prop("volume", 0.5).appendTo("body");
    audio.on("ended", function () {
        audio.remove();
    });
});

$(".MM_Button").click(function(){
	const audio = $("<audio></audio>").attr({ 
		'src':'../../Sounds/mp3/ui_hover.mp3', 
		'autoplay':'autoplay'
	}).prop("volume", 0.5).appendTo("body");
    audio.on("ended", function () {
        audio.remove();
    });
});