import React from 'react';
import TrackItemContainer from './TrackItemContainer';

export default class MediumTrackItem extends React.Component{

    componentDidMount(){
        console.log("med",this.props.track)

    }

    render(){
        console.log("med",this.props.track)
        return(
            <div className="col-sm-3 col-xs-6" >
                <TrackItemContainer type={this.props.type} track={this.props.track} />
            </div>
        )
    }

}