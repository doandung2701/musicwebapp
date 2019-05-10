import React from 'react';
import PlayListItem from '../pages/PlaylistPage/PlayListItem';

class UserPlayList extends React.Component {

    componentDidMount(){
        if (this.props.userId){
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
                            <PlayListItem playlist={value} />
                        </div>))}
                </div>
            </div>
        )
    }
}

export default UserPlayList;