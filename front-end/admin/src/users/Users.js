import React, { Component } from 'react';
// import './NotFound.css';
import "./Users.css";
import {
    Table, Input, InputNumber, Popconfirm, Form,
  } from 'antd';
import Users_Form from './Users_Form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
  
  const data = [];
  for (let i = 0; i < 100; i++) {
    data.push({
      key: i.toString(),
      user_id: `Edrward ${i}`,
      name: `Nguyen Duong`,
      user_email: 32,
      create_date: `London Park no. ${i}`,
      address: `TEST. ${i}`,
      gender: `name`,
      birth_date: `02/11/1998`,
      avartar: `ava`,
      phone_number: `0966186222`,
      enabled: `true`
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
          title: 'USER ID',
          dataIndex: 'user_id',
          width: '10%',
          editable: true,
        },
        {
          title: 'NAME',
          dataIndex: 'name',
          width: '20%',
          editable: true,
        },
        {
          title: 'USER EMAIL',
          dataIndex: 'user_email',
          width: '20%',
          editable: true,
        },
        {
            title: 'CREATE DATE',
            dataIndex: 'create_date',
            width: '20%',
            editable: true,
        },
        {
            title: 'ADDRESS',
            dataIndex: 'address',
            width: '25%',
            editable: true,
        },
        {
            title: 'GENDER',
            dataIndex: 'gender',
            width: '20%',
            editable: true,
        },
        {
            title: 'BIRTH DATE',
            dataIndex: 'birth_date',
            width: '20%',
            editable: true,
        },
        {
            title: 'AVARTAR',
            dataIndex: 'avartar',
            width: '20%',
            editable: true,
        },
        {
            title: 'PHONE NUMBER',
            dataIndex: 'phone_number',
            width: '20%',
            editable: true,
        },
        {
            title: 'ENABLED',
            dataIndex: 'enabled',
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
  

class Users extends Component {
    render() {
        return (
            <div className="mr-15">
                <Users_Form/>
                <h1  className="pd-10">Quản lý Users</h1>
                <EditableTable/>
            </div> 
        );
    }
}
export default Users;