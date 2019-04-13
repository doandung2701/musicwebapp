import React from 'react';
import {largeCarouselData} from '../../fakedata/fakedata';
import UserTrackItemContainer from './UserTrackItemContainer';

export default class UserTrackList extends React.Component {
    render() {
        return (
            <div className="tab-pane active" id="track">
                <div className="row item-list item-list-by m-b">
                {largeCarouselData.map(value=>(
                    <UserTrackItemContainer key={value.id} track={value} />
                ))}
                </div>
                <a href="#" className="btn btn-sm white rounded">Show More</a>
            </div>
        )
    }
}