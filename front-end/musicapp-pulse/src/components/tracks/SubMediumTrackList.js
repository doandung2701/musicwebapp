import React from 'react';
import TrackItemContainer from './TrackItemContainer';

export default class SubMediumTrackList extends React.Component {
    render() {
        return (
            <div className="row">

                {this.props.tracks.map(value => (
                    <div className="col-xs-4 col-sm-4 col-md-3"  key={value.id}>
                        <TrackItemContainer type={this.props.type} track={value}
                        />
                    </div>))}
            </div>
        )
    }
}