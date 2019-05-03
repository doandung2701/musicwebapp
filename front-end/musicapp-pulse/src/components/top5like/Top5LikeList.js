import React, { Fragment } from 'react';
import ColXs12TrackItem from '../tracks/ColXs12TrackItem';

export default class Top5LikeList extends React.Component {

    constructor(props){
        super(props);
        this.props.getTop5Like();
    }

    render() {
        return (
            <Fragment>
                <h6 className="text text-muted">5 Likes</h6>
                <div className="row item-list item-list-sm m-b">
                    {this.props.songs.top5Like.map(value => (
                        <ColXs12TrackItem type="track" key={value.songId} track={value} />
                    ))}
                </div>
            </Fragment>
        )
    }
}