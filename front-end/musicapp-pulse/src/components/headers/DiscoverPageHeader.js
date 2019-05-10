import React from 'react';
import { Carousel } from 'antd';
import TrackItemContainer from '../tracks/TrackItemContainer';
import MediumTrackItem from '../tracks/MediumTrackItem';
import { withTranslation } from 'react-i18next';

class DiscoverPageHeader extends React.Component {

    constructor(props){
        super(props);
        this.props.getData();
    }

    render() {
        let {random4Jazz,random4Pop,t} = this.props;
        return (
            <div className="padding p-b-0">

                <div className="page-title m-b">
                    <h1 className="inline m-a-0">{t('discover')}</h1>
                </div>
                <div className="row row-sm item-masonry item-info-overlay">
                    <div className="col-sm-6 text-white m-b-sm" >
                        <h4 style={{ color: 'white' }}>Jazz</h4>
                        <Carousel vertical className="carousel-large">
                            {random4Jazz.map(value => (
                                <TrackItemContainer type="track" key={value.songId} track={value} />
                            ))}
                        </Carousel>

                    </div>
                    <div >
                        <h4 style={{ color: 'white', textAlign: 'center'}}>Pop</h4>
                        {random4Pop.map(value => (
                            <MediumTrackItem type="track" key={value.songId} track={value} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default withTranslation('common')(DiscoverPageHeader);