import { Modal, Button } from 'antd';
import React from 'react';

class ListSinger extends React.Component {
  state = { visible: false }

  showModal = () => {
    this.setState({
      visible: true,
    });
  }

  handleOk = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  handleCancel = (e) => {
    console.log(e);
    this.setState({
      visible: false,
    });
  }

  showSinger = () => {
    let text = this.props.listSinger == undefined ? [] : this.props.listSinger.map((data, index) => {
        return (<div key={index}>
            <span>{data.id}: {data.name} - </span> 
            <a href={data.thumbnail == null ? '' : data.thumbnail}>Link Thumbnail</a>
        </div>)
    });
    return text
    }

  render() {
    return (
      <div>
        <Button type="clicked" onClick={this.showModal}>
          View Singers
        </Button>
        <Modal
          title="List Singer"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            {this.showSinger()}
        </Modal>
      </div>
    );
  }
}

export default ListSinger;