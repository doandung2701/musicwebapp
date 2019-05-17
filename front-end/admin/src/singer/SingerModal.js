import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Spin, Button, Form, Input, Upload} from 'antd';
import { closeModal, updateSinger, createSinger } from "./SingerAction";
import { dummyRequest } from '../helpers/helper';
const FormItem = Form.Item;

class SingerModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: {
                value: ''
            },
            description: {
                value: ''
            },
            thumbnail: {
                value: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateDescription = this.validateDescription.bind(this);
        this.validateThumbnail = this.validateThumbnail.bind(this);
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
    isFormInvalid() {
        return !(this.state.name.validateStatus === 'success' &&
            this.state.description.validateStatus === 'success' &&
            this.state.thumbnail.validateStatus === 'success'
        );
    }
    handleOk = () => {
        const {name,description, thumbnail}=this.state;
        const {id}=this.props.singerModal.singer;        
        if(id==0){
            var payload={
                name:name.value,
                description:description.value,
                thumbnail: thumbnail.value
            }
            this.props.createSinger(payload);
        }else{
            var payload={
                id:id,
                name:name.value,
                description:description.value,
                thumbnail: thumbnail.value
            }
            this.props.updateSinger(id,payload);
        }
        this.handleCancel();
    }
    handleCancel = () => {
        this.setState({
            name: {
                value: ''
            },
            description: {
                value: ''
            }
        })
        this.props.closeModal();

    }
    componentWillReceiveProps(nextProps) {
        let { id ,name, thumbnail, description} = nextProps.singerModal.singer;
        thumbnail = thumbnail == 'No Data' ? null : thumbnail;
        if (id != 0) {
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
                }
            })
        }
    }
    render() {
        const { name, description } = this.props.singerModal.singer;
        console.log(this.state);
        
        if (this.props.singerModal.isShow) {
            return <div>
                <Spin spinning={this.props.singerModal.isLoading}>
                    <Modal
                        zIndex={99999}
                        title={this.props.singerModal.singer.id == 0 ? "Create New Singer" : "Edit Singer"}
                        visible={this.props.singerModal.isShow}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Return</Button>,
                            <Button
                                disabled={this.isFormInvalid()}
                                key="submit" type="primary" loading={this.props.singerModal.isLoading} onClick={this.handleOk}>
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
                        </Form>
                    </Modal >
                </Spin>
            </div>
        }
        return null;
    }
}
const mapStateToProps = (state) => ({
    singerModal: state.singerModal
})

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        updateSinger: (id, data) => dispatch(updateSinger(id, data)),
        createSinger: (data) => dispatch(createSinger(data))
    }
}
const WrappedNormalSingerForm = Form.create({ name: 'SingerForm' })(SingerModal);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalSingerForm);

