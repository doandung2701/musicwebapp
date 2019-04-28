import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Spin, Button, Form, Input } from 'antd';
import * as actionModal from "./PlayListAction";
const FormItem = Form.Item;

class PlayListModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            thumbnail: {
                value: ''
            },
            description: {
                value: ''
            },
            user: {
                value: null
            },
            playListSong: {
                value: []
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateThumbnail = this.validateThumbnail.bind(this);
        this.validateDescription = this.validateDescription.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }
    validateName(name) {
        if (name.length < 3) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum 3 characters needed.)`
            }
        } else if (name.length > 40) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum 40 characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }

    }
    validateThumbnail(thumbnail) {
        if (thumbnail.length < 3) {
            return {
                validateStatus: 'error',
                errorMsg: `Thumbnail is too short (Minimum 3 characters needed.)`
            }
        } else if (thumbnail.length > 40) {
            return {
                validationStatus: 'error',
                errorMsg: `Thumbnail is too long (Maximum 40 characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }

    }
    validateDescription(description) {
        if (description.length < 3) {
            return {
                validateStatus: 'error',
                errorMsg: `Name is too short (Minimum 3 characters needed.)`
            }
        } else if (description.length > 150) {
            return {
                validationStatus: 'error',
                errorMsg: `Name is too long (Maximum 150 characters allowed.)`
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }
    }
    handleInputChange(event, validationFun) {
        const target = event.target;
        const inputName = target.name;
        const inputValue = target.value;

        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }
    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.thumbnail.validateStatus === 'success' &&
            this.state.description.validateStatus === 'success' &&
            this.state.user.validateStatus === 'success' && 
            this.state.playListSong.validateStatus === 'success'
        );
    }
    handleOk = () => {
        const {name,thumbnail,description,user,playListSong}=this.state;
        const {id}=this.props.playListModal.playList;        
        if(id==0){
            var payload={
                name:name.value,
                thumbnail: thumbnail.value,
                description: description.value,
                user: user.value,
                playListSong: playListSong.value
            }
            this.props.createPlaylist(payload);
        }else{
            var payload={
                name:name.value,
                thumbnail: thumbnail.value,
                description: description.value,
                user: user.value,
                playListSong: playListSong.value
            }
            this.props.updatePlayList(id,payload);
        }
        this.handleCancel();
    }
    handleCancel = () => {
        this.setState({
            name: {
                value: ''
            },
            thumbnail: {
                value: ''
            },
            description: {
                value: ''
            },
            user: {
                value: null
            },
            playListSong: {
                value: []
            }
        })
        this.props.closeModal();
    }
    render() {
        const { name, thumbnail, description, user, playListSong } = this.props.playListModal.playList;
        console.log(this.state);
        
        if (this.props.playListModal.isShow) {
            return <div>
                <Spin spinning={this.props.playListModal.isLoading}>
                    <Modal
                        zIndex={99999}
                        title={this.props.playListModal.playList.id == 0 ? "Create New PlayList" : "Edit PlayList"}
                        visible={this.props.playListModal.isShow}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Return</Button>,
                            <Button
                                disabled={this.isFormInvalid()}
                                key="submit" type="primary" loading={this.props.playListModal.isLoading} onClick={this.handleOk}>
                                Submit
            </Button>,
                        ]}
                    >
                        <Form
                        >
                            <FormItem
                                label="Name"
                                validateStatus={this.state.name.validateStatus}
                                help={this.state.name.errorMsg}>
                                <Input
                                    defaultValue={name}
                                    size="large"
                                    name="name"
                                    placeholder="Singer name"
                                    onChange={(event) => this.handleInputChange(event, this.validateName)} />
                            </FormItem>
                            <FormItem label="Thumbnail"
                                validateStatus={this.state.thumbnail.validateStatus}
                                help={this.state.thumbnail.errorMsg}>
                                <Input
                                    defaultValue={thumbnail}
                                    size="large"
                                    name="thumbnail"
                                    placeholder="Thumbnail about PlayList"
                                    onChange={(event) => this.handleInputChange(event, this.validateThumbnail)} />
                            </FormItem>
                            <FormItem label="Description"
                                validateStatus={this.state.description.validateStatus}
                                help={this.state.description.errorMsg}>
                                <Input
                                    defaultValue={description}
                                    size="large"
                                    name="description"
                                    placeholder="Description about singer"
                                    onChange={(event) => this.handleInputChange(event, this.validateDescription)} />
                            </FormItem>
                            <FormItem label="User"
                                validateStatus={this.state.user.validateStatus}
                                help={this.state.user.errorMsg}>
                                <Input
                                    defaultValue={user}
                                    size="large"
                                    name="user"
                                    placeholder="User about PlayList"
                                    onChange={(event) => this.handleInputChange(event, this.validateUser)} />
                            </FormItem>
                            <FormItem label="playListSong"
                                validateStatus={this.state.playListSong.validateStatus}
                                help={this.state.playListSong.errorMsg}>
                                <Input
                                    defaultValue={playListSong}
                                    size="large"
                                    name="playListSong"
                                    placeholder="PlayListSong about PlayList"
                                    onChange={(event) => this.handleInputChange(event, this.validatePlayListSong)} />
                            </FormItem>
                        </Form>
                    </Modal >
                </Spin>
            </div>
        }
        return null;
    }
}
const mapStateToProps = (state) => ({
    playListModal: state.playListModal
})

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(actionModal.closeModal()),
        updatePlayList: (id, data) => dispatch(actionModal.updatePlayList(id, data)),
        createPlayList: (data) => dispatch(actionModal.createPlayList(data))
    }
}
const WrappedNormalPlayListForm = Form.create({ name: 'PlayListForm' })(PlayListModal);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalPlayListForm);

