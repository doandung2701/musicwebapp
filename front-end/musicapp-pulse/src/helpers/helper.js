import {createBrowserHistory} from 'history';

export const history = createBrowserHistory({});

export const playTrack = function(src){
    let audio = document.getElementById("footer-player");
    if (audio.src === src.src) {
        document.getElementsByClassName("mejs-button mejs-playpause-button")[0].click();
    } else {
        this.props.changeAudioSrc(src);
        audio.oncanplaythrough = () => {
            document.getElementsByClassName("mejs-button mejs-playpause-button")[0].click();
        }
    }
}