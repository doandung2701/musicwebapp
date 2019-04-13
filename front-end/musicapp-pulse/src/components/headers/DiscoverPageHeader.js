import React from 'react';
import { Carousel } from 'antd';
import { largeCarouselData, top4View } from '../../fakedata/fakedata';
import TrackItemContainer from '../tracks/TrackItemContainer';
import MediumTrackItem from '../tracks/MediumTrackItem';

export default class DiscoverPageHeader extends React.Component{
    render(){
        return(
            <div className="padding p-b-0">

            <div className="page-title m-b">
                <h1 className="inline m-a-0">Discover</h1>
            </div>
            <div className="row row-sm item-masonry item-info-overlay">
                <div className="col-sm-6 text-white m-b-sm">
                    <Carousel vertical className="carousel-large" >
                        {largeCarouselData.map(value => (
                            <TrackItemContainer type={this.props.type} key={value.id} track={value} />
                        ))}
                    </Carousel>

                </div>
                {top4View.map(value => (
                    <MediumTrackItem type="track" key={value.id} track={value} />
                ))}
            </div>
        </div>
        )
    }
}