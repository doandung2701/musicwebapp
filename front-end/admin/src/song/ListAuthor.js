import { Modal, Button } from 'antd';
import React from 'react';

class ListCategory extends React.Component {
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
    let text = this.props.listAuthor == undefined ? [] : this.props.listAuthor.map((data, index) => {
        return (<div key={index}>
            <span>{data.authorId}: {data.authorName} - </span> 
            <a href={data.thumbnai == null ? '' : data.thumbnai} target="_blank">Link Thumbnail</a>
        </div>)
    });
    return text
    }

  render() {
    return (
      <div>
        <Button type="clicked" onClick={this.showModal}>
          View Authors
        </Button>
        <Modal
          title="List Authors"
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

export default ListCategory;