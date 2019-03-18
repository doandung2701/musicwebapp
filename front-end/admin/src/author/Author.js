import React, { Component } from 'react';
import './Author.css';
import { Link } from 'react-router-dom';
import { Route, Switch, Router } from "react-router-dom";
import Author_Form from "./Author_Form";
import {
    Table, Input, InputNumber, Popconfirm, Form,
  } from 'antd';


  const data = [];
  for (let i = 0; i < 20; i++) {
    data.push({
      key: i.toString(),
      author_id: `AUTHOR ${i}`,
      author_name: `Edrward ${i}`,
      brief_description: `Một nhà văn tài năng của nền văn học đương đại`,
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
            dataIndex: 'author_id',
            width: '10%',
            editable: true,
          },
        {
          title: 'Tên',
          dataIndex: 'author_name',
          width: '20%',
          editable: true,
        },
        {
          title: 'Tiểu Sử',
          dataIndex: 'brief_description',
          width: '50%',
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

class Author extends Component {
    render(){
        return(
            <div className="main">
                <Author_Form/>
                <h1 className="title">Danh sách tác giả</h1>
                <EditableTable />
            </div>
        );
    }
}
export default Author;