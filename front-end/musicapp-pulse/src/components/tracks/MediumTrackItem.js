import React from 'react';
import TrackItemContainer from './TrackItemContainer';

export default class MediumTrackItem extends React.Component{

    render(){
        return(
            <div className="col-sm-3 col-xs-6" >
                <TrackItemContainer type={this.props.type} track={this.props.track} />
            </div>
        )
    }

}