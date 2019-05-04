import React from 'react';

export default class FooterTrackList extends React.Component {

    changeTrack = (src) => {
        this.props.changeAudioSrc(src);
    }

    render() {
        return (
            <ol className="tracks" id="footer-track-list">
                {this.props.player.queue.map((value, index) => (
                    <li className={`track ${this.props.player.nowPlaying.songSrc === value.songSrc ?
                        'is-current' : ''}`}
                        key={value.songId}>
                        <div className="track-action">
                            <span style={{cursor: 'pointer'}} onClick={()=>this.props.removeFromQueue(value.songSrc)}
                            className="track-remove">×</span>
                        </div>
                        <div className="track-info" onClick={() => this.changeTrack(value)}>
                            <span className="track-title">{value.songName}</span>
                            {value.singers && value.singers.length > 0 ?
                                <span className="track-author">{value.singers[0].name}</span>:
                                <span className="track-author">Unknown</span>}
                        </div></li>
                ))}
            </ol>
        )
    }
}