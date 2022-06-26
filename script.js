const playpausebtn = document.querySelector(".play-pause-btn");
const theaterbtn = document.querySelector(".theater-btn");
const fullscrnbtn = document.querySelector(".full-screen-btn");
const miniplayerbtn = document.querySelector(".mini-player-btn");
const mutebtn = document.querySelector(".mute-btn");
const speedbtn = document.querySelector(".speed-btn");
const currenttime = document.querySelector(".current-time");
const totaltime = document.querySelector(".total-time");
const volumeslider = document.querySelector(".volume-slider");
const videocontainer = document.querySelector(".video-container");
const video = document.querySelector("video");

playpausebtn.addEventListener('click', toggleplay);
video.addEventListener('click', toggleplay)
document.addEventListener("keydown", e => {
    const tagname = document.activeElement.tagName.toLowerCase();
    if (tagname === "input") {
        return
    }
    switch (e.key.toLowerCase()) {
        case " ":
            if (tagname === "button") {
                return
            }
        case "k":
            toggleplay();
            break;
        case "f":
            fullscrnmode();
            break;
        case "t":
            toggletheater();
            break;
        case "i":
            miniplayer();
            break;
        case "m":
            togglemute();
            break;
        case "arrowleft":
        case "j":
            skip(-5);
            break;
        case "arrowright":
        case "l":
            skip(+5);
            break;
    }
})

speedbtn.addEventListener("click", changeplaybackspeed)

function changeplaybackspeed() {
    let newplaybackrate = video.playbackRate + .25
    if (newplaybackrate > 2) newplaybackrate = .25
    video.playbackRate = newplaybackrate
    speedbtn.textContent = `${newplaybackrate}x`
}

video.addEventListener("loadeddata", () => {
totaltime.textContent = formatduration(video.duration)
})

video.addEventListener("timeupdate", () => {
    currenttime.textContent = formatduration(video.currentTime)
})

const leadingzeroformatter = new Intl.NumberFormat(undefined,{
    minimumIntegerDigits:2,
})

function formatduration(time) {
    const seconds = Math.floor(time % 60)
    const minutes = Math.floor(time /60) % 60
    const hours = Math.floor(time/3600)
    if (hours === 0) {
        return `${minutes}:${leadingzeroformatter.format(seconds)}`
    } else {
        return `${hours}:${leadingzeroformatter.format(minutes)}:${leadingzeroformatter.format(seconds)}`
    }
}

function skip(duration) {
    video.currentTime += duration
}

mutebtn.addEventListener("click", togglemute);
volumeslider.addEventListener("input", e => {
    video.volume = e.target.value
    video.muted = e.target.value === 0
})

function togglemute() {
    video.muted = !video.muted
}

video.addEventListener("volumechange", () => {
    volumeslider.value = video.volume
    let volumelevel
    if (video.muted || video.volume === 0) {
        volumeslider.value = 0
        volumelevel = "muted"
    } else if (video.volume >= 0.5){
        volumelevel = "high"
    } else {
        volumelevel = "low"
    }
    videocontainer.dataset.volumeLevel = volumelevel
})

theaterbtn.addEventListener("click", toggletheater);
fullscrnbtn.addEventListener("click", fullscrnmode);
miniplayerbtn.addEventListener("click", miniplayer);

function toggleplay() {
    video.paused ? video.play() : video.pause();
}
function toggletheater() {
    videocontainer.classList.toggle("theater");
}
function fullscrnmode() {
    if (document.fullscreenElement==null) {
        videocontainer.requestFullscreen()
    }else{
        document.exitFullscreen();
    }
}
function miniplayer() {
    if (videocontainer.classList.contains("mini-player")) {
        document.exitPictureInPicture();
    }else{
        video.requestPictureInPicture();
    }
}
document.addEventListener("fullscreenchange", ()=>{
    videocontainer.classList.toggle("full-screen", document.fullscreenElement)
})
video.addEventListener('play', ()=>{
    videocontainer.classList.remove("paused");
})
video.addEventListener('pause', ()=>{
    videocontainer.classList.add("paused");
})
video.addEventListener("enterpictureinpicture", ()=>{
    videocontainer.classList.add("mini-player")
})
video.addEventListener("leavepictureinpicture", ()=>{
    videocontainer.classList.remove("mini-player")
})