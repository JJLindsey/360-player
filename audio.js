//init Amplitude use Bindings key events
Amplitude.init({
    "bindings": {
        37: 'prev',
        39:'next',
        32: 'play_pause'
    },
    "songs": [
        {
            "name": "Waiting on",
            "artist": "Bird Dog Jubilee",
            "album": "",
            "url": "/assets/audio/Waiting On m.mp3",
            "cover_art_url": "./assets/images/general.jpg"
        }
    ]
});

window.onkeydown = function(e) {
    return !(e.keyCode == 32);
};

//handle click on down button for playlist
document.getElementsByClassName('down-header')[0].addEventListener('click', function(){
    var list = document.getElementById('list');

    list.style.height = (parseInt(document.getElementById('player-container').offsetHeight) - 135) + 'px';

    document.getElementById('list-screen').classList.remove('slide-out-top');
    document.getElementById('list-screen').classList.add('slide-in-top');
    document.getElementById('list-screen').style.display = 'block';
});

//click up arrow hide list
document.getElementsByClassName('hide-playlist')[0].addEventListener('click', function(){
    document.getElementById('list-screen').classList.remove('slide-in-top');
    document.getElementById('list-screen').classList.add('slide-out-top');
    document.getElementById('list-screen').style.display = "none";
});

//song-progress
document.getElementsByClassName('song-played-progress').addEventListener('click', function(e){
    var offset = this.getBoundingClientRect();
    var x = e.pageX - offset.left;

    Amplitude.setSongPlayedPercentage(( parseFloat(x) / parseFloat(this.offsetWidth)) * 100)
});

document.querySelector('img[data-amplitude-song-info="cover_art_url"]').style.height = document.querySelector('img[data-amplitude-song-info="cover_art_url"]').offsetWidth + 'px';

