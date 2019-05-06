import React, { Fragment } from 'react';
import UserPlayList from '../../user/UserPlayList';
import UserProfileHeader from '../../user/UserProfileHeader';
import { UserTrackListFetchOnScrollContainer, UserTrackListLikeFetchOnScrollContainer } from '../../../containers/FetchOnSrollContainer';
import { wipeFetchOnScrollSongs, getSongByUserId, getLikeSongByUserId, wipeFetchOnScrollLikeSongs } from '../../../actions/SongAction';

class UserProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.props.loadCurrentlyLoggedInUser();
        this.state = {
            track: true,
            playlist: false,
            like: false,
            profile: false
        }
    }

    componentDidMount() {
    }

    changeTab = async (e) => {
        let target = e.target;
        let name = target.name;
        await this.setState({
            track: false,
            playlist: false,
            like: false,
            profile: false
        })
        this.setState({
            [name]: true
        })
    }

    render() {
        let { currentUser = {
            imageUrl: '/images/a14.jpg',
            name: 'Some name',
            id: 0
        } } = this.props.authentication;
        //   let {track,playlist,like,profile} = this.state;
        return (
            <Fragment>
                <UserProfileHeader
                    currentUser={currentUser}
                    changeAva={this.props.changeAva}
                />
                <div className="padding p-y-0 m-b-md">
                    <div className="nav-active-border b-primary bottom m-b-md m-t">
                        <ul className="nav l-h-2x" data-ui-jp="taburl">
                            <li className="nav-item m-r inline">
                                <a className="nav-link active" name="track" /*onClick={this.changeTab}*/
                                    data-toggle="tab" data-target="#track" aria-expanded="true">Tracks</a>
                            </li>
                            <li className="nav-item m-r inline">
                                <a className="nav-link" name="playlist" /*onClick={this.changeTab}*/
                                    data-toggle="tab" data-target="#playlist" aria-expanded="false">Playlists</a>
                            </li>
                            <li className="nav-item m-r inline">
                                <a className="nav-link" name="like" /*onClick={this.changeTab}*/
                                    data-toggle="tab" data-target="#like" aria-expanded="false">Likes</a>
                            </li>
                            <li className="nav-item m-r inline">
                                <a className="nav-link" name="profile" /*onClick={this.changeTab}*/
                                    data-toggle="tab" data-target="#profile" aria-expanded="false">Profile</a>
                            </li>
                        </ul>
                    </div>
                    <div className="tab-content">
                        <UserTrackListFetchOnScrollContainer me="songs"
                            addSongToQueue={this.props.addSongToQueue}
                            func={getSongByUserId} singerId={currentUser.id}
                            wipeFunc={wipeFetchOnScrollSongs} />
                        <UserPlayList userId={currentUser.id}
                            getPlayListsByUserId={this.props.getPlayListsByUserId}
                            playLists={this.props.playLists.playLists} />

                        <UserTrackListLikeFetchOnScrollContainer me="likeSongs"
                            addSongToQueue={this.props.addSongToQueue}
                            func={getLikeSongByUserId} singerId={currentUser.id}
                            wipeFunc={wipeFetchOnScrollLikeSongs} />



                        <div className="tab-pane" id="profile" aria-expanded="false">
                            <form>
                                <div className="form-group row">
                                    <div className="col-sm-3 form-control-label text-muted">Location</div>
                                    <div className="col-sm-9"><input defaultValue="Earth" className="form-control" /></div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-3 form-control-label text-muted">Website</div>
                                    <div className="col-sm-9"><input placeholder="http://" className="form-control" /></div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-3 form-control-label text-muted">Music Type</div>
                                    <div className="col-sm-9">
                                        <select className="form-control c-select">
                                            <option>Blue</option>
                                            <option>Electro</option>
                                            <option>Pop</option>
                                            <option>Soul</option>
                                        </select>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default UserProfilePage;