import React, { Fragment } from 'react';
import UserPlayList from '../../user/UserPlayList';
import { largeCarouselData } from '../../../fakedata/fakedata';
import UserProfileHeader from '../../user/UserProfileHeader';
import { UserTrackListFetchOnScrollContainer } from '../../../containers/FetchOnSrollContainer';
import { wipeFetchOnScrollSongs, getSongByUserId } from '../../../actions/SongAction';
import CreatePlayListModal from '../PlaylistPage/CreatePlayListModal';
import { withTranslation } from 'react-i18next';
import { Redirect } from 'react-router-dom';

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
                            <div className="tab-pane" id="like" aria-expanded="false">
                                <div className="row m-b">
                                    <div className="col-xs-4 col-sm-4 col-md-3">
                                        <div className="item r" data-id="item-10" data-src="http://api.soundcloud.com/tracks/237514750/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b9.jpg")' }} />
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                                    <div className="dropdown-menu pull-right black lt" />
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">The Open Road</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Postiljonen</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-stats text-xs ">
                                                        <i className="fa fa-play text-muted" /> 860
                          <i className="fa fa-heart m-l-sm text-muted" /> 240
                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-xs-4 col-sm-4 col-md-3">
                                        <div className="item r" data-id="item-11" data-src="http://api.soundcloud.com/tracks/218060449/stream?client_id=a10d44d431ad52868f1bce6d36f5234c">
                                            <div className="item-media ">
                                                <a href="track.detail.html" className="item-media-content" style={{ backgroundImage: 'url("images/b10.jpg")' }} />
                                                <div className="item-overlay center">
                                                    <button className="btn-playpause">Play</button>
                                                </div>
                                            </div>
                                            <div className="item-info">
                                                <div className="item-overlay bottom text-right">
                                                    <a href="#" className="btn-favorite"><i className="fa fa-heart-o" /></a>
                                                    <a href="#" className="btn-more" data-toggle="dropdown"><i className="fa fa-ellipsis-h" /></a>
                                                    <div className="dropdown-menu pull-right black lt" />
                                                </div>
                                                <div className="item-title text-ellipsis">
                                                    <a href="track.detail.html">Spring</a>
                                                </div>
                                                <div className="item-author text-sm text-ellipsis hide">
                                                    <a href="artist.detail.html" className="text-muted">Pablo Nouvelle</a>
                                                </div>
                                                <div className="item-meta text-sm text-muted">
                                                    <span className="item-meta-stats text-xs ">
                                                        <i className="fa fa-play text-muted" /> 4500
                          <i className="fa fa-heart m-l-sm text-muted" /> 2310
                        </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
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

export default withTranslation(['user', 'common'])(UserProfilePage);
