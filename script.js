const playpausebtn = document.querySelector(".play-pause-btn");
const videocontainer = document.querySelector(".video-container");
const video = document.querySelector("video");
playpausebtn.addEventListener('click', toggleplay)
function toggleplay() {
    video.paused ? video.play() : video.pause();
}
video.addEventListener('play', ()=>{
    videocontainer.classList.remove("paused");
})
video.addEventListener('pause', ()=>{
    videocontainer.classList.add("paused");
})