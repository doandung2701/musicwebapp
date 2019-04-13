import  React from "react";
import {Link} from 'react-router-dom';

export default class ArtistItem extends React.Component {
    render() {
        const artist = this.props.artist;
        return (
            <div className="item">
                <div className="item-media rounded ">
                    <Link to={`/artists${artist.id}`} className="item-media-content" 
                    style={{backgroundImage: `url(${artist.img})`}}></Link>
                </div>
                <div className="item-info text-center">
                    <div className="item-title text-ellipsis">
                        <a href="artist.detail.html">{artist.name}</a>
                        <div className="text-sm text-muted">{artist.songCount} songs</div>
                    </div>
                </div>
            </div>
        )
    }
}