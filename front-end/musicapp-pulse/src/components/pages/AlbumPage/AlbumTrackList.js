import React from 'react';
import TrackItemContainer from '../../tracks/TrackItemContainer';

export default class AlbumTrackList extends React.Component{
    render(){
        console.log(this.props.list)
        return(
            <div id="tracks" className="row item-list item-list-xs item-list-li m-b">
                    {this.props.list.map(value => (
                        <TrackItemContainer type="track" key={value.songId} track={value} />
                    ))}
                </div>
        )
    }
}