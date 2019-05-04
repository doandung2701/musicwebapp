import  React from "react";
import {Link} from 'react-router-dom';

export default class ArtistItem extends React.Component {
    render() {
        const artist = this.props.artist;
        return (
            <div className="item">
                <div className="item-media rounded ">
                    <Link onClick={this.props.onCloseSearch} 
                    to={`/artists-detail-${artist.id}`} className="item-media-content" 
                    style={{backgroundImage: `url(${artist.thumbnail})`}}></Link>
                </div>
                <div className="item-info text-center">
                    <div className="item-title text-ellipsis">
                        <Link onClick={this.props.onCloseSearch} 
                         to={`/artists-detail-${artist.id}`}>{artist.name}</Link>
                        <div className="text-sm text-muted">{artist.songCount} songs</div>
                    </div>
                </div>
            </div>
        )
    }
}