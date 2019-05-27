import React, { Component } from 'react'
import { Modal, Spin, Button, Form, Input, Select, Row, Col, Upload,message } from 'antd';
import { getAllAuthorsApi } from '../../Api/AuthorApi';
import { getAllSinger } from '../../Api/SingerApi';
import { getAllCategoriesApi } from '../../Api/CategoryApi';
import { dummyRequest } from '../../helpers/helper';
import {withTranslation} from 'react-i18next';

const Option = Select.Option;
const FormItem = Form.Item;

class SongModal extends Component {
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
        this.onImageRemove=this.onImageRemove.bind(this);
        this.onSongRemove=this.onSongRemove.bind(this);

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
        console.log(this.state);
        
        this.setState({
            isLoading:true
        })
        if(formDataSong.value==null||formDataThumbnail.value==null){
            message.error('You need add file song and image of song');
            return ;
            
        }
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
    close=()=>{
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
    }
    componentDidMount() {
        Promise.all([getAllAuthorsApi(), getAllSinger(), getAllCategoriesApi()]).then(data => {

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
        let {t} = this.props;
        if (name.length < 3) {
            return {
                validateStatus: 'error',
                errorMsg: t('name')+" "+t("validate:tooshort")
            }
        } else if (name.length > 40) {
            return {
                validationStatus: 'error',
                errorMsg: t('name')+" "+t("validate:toolong")
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }
    }
    validateDescription(description) {
        let {t} = this.props;
        if (description.length < 3) {
            return {
                validateStatus: 'error',
                errorMsg: t('description')+" "+t("validate:tooshort")
            }
        } else if (description.length > 150) {
            return {
                validationStatus: 'error',
                errorMsg: t('description')+" "+t("validate:toolongdes")
            }
        } else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }
    }
    validateThumbnail(file) {     
              let {t} = this.props;

        if (this.state.formDataThumbnail.value == null) {
            return {
                validateStatus: 'error',
                errorMsg: t('validate:image')+" "+t("validate:required")
            }
        } else if (!(/\.(gif|jpg|jpeg|tiff|png)$/i).test(file.name)) {
            return {
                validationStatus: 'error',
                errorMsg: t('validate:image')+" "+t("validate:format")
            }
        }else if(file.size>=1048576){
            return {
                validationStatus: 'error',
                errorMsg: t("validate:size")
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
        let {t} = this.props;

        if (this.state.formDataSong.value == null) {
            return {
                validateStatus: 'error',
                errorMsg: t('song')+" "+t("validate:required")
            }
        } else if (!(/\.(?:wav|mp3)$/i).test(file.name)) {
            return {
                validationStatus: 'error',
                errorMsg: t('song')+" "+t("validate:format")
            }
        } 
        else {
            return {
                validateStatus: 'success',
                errorMsg: null,
            }
        }
    }
    componentDidUpdate(prevProps, prevState) {
      if(prevProps.isShow!=this.props.isShow&&this.props.isShow==true){

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

        Promise.all([getAllAuthorsApi(), getAllSinger(), getAllCategoriesApi()]).then(data => {

            this.setState({
                dataAuthor: data[0].data,
                dataSinger: data[1].data,
                dataCategory: data[2].data
            })
        })
            
      }
    }
    
    onSongRemove(file){
        
          this.setState({
            formDataSong: {
                value: null
            }
          
        })
    }
    onImageRemove(file){
        this.setState({
            formDataThumbnail: {
                value: null
            }
        })
        }

    isFormInvalid() {
        return !(this.state.songName.validateStatus === 'success' &&
            this.state.briefDesciption.validateStatus === 'success' &&
            this.state.formDataSong.validateStatus === 'success' &&
            this.state.formDataThumbnail.validateStatus === 'success' &&
            (this.state.authors.value.length >= 1) &&
            (this.state.singers.value.length >= 1) &&
            (this.state.categories.value.length >= 1)&&
            (this.state.formDataSong.value!=null)&&
            (this.state.formDataThumbnail.value!=null)
           
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
    cancelModal=()=>{
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
    render() {
        const { isShow,t } = this.props;
        if (isShow) {
            return <div>
                <Spin spinning={this.state.isLoading}>
                    <Modal
                        style={{ top: 0 }}
                        title={t('user:addnewtrack')}
                        visible={isShow}
                        onOk={this.handleOk}
                        onCancel={()=>this.cancelModal()}
                        footer={[
                            <Button key="back" onClick={()=>this.cancelModal()}>{t('cancel')}</Button>,
                            <Button
                                disabled={this.isFormInvalid()}
                                key="submit" type="primary" loading={this.state.isLoading} onClick={this.handleOk}>
                                {t('ok')}
            </Button>,
                        ]}
                    >
                        <Form
                        >
                            <Row gutter={16}>
                                <Col span={12} className="gutter-row">
                                    <FormItem className="gutter-box" style={{ marginBottom: 0 }}
                                        label={t('name')}
                                        validateStatus={this.state.songName.validateStatus}
                                        help={this.state.songName.errorMsg}>
                                        <Input
                                            size="large"
                                            name="songName"
                                            placeholder={t('name')}
                                            onChange={(event) => this.handleInputChange(event, this.validateName)} />
                                    </FormItem>
                                </Col>
                                <Col span={12} className="gutter-row">
                                    <FormItem label={t('description')} className="gutter-box" style={{ marginBottom: 0 }}
                                        validateStatus={this.state.briefDesciption.validateStatus}
                                        help={this.state.briefDesciption.errorMsg}>
                                        <Input
                                            defaultValue={""}
                                            size="large"
                                            name="briefDesciption"
                                            placeholder={t('description')}
                                            onChange={(event) => this.handleInputChange(event, this.validateDescription)} />
                                    </FormItem>
                                </Col>
                            </Row>
                            <Row gutter={16}>
                                <Col span={12} className="gutter-row">
                                    <FormItem label={t('authors')} style={{ marginBottom: 0 }}
                                        validateStatus={this.state.authors.validateStatus}
                                        help={this.state.authors.errorMsg}>
                                        <Select
                                            mode="multiple"
                                            name="authors"
                                            placeholder={t('authors')}
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
                                    <FormItem label={t('singers')} style={{ marginBottom: 0 }}
                                        validateStatus={this.state.singers.validateStatus}
                                        help={this.state.singers.errorMsg}>
                                        <Select
                                            mode="multiple"
                                            name="singers"
                                            placeholder={t('singers')}
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
                            <FormItem label={t('categories')} style={{ marginBottom: 0 }}
                                validateStatus={this.state.categories.validateStatus}
                                help={this.state.categories.errorMsg}>
                                <Select
                                    mode="multiple"
                                    name="categories"
                                    placeholder={t('categories')}
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
                                label={t('song')}
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
                            <FormItem label={t('validate:image')}className="gutter-box" style={{marginBottom:0}}
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

export default withTranslation(['common','validate','user'])(SongModal);