import React from 'react';
import SubMediumTrackList from '../tracks/SubMediumTrackList';

class UserPlayList extends React.Component {
    render() {
        return (
            <div className="tab-pane" id="playlist" aria-expanded="false">
                <SubMediumTrackList type="track" list={this.props.tracks}/>
            </div>
        )
    }
}

export default UserPlayList;