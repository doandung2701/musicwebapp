import React, { Fragment } from 'react';
import RecommentItem from './RecommentItem';


export default class RecommendList extends React.Component {
    render() {
        return (
            <Fragment>
                <h2 className="widget-title h4 m-b">Recommended for you</h2>
                <div className="row item-list item-list-md m-b">
                    {this.props.tracks.map(value => (
                        <RecommentItem key={value.songId} track={value}/>
                    ))}
                </div>
            </Fragment>
        )
    }
}