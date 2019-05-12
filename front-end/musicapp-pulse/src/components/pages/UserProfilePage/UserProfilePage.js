import React, { Fragment } from 'react';
import UserPlayList from '../../user/UserPlayList';
import UserProfileHeader from '../../user/UserProfileHeader';
import { UserTrackListFetchOnScrollContainer, UserTrackListLikeFetchOnScrollContainer } from '../../../containers/FetchOnSrollContainer';
import { wipeFetchOnScrollSongs, getSongByUserId, getLikeSongByUserId, wipeFetchOnScrollLikeSongs } from '../../../actions/SongAction';
import { getAllCategoriesApi } from '../../../Api/CategoryApi';
import { message } from 'antd';
import Axios from 'axios';
import { updateFavCatApi } from '../../../Api/UserApi';
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
            name: '', 
          createPlaylistVisible: false,
            isCreateModal: true,
            playlistToEdit: {}
        }
    }

    componentDidMount() {
        getAllCategoriesApi().then(data => {
            this.setState({
                categories: data.data
            })
    })
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
    handleChangeSelectCa = (event) => {
        var value = [];
        for (let i = 0; i < event.target.options.length; i++) {
            const element = event.target.options[i];
            if (element.selected) {
                value.push(element.value);
            }
        }

    }
    showSelectCategory = () => {
        let { favoriteCategory } = this.props.authentication.currentUser;
        if (favoriteCategory != null && this.state.categories != null && this.state.categories.length > 0) {
            let listKey = [];
            favoriteCategory.map(data => {
                listKey.push(data.categoryId);
            })
            return (<select onChange={this.handleChangeSelectCa} defaultValue={listKey} multiple name="favoriteCategory" className="form-control c-select">
                {this.state.categories.map(data => (
                    <option
                        key={data.categoryId} value={data.categoryId}>{data.categoryName}</option>
                ))}
            </select>
            )

        }
    }
    handleUpdateUser = (e) => {
        e.preventDefault();
        let { favoriteCategory, name } = this.state;
        if (name == null || name.trim() == '' || name == '') {
            if(this.props.authentication.currentUser!=null){                
             name= this.props.authentication.currentUser.name;
            }else{
                message.error("Name is required");
                return;
            }
           
        }
        let { currentUser } = this.props.authentication;
        if (currentUser) {
            let payload;
            if (favoriteCategory == null) {
                payload = {
                    userId: currentUser.id,
                    categoryIds: this.state.categories.map(data=>{return data.categoryId})
                }
            } else {
                payload = {
                    userId: currentUser.id,
                    categoryIds: favoriteCategory
                }

            }
            console.log(payload);
            console.log(name);
            updateFavCatApi(name,payload).then(data=>{
                this.props.saveFavCatSuccess(data.data);
                this.props.logOut();
            })
        
        }

    }
    handleChange = (event) => {
        this.setState({
            name: event.target.value
        })
    }
    render() {
        const { track, playlist, like, profile } = this.state;
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
                       {track&&<UserTrackListFetchOnScrollContainer me="songs"
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
                            {playlist&&<UserPlayList userId={currentUser.id}
                                deletePlayList={this.props.detetePlayList}
                                openCreatePlaylistModal={this.openCreatePlaylistModal}
                                getPlayListsByUserId={this.props.getPlayListsByUserId}
                                playLists={this.props.playLists.playLists} />}
                            {like&&<UserTrackListLikeFetchOnScrollContainer me="likeSongs"
                                addSongToQueue={this.props.addSongToQueue}
                                func={getLikeSongByUserId} singerId={currentUser.id}
                                wipeFunc={wipeFetchOnScrollLikeSongs} />}



                        {profile &&
                         <div className="tab-pane active" id="profile" aria-expanded="false">
                            <form onSubmit={this.handleUpdateUser}>
                                <div className="form-group row">
                                    <div className="col-sm-3 form-control-label text-muted">Name</div>
                                    <div className="col-sm-9"><input onChange={this.handleChange} defaultValue={currentUser.name} className="form-control" name="name" /></div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-3 form-control-label text-muted">Music Type</div>
                                    <div className="col-sm-9">
                                        {this.showSelectCategory()}
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <div className="col-sm-9 form-control-label text-muted"></div>
                                    <div className="col-sm-3">
                                        <button className="form-control" value="Submit">Update</button>
                                    </div>
                                </div>
                            </form>
                        </div>}
                    </div>
                    </div>
                </Fragment>
            )
    }
}
export default withTranslation(['user', 'common'])(UserProfilePage);
