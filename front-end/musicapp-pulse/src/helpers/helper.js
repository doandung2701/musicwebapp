import { createBrowserHistory } from 'history';

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

export const findSongIndexInQueue = (song, queue) => {
    return queue.findIndex(value => {
        return song.songSrc === value.songSrc
    })
}

export const shuffle = (array) => {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
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
