import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Modal, Spin, Button, Form, Input, Select, Upload } from 'antd';
import * as actionModal from "./CategoryAction";
import { dummyRequest } from '../helpers/helper';

const FormItem = Form.Item;


class CategoryModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            categoryId: {
                value: ''
            },
            categoryName: {
                value: null
            },
            briefDescription: {
                value: ''
            },
            isUpdate: false
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateId = this.validateId.bind(this);
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
    validateId(id) {
        let rs = false;
        this.props.categoryListP.map((data, index) => {
            if (data.categoryId == id) {
                rs = true;
            }
        })
        if (id.length < 1) {
            return {
                validateStatus: 'error',
                errorMsg: `ID is too short (Minimum 0 characters needed.)`
            }
        } else if (id.length > 20) {
            return {
                validationStatus: 'error',
                errorMsg: `ID is too long (Maximum 20 characters allowed.)`
            }
        } else if (rs) {
            return {
                validationStatus: 'error',
                errorMsg: `ID is exist`
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
        return !(this.state.categoryName.validateStatus === 'success' &&
            this.state.categoryDes.validateStatus === 'success' && this.state.categoryId.validateStatus === 'success'
        );
    }
    handleOk = () => {
        let {categoryName,categoryDes}=this.state;
        const {categoryId}=this.props.categoryModal.category;
        console.log(this.props.categoryModal.category);
        if(this.state.isUpdate===false){ //undefind == 0
            var payload={
                categoryId: this.state.categoryId.value,
                categoryName:categoryName.value,
                categoryDes: categoryDes.value
            }
            this.props.createCategory(payload);
        }else{
            var payload={
                categoryId: categoryId,
                categoryName:categoryName.value,
                categoryDes: categoryDes.value
            }
            this.props.updateCategory(payload);
        }
        this.handleCancel();
    }
    handleCancel = () => {
        this.setState({
            categoryId: {
                value: ''
            },
            categoryName: {
                value: null
            },
            categoryDes: {
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
            categoryName: {
                validateStatus: 'success',
                errorMsg: null
            },
            categoryDes: {
                validateStatus: 'success',
                errorMsg: null
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        let { categoryId ,categoryName, categoryDes} = nextProps.categoryModal.category;
        console.log(categoryId);
        if (categoryId != 0) {
            this.setState({
                categoryId: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: categoryId
                },
                categoryName: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: categoryName
                },
                categoryDes: {
                    validateStatus: 'success',
                    errorMsg: null,
                    value: categoryDes
                },
                isUpdate: true
            })
        }else {
            this.setState({
                isUpdate: false
            })
        }
    }
    render() {
        let { categoryId, categoryName,categoryDes} = this.props.categoryModal.category;
       categoryDes =categoryDes == 'No Data' ? null :categoryDes;
        if (this.props.categoryModal.isShow) {
            return <div>
                <Spin spinning={this.props.categoryModal.isLoading}>
                    <Modal
                        zIndex={99999}
                        title={this.props.categoryModal.category.categoryId == 0 ? "Create New Category" : "Edit Category"}
                        visible={this.props.categoryModal.isShow}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        footer={[
                            <Button key="back" onClick={this.handleCancel}>Return</Button>,
                            <Button
                                disabled={this.isFormInvalid()}
                                key="submit" type="primary" loading={this.props.categoryModal.isLoading} onClick={this.handleOk}>
                                Submit
                            </Button>,
                        ]}
                    >
                        <Form
                        >   
                            <FormItem
                                label="Category Id"
                                validateStatus={this.state.categoryId.validateStatus}
                                help={this.state.categoryId.errorMsg}>
                                <Input
                                    disabled = {this.state.isUpdate}
                                    defaultValue={categoryId}
                                    size="large"
                                    name="categoryId"
                                    placeholder="Category Id"
                                    onChange={(event) => this.handleInputChange(event, this.validateId)} />
                            </FormItem>
                            <FormItem
                                label="Category Name"
                                validateStatus={this.state.categoryName.validateStatus}
                                help={this.state.categoryName.errorMsg}>
                                <Input
                                    defaultValue={categoryName}
                                    size="large"
                                    name="categoryName"
                                    placeholder="Category name"
                                    onChange={(event) => this.handleInputChange(event, this.validateName)} />
                            </FormItem>
                            <FormItem label="Category Description"
                                validateStatus={this.state.categoryDes.validateStatus}
                                help={this.state.categoryDes.errorMsg}>
                                <Input
                                    defaultValue={categoryDes}
                                    size="large"
                                    name="categoryDes"
                                    placeholder="Description about category"
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
    categoryModal: state.categoryModal
})

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(actionModal.closeModal()),
        updateCategory: (data) => dispatch(actionModal.updateCategory(data)),
        createCategory: (data) => dispatch(actionModal.createCategory(data))
    }
}
const WrappedNormalCategoryForm = Form.create({ name: 'CategoryForm' })(CategoryModal);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalCategoryForm);

