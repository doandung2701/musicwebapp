import React from 'react';
import {connect} from 'react-redux';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import * as actions from './AuthorsAction';

class AuthorList extends React.Component {
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
                title: 'AUTHOR ID',
                dataIndex: 'authorId',
                key: 'authorId',
            }, {
                title: 'AUTHOR NAME',
                dataIndex: 'authorName',
                key: 'authorName',
                onFilter: (value, record) => record.authorName.indexOf(value) === 0,
                sorter: (a, b) => a.authorName.length - b.authorName.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('authorName'),
                render: (text, record) => <a href="javascript:;" onClick={() => this.props.showListSongsOfSinger(record.id)}>{text}</a>,
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'BRIEF DESCRIPTION',
                dataIndex: 'briefDescription',
                key: 'briefDescription',
                onFilter: (value, record) => record.briefDescription.indexOf(value) === 0,
                sorter: (a, b) => a.briefDescription.length - b.briefDescription.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('briefDescription'),
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
        this.props.getAllAuthors();
        console.log(this.props.authorReducer);
        this.state = {
            searchText: '',
        };
    }
    render() {
        const data = this.props.authorReducer.authorList.map((data, index) => (
            {
                authorId: data.authorId,
                authorName: data.authorName,
                briefDescription: data.briefDescription
            }
        ))
        return (
            <div style={{
                position: 'relative'
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
                        loading={this.props.authorReducer.isGettingAuthorList || this.props.authorReducer.isloadingDelete}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authorReducer: state.authorReducer
})

const mapDispathToProps = dispatch => {
    return {
        getAllAuthors: ()=> {
            dispatch(actions.getAllAuthors());
        }
    }
}

export default connect(mapStateToProps,mapDispathToProps) (AuthorList);