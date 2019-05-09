import React from 'react';
import { Modal, Form, Input, Upload, message } from 'antd';
import { dummyRequest } from '../../../helpers/helper';

export default class CreatePlayListModal extends React.Component {
    constructor(props) {
        super(props);
        let { thumbnail = null, name = '', description = '' } = this.props.playlistToEdit;
        this.state = {
            modalVisible: false,
            file: thumbnail,
            formData: new FormData(),
            modalSongVisible: false,
            name: name,
            description: description
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.playlistToEdit !== this.props.playlistToEdit) {
            let { thumbnail = null, name = '', description = '' } = this.props.playlistToEdit;
            this.setState({
                modalVisible: false,
                file: thumbnail,
                formData: new FormData(),
                modalSongVisible: false,
                name: name,
                description: description
            })
        }

    }

    handleOk = async () => {
        this.state.formData.append("name", this.state.name);
        this.state.formData.append("userId", this.props.userId);
        this.state.formData.append("description", this.state.description);
        if (this.props.isCreateModal) {
            if (this.state.formData.get("thumbnail"))
                await this.props.createPlayList(this.state.formData);
            else {
                message.info("Please select an image!", 3);
                return;
            }

        } else {
            this.state.formData.append("playlistId", this.props.playlistToEdit.id)
            await this.props.editPlayList(this.state.formData);
        }
        this.setState({
            formData: new FormData(),
            file: null
        })
        this.props.onCancel();
    }


    handleAvaChange = (info) => {
        var reader = new FileReader();
        if (info.file.status === "done") {
            reader.addEventListener("load", () => {
                var url = reader.result;
                this.setState({
                    file: url
                })
            })
            reader.readAsDataURL(info.file.originFileObj)
            let { formData } = this.state;
            formData.append("thumbnail", info.file.originFileObj)
            this.setState({
                formData
            })
        }
    }
    handleInputChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        })
    }
    onAvaRemove = (info) => {
        this.setState({
            file: this.props.playlistToEdit.thumbnail
        });
    }
    render() {
        return (
            <Modal visible={this.props.visible} style={{ top: 10 }}
                title={this.props.isCreateModal ? "Create a new playlist" : "Edit playlist"}
                onCancel={this.props.onCancel} onOk={this.handleOk}>
                <Form>
                    <Form.Item>
                        <Input value={this.state.name} name='name' onChange={this.handleInputChange}
                            type="text" placeholder="Playlist name..." />
                    </Form.Item>
                    <Form.Item>
                        <Input value={this.state.description} name='description' onChange={this.handleInputChange}
                            type="text" placeholder="Description..." />
                    </Form.Item>
                    <Form.Item>
                        Thumbnail: <Upload
                            accept='image/*'
                            style={{
                                fontSize: '52px',
                                color: 'grey',
                            }} type="drag" multiple={false}
                            onChange={this.handleAvaChange}
                            customRequest={dummyRequest}
                            onRemove={this.onAvaRemove}  >
                            {this.state.file ?
                                <img height="200px" width="auto"
                                    src={this.state.file} alt=""></img> : "+"}
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        )
    }

}