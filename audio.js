//define variables
const playButton = document.querySelector('#playButton')
const playButtonIcon = document.querySelector('#playButtonIcon')
const waveform = document.querySelector("#waveform")
const volumeIcon = document.querySelector("#volumeIcon")
const volumeSlider = document.querySelector("#volumeSlider")
const currentTime = document.querySelector("#currentTime")
const totalDuration = document.querySelector("#totalDuration")

///functions & init wavesurferjs
const initializeWavesurfer = () => {
    return WaveSurfer.create({
        container: '#waveform',
        responsive: true,
        height: 80,
        waveColor: '#0ad2fa',
        progressColor: '#f27c1b',
    })
}
 //play pause
const togglePlay = () => {
    wavesurfer.playPause()

    if(isPlaying) {
        playButtonIcon.src = "assets/images/pauseBtn.png"
    } else {
        playButtonIcon.src ="assets/images/playBtn.png"
    }
}

//volume
const handleVolumeChange = e => {
    //wavesurfer uses values as decimal bten 0-1
    const volume = e.target.value / 100

    wavesurfer.setVolume(volume)

    localStorage.setItem("audio-player-volume", volume)
}

const setVolumeLocalStorage = () => {
    //retreive volume from local storage or default to 50
    const volume = localStorage.getItem("audio-player-volume") * 100 || 50
    volumeSlider.value = volume
}

//timeformat for timecode return date as a string
const formatTimecode = seconds => {
    return new Date(seconds * 1000).toISOString().substr(11, 8)
}

const toggleMute = () => {
    wavesurfer.toggleMute()
    const isMuted = wavesurfer.getMute()

    if(isMuted) {
        volumeIcon.src = "assets/images/volume-mute.svg"
        volumeSlider.disabled = true
    } else {
        volumeSlider.disabled = false
        volumeIcon.src = "assets/images/volume-up.svg"
    }
}
//load wavesurfer
const wavesurfer = initializeWavesurfer()
wavesurfer.load('/assets/WaitingOnm.mp3')

window.addEventListener("load", setVolumeLocalStorage)

playButton.addEventListener("click", togglePlay)
volumeIcon.addEventListener("click", toggleMute)
volumeSlider.addEventListener("click", handleVolumeChange)

//wavesurfer events
wavesurfer.on("ready", () => {
    wavesurfer.setVolume(volumeSlider.value / 100)
//audio track duration
    const duration = wavesurfer.getDuration()
    totalDuration.innerHTML = formatTimecode(duration)
})

wavesurfer.on("audioprocess", () => {
    const time = wavesurfer.getCurrentTime()
    currentTime.innerHTML = formatTimecode(time)
})

wavesurfer.on("finish", () => {
    playButtonIcon.src = "assets/images/playBtn.png"
})
