import React from 'react';
import TrackItemContainer from './TrackItemContainer';

export default class ColXs12TrackItem extends React.Component{

    render(){
        return(
            <div className="col-xs-12" >
                <TrackItemContainer type={this.props.type}
                    onCloseSearch={this.props.onCloseSearch}                
                track={this.props.track} />
            </div>
        )
    }

}