duration = document.querySelector("#totalduration");
current = document.querySelector("#currenttime");
playPause = document.querySelector("#playButton");

var timeCalculator = function (value) {
    second = Math.floor(value % 60);
    minute = Math.floor((value / 60) % 60);
    
    if (second < 10) {
        second = "0" + second;
    }

    return minute + ":" + second;
};

//start wavesurfer object 
wavesurfer = WaveSurfer.create({
    container: "#waveform",
    waveColor: "#cdedff",
    progressColor: "#1AAFFF",
    height: 48,
    scrollParent: false
});

//load audio file
wavesurfer.load("Waiting On m.mp3");

//play and pause a player
playPause.addEventListener("click", function (e) {
    wavesurfer.playPause();
});

//load audio duration on load
wavesurfer.on("ready", function (e) {
    duration.textContent = timeCalculator(wavesurfer.getDuration());
});

//get updated current time on play
wavesurfer.on("audioprocess", function (e) {
    current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});

//change play button to pause on plying
wavesurfer.on("play", function (e) {
    playPause.classList.remove("playButton");
    playPause.classList.add("pauseBtn");
});

//change pause button to play on pause
wavesurfer.on("pause", function (e) {
    playPause.classList.add("playButton");
    playPause.classList.remove("pauseBtn");
});

//update current time on seek
wavesurfer.on("seek", function (e) {
    current.textContent = timeCalculator(wavesurfer.getCurrentTime());
});