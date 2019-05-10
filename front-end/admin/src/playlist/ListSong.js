import { Modal, Button } from 'antd';
import React from 'react';

class ListSong extends React.Component {
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

  showSong = () => {
    let text = this.props.listSong == undefined ? [] : this.props.listSong.map((data, index) => {
        return (<div key={index}>
            <span>{data.songId}: {data.songName} - </span> 
            <a href={data.songSrc == null ? '' : data.songSrc}>Link</a>
        </div>)
    });
    return text
    }

  render() {
    return (
      <div>
        <Button type="clicked" onClick={this.showModal}>
          View Song
        </Button>
        <Modal
          title="List Song"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
            {this.showSong()}
        </Modal>
      </div>
    );
  }
}

export default ListSong;