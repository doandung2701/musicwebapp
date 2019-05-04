import React, { Fragment } from 'react';
import { Modal, Upload, message } from 'antd';
import { dummyRequest } from '../../helpers/helper';
import SongModal from './SongModal';
import SongModalContainer from './SongModalContainer';

class UserProfileHeader extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
            file: null,
            formData: null,
            modalSongVisible:false
        }
    }

    handleCancel = () => {
            this.setState({
                modalVisible: false
            })
    }

    openUploadModal = () => {
            this.setState({
                modalVisible: true,
                file: this.props.user.avatar
            })
    }
    closeModalSong=()=>{
       this.setState({
        modalSongVisible:false
       })
    }
    openUploadSongModal=()=>{
        this.setState({
            modalSongVisible:true
        })
    }
    handleOk = () => {
            if (this.state.formData) {
                this.props.changeAva(this.state.formData, this.props.currentUser.id);
                this.setState({
                    formData: null
                })
                this.handleCancel();
            } else {
                this.handleCancel();
                message.info("Please select an avatar!", 3);
            }
    }

    handleAvaChange = (info) => {
        var reader = new FileReader();
        if (info.file.status === "done") {
            reader.addEventListener("load", () => {
                var url = reader.result;
                this.setState({
                    file: url
                })
            })
            reader.readAsDataURL(info.file.originFileObj)
            var formData = new FormData();
            formData.append("file", info.file.originFileObj);
            this.setState({
                formData: formData
            })
        }
    }

    onAvaRemove = (info) => {
        this.setState({
            file: this.props.user.avatar
        });
    }

    render() {
        let user = this.props.user;
        return (
            <Fragment>
                <div className="padding b-b" style={{ zIndex: 5 }}>
                    <div className="row-col">
                        <div className="col-sm w w-auto-xs m-b">
                            <div className="item w rounded" style={{ cursor: 'pointer' }}>
                                <div className="item-media">
                                    <div className="item-media-content user-ava"
                                        onClick={this.openUploadModal}
                                        style={{ backgroundImage: `url(${user.avatar})` }} />
                                    <Modal
                                        title="Upload an avatar"
                                        visible={this.state.modalVisible}
                                        onOk={this.handleOk}
                                        onCancel={this.handleCancel}
                                    >
                                        <Upload style={{
                                            fontSize: '52px',
                                            color: 'grey',
                                        }} type="drag" multiple={false}
                                            onChange={this.handleAvaChange}
                                            customRequest={dummyRequest}
                                            onRemove={this.onAvaRemove}  >
                                            {this.state.file ?
                                                <img height="200px" width="auto"
                                                    src={this.state.file} alt=""></img> : "+"}
                                        </Upload>
                                    </Modal>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm">
                            <div className="p-l-md no-padding-xs">
                                <h1 className="page-title">
                                    <span className="h1 _800">{user.name}</span>
                                </h1>
                                <p className="item-desc text-ellipsis text-muted"
                                    data-ui-toggle-class="text-ellipsis">
                                    {user.email}</p>
                                <div className="item-action m-b">
                                    <a className="btn btn-sm rounded primary" onClick={this.openUploadSongModal}>Upload</a>
                                    <a href="#" className="btn btn-sm rounded white">Edit Profile</a>
                                </div>
                                <div className="block clearfix m-b">
                                    <span>9</span> <span className="text-muted">Albums</span>, <span>23</span> <span className="text-muted">Tracks</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <SongModalContainer user={this.props.currentUser} isShow={this.state.modalSongVisible} closeModal={this.closeModalSong}/>
            </Fragment>
        )
    }
}

export default UserProfileHeader;