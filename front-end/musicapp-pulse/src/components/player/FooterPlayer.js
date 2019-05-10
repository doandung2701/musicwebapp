import React from 'react';
import $ from 'jquery';
import { PLAYER_PAUSE, PLAYER_PLAYING, PLAYER_BUFFERING, PLAYER_LOADED } from '../../constants/constants';
import { findSongIndexInQueue, getSongName, downloadSong, history } from '../../helpers/helper';
import FooterTrackListContainer from './FooterTrackListContainer';
import { TrackPageHeaderLikeBtnWithContainer } from '../../containers/WithLikeButtonContainer';
import { increaseListenCountApi, downloadSongApi } from '../../Api/SongApi';

export default class FooterPlayer extends React.Component {
    constructor(props) {
        super(props);
        this.move = false;
        this.player = React.createRef();
        this.rail = React.createRef();
        document.onmousemove = this.moveMouseChangeVol;

    }

    changeCurrentTime = (e) => {
        if (this.player.current.src && isNaN(this.player.current.duration) === false
            && isFinite(this.player.current.duration) === true) {
            let x = e.pageX;
            let width = document.body.offsetWidth;
            this.player.current.currentTime = (x / width) * this.player.current.duration;
            this.rail.current.style.width =
                ((this.player.current.currentTime / this.player.current.duration) * document.body.clientWidth - 55) + "px";
        }
    }

    componentDidMount() {
        window.onresize = function () {
            this.rail.current.style.width =
                ((this.player.current.currentTime / this.player.current.duration) * document.body.clientWidth - 55) + "px";
        }.bind(this)
        let mejsError = document.getElementsByClassName("mejs-error")[0];
        this.player.current.onloadeddata = () => {
            try {
                document.getElementsByClassName("mejs-duration")[0].innerHTML =
                    this.formatTime(this.player.current.duration) ?
                        this.formatTime(this.player.current.duration) :
                        '<img alt="" height="30px" src="/images/Infinity-10s-50px.gif"/>';
                this.props.changePlayerStatus(PLAYER_PAUSE);
                mejsError.style.display = "none";
                this.rail.current.style.width = "0%";
            }
            catch (err) {

            }
        }

        this.player.current.oncanplaythrough = () => {
            let el = document.getElementsByClassName("mejs-button mejs-playpause-button")[0];
            if (el) {
                el.click();
                increaseListenCountApi(this.props.player.nowPlaying.songId);
            }
        }
        this.player.current.onended = () => {
            clearInterval(this.playerProgress);
            clearInterval(this.updateTime);
            // playpause.classList.remove("mejs-pause");
            // playpause.classList.add("mejs-play");
            this.player.current.currentTime = this.player.current.duration;
            this.props.changePlayerStatus(PLAYER_PAUSE);
            this.playNext();
        }
        this.player.current.onerror = () => {
            clearInterval(this.playerProgress);
            clearInterval(this.updateTime);
            // playpause.classList.remove("mejs-pause");
            // playpause.classList.add("mejs-play");
            this.props.changePlayerStatus(PLAYER_PAUSE);
            // audioCtn.classList.remove("is-buffering");
            mejsError.style.display = "block";
        }
        this.player.current.onloadstart = () => {
            // audioCtn.classList.add("is-buffering");
            this.props.changePlayerStatus(PLAYER_BUFFERING);
        }
        this.player.current.onpause = () => {
            // playpause.classList.remove("mejs-pause");
            // playpause.classList.add("mejs-play");
            this.props.changePlayerStatus(PLAYER_PAUSE);
            clearInterval(this.playerProgress);
            clearInterval(this.updateTime);
        }
        this.player.current.onplay = () => {
            if (this.rail.current)
                this.rail.current.style.width =
                    0 + "px";
            this.props.changePlayerStatus(PLAYER_PLAYING);
            this.playerProgress = setInterval(() => {
                if (this.rail.current)
                    this.rail.current.style.width =
                        (this.player.current.currentTime / this.player.current.duration * document.body.clientWidth - 55) + "px";
            }, 100);
            this.updateTime = setInterval(() => {
                if (this.rail.current)
                    document.getElementsByClassName("mejs-currenttime")[0].innerHTML =
                        this.formatTime(this.player.current.currentTime);
            }, 100);
        }
    }

    closeErrorNoti = (e) => {
        e.target.style.display = "none";
    }

    openVolumeSilder = () => {
        document.getElementsByClassName("mejs-volume-slider")[0].style.display = "block";
    }

    closeVolumeSilder = () => {
        document.getElementsByClassName("mejs-volume-slider")[0].style.display = "none";
        this.move = false;
    }

    moveMouseChangeVol = (e) => {
        if (this.move) {
            this.changeVolume(e);
        }
    }

    changeVolume = (e) => {
        this.move = true;
        let handle = document.getElementsByClassName("mejs-volume-handle")[0];
        let currentVol = document.getElementsByClassName("mejs-volume-current")[0];
        var y = -(e.pageY - $('#mejs-volume-button').offset().top);
        if (y > 100) {
            y = 100;
        } else if (y < 0) {
            y = 0;
        }
        handle.style.top = 100 - y + 5 + "px";
        currentVol.style.height = y + "px";
        currentVol.style.top = 100 - y + 8 + "px";
        this.player.current.volume = y / 100;
    }

    play = () => {
        let player = this.player.current;
        if (player.readyState === 4) {
            if (player.paused || player.ended) {
                player.play();
            } else {
                player.pause();
            }
        }
    }

    toggleTrackList = () => {
        let tracks = document.getElementById("footer-track-list");
        if (tracks.style.right === '-490px' || tracks.style.right === '') {
            tracks.style.right = '0px';
        } else {
            tracks.style.right = '-490px';
        }
    }

    formatTime = (time) => {
        time = parseInt(time);
        if (0 <= time && time < 10) {
            return '00:0' + time;
        } else if (time >= 10 && time < 60) {
            return '00:' + time;
        } else {
            let sec = time % 60;
            let min = parseInt(time / 60);
            if (min < 10) {
                return '0' + min + ':' + sec;
            }
        }
    }

    determineStatus = (status) => {
        if (status === PLAYER_PAUSE) {
            return 'mejs-play';
        } else if (status === PLAYER_PLAYING) {
            return 'mejs-pause';
        } else if (status === PLAYER_BUFFERING) {
            return '';
        }
    }


    playNext = () => {
        let { queue, nowPlaying, repeat } = this.props.player;
        let curr = findSongIndexInQueue(nowPlaying, queue);
        if (queue.length === curr + 1) {
            if (repeat) {
                this.props.changeAudioSrc(queue[0]);
                if (queue.length === 1) {
                    this.player.current.currentTime = 0;
                }
            }
        } else {
            this.props.changeAudioSrc(queue[curr + 1]);
        }
    }

    playPrev = () => {
        let { queue, nowPlaying } = this.props.player;
        let curr = findSongIndexInQueue(nowPlaying, queue);
        if (curr > 0)
            this.props.changeAudioSrc(queue[curr - 1]);
    }

    downloadSong = async (audioSrc)=>{
        let pathname = window.location.pathname;
        if (!this.props.authenticated) {
            if (window.confirm("Please login to use this feature")) {
                sessionStorage.setItem('from', pathname);
                history.push("/signin");
            }
        } else {
            let name = getSongName(audioSrc);
            downloadSong(name);
        }
    }

    render() {
        let audioSrc = this.props.player.nowPlaying.songSrc;
        let status = this.props.player.playerStatus;
        let player = this.props.player;
        return (
            <div className="app-footer app-player grey bg">
                <div className="playlist mep-tracks-count-3 has-artwork is-tracklist-closed"
                    style={{ width: '100%' }}><span className="mejs-offscreen">Audio Player</span>
                    <div id="mep_0" className={`mejs-container mejs-audio
                     ${status === PLAYER_BUFFERING && 'is-buffering'}`} tabIndex={0}
                        role="application" aria-label="Audio Player" style={{ width: '100%', height: '40px' }}>
                        <div className="mejs-inner"><div className="mejs-mediaelement">
                            <audio id="footer-player" ref={this.player}
                                src={audioSrc} />
                        </div><div className="mejs-layers"><div className="mejs-poster mejs-layer"
                            style={{ display: 'none', width: '100%', height: '40px' }} />
                                <div className="mejs-track-actions">
                                    <TrackPageHeaderLikeBtnWithContainer song={player.nowPlaying}
                                        songId={player.nowPlaying.songId} />
                                    <button style={{
                                        color: 'white',
                                        border: 'none', background: 'transparent', cursor: 'pointer', marginRight: 10
                                    }} className="btn btn-icon rounded btn-favorite" onClick={()=>this.downloadSong(audioSrc)}>
                                        <i className="fa fa-download" />
                                    </button>
                                </div>
                                <a className="mejs-track-artwork" href="track.detail.html"
                                    style={{ backgroundImage: `url("${player.nowPlaying.thumbnail}")` }} />
                                <div className="mejs-track-details">
                                    <span className="mejs-track-title"><a href="track.detail.html">{player.nowPlaying.songName}</a></span>
                                    <span className="mejs-track-author">
                                        {player.nowPlaying.singers && player.nowPlaying.singers.length > 0 &&
                                            <a href="artist.detail.html">
                                                {player.nowPlaying.singers[0].name}</a>}</span></div>
                                <div className="mejs-track-source" style={{ display: 'none' }}><i /></div>
                                <div className="mejs-overlay-error mejs-layer" style={{ width: '100%', height: '40px' }}>
                                    <div className="mejs-error" onClick={this.closeErrorNoti}
                                    >Oh snap, there was a playback error!</div></div>
                            </div><div className="mejs-controls">
                                <div className="mejs-button mejs-previous-button mejs-previous">
                                    <button type="button" onClick={this.playPrev}
                                        aria-controls="mep_0" title="Previous Track" /></div>
                                <div className={`mejs-button mejs-playpause-button ${this.determineStatus(status)}`}
                                    onClick={this.play}>
                                    <button type="button" aria-controls="mep_0" aria-label="Play" /></div>
                                <div className="mejs-button mejs-next-button mejs-next">
                                    <button type="button" onClick={this.playNext}
                                        aria-controls="mep_0" title="Next Track" /></div>
                                <div className="mejs-time-rail" ref={this.rail} onClick={this.changeCurrentTime}
                                    style={{ backgroundColor: 'white !important' }}>
                                    <span className="mejs-time-total mejs-time-slider" aria-label="Time Slider"
                                        aria-valuemin={0} aria-valuemax="NaN" aria-valuenow={0} aria-valuetext="00:00" role="slider"
                                        tabIndex={0} style={{ width: '1294px' }}><span className="mejs-time-buffering"
                                            style={{ display: 'none' }} /><span className="mejs-time-loaded" />
                                        <span className="mejs-time-current" /><span className="mejs-time-handle" />
                                        <span className="mejs-time-float" style={{ display: 'none' }}>
                                            <span className="mejs-time-float-current">00:00</span>
                                            <span className="mejs-time-float-corner" /></span></span></div>
                                <div className="mejs-time" role="timer" aria-live="off">
                                    <span className="mejs-currenttime">00:00</span>
                                    <span className="mejs-time-separator"> / </span>
                                    <span className="mejs-duration">00:00</span></div>
                                <div className="mejs-button mejs-volume-button mejs-mute"
                                    id="mejs-volume-button" draggable="false"
                                    onMouseOver={this.openVolumeSilder}
                                    onMouseLeave={this.closeVolumeSilder}
                                    onMouseDown={this.changeVolume}
                                    onMouseUp={() => this.move = false}>
                                    <button type="button" id="btn-mute" draggable="false"
                                        aria-controls="mep_0" title="Mute" aria-label="Mute" />
                                    <span className="mejs-volume-slider" draggable="false"
                                        aria-label="volumeSlider" aria-valuemin={0} aria-valuemax={100}
                                        aria-valuenow={100} aria-valuetext="100%" role="slider" tabIndex={0}
                                        style={{ display: 'none', cursor: 'pointer' }}><span className="mejs-offscreen">
                                            Use Up/Down Arrow keys to increase or decrease volume.</span>
                                        <div className="mejs-volume-total" draggable="false" />
                                        <div className="mejs-volume-current"
                                            draggable="false" style={{ height: '100px', top: '8px' }} />
                                        <div className="mejs-volume-handle"
                                            draggable="false"
                                            style={{ top: '5px' }} /></span></div>
                                <div className={`mejs-button mejs-repeat-button mejs-repeat ${this.props.player.repeat && 'is-repeat'}`}>
                                    <button type="button" aria-controls="mep_0"
                                        onClick={this.props.toggleRepeat}
                                        title="Repeat" /></div>
                                <div className="mejs-button mejs-shuffle-button mejs-repeat">
                                    <button type="button" aria-controls="mep_0" title="Shuffle" /></div>

                                <div className="mejs-button mejs-toggle-playlist-button mejs-toggle-playlist is-closed">
                                    <button type="button" onClick={this.toggleTrackList}
                                        aria-controls="mep_0" title="Toggle Playlist" /></div></div>
                            <div className="mejs-clear" /></div></div>
                    <FooterTrackListContainer />
                </div>
            </div>
        )
    }
}