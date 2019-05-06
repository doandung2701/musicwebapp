import React from 'react'
import { history } from '../../helpers/helper';

export default class TrackActionModal extends React.Component {

    onAddToPlayList = ()=>{
        if (!this.props.authenticated){
            if (window.confirm("Please login to use this feature")){
                history.push("/signin");
            }
        }else{
            window.alert("VCL")
        }
    }

    render() {
        let {onAddToQueue} = this.props;
        return (
            <div className="dropdown-menu pull-right black lt">
                <span className="dropdown-item" onClick={onAddToQueue}>
                    <i className="fa fa-plus fa-fw text-left"></i>
                    Add to Queque</span>
                <span className="dropdown-item" onClick={this.onAddToPlayList }>
                    <i className="fa fa-music fa-fw text-left"></i> Add to Playlist</span>
                <div className="dropdown-divider"></div>
                <span className="dropdown-item" onClick={() => window.alert("VCL")}>
                    <i className="fa fa-share-alt fa-fw text-left"></i> Share
                </span>
            </div>
        )
    }
}