import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Spin, Button, Form, Input, Select, Upload, Row, Col, } from 'antd';
import * as actionModal from "./SongsAction";
import { dummyRequest } from '../helpers/helper';
import { uploadSong, updateSong } from './SongsAction';
import * as actionAuthor from '../author/AuthorsAction';
import * as actionSinger from '../singer/SingerAction';
import * as actionCategory from '../category/CategoryAction';
import * as songApi from '../api/songApi';
import { stat } from 'fs';
const FormItem = Form.Item;
const Option = Select.Option;
var options = [];
var optionsUser = [];

class SongsModal extends Component {

    constructor(props) {
        super(props);
        this.props.getAllAuthors();
        this.props.getAllSingers();
        this.props.getAllCategory();
        this.state = {
            songName: {
                value: ''
            },
            briefDesciption: {
                value: ''
            },
            authors: {
                value: []
            },
            singers: {
                value: []
            },
            categories: {
                value: []
            },
            songSrc: {
                value: null
            },
            thumbnail: {
                value: null
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleChangeSelectAuthor = this.handleChangeSelectAuthor.bind(this);
        this.handleChangeSelectSingers = this.handleChangeSelectSingers.bind(this);
        this.handleChangeSelectCategory = this.handleChangeSelectCategory.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateDescription = this.validateDescription.bind(this);
        this.validateThumbnail = this.validateThumbnail.bind(this);
        this.validateSong = this.validateSong.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
    }
    handleChangeSelectAuthor(value) {
        let list = value;
        this.setState({
            authors: {
                value: list
            }
        })
    }
    handleChangeSelectSingers(value) {
        let list = value;
        this.setState({
            singers: {
                value: list
            }
        })
    }
    handleChangeSelectCategory(value) {
        let list = value;
        this.setState({
            categories: {
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
    validateSong(file) {
        if (file === null) {
            return {
                validateStatus: 'error',
                errorMsg: "A song file is required"
            }
        } else if (!(/\.(?:wav|mp3)$/i).test(file.name)) {
            return {
                validationStatus: 'error',
                errorMsg: "Song file format is invalid"
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
        return !(this.state.songName.validateStatus === 'success' &&
            this.state.briefDescription.validateStatus === 'success' && this.state.thumbnail.validateStatus === 'success' && this.state.song.validateStatus === 'success'
            && this.state.songSrc.validateStatus === "success"
            && (this.state.authors.value.length >= 1) &&
            (this.state.singers.value.length >= 1) &&
            (this.state.categories.value.length >= 1) 
        );
    }
    handleOk = () => {
        console.log(this.state);
        let {songName,thumbnail,briefDesciption, songSrc,authors,singers, categories}=this.state;
        const {songId}=this.props.songModal.song;
        if(songId==0){
            var payload={
                songName:songName.value,
                // thumbnail: thumbnail.value,
                briefDesciption: briefDesciption.value,
                checked: true,
                // songSrc: songSrc.value,
                authors: this.props.authorList.authorList.filter(data => authors.value.includes(data.authorId+"")),
                singers: this.props.singerList.singerList.filter(data=>singers.value.includes(data.id+"")),
                categories: this.props.categoryList.categoryList.filter(data=>categories.value.includes(data.categoryId+"")),
                user: 1
            }
            console.log(payload);
            this.props.uploadSong(payload, thumbnail.value, songSrc.value);
        }else{
            var payload={
                songName:songName.value,
                thumbnail: thumbnail.value,
                briefDesciption: briefDesciption.value,
                songSrc: songSrc.value,
                authors: this.props.authorList.authorList.filter(data => authors.value.includes(data.authorId+"")),
                singers: this.props.singerList.singerList.filter(data=>singers.value.includes(data.id+"")),
                categories: this.props.categoryList.categoryList.filter(data=>categories.value.includes(data.categoryId+"")),
                user: 1 
            }
            songApi.getSongById(songId).then((data) => {
                payload = {
                    ...payload,
                    uploadDate: data.data.uploadDate,
                    listenCount: data.data.listenCount,
                    checked: data.data.checked,
                    likeCount: data.data.likeCount,
                    likeUserIds: data.data.likeUserIds
                }
                this.props.updateSong(payload,songId);
            })
        }
        this.handleCancel();
    }
    handleCancel = () => {
        this.setState({
            songName: {
                value: ""
            },
            briefDesciption: {
                value: ''
            },
            authors: {
                value: []
            },
            singers: {
                value: []
            },
            categories: {
                value: []
            },
            songSrc: {
                value: null
            },
            thumbnail: {
                value: null
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
        let { songId ,songName, thumbnail, briefDesciption, singers, categories, songSrc, authors } = nextProps.songModal.song;
        thumbnail = thumbnail == 'No Data' ? null : thumbnail;
        singers = singers.map((data) => {
            return data.id+"";
        })
        categories = categories.map((data) => {
            return data.categoryId;
        })
        authors = authors.map((data) => {
            return data.authorId+"";
        })
        // this.props.userList.userList.map((data, index) => {
        //     if (data.email == user) {
        //         user = data;
        //     }
        // })
        // if (playListSong != undefined) {
        //     playListSong = playListSong.map((data, index) => {
        //         return `${data.songId}`;
        //     })
        // }
        if (songId !=0 ) {
            this.setState({
                songName: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: songName
                },
                thumbnail: {
                    value: thumbnail,
                    validateStatus: 'success'
                },
                briefDesciption: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: briefDesciption
                },
                authors: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: authors
                },
                categories: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: categories
                },
                singers: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: singers
                },
                songSrc: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: songSrc
                }
            })
        }else {
            this.setState({
                songName: {
                    validateStatus: '',
                    errorMsg: null,
                    value: songName
                },
                thumbnail: {
                    value: thumbnail,
                    validateStatus: ''
                },
                briefDesciption: {
                    validateStatus: '',
                    errorMsg: null,
                    value: briefDesciption
                },
                authors: {
                    validateStatus: '',
                    errorMsg: null,
                    value: authors
                },
                categories: {
                    validateStatus: '',
                    errorMsg: null,
                    value: categories
                },
                singers: {
                    validateStatus: '',
                    errorMsg: null,
                    value: singers
                },
                songSrc: {
                    validateStatus: '',
                    errorMsg: null,
                    value: songSrc
                }
            })
        }
    }
    render() {
        let { songId ,songName, thumbnail, briefDescription, authors, singers, categories, songSrc } = this.props.songModal.song;
        thumbnail = thumbnail == 'No Data' ? null : thumbnail;
        // this.props.userList.userList.map((data, index) => {
        //     if (data.email == user) {
        //         user = data.id;
        //     }
        // })
        // if (playListSong != undefined) {
        //     playListSong = playListSong.map((data, index) => {
        //         return `${data.songId}`;
        //     })
        // }
        // options = [];
        // console.log(this.props.songList.songList);
        // this.props.songList.songList.map((data,index) => {
        //     options.push(<Option key={data.songId}>{data.songName}</Option>);
        // });
        // optionsUser = [];
        // this.props.userList.userList.map((data,index) => {
        //     optionsUser.push(<Option value={data.id} key={data.id}>{data.email}</Option>);
        // });
        if (this.props.songModal.isShow) {
            return <div>
            <Spin spinning={this.state.isLoading}>
                <Modal
                    style={{ top: 0 }}
                    title= {songId == 0 ? "Add a new track" : "Update track"}
                    visible={this.props.songModal.isShow}
                    onOk={this.handleOk}
                    onCancel={this.props.closeModal}
                    footer={[
                        <Button key="back" onClick={this.props.closeModal}>Cancel</Button>,
                        <Button
                            // disabled={this.isFormInvalid()}
                            key="submit" type="primary" loading={this.state.isLoading} onClick={this.handleOk}>
                            OK
        </Button>,
                    ]}
                >
                    <Form
                    >
                        <Row gutter={16}>
                            <Col span={12} className="gutter-row">
                                <FormItem className="gutter-box" style={{ marginBottom: 0 }}
                                    label="Song name: "
                                    validateStatus={this.state.songName.validateStatus}
                                    help={this.state.songName.errorMsg}>
                                    <Input
                                        value = {this.state.songName.value}
                                        size="large"
                                        name="songName"
                                        placeholder="Song name"
                                        onChange={(event) => this.handleInputChange(event, this.validateName)} />
                                </FormItem>
                            </Col>
                            <Col span={12} className="gutter-row">
                                <FormItem label="Description" className="gutter-box" style={{ marginBottom: 0 }}
                                    validateStatus={this.state.briefDesciption.validateStatus}
                                    help={this.state.briefDesciption.errorMsg}>
                                    <Input
                                        value={this.state.briefDesciption.value}
                                        size="large"
                                        name="briefDesciption"
                                        placeholder="Desciption"
                                        onChange={(event) => this.handleInputChange(event, this.validateDescription)} />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12} className="gutter-row">
                                <FormItem label="Authors" style={{ marginBottom: 0 }}
                                    validateStatus={this.state.authors.validateStatus}
                                    help={this.state.authors.errorMsg}>
                                    <Select
                                        mode="multiple"
                                        name="authors"
                                        placeholder="Authors"
                                        defaultValue={this.state.authors.value}
                                        onChange={this.handleChangeSelectAuthor} >
                                        {this.props.authorList.authorList.map(data => (
                                            <Option key={data.authorId}>
                                                {data.authorName}
                                            </Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                            <Col span={12} className="gutter-row">
                                <FormItem label="Singers" style={{ marginBottom: 0 }}
                                    validateStatus={this.state.singers.validateStatus}
                                    help={this.state.singers.errorMsg}>
                                    <Select
                                        mode="multiple"
                                        name="singers"
                                        defaultValue= {this.state.singers.value}
                                        placeholder="Singers"
                                        onChange={this.handleChangeSelectSingers} >
                                        {this.props.singerList.singerList.map(data => (
                                            <Option key={data.id}>
                                                {data.name}
                                            </Option>
                                        ))}
                                    </Select>
                                </FormItem>
                            </Col>
                        </Row>
                        <FormItem label="Categories" style={{ marginBottom: 0 }}
                            validateStatus={this.state.categories.validateStatus}
                            help={this.state.categories.errorMsg}>
                            <Select
                                mode="multiple"
                                name="categories"
                                placeholder="Categories"
                                defaultValue={this.state.categories.value}
                                onChange={this.handleChangeSelectCategory} >
                                {this.props.categoryList.categoryList.map(data => (
                                    <Option key={data.categoryId}>
                                        {data.categoryName}
                                    </Option>
                                ))}
                            </Select>
                        </FormItem>
                        
                        {/* UPload file */}

                        <Row gutter={16}>
                        <Col span={12} className="gutter-row">
                        <FormItem className="gutter-box" style={{marginBottom:0}}
                            label="Song file"
                            validateStatus={this.state.songSrc.validateStatus}
                            help={this.state.songSrc.errorMsg}>
                            <Upload
                           accept=".wav,.mp3"
                            style={{
                                fontSize: '52px',
                                color: 'grey',
                            }}
                            type="drag"
                                        multiple={false}
                                        customRequest={dummyRequest}
                                        onRemove={this.onSongRemove} 
                                onChange={(event) => this.handleFileChange(event, this.validateSong,"songSrc")} />
                        </FormItem>
                        </Col>
                        <Col span={12} className="gutter-row">
                        <FormItem label="Image file"className="gutter-box" style={{marginBottom:0}}
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
                                onRemove={this.onImageRemove} 
                                onChange={(event) => this.handleFileChange(event, this.validateThumbnail,"thumbnail")} />
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
const mapStateToProps = (state) => ({
    songModal: state.songModal,
    authorList: state.authorList,
    categoryList: state.categoryList,
    singerList: state.singerList
})

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(actionModal.closeModal()),
        // updatePlayList: (data) => dispatch(actionModal.updatePlayList(data)),
        // createPlayList: (data) => dispatch(actionModal.createPlayList(data))
        uploadSong:(data,image,song)=>dispatch(uploadSong(data,image,song)),
        getAllAuthors: () => dispatch(actionAuthor.getAllAuthors()),
        getAllSingers: () => dispatch(actionSinger.getAllSingers()),
        getAllCategory: () => dispatch(actionCategory.getAllCategory()),
        updateSong: (song, songId) => dispatch(updateSong(song,songId))
    }
}
const WrappedNormalSongsForm = Form.create({ name: 'SongsForm' })(SongsModal);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalSongsForm);

