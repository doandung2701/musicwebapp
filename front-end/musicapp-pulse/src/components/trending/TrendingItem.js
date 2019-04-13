import React, { Fragment } from 'react';
import TrackItemContainer from '../tracks/TrackItemContainer';

export default class TrendingItem extends React.Component{

    render(){
        return(
            <Fragment>
            <div className="owl-item active" style={{ width: '231.667px',
            float: 'left',display: 'block', marginRight: '20px' ,padding: 0}}>
                <TrackItemContainer type={this.props.type} type="track" track={this.props.track}/>
            </div>
            </Fragment>

        )
    }

}