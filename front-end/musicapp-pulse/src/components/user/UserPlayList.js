import React from 'react';
import PlayListItem from '../pages/PlaylistPage/PlayListItem';

class UserPlayList extends React.Component {

    componentDidMount() {
        if (this.props.userId) {
            this.props.getPlayListsByUserId(this.props.userId);
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.userId && this.props.userId !== prevProps.userId) {
            this.props.getPlayListsByUserId(this.props.userId);
        }
    }

    render() {
        return (
            <div className="tab-pane active" id="playlist" aria-expanded="false">
                <div className="row">
                    {this.props.playLists.map(value => (
                        <div key={value.id} className="col-xs-4 col-sm-4 col-md-3">
                            <PlayListItem deletePlayList={this.props.deletePlayList}
                            playlist={value} openModal={this.props.openCreatePlaylistModal} />
                        </div>))}
                    <div className="col-xs-4 col-sm-4 col-md-3" id="variants">
                        <button onClick={()=>this.props.openCreatePlaylistModal(true,{})}>
                        <i className="fa fa-plus"></i></button>
                    </div>
                </div>

            </div >
        )
    }
}

export default UserPlayList;