import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Spin, Button, Form, Input, Select, Upload } from 'antd';
import * as actionModal from "./RadiosAction";
import { dummyRequest } from '../helpers/helper';

const FormItem = Form.Item;


class RadioModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            songName: {
                value: ''
            },
            thumbnail: {
                value: null
            },
            songSrc: {
                value: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateName = this.validateName.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.validateThumbnail = this.validateThumbnail.bind(this);
        this.validateSong = this.validateSong. bind(this);
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
        console.log(inputName);
        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }
    isFormInvalid() {
        return !(this.state.songName.validateStatus === 'success' && this.state.songSrc.validateStatus == 'success' 
            && this.state.thumbnail.validateStatus == 'success'
        );
    }
    handleOk = () => {
        let {songName,thumbnail,songSrc}=this.state;
        const {songId}=this.props.radioModal.radio;
        console.log(this.props.radioModal.radio);
        if(songId==0){ //undefind == 0
            var payload={
                songName:songName.value,
                thumbnail: thumbnail.value,
                songSrc: songSrc.value
            }
            console.log(payload);
            this.props.createRadio(payload);
        }else{
            var payload={
                songId: songId,
                songName:songName.value,
                thumbnail: thumbnail.value,
                songSrc: songSrc.value
            }
            console.log(payload);
            this.props.updateRadio(payload);
        }
        this.handleCancel();
    }
    handleCancel = () => {
        this.setState({
            songName: {
                value: ''
            },
            thumbnail: {
                value: null
            },
            songSrc: {
                value: ''
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
            songName: {
                validateStatus: 'success',
                errorMsg: null
            },
            songSrc: {
                validateStatus: 'success',
                errorMsg: null
            },
            thumbnail: {
                validateStatus: 'success',
                errorMsg: null
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        let { songId ,songName, thumbnail, songSrc} = nextProps.radioModal.radio;
        thumbnail = thumbnail == 'No Data' ? null : thumbnail;
        songSrc = songSrc == 'No Data' ? null : songSrc;
        if (songId != 0) {
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
                songSrc: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: songSrc
                }
            })
        }
    }
    render() {
        let { songName, thumbnail, songSrc} = this.props.radioModal.radio;
        thumbnail = thumbnail == 'No Data' ? null : thumbnail;
        songSrc = songSrc == 'No Data' ? null : songSrc;
        if (this.props.radioModal.isShow) {
            return <div>
                <Spin spinning={this.props.radioModal.isLoading}>
                    <Modal
                        zIndex={99999}
                        title={this.props.radioModal.radio.songId == 0 ? "Create New radio" : "Edit radio"}
                        visible={this.props.radioModal.isShow}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Return</Button>,
                            <Button
                                disabled={this.isFormInvalid()}
                                key="submit" type="primary" loading={this.props.radioModal.isLoading} onClick={this.handleOk}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <Form
                        >
                            <FormItem
                                label="Song Name"
                                validateStatus={this.state.songName.validateStatus}
                                help={this.state.songName.errorMsg}>
                                <Input
                                    defaultValue={songName}
                                    size="large"
                                    name="songName"
                                    placeholder="Song name"
                                    onChange={(event) => this.handleInputChange(event, this.validateName)} />
                            </FormItem>
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
                        </Form>
                    </Modal >
                </Spin>
            </div>
        }
        return null;
    }
}
const mapStateToProps = (state) => ({
    radioModal: state.radioModal
})

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(actionModal.closeModal()),
        updateRadio: (data) => dispatch(actionModal.updateRadio(data)),
        createRadio: (data) => dispatch(actionModal.createRadio(data))
    }
}
const WrappedNormalRadioForm = Form.create({ name: 'RadioForm' })(RadioModal);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalRadioForm);

