import React, { Fragment } from 'react';
import TrackItemContainer from '../tracks/TrackItemContainer';

export default class RecommentItem extends React.Component {

    render() {
        return (
            <div className="col-sm-6">
                <TrackItemContainer type={this.props.type} track={this.props.track} />
            </div>
        )
    }

}