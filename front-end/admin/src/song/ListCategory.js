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
    let text = this.props.listCategory == undefined ? [] : this.props.listCategory.map((data, index) => {
        return (<div key={index}>
            <span>{data.categoryId}: {data.categoryName}</span> 
        </div>)
    });
    return text
    }

  render() {
    return (
      <div>
        <Button type="clicked" onClick={this.showModal}>
          View Categories
        </Button>
        <Modal
          title="List Categories"
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