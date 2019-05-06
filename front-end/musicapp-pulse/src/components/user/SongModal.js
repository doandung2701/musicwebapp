import React, { Component } from 'react'
import { Modal, Spin, Button, Form, Input, Select, Row, Col, Upload } from 'antd';
import { getAllAuthorsApi } from '../../Api/AuthorApi';
import { getAllSinger } from '../../Api/SingerApi';
import { getAllCategoriesApi } from '../../Api/CategoryApi';
import { dummyRequest } from '../../helpers/helper';
const Option = Select.Option;
const FormItem = Form.Item;

export default class SongModal extends Component {
    constructor(props) {
        super(props);
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
            formDataSong: {
                value: null
            },
            formDataThumbnail: {
                value: null
            },
            dataAuthor: [],
            dataSinger: [],
            dataCategory: [],
            isLoading:false,
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateDescription = this.validateDescription.bind(this);
        this.validateThumbnail = this.validateThumbnail.bind(this);
        this.validateSong = this.validateSong.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.validateSelectMulti = this.validateSelectMulti.bind(this);

    }
    handleOk=()=>{
        let{songName,briefDesciption,authors,dataAuthor,singers,dataSinger,categories,dataCategory,formDataSong,formDataThumbnail}=this.state;
        let payload={
            songName:songName.value,
            briefDesciption:briefDesciption.value,
            checked:true,
            authors:dataAuthor.filter(data=>authors.value.includes(data.authorId+"")),
            singers:dataSinger.filter(data=>singers.value.includes(data.id+"")),
            categories:dataCategory.filter(data=>categories.value.includes(data.categoryId+"")),
            user: this.props.user.id
        }

        this.setState({
            isLoading:true
        })
        this.props.uploadSong(payload,formDataThumbnail.value,formDataSong.value);
        this.setState({
            isLoading:false
        })
        this.props.closeModal();

    }
    componentDidMount() {
        Promise.all([getAllAuthorsApi(), getAllSinger(), getAllCategoriesApi()]).then(data => {
            console.log(data);

            this.setState({
                dataAuthor: data[0].data,
                dataSinger: data[1].data,
                dataCategory: data[2].data
            })
        })
            console.log(this.props.user);
            
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
    handleFileChange(info,validationFun,name){
        console.log(info.file);
        var reader=new FileReader();
        reader.readAsDataURL(info.file.originFileObj)
        var formData = new FormData();
        formData.append("file", info.file.originFileObj);
        this.setState({
                [name]: {
                    value:formData,
                    ...validationFun(info.file)
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
                errorMsg: `Description is too short (Minimum 3 characters needed.)`
            }
        } else if (description.length > 150) {
            return {
                validationStatus: 'error',
                errorMsg: `Description is too long (Maximum 150 characters allowed.)`
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
                errorMsg: `Song file is required`
            }
        } else if (!(/\.(?:wav|mp3)$/i).test(file.name)) {
            return {
                validationStatus: 'error',
                errorMsg: `Song file not using format`
            }
        } 
        else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }
    }
    onSongRemove=()=>{

    }
    onImageRemove=()=>{

    }
    isFormInvalid() {
        return !(this.state.songName.validateStatus === 'success' &&
            this.state.briefDesciption.validateStatus === 'success' &&
            this.state.formDataSong.validateStatus === 'success' &&
            this.state.formDataThumbnail.validateStatus === 'success' &&
            (this.state.authors.value.length >= 1) &&
            (this.state.singers.value.length >= 1) &&
            (this.state.categories.value.length >= 1)
        );
    }
    handleSelectChange(event, validateFun, name) {
        this.setState({
            [name]: {
                value: event,
                ...validateFun(event, name)
            }
        })

    }
    render() {
        const { isShow } = this.props;
        if (isShow) {
            return <div>
                <Spin spinning={this.state.isLoading}>
                    <Modal
                        style={{ top: 0 }}
                        title={"Add new Track"}
                        visible={isShow}
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
                                        label="Song Name"
                                        validateStatus={this.state.songName.validateStatus}
                                        help={this.state.songName.errorMsg}>
                                        <Input
                                            size="large"
                                            name="songName"
                                            placeholder="Song name"
                                            onChange={(event) => this.handleInputChange(event, this.validateName)} />
                                    </FormItem>
                                </Col>
                                <Col span={12} className="gutter-row">
                                    <FormItem label="Song Description" className="gutter-box" style={{ marginBottom: 0 }}
                                        validateStatus={this.state.briefDesciption.validateStatus}
                                        help={this.state.briefDesciption.errorMsg}>
                                        <Input
                                            defaultValue={""}
                                            size="large"
                                            name="briefDesciption"
                                            placeholder="Description about song"
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
                                            onChange={(event) => this.handleSelectChange(event, this.validateSelectMulti, "authors")} >
                                            {this.state.dataAuthor.map(data => (
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
                                            placeholder="Singers"
                                            onChange={(event) => this.handleSelectChange(event, this.validateSelectMulti, "singers")} >
                                            {this.state.dataSinger.map(data => (
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
                                    onChange={(event) => this.handleSelectChange(event, this.validateSelectMulti, "categories")} >
                                    {this.state.dataCategory.map(data => (
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
                                validateStatus={this.state.formDataSong.validateStatus}
                                help={this.state.formDataSong.errorMsg}>
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
                                    onChange={(event) => this.handleFileChange(event, this.validateSong,"formDataSong")} />
                            </FormItem>
                            </Col>
                            <Col span={12} className="gutter-row">
                            <FormItem label="Image file" className="gutter-box" style={{marginBottom:0}}
                                validateStatus={this.state.formDataThumbnail.validateStatus}
                                help={this.state.formDataThumbnail.errorMsg}>
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
                                    onChange={(event) => this.handleFileChange(event, this.validateThumbnail,"formDataThumbnail")} />
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
