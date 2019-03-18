import React, { Component } from 'react';
import './Song.css';
import { Modal} from 'antd';
import { Form, Input, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';
import {Redirect } from 'react-router-dom'
import { Spin,  } from 'antd';

class App extends React.Component {
    state = {
      ModalText: 'Chỉnh Sửa h',
      visible: false,
      confirmLoading: false,
    }
  
    showModal = () => {
      this.setState({
        visible: true,
      });
    }
  
    handleOk = () => {
      this.setState({
        ModalText: 'The modal will be closed after two seconds',
        confirmLoading: true,
      });
      setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);
    }
  
    handleCancel = () => {
      console.log('Clicked cancel button');
      this.setState({
        visible: false,
      });
    }
  
    render() {
      const { visible, confirmLoading, ModalText } = this.state;
      return (
        <div>
          <Button type="primary" onClick={this.showModal}>
            Thêm Bài Hát Mới
          </Button>
          <Modal
            title="Thêm Bài hát"
            visible={visible}
            onOk={this.handleOk}
            confirmLoading={confirmLoading}
            onCancel={this.handleCancel}
          >
            <p>{ModalText}</p>
          </Modal>
        </div>
      );
    }
  }

class Song_Form extends Component {
    render() {
        return (
            <div>
                <App />
            </div>
        );
    }
}
export default Song_Form;