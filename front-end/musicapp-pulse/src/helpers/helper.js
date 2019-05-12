import { createBrowserHistory } from 'history';
import $ from 'jquery';
import { API_BASE_URL } from '../constants/constants';

export const history = createBrowserHistory({});

export const playTrack = function (src) {
    let audio = document.getElementById("footer-player");
    if (audio.src === src.songSrc) {
        document.getElementsByClassName("mejs-button mejs-playpause-button")[0].click();
    } else {
        this.props.changeAudioSrc(src);
        // audio.oncanplaythrough = () => {
        // document.getElementsByClassName("mejs-button mejs-playpause-button")[0].click();
        // }
    }
}

export const getIdList = (list) => {
    let res = [];
    for (let item of list) {
        res.push(item.songId)
    }
    return res;
}

export const getSrcList = (list)=>{
    let res = [];
    for (let item of list) {
        res.push(item.songSrc)
    }
    return res;
}

export const playAlbum = function (src) {
    let audio = document.getElementById("footer-player");
    if (src.length > 0) {
        if (audio.src === src[0].songSrc) {
            document.getElementsByClassName("mejs-button mejs-playpause-button")[0].click();
        } else {
            this.props.changeAudioSrc(src[0]);
            // audio.oncanplaythrough = () => {
            // document.getElementsByClassName("mejs-button mejs-playpause-button")[0].click();
            // }
        }
    }
}


export const toTop = (offset) => {
    $('html,body').animate({ scrollTop: offset });
}

export const findSongIndexInQueue = (song, queue) => {
    return queue.findIndex(value => {
        return song.songSrc === value.songSrc
    })
}

export const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

export const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
        onSuccess("ok");
    }, 0);
};

export const getSongName = (songSrc)=>{
    let name = songSrc.slice(songSrc.lastIndexOf("/")+1);
    return name;
}

export const downloadSong = (name)=>{
    window.open(API_BASE_URL+`/songs/downloadSong/${name}`)
}