import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Spin, Button, Form, Input, Select, Upload } from 'antd';
import * as actionModal from "./PlayListAction";
import * as actionSong from "../song/SongsAction";
import * as actionUser from "../users/UsersAction";
import { dummyRequest } from '../helpers/helper';
const FormItem = Form.Item;
const Option = Select.Option;
var options = [];
var optionsUser = [];

class PlayListModal extends Component {

    constructor(props) {
        super(props);
        this.props.getAllSongs();
        this.props.getAllUsers();
        this.state = {
            name: {
                value: ''
            },
            thumbnail: {
                value: null
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
        this.validateDescription = this.validateDescription.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.handleChangeSelectUser = this.handleChangeSelectUser.bind(this);
        this.handleChangeSelectSong = this.handleChangeSelectSong.bind(this);
        this.findAllListSong = this.findAllListSong.bind(this);
        this.validateThumbnail = this.validateThumbnail.bind(this);
    }
    handleChangeSelectUser(value) {
        this.props.userList.userList.map((data, index) => {
            if (data.id == value.key) {
                this.setState({
                    user: {
                        value: data
                    }
                })
            }
        })
    }
    handleChangeSelectSong(value) {
        let list = value;
        this.setState({
            playListSong: {
                value: list
            }
        })
    }
    findAllListSong() {
        let list = this.state.playListSong.value;
        let rs = []
        list.map((data, index) => {
            this.props.songList.songList.map((data1, index) => {
                if (data1.songId == data) {
                    rs.push(data1);
                }
            })
        })
        return rs;
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
    validateThumbnail(file) {
        if (file === null) {
            return {
                validateStatus: 'error',
                errorMsg: `Image is required`
            }
        } else if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(file.name)) {
            return {
                validationStatus: 'error',
                errorMsg: `Image not using format`
            }
        }else if(file.size>=1048576){
            return {
                validationStatus: 'error',
                errorMsg: `File size to big. file size < 1048576`
            }
        }
        
        else {
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
            this.state.description.validateStatus === 'success' && this.state.thumbnail.validateStatus === 'success'
        );
    }
    handleOk = () => {
        this.findAllListSong();
        let {name,thumbnail,description,user,playListSong}=this.state;
        playListSong = this.findAllListSong();
        const {id}=this.props.playListModal.playList;
        if(id==0){
            var payload={
                name:name.value,
                thumbnail: thumbnail.value,
                description: description.value,
                user: user.value,
                songs: playListSong
            }
            console.log(payload);
            this.props.createPlayList(payload);
        }else{
            var payload={
                id: id,
                name:name.value,
                thumbnail: thumbnail.value,
                description: description.value,
                user: user.value,
                songs: playListSong
            }
            console.log(payload);
            this.props.updatePlayList(payload);
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
    handleFileChange(info,validationFun,name){
        var reader=new FileReader();
        reader.readAsDataURL(info.file.originFileObj)
        var formData = new FormData();
        formData.append("file", info.file.originFileObj);
        console.log(formData);
        this.setState({
            [name]: {
                value:formData,
                ...validationFun(info.file)
            }
        })
    }
    componentDidMount () {
        this.setState({
            name: {
                validateStatus: 'success',
                errorMsg: null
            },
            description: {
                validateStatus: 'success',
                errorMsg: null
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        let { id ,name, thumbnail, description, user, playListSong } = nextProps.playListModal.playList;
        thumbnail = thumbnail == 'No Data' ? null : thumbnail;
        this.props.userList.userList.map((data, index) => {
            if (data.email == user) {
                user = data;
            }
        })
        // if (playListSong != undefined) {
        //     playListSong = playListSong.map((data, index) => {
        //         return `${data.songId}`;
        //     })
        // }
        if (id !=0 ) {
            this.setState({
                name: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: name
                },
                thumbnail: {
                    value: thumbnail,
                    validateStatus: 'success'
                },
                description: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: description
                },
                user: {
                    value: user
                },
                playListSong: {
                    value: playListSong
                }
            })
        }
    }
    render() {
        let { name, thumbnail, description, user, playListSong } = this.props.playListModal.playList;
        thumbnail = thumbnail == 'No Data' ? null : thumbnail;
        this.props.userList.userList.map((data, index) => {
            if (data.email == user) {
                user = data.id;
            }
        })
        if (playListSong != undefined) {
            playListSong = playListSong.map((data, index) => {
                return `${data.songId}`;
            })
        }
        options = [];
        console.log(this.props.songList.songList);
        this.props.songList.songList.map((data,index) => {
            options.push(<Option key={data.songId}>{data.songName}</Option>);
        });
        optionsUser = [];
        this.props.userList.userList.map((data,index) => {
            optionsUser.push(<Option value={data.id} key={data.id}>{data.email}</Option>);
        });
        if (this.props.playListModal.isShow) {
            return <div>
                <Spin spinning={this.props.playListModal.isLoading}>
                    <Modal
                        // zIndex={99999}
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
                            {/* <FormItem label="Thumbnail"
                                validateStatus={this.state.thumbnail.validateStatus}
                                help={this.state.thumbnail.errorMsg}>
                                <Input
                                    type= "file"
                                    defaultValue={thumbnail}
                                    size="large"
                                    name="thumbnail"
                                    placeholder="Thumbnail about PlayList"
                                    // onChange={(event) => this.handleInputChange(event, this.validateThumbnail)} 
                                    />
                            </FormItem> */}
                            <FormItem label="Thumbnail" className="gutter-box" style={{marginBottom:0}}
                                validateStatus={this.state.thumbnail.validateStatus}
                                help={this.state.thumbnail.errorMsg}
                                >
                                <Upload
                                 accept=".gif,.jpg,.jpeg,.tiff,.png"
                                 style={{
                                    fontSize: '52px',
                                    color: 'grey',
                                }}
                                    type="drag"
                                    multiple={false}
                                    customRequest={dummyRequest}
                                    onRemove={this.onImageRemove} 
                                    onChange={(event) => this.handleFileChange(event, this.validateThumbnail,"thumbnail")} 
                                    />
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
                                <Select labelInValue defaultValue={{ key: user }} style={{ width: '100%' }} onChange={this.handleChangeSelectUser}>
                                    {optionsUser}
                                </Select>
                            </FormItem>
                            <FormItem label="PlayListSong"
                                validateStatus={this.state.playListSong.validateStatus}
                                help={this.state.playListSong.errorMsg}>
                                <Select
                                    mode="tags"
                                    defaultValue={playListSong}
                                    style={{ width: '100%' }}
                                    placeholder="Tags Mode"
                                    onChange={this.handleChangeSelectSong}
                                >
                                    {options}
                                </Select>
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
    playListModal: state.playListModal,
    songList: state.songList,
    userList: state.userReducer
})

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(actionModal.closeModal()),
        updatePlayList: (data) => dispatch(actionModal.updatePlayList(data)),
        createPlayList: (data) => dispatch(actionModal.createPlayList(data)),
        getAllSongs: () => dispatch(actionSong.getAllSongs()),
        getAllUsers: () => dispatch(actionUser.getAllUsers())
    }
}
const WrappedNormalPlayListForm = Form.create({ name: 'PlayListForm' })(PlayListModal);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalPlayListForm);

