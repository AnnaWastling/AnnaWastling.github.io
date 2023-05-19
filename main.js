gsap.registerPlugin(ScrollTrigger);

const animation = document.getElementById("startAnimation");
const phone = document.getElementById("phone");
const desktop = document.getElementById("desktop");
const animationContext = animation.getContext("2d");

const animationInfo = {
  totalFrames: 99,
  totalTime: 50,
  images: [],
  currentFrame: 0,
  currentImage: (index) =>
    `./assets/animation/hexagon${index.toString().padStart(4, "0")}.png`,
};

window.addEventListener("resize", resizeCanvas, false);
window.addEventListener("orientationchange", resizeCanvas, false);
resizeCanvas();

function resizeCanvas() {
  animation.width = screen.width;
  animation.height = screen.height;
  desktop.style.display = "block";
  phone.style.display = "none";
  renderAnimation();
  if (
    navigator.userAgent.match(/Android/i) ||
    navigator.userAgent.match(/webOS/i) ||
    navigator.userAgent.match(/iPhone/i) ||
    navigator.userAgent.match(/iPad/i) ||
    navigator.userAgent.match(/iPod/i) ||
    navigator.userAgent.match(/BlackBerry/i) ||
    navigator.userAgent.match(/Windows Phone/i)
  ) {
    animation.width = screen.width;
    animation.height = screen.height / 2;
    phone.style.display = "block";
    desktop.style.display = "none";
  }
}

function renderAnimation(){
  const img = new Image();
for (let i = 1; i <= animationInfo.totalFrames; i++) {
  const img = new Image();
  img.src = animationInfo.currentImage(i);
  animationInfo.images.push(img);
}

gsap.to(animationInfo, {
  currentFrame: animationInfo.totalFrames,
  snap: "currentFrame",
  ease: "none",
  scrollTrigger: {
    trigger: animation,
    start: "top",
    end: `bottom+=${animationInfo.totalFrames * animationInfo.totalTime}`,
    scrub: 2,
    pin: true,
  },
  onUpdate: render,
});
}

animationInfo.images[0].onload = () => {
  animationContext.drawImage(
    animationInfo.images[0],
    0,
    0,
    animation.width,
    animation.height
  );
};

function render() {
  animationContext.drawImage(
    animationInfo.images[animationInfo.currentFrame],
    0,
    0,
    animation.width,
    animation.height
  );
}
