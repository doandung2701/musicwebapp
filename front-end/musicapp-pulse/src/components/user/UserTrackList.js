import React from 'react';
import UserTrackItemContainer from './UserTrackItemContainer';
import uuid from "uuid";
export default class UserTrackList extends React.Component {
    render() {
        return (
            <div className="tab-pane active" id="track">
                <div className="row item-list item-list-by m-b">
                {this.props.list.map(value=>(
                    <UserTrackItemContainer addSongToQueue={this.props.addSongToQueue}
                    key={uuid.v4()} track={value} />
                ))}
                </div>
            </div>
        )
    }
}