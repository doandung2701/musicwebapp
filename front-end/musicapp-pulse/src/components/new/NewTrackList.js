import React, { Fragment } from 'react';
import SubMediumTrackList from '../tracks/SubMediumTrackList';

export default class NewTrackList extends React.Component {
    render() {
        return (
            <Fragment>
                <h2 className="widget-title h4 m-b">New</h2>
                <SubMediumTrackList type="track" tracks={this.props.tracks}/>
            </Fragment>
        )
    }
}