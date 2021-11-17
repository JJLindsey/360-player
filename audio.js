//import WaveSurfer from "wavesurfer.js"

const initializeWavesurfer = () => {
    return WaveSurfer.create({
        container: '#waveform',
        responsive: true,
        height:80,
        waveColor: '#fff5500',
        progressColor: '#d44700',
    })
}

// const wavesurfer = initializeWavesurfer()
// wavesurfer.load('assets/audio/Waiting On m.mp3');

