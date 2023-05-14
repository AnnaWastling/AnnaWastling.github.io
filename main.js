gsap.registerPlugin(ScrollTrigger);

const animation = document.getElementById("startAnimation");
const animationContext = animation.getContext("2d");


animation.height = screen.height;
animation.width = screen.width;

const animationInfo = {
  totalFrames:99,
  totalTime:50,
  images: [],
  currentFrame:0,
  currentImage: (index) => `./assets/animation/hexagon${index.toString().padStart(4,"0")}.png`,
};
const img = new Image();
for(let i = 1; i <= animationInfo.totalFrames; i++) {
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
    //   markers: true,
  },
  onUpdate: render,
});
animationInfo.images[0].onload = ()=>{
  animationContext.drawImage(animationInfo.images[0],   
    0,
    0,    
    screen.width,
    screen.height
    );
}

function render(){
  animationContext.drawImage(
    animationInfo.images[animationInfo.currentFrame],
    0,
    0,
    screen.width,
    screen.height
    );
}
