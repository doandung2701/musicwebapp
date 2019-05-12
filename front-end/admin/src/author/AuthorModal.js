import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Spin, Button, Form, Input, Select, Upload } from 'antd';
import * as actionModal from "./AuthorsAction";
import { dummyRequest } from '../helpers/helper';

const FormItem = Form.Item;


class AuthorModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            authorName: {
                value: ''
            },
            thumbnail: {
                value: null
            },
            briefDescription: {
                value: ''
            }
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateDescription = this.validateDescription.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.validateThumbnail = this.validateThumbnail.bind(this);
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
        console.log(inputName);
        this.setState({
            [inputName]: {
                value: inputValue,
                ...validationFun(inputValue)
            }
        });
    }
    isFormInvalid() {
        return !(this.state.authorName.validateStatus === 'success' &&
            this.state.briefDescription.validateStatus === 'success' && this.state.thumbnail.validateStatus
        );
    }
    handleOk = () => {
        let {authorName,thumbnail,briefDescription}=this.state;
        const {authorId}=this.props.authorModal.author;
        console.log(this.props.authorModal.author);
        if(authorId==0){ //undefind == 0
            var payload={
                authorName:authorName.value,
                thumbnail: thumbnail.value,
                briefDescription: briefDescription.value
            }
            console.log(payload);
            this.props.createAuthor(payload);
        }else{
            var payload={
                authorId: authorId,
                authorName:authorName.value,
                thumbnail: thumbnail.value,
                briefDescription: briefDescription.value
            }
            console.log(payload);
            this.props.updateAuthor(payload);
        }
        this.handleCancel();
    }
    handleCancel = () => {
        this.setState({
            authorName: {
                value: ''
            },
            thumbnail: {
                value: null
            },
            briefDescription: {
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
            authorName: {
                validateStatus: 'success',
                errorMsg: null
            },
            briefDescription: {
                validateStatus: 'success',
                errorMsg: null
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        let { authorId ,authorName, thumbnail, briefDescription} = nextProps.authorModal.author;
        thumbnail = thumbnail == 'No Data' ? null : thumbnail;
        if (authorId != 0) {
            this.setState({
                authorName: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: authorName
                },
                thumbnail: {
                    value: thumbnail,
                    validateStatus: 'success'
                },
                briefDescription: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: briefDescription
                }
            })
        }
    }
    render() {
        let { authorName, thumbnail, briefDescription} = this.props.authorModal.author;
        thumbnail = thumbnail == 'No Data' ? null : thumbnail;
        briefDescription = briefDescription == 'No Data' ? null : briefDescription;
        if (this.props.authorModal.isShow) {
            return <div>
                <Spin spinning={this.props.authorModal.isLoading}>
                    <Modal
                        zIndex={99999}
                        title={this.props.authorModal.author.id == 0 ? "Create New Author" : "Edit Author"}
                        visible={this.props.authorModal.isShow}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Return</Button>,
                            <Button
                                disabled={this.isFormInvalid()}
                                key="submit" type="primary" loading={this.props.authorModal.isLoading} onClick={this.handleOk}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <Form
                        >
                            <FormItem
                                label="Author Name"
                                validateStatus={this.state.authorName.validateStatus}
                                help={this.state.authorName.errorMsg}>
                                <Input
                                    defaultValue={authorName}
                                    size="large"
                                    name="authorName"
                                    placeholder="Author name"
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
                            <FormItem label="Brief Description"
                                validateStatus={this.state.briefDescription.validateStatus}
                                help={this.state.briefDescription.errorMsg}>
                                <Input
                                    defaultValue={briefDescription}
                                    size="large"
                                    name="briefDescription"
                                    placeholder="Description about author"
                                    onChange={(event) => this.handleInputChange(event, this.validateDescription)} />
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
    authorModal: state.authorModal
})

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(actionModal.closeModal()),
        updateAuthor: (data) => dispatch(actionModal.updateAuthor(data)),
        createAuthor: (data) => dispatch(actionModal.createAuthor(data))
    }
}
const WrappedNormalAuthorForm = Form.create({ name: 'AuthorForm' })(AuthorModal);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalAuthorForm);

