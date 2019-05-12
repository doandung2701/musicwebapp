import React, { Component } from 'react'
import { Modal, Spin, Button, Form, Input, Select, Row, Col, Upload } from 'antd';
import { getAllAuthorsApi } from '../api/authorApi';
import { getAllSingersApi } from '../api/singerApi';
import { getAllCategoryApi } from '../api/categoryApi';
import { dummyRequest } from '../helpers/helper';
import { uploadSong } from './SongsAction';
import { connect } from 'react-redux'

const Option = Select.Option;
const FormItem = Form.Item;

class SongModal extends Component {
    constructor(props) {
        super(props);
        let {songToEdit,type} = this.props;
        if (type==='edit')
        this.state = {
            songName: {
                value: songToEdit.songName
            },
            briefDesciption: {
                value: songToEdit.briefDesciption
            },
            authors: {
                value: songToEdit.authors
            },
            singers: {
                value: songToEdit.singers
            },
            categories: {
                value: songToEdit.categories
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
        else{
            this.state = {
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
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.validateName = this.validateName.bind(this);
        this.validateDescription = this.validateDescription.bind(this);
        this.validateThumbnail = this.validateThumbnail.bind(this);
        this.validateSong = this.validateSong.bind(this);
        this.isFormInvalid = this.isFormInvalid.bind(this);
        this.validateSelectMulti = this.validateSelectMulti.bind(this);

    }

    componentDidUpdate(prevProps){
        let {songToEdit,type} = this.props;
        console.log(songToEdit)
        if (type==='edit'&&type!==prevProps.type)
        this.setState ({
            songName: {
                value: songToEdit.songName
            },
            briefDesciption: {
                value: songToEdit.briefDesciption
            },
            authors: {
                value: songToEdit.authors
            },
            singers: {
                value: songToEdit.singers
            },
            categories: {
                value: songToEdit.categories
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
        }) 
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
            user: 4
        }

        this.setState({
            isLoading:true
        })
        this.props.uploadSong(payload,formDataThumbnail.value,formDataSong.value);
        this.setState({
            isLoading:false
        })
        this.setState({
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
        })
        this.props.closeModal();

    }
    componentDidMount() {
        Promise.all([getAllAuthorsApi(), getAllSingersApi(), getAllCategoryApi()]).then(data => {

            this.setState({
                dataAuthor: data[0].data,
                dataSinger: data[1].data,
                dataCategory: data[2].data
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
    handleFileChange(info,validationFun,name){
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
                errorMsg: "Name is too short, (at least 3 characters needed)."
            }
        } else if (name.length > 40) {
            return {
                validationStatus: 'error',
                errorMsg: "Name is too long, (at most 40 characters)."
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
                errorMsg: "Description is too short, (at least 3 characters needed)."
            }
        } else if (description.length > 150) {
            return {
                validationStatus: 'error',
                errorMsg: "Name is too long, (at most 150 characters)."
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
                errorMsg: "Image is required"
            }
        } else if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(file.name)) {
            return {
                validationStatus: 'error',
                errorMsg: "Image format is not allowed"
            }
        }else if(file.size>=1048576){
            return {
                validationStatus: 'error',
                errorMsg: "File size is too big"
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
    onSongRemove=()=>{
        this.setState({
            formDataSong: {
                value: null
            }
        })
    }
    onImageRemove=()=>{
        this.setState({
            formDataThumbnail: {
                value: null
            },
        })
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
        const { isShow, type} = this.props;
        if (isShow) {
            return <div>
                <Spin spinning={this.state.isLoading}>
                    <Modal
                        style={{ top: 0 }}
                        title= {type == 'upload' ? "Add a new track" : "Update track"}
                        visible={isShow}
                        onOk={this.handleOk}
                        onCancel={this.props.closeModal}
                        footer={[
                            <Button key="back" onClick={this.props.closeModal}>Cancel</Button>,
                            <Button
                                disabled={this.isFormInvalid()}
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
                                            placeholder="Description"
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
                                            defaultValue= {this.state.singers.value}
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
                            <FormItem label="Image file"className="gutter-box" style={{marginBottom:0}}
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

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps =dispatch=> {
    return {
        uploadSong:(data,image,song)=>dispatch(uploadSong(data,image,song))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(SongModal);