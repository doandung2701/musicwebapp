import  React from "react";
import {Link} from 'react-router-dom';
import {withTranslation} from 'react-i18next';

class ArtistItem extends React.Component {
    render() {
        const {artist,t} = this.props;
        console.log(artist);
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
                        <div className="text-sm text-muted">{artist.songCount} {t('songs').toLowerCase()}</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation('common')(ArtistItem);