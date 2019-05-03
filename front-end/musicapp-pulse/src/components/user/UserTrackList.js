import React from 'react';
import UserTrackItemContainer from './UserTrackItemContainer';

export default class UserTrackList extends React.Component {
    render() {
        return (
            <div className="tab-pane active" id="track">
                <div className="row item-list item-list-by m-b">
                {this.props.list.map(value=>(
                    <UserTrackItemContainer addSongToQueue={this.props.addSongToQueue}
                    key={value.songId} track={value} />
                ))}
                </div>
            </div>
        )
    }
}