import React from 'react';
import ArtistItem from '../artist/ArtistItem';

export default class SearchResultListArtist extends React.Component {
    render() {
        return (
            <div className="row item-list item-list-sm item-list-by m-b">
                {this.props.artists.map(value => (
                    <div className="col-xs-12" key={value.id}>
                        <ArtistItem artist={value} />
                    </div>
                ))}
            </div>
        )
    }
}