import React, { Component } from 'react';
import './Song.css';
import { Link } from 'react-router-dom';
import { Route, Switch, Router } from "react-router-dom";
import Song_Form from "./Song_Form";
import {
    Table, Input, InputNumber, Popconfirm, Form,
  } from 'antd';


  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i.toString(),
      song_id: `SONG ${i}`,
      song_name: `Thể Loại ${i}`,
      upload_date: `11/12/1998`,
      song_src:`xxx`,
      brief_description: `Đây là một trong những bài hát có từ năm xxxx`,
      thumbnail:`img`,
      checked:1,
    });
  }
  const FormItem = Form.Item;
  const EditableContext = React.createContext();
//   const DeleteableContext = React.createContext();
  
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
          title: 'STT',
          dataIndex: 'key',
          width: '5%',
          editable: true,
        },
        {
            title: 'ID',
            dataIndex: 'song_id',
            width: '10%',
            editable: true,
          },
        {
          title: 'Tên Bài Hát',
          dataIndex: 'song_name',
          width: '20%',
          editable: true,
        },
        {
            title: 'Ngày Upload',
            dataIndex: 'upload_date',
            width: '20%',
            editable: true,
        },
        {
            title: 'Link Bài Hát',
            dataIndex: 'song_src',
            width: '20%',
            editable: true,
        },
        {
          title: 'Mô Tả Bài Hát',
          dataIndex: 'brief_description',
          width: '50%',
          editable: true,
        },
        {
            title: 'Ảnh Bài Hát',
            dataIndex: 'thumbnail',
            width: '20%',
            editable: true,
        },
        {
            title: 'Checked',
            dataIndex: 'checked',
            width: '20%',
            editable: true,
          },
        {
          title: 'Hành Động',
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
                        
                    {/* <a style="marginRight=8" >Delete</a> */}

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

class Category extends Component {
    render(){
        return(
            <div className="main">
                <Song_Form/>
                <h1 className="title">Danh sách các bài hát</h1>
                <EditableTable />
            </div>
        );
    }
}
export default Category;