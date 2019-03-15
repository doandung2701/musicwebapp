import React, { Component } from 'react';
// import './NotFound.css';
import "./PlayList.css";
import {
    Table, Input, InputNumber, Popconfirm, Form,
  } from 'antd';
import PlayList_Form from './PlayList_Form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
  
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      playlist_id: `Edrward ${i}`,
      user_name: `Nguyen Duong`,
      playlist_name: 32,
      thumbnail: `London Park no. ${i}`,
      playlist_description: `TEST. ${i}`,
      list_music: `xem bai hat`
    });
  }
  const FormItem = Form.Item;
  const EditableContext = React.createContext();
  
  const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
  
  const EditableFormRow = Form.create()(EditableRow);
  
  class EditableCell extends React.Component {
    getInput = () => {
      if (this.props.inputType === 'number') {
        return <InputNumber />;
      }
      return <Input />;
    };
  
    render() {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        ...restProps
      } = this.props;
      return (
        <EditableContext.Consumer>
          {(form) => {
            const { getFieldDecorator } = form;
            return (
              <td {...restProps}>
                {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `Please Input ${title}!`,
                      }],
                      initialValue: record[dataIndex],
                    })(this.getInput())}
                  </FormItem>
                ) : restProps.children}
              </td>
            );
          }}
        </EditableContext.Consumer>
      );
    }
  }
  
  class EditableTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = { data, editingKey: '' };
      this.columns = [
        {
          title: 'PLAYLIST ID',
          dataIndex: 'playlist_id',
          width: '10%',
          editable: true,
        },
        {
          title: 'USERNAME',
          dataIndex: 'user_name',
          width: '20%',
          editable: true,
        },
        {
          title: 'PLAYLIST NAME',
          dataIndex: 'playlist_name',
          width: '20%',
          editable: true,
        },
        {
            title: 'THUMBNAIL',
            dataIndex: 'thumbnail',
            width: '20%',
            editable: true,
        },
        {
            title: 'PLAYLIST_DESCRIPTION',
            dataIndex: 'playlist_description',
            width: '25%',
            editable: true,
        },
        {
            title: 'LIST MUSIC',
            dataIndex: 'list_music',
            width: '20%',
            editable: true,
        },
        {
          title: 'operation',
          dataIndex: 'operation',
          render: (text, record) => {
            const editable = this.isEditing(record);
            return (
              <div>
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          href="javascript:;"
                          onClick={() => this.save(form, record.key)}
                          style={{ marginRight: 8 }}
                        >
                          Save
                        </a>
                      )}
                    </EditableContext.Consumer>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          href="javascript:;"
                          onClick={() => this.save(form, record.key)}
                          style={{ marginRight: 8 }}
                        >
                          Delete
                        </a>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm
                      title="Sure to cancel?"
                      onConfirm={() => this.cancel(record.key)}
                    >
                      <a>Cancel</a>
                    </Popconfirm>
                  </span>
                ) : (
                  <a onClick={() => this.edit(record.key)}>Edit</a>
                )}
              </div>
            );
          },
        },
      ];
    }
  
    isEditing = record => record.key === this.state.editingKey;
  
    cancel = () => {
      this.setState({ editingKey: '' });
    };
  
    save(form, key) {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          this.setState({ data: newData, editingKey: '' });
        } else {
          newData.push(row);
          this.setState({ data: newData, editingKey: '' });
        }
      });
    }
  
    edit(key) {
      this.setState({ editingKey: key });
    }
  
    render() {
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };
  
      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            inputType: col.dataIndex === 'age' ? 'number' : 'text',
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });
  
      return (
        <Table
          components={components}
          bordered
          dataSource={this.state.data}
          columns={columns}
          rowClassName="editable-row"
          pagination={{
            onChange: this.cancel,
          }}
        />
      );
    }
  }
  

class PlayList extends Component {
    render() {
        return (
            <div className="mr-15">
                <PlayList_Form/>
                <h1  className="pd-10">Quản lý PLAYLIST</h1>
                <EditableTable/>
            </div> 
        );
    }
}
export default PlayList;