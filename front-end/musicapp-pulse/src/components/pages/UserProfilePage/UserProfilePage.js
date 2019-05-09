import React, { Fragment } from 'react';
import UserPlayList from '../../user/UserPlayList';
import UserProfileHeader from '../../user/UserProfileHeader';
import { UserTrackListFetchOnScrollContainer } from '../../../containers/FetchOnSrollContainer';
import { wipeFetchOnScrollSongs, getSongByUserId } from '../../../actions/SongAction';
import CreatePlayListModal from '../PlaylistPage/CreatePlayListModal';
import { withTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';
import { UserTrackListLikeFetchOnScrollContainer } from '../../../containers/FetchOnSrollContainer';
import { getLikeSongByUserId, wipeFetchOnScrollLikeSongs } from '../../../actions/SongAction';

class UserProfilePage extends React.Component {

    constructor(props) {
        super(props);
        this.props.loadCurrentlyLoggedInUser();
        this.state = {
            track: true,
            playlist: false,
            like: false,
            profile: false,
            createPlaylistVisible: false,
            isCreateModal: true,
            playlistToEdit: {}
        }
    }

    closeCreatePlaylistModal = () => {
        this.setState({
            createPlaylistVisible: false
        })
    }

    openCreatePlaylistModal = (isCreateModal, playlist) => {
        this.setState({
            playlistToEdit: playlist,
            isCreateModal,
            createPlaylistVisible: true,
        })
    }

    componentDidUpdate(prevProps) {
        if (this.props.authentication.currentUser && prevProps.authentication.currentUser !== this.props.authentication.currentUser) {
            this.props.getPlayListsByUserId(this.props.authentication.currentUser.id);
        }
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
        }, authenticated } = this.props.authentication;
        //   let {track,playlist,like,profile} = this.state;
        let { t } = this.props;
        if (!authenticated) {
            if (window.confirm("Please sign in to continue.")) {
                sessionStorage.setItem('from', window.location.pathname);
                return <Redirect to="/signin" />
            } else {
                return <Redirect to="/" />
            }
        } else
            return (
                <Fragment>
                    <UserProfileHeader t={t}
                        playLists={this.props.playLists.playLists}
                        currentUser={currentUser}
                        changeAva={this.props.changeAva}
                    />
                    <div className="padding p-y-0 m-b-md">
                        <div className="nav-active-border b-primary bottom m-b-md m-t">
                            <ul className="nav l-h-2x" data-ui-jp="taburl">
                                <li className="nav-item m-r inline">
                                    <a className="nav-link active" name="track" onClick={this.changeTab}
                                        data-toggle="tab" data-target="#track" aria-expanded="true">{t('common:tracks')}</a>
                                </li>
                                <li className="nav-item m-r inline">
                                    <a className="nav-link" name="playlist" onClick={this.changeTab}
                                        data-toggle="tab" data-target="#playlist" aria-expanded="false">{t('common:playlists')}</a>
                                </li>
                                <li className="nav-item m-r inline">
                                    <a className="nav-link" name="like" onClick={this.changeTab}
                                        data-toggle="tab" data-target="#like" aria-expanded="false">{t('common:likes')}</a>
                                </li>
                                <li className="nav-item m-r inline">
                                    <a className="nav-link" name="profile" onClick={this.changeTab}
                                        data-toggle="tab" data-target="#profile" aria-expanded="false">{t('profile')}</a>
                                </li>
                            </ul>
                        </div>
                        <div className="tab-content">
                            {<UserTrackListFetchOnScrollContainer me="songs"
                                addSongToQueue={this.props.addSongToQueue}
                                func={getSongByUserId} singerId={currentUser.id}
                                wipeFunc={wipeFetchOnScrollSongs} />}
                            <CreatePlayListModal editPlayList={this.props.editPlayList}
                                isCreateModal={this.state.isCreateModal}
                                onCancel={this.closeCreatePlaylistModal}
                                visible={this.state.createPlaylistVisible}
                                playlistToEdit={this.state.playlistToEdit}
                                createPlayList={this.props.createPlayList}
                                userId={currentUser.id}
                            />
                            {<UserPlayList userId={currentUser.id}
                                deletePlayList={this.props.detetePlayList}
                                openCreatePlaylistModal={this.openCreatePlaylistModal}
                                getPlayListsByUserId={this.props.getPlayListsByUserId}
                                playLists={this.props.playLists.playLists} />}
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
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
    }
}
export default withTranslation(['user', 'common'])(UserProfilePage);
