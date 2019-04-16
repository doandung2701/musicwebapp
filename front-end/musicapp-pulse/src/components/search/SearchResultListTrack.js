import React from 'react';
import ColXs12TrackItem from '../tracks/ColXs12TrackItem';

export default class SearchResultListTrack extends React.Component {
    render() {
        return (
            <div className="row item-list item-list-sm item-list-by m-b">
                {this.props.tracks.map(value => (
                    <ColXs12TrackItem type="track" key={value.id} track={value} />
                ))}
            </div>
        )
    }
}