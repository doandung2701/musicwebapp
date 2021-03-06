import React from 'react';
import {connect} from 'react-redux';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import * as actions from './AuthorsAction';
import AuthorModal from './AuthorModal';

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
                title: 'Author ID',
                dataIndex: 'authorId',
                key: 'authorId',
            }, {
                title: 'Author NAME',
                dataIndex: 'authorName',
                key: 'authorName',
                onFilter: (value, record) => record.authorName.indexOf(value) === 0,
                sorter: (a, b) => a.authorName.length - b.authorName.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('authorName'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'Brief Description',
                dataIndex: 'briefDescription',
                key: 'briefDescription',
                onFilter: (value, record) => record.briefDescription.indexOf(value) === 0,
                sorter: (a, b) => a.briefDescription.length - b.briefDescription.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('briefDescription'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'Thumbnail',
                dataIndex: 'thumbnail',
                key: 'thumbnail',
                onFilter: (value, record) => record.thumbnail.indexOf(value) === 0,
                sorter: (a, b) => a.thumbnail.length - b.thumbnail.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('thumbnail'),
                render: (text, record) => <a href={record.thumbnail} target="_blank">View Thumbnail</a>,
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    <span>
                        {this.props.authorList.authorList.length >= 1
                            ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteAuthor(record.authorId)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            ) : null}
                            <Divider type="vertical" />
                            <Button type="primary" onClick={() => {
                                this.props.openModal({ authorId: record.authorId, authorName: record.authorName, thumbnail: record.thumbnail, briefDescription: record.briefDescription}) // sua lai cho nay
                            }}>Edit</Button>
                    </span>
                ),
            }
        ]
            ;
        this.props.getAllAuthors();
        this.state = {
            searchText: '',
        };
    }
    render() {
        const data = this.props.authorList.authorList.map((data, index) => (
            {
                authorId: data.authorId,
                authorName: data.authorName,
                briefDescription: data.briefDescription == null || data.briefDescription == undefined ? 'No Data' : data.briefDescription,
                thumbnail: data.thumbnai
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
                    <Button type="primary" onClick={() => this.props.openModal()}>Create</Button>
                </div>
                <div>
                    <Table columns={this.columns} dataSource={data}
                        rowKey={record => record.authorId}
                        pagination={{ pageSize: 7 }}
                        loading={this.props.authorList.isGettingAuthorList || this.props.authorList.isloadingDelete}
                    />
                    <AuthorModal />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    authorList: state.authorList
})

const mapDispathToProps = dispatch => {
    return {
        getAllAuthors: ()=> {
            dispatch(actions.getAllAuthors());
        },
        deleteAuthor: (authorId)=> {
            dispatch(actions.deleteAuthor(authorId));
        },
        openModal: (data) => {dispatch(actions.openModal(data));},
    }
}

export default connect(mapStateToProps,mapDispathToProps) (AuthorList);