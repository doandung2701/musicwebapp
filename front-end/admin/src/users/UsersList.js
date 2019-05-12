import React from 'react';
import {connect} from 'react-redux';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import * as actions from './UsersAction';
import "./Users.css";

class UserList extends React.Component {
    getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys, selectedKeys, confirm, clearFilters,
        }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={node => { this.searchInput = node; }}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
                        style={{ width: 188, marginBottom: 8, display: 'block' }}
                    />
                    <Button
                        type="primary"
                        onClick={() => this.handleSearch(selectedKeys, confirm)}
                        icon="search"
                        size="small"
                        style={{ width: 90, marginRight: 8 }}
                    >
                        Search
            </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Reset
            </Button>
                </div>
            ),
        filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownVisibleChange: (visible) => {
            if (visible) {
                setTimeout(() => this.searchInput.select());
            }
        },
        render: (text) => (
            <Highlighter
                highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                searchWords={[this.state.searchText]}
                autoEscape
                textToHighlight={text}
            />
        ),
    })
    handleSearch = (selectedKeys, confirm) => {
        confirm();
        this.setState({ searchText: selectedKeys[0] });
    }
    handleReset = (clearFilters) => {
        clearFilters();
        this.setState({ searchText: '' });
    }
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('name'),
                render: (text, record) => <a href="javascript:;" onClick={() => this.props.showListSongsOfSinger(record.id)}>{text}</a>,
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email',
                onFilter: (value, record) => record.email.indexOf(value) === 0,
                sorter: (a, b) => a.email.length - b.email.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('email'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'Image',
                dataIndex: 'imageUrl',
                key: 'imageUrl',
                onFilter: (value, record) => record.imageUrl.indexOf(value) === 0,
                sorter: (a, b) => a.imageUrl.length - b.imageUrl.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('imageUrl'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'Email Verified',
                dataIndex: 'emailVerified',
                key: 'emailVerified',
                onFilter: (value, record) => record.emailVerified.indexOf(value) === 0,
                sorter: (a, b) => a.emailVerified.length - b.emailVerified.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('emailVerified'),
                // sorter: (a, b) => a.value - b.value,
                render: (text, record) => (
                    <Popconfirm title="Sure to toggel verified?" onConfirm= {() => this.props.toggleUser(record.id, record.emailVerified) }>
                                    <a href="javascript:;">{record.emailVerified}</a>
                                </Popconfirm>
                )
            },
            {
                title: 'Provider',
                dataIndex: 'provider',
                key: 'provider',
                onFilter: (value, record) => record.provider.indexOf(value) === 0,
                sorter: (a, b) => a.provider.length - b.provider.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('provider'),
                // sorter: (a, b) => a.value - b.value,
            },
            // {
            //     title: 'operation',
            //     dataIndex: 'operation',
            //     render: (text, record) => (
            //         <span>
            //             {this.props.userReducer.userList.length >= 1
            //                 ? (
            //                     <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteSinger(record.id)}>
            //                         <a href="javascript:;">Delete</a>
            //                     </Popconfirm>
            //                 ) : null}
            //         </span>
            //     ),
            // }
        ]
            ;
        this.props.getAllUsers();
        this.state = {
            searchText: '',
        };
    }
    render() {
        const data = this.props.userReducer.userList.map((data, index) => (
            {
                id: data.id,
                name: data.name,
                email: data.email,
                imageUrl: data.imageUrl,
                emailVerified: data.emailVerified,
                provider: data.provider
            }
        ))
        return (
            <div style={{
                position: 'relative',
                width: '98%'
            }}>
                <div style={{
                    position: "absolute",
                    top: '-45px',
                    right: '10px',
                }}>
                </div>
                <div>
                    <Table columns={this.columns} dataSource={data}
                        rowKey={record => record.id}
                        pagination={{ pageSize: 7 }}
                        loading={this.props.userReducer.isGettingUserList || this.props.userReducer.isloadingDelete}
                        className="table-responsive"
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    userReducer: state.userReducer
})

const mapDispathToProps = dispatch => {
    return {
        getAllUsers: ()=> {
            dispatch(actions.getAllUsers());
        },
        toggleUser: (id, active)=> {
            dispatch(actions.toggleUser(id, active));
        }
    }
}

export default connect(mapStateToProps,mapDispathToProps) (UserList);