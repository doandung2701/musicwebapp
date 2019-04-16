import React from 'react';

export default class FooterTrackList extends React.Component {

    changeTrack = (src, index) => {
        let audio = document.getElementById("footer-player");
        audio.src = 'https://www.computerhope.com/jargon/m/example1.mp3';
        let trackList = document.getElementsByClassName("tracks")[0];
        let tracks = trackList.getElementsByClassName("track");
        for (let track of tracks) {
            track.classList.remove("is-current");
        }
        tracks[index].classList.add("is-current");
    }

    render() {
        return (
            <ol className="tracks" id="footer-track-list">
                <li className="track is-current" >
                    <div className="track-action"><a className="track-remove">×</a></div>
                    <div className="track-info" onClick={() => this.changeTrack('0', 0)}>
                        <span className="track-title">Pull Up</span>
                        <span className="track-author">Summerella</span></div></li>
                <li className="track" >
                    <div className="track-action">
                        <a className="track-remove">×</a></div>
                    <div className="track-info" onClick={() => this.changeTrack('0', 1)}><span className="track-title">Fireworks</span>
                        <span className="track-author">Kygo</span></div>
                </li>
                <li className="track">
                    <div className="track-action"><a className="track-remove">×</a></div>
                    <div className="track-info">
                        <span className="track-title">I Wanna Be In the Cavalry</span>
                        <span className="track-author">Jeremy Scott</span></div>
                </li>
            </ol>
        )
    }
}