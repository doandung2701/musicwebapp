import React, { Component } from 'react'
import { Modal, Spin, Button, Form, Input, Select, Row, Col, Upload } from 'antd';
import { dummyRequest, updateAlbumSuccess, createAlbumSuccess } from './AlbumAction';
import { getAllSongsApi } from '../api/songApi';
import { getAllSingersApi, getSingerByIdApi } from '../api/singerApi';
import { getAlbumByIdApi, updateAlbumApi, updateThumbnailApi, createAlbumApi } from '../api/albumApi';
import { connect } from 'react-redux'
import { UPDATE_ALBUM_SUCCESS } from '../constants';
import { openNotificationWithIcon } from '../common/notification';

const FormItem = Form.Item;
const Option = Select.Option;
class AlbumModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id: {
                value: 0
            },
            albumName: {
                value: ''
            },
            thumbnail: {
                value: null,
                src: null
            },
            songs: {
                value: [],
                default: []
            },
            singer: {
                value: null,
                default: {
                    id: 0
                }
            },
            dataSinger: [],
            dataSong: [],
            isLoading: false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateAlbumName = this.validateAlbumName.bind(this);
        this.validateThumbnail = this.validateThumbnail.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.validateSinger = this.validateSinger.bind(this);
        this.validateSelectMulti = this.validateSelectMulti.bind(this);
        this.validateSelectSinger = this.validateSelectSinger.bind(this);

    }
    validateSelectSinger(singer) {

    }
    componentDidUpdate(prevProps, prevState) {
        if (this.props.id != prevProps.id && this.props.id != null) {
            Promise.all([getAllSingersApi(), getAllSongsApi()]).then(data => {
                this.setState({
                    dataSinger: data[0].data,
                    dataSong: data[1].data,
                })
            })
            getAlbumByIdApi(this.props.id).then(data => {
                let album = data.data;
                this.setState({
                    id: {
                        value: album.id
                    },
                    albumName: {
                        value: album.albumName
                    },
                    thumbnail: {
                        value: null,
                        src: album.thumbnail
                    },
                    songs: {
                        value: album.songs,
                        default: album.songs
                    },
                    singer: {
                        value: album.singer,
                        default: album.singer
                    }
                })
            })
        }
        else if (this.props.create == true && this.props.create != prevProps.create) {
            Promise.all([getAllSingersApi(), getAllSongsApi()]).then(data => {
                this.setState({
                    dataSinger: data[0].data,
                    dataSong: data[1].data,
                })
            })
            this.setState({
                id: {
                    value: 0
                },
                albumName: {
                    value: ''
                },
                thumbnail: {
                    value: null,
                    src: null
                },
                songs: {
                    value: [],
                    default: []
                },
                singer: {
                    value: null,
                    default: {
                        id: 0
                    }
                }
            })
        }

    }

    handleOk = () => {
        let { id, albumName, thumbnail, songs, singer, dataSinger, dataSong } = this.state;
        let payload = {
            id: id.value,
            albumName: albumName.value,
            songs: songs.default,
            singer: singer.default,
        }
        this.setState({
            isLoading: true
        })
        if (id.value !== 0) {
            updateAlbumApi(payload).then(data => {
                if (thumbnail.value != null) {
                    updateThumbnailApi(id.value, thumbnail.value).then(data => {
                        this.setState({
                            isLoading: false
                        })
                        this.props.closeModal();
                        this.props.updateSongSuccess(data.data);
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                    this.props.closeModal();
                    this.props.updateSongSuccess(data.data);
                }

            }).catch(error => {
                openNotificationWithIcon('error', 'Album', 'Update Album error');
                this.setState({
                    isLoading: false
                })
                this.props.closeModal();
            })
        } else {
            createAlbumApi({
                albumName: albumName.value,
                songs: songs.default,
                singer: singer.default,
            }).then(data => {
                this.props.createAlbumSuccess(data.data);
                if (thumbnail.value != null) {
                    updateThumbnailApi(data.data.id, thumbnail.value).then(data => {    
                        this.setState({
                            isLoading: false
                        })
                        this.props.closeModal();
                        this.props.updateSongSuccess(data.data);
                    })
                } else {
                    this.setState({
                        isLoading: false
                    })
                    this.props.closeModal();
                }
    
            }).catch(error => {
                openNotificationWithIcon('error', 'Album', 'Update Album error');
                this.setState({
                    isLoading: false
                })
                this.props.closeModal();
            })
        }
        this.state = {
            id: {
                value: 0
            },
            albumName: {
                value: ''
            },
            thumbnail: {
                value: null,
                src: null
            },
            songs: {
                value: [],
                default: []
            },
            singer: {
                value: null,
                default: {
                    id: 0
                }
            },
            dataSinger: [],
            dataSong: [],
            isLoading: false,
        }

    }
    componentDidMount() {
        Promise.all([getAllSingersApi(), getAllSongsApi()]).then(data => {
            this.setState({
                dataSinger: data[0].data,
                dataSong: data[1].data,
            })
        })

    }

    validateSelectMulti(data, name) {
        if (data.length <= 0) {
            return {
                validateStatus: 'error',
                errorMsg: `${name} is required.`
            }
        }
        return {
            validateStatus: 'success',
            errorMsg: null,
        }
    }
    handleFileChange(info, validationFun, name) {
        var reader = new FileReader();
        if (info.file.status === "done") {
            reader.addEventListener("load", () => {
                var url = reader.result;
                this.setState({
                    [name]: {
                        ...this.state[name],
                        src: url
                    }
                })
            })
        }
        reader.readAsDataURL(info.file.originFileObj)
        var formData = new FormData();
        formData.append("file", info.file.originFileObj);
        this.setState({
            [name]: {
                value: formData,
                src: this.state[name].src,
                ...validationFun(info.file)
            }
        })


    }
    handleRemoveImage=()=>{
        this.setState({
            thumbnail:{
                value:null
            }
        })
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
    validateAlbumName(name) {
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
        } else if (file.size >= 1048576) {
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
    validateSinger(singer) {
        if (singer == null) {
            return {
                validateStatus: 'error',
                errorMsg: `Singer is not null`

            }
        }
        return {
            validateStatus: 'success',
            errorMsg: null,
        }
    }
    isFormInvalid() {
        return !(this.state.albumName.validateStatus === 'success' &&
            this.state.singer.default !== null &&
            (this.state.songs.default.length >= 1)
        );
    }
    handleSelectChange(event, validateFun, name) {
        if (name === 'songs')
            this.setState({
                [name]: {
                    default: this.state.dataSong.filter(e => event.includes(e.songId)),
                    ...validateFun(event, name)
                }
            })
        else if (name === 'singer') {
            this.setState({
                [name]: {
                    default: this.state.dataSinger.filter(e => e.id == event)[0],
                    ...validateFun(event, name)
                }
            })
        }

    }
    render() {
        const { showForm, create } = this.props;
        let defaultSong = [];
        for (let i = 0; i < this.state.songs.default.length; i++) {
            defaultSong.push(this.state.songs.default[i].songId);
        }
        if (showForm) {
            if (create === false)
                return <div>
                    <Spin spinning={this.state.isLoading}>
                        <Modal
                            style={{ top: 0 }}
                            title={"Add new Track"}
                            visible={showForm}
                            onOk={this.handleOk}
                            onCancel={this.props.closeModal}
                            footer={[
                                <Button key="back" onClick={this.props.closeModal}>Return</Button>,
                                <Button
                                    disabled={this.isFormInvalid()}
                                    key="submit" type="primary" loading={this.state.isLoading} onClick={this.handleOk}>
                                    Submit
            </Button>,
                            ]}
                        >
                            <Form
                            >
                                <Row gutter={16}>
                                    <Col span={12} className="gutter-row">
                                        <FormItem className="gutter-box" style={{ marginBottom: 0 }}
                                            label="Album Name"
                                            validateStatus={this.state.albumName.validateStatus}
                                            help={this.state.albumName.errorMsg}>
                                            <Input
                                                value={this.state.albumName.value}
                                                size="large"
                                                name="albumName"
                                                placeholder="Album name"
                                                onChange={(event) => this.handleInputChange(event, this.validateAlbumName)} />
                                        </FormItem>
                                    </Col>
                                    <Col span={12} className="gutter-row">
                                        <FormItem className="gutter-box" style={{ marginBottom: 0 }}
                                            label="Album thumbnail"
                                            validateStatus={this.state.thumbnail.validateStatus}
                                            help={this.state.thumbnail.errorMsg}>
                                            <Upload
                                                accept=".gif,.jpg,.jpeg,.tiff,.png"
                                                style={{
                                                    fontSize: '52px',
                                                    color: 'grey',
                                                }}
                                                type="drag"
                                                multiple={false}
                                                onRemove={this.handleRemoveImage}
                                                customRequest={dummyRequest}
                                                onChange={(event) => this.handleFileChange(event, this.validateThumbnail, "thumbnail")} />
                                            {
                                                this.state.thumbnail.src != null ?
                                                    <img width={100} height={100} src={this.state.thumbnail.src} /> : "+"
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12} className="gutter-row">
                                        <FormItem label="Songs" style={{ marginBottom: 0 }}
                                            validateStatus={this.state.songs.validateStatus}
                                            help={this.state.songs.errorMsg}>
                                            <Select
                                                mode="multiple"
                                                name="songs"
                                                placeholder="Songs"
                                                value={[...defaultSong]}
                                                onChange={(event) => this.handleSelectChange(event, this.validateSelectMulti, "songs")} >
                                                {this.state.dataSong.map(data => (
                                                    <Option key={data.songId} value={data.songId}>
                                                        {data.songName}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span={12} className="gutter-row">
                                        <FormItem label="Singer" style={{ marginBottom: 0 }}
                                            validateStatus={this.state.singer.validateStatus}
                                            help={this.state.singer.errorMsg}>
                                            <Select

                                                name="singer"
                                                placeholder="Singer"
                                                value={this.state.singer.default.id}
                                                onChange={(event) => this.handleSelectChange(event, this.validateSelectSinger, "singer")} >
                                                {this.state.dataSinger.map(data => (
                                                    <Option key={data.id} value={data.id}>
                                                        {data.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal >
                    </Spin>
                </div>
            else
                return <div>
                    <Spin spinning={this.state.isLoading}>
                        <Modal
                            style={{ top: 0 }}
                            title={"Add new Track"}
                            visible={showForm}
                            onOk={this.handleOk}
                            onCancel={this.props.closeModal}
                            footer={[
                                <Button key="back" onClick={this.props.closeModal}>Return</Button>,
                                <Button
                                    disabled={this.isFormInvalid()}
                                    key="submit" type="primary" loading={this.state.isLoading} onClick={this.handleOk}>
                                    Submit
    </Button>,
                            ]}
                        >
                            <Form
                            >
                                <Row gutter={16}>
                                    <Col span={12} className="gutter-row">
                                        <FormItem className="gutter-box" style={{ marginBottom: 0 }}
                                            label="Album Name"
                                            validateStatus={this.state.albumName.validateStatus}
                                            help={this.state.albumName.errorMsg}>
                                            <Input
                                                value={this.state.albumName.value}
                                                size="large"
                                                name="albumName"
                                                placeholder="Album name"
                                                onChange={(event) => this.handleInputChange(event, this.validateAlbumName)} />
                                        </FormItem>
                                    </Col>
                                    <Col span={12} className="gutter-row">
                                        <FormItem className="gutter-box" style={{ marginBottom: 0 }}
                                            label="Album thumbnail"
                                            validateStatus={this.state.thumbnail.validateStatus}
                                            help={this.state.thumbnail.errorMsg}>
                                            <Upload
                                                accept=".gif,.jpg,.jpeg,.tiff,.png"
                                                style={{
                                                    fontSize: '52px',
                                                    color: 'grey',
                                                }}
                                                type="drag"
                                                multiple={false}
                                                customRequest={dummyRequest}
                                                onChange={(event) => this.handleFileChange(event, this.validateThumbnail, "thumbnail")} />
                                            {
                                                this.state.thumbnail.src != null ?
                                                    <img width={100} height={100} src={this.state.thumbnail.src} /> : "+"
                                            }
                                        </FormItem>
                                    </Col>
                                </Row>
                                <Row gutter={16}>
                                    <Col span={12} className="gutter-row">
                                        <FormItem label="Songs" style={{ marginBottom: 0 }}
                                            validateStatus={this.state.songs.validateStatus}
                                            help={this.state.songs.errorMsg}>
                                            <Select
                                                mode="multiple"
                                                name="songs"
                                                placeholder="Songs"
                                                onChange={(event) => this.handleSelectChange(event, this.validateSelectMulti, "songs")} >
                                                {this.state.dataSong.map(data => (
                                                    <Option key={data.songId} value={data.songId}>
                                                        {data.songName}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                    <Col span={12} className="gutter-row">
                                        <FormItem label="Singer" style={{ marginBottom: 0 }}
                                            validateStatus={this.state.singer.validateStatus}
                                            help={this.state.singer.errorMsg}>
                                            <Select

                                                name="singer"
                                                placeholder="Singer"
                                                onChange={(event) => this.handleSelectChange(event, this.validateSelectSinger, "singer")} >
                                                {this.state.dataSinger.map(data => (
                                                    <Option key={data.id} value={data.id}>
                                                        {data.name}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </FormItem>
                                    </Col>
                                </Row>
                            </Form>
                        </Modal >
                    </Spin>
                </div>
        }
        return null;
    }
}


const mapDispatchToProps = dispatch => {
    return {
        updateSongSuccess: (data) => dispatch(updateAlbumSuccess(data)),
        createAlbumSuccess:(data)=>dispatch(createAlbumSuccess(data))
    }
}

export default connect(null, mapDispatchToProps)(AlbumModal);

