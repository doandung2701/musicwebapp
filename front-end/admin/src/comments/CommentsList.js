import React from 'react';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import * as actions from './CommentsAction';
import {connect} from 'react-redux';

class CommentsList extends React.Component {

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
                title: 'COMMENT ID',
                dataIndex:'commentId',
                key: 'commentId',
            }, 
            {
                title: 'COMMENT',
                dataIndex: 'commentCnt',
                key: 'commentCnt',
                onFilter: (value, record) => record.commentCnt.indexOf(value) === 0,
                sorter: (a, b) => a.commentCnt.length - b.commentCnt.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('commentCnt'),
                render: (text, record) => <a href="javascript:;" onClick={() => this.props.showListSongsOfSinger(record.id)}>{text}</a>,
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'COMMNET DATE',
                dataIndex: 'commentDate',
                key: 'commentDate',
                onFilter: (value, record) => record.commentDate.indexOf(value) === 0,
                sorter: (a, b) => a.commentDate.length - b.commentDate.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('commentDate'),
                // sorter: (a, b) => a.value - b.value,
            },
            // {
            //     title: 'PARENT COMMNET',
            //     dataIndex: 'parentCmt',
            //     key: 'parentCmt',
            //     onFilter: (value, record) => record.parentCmt.indexOf(value) === 0,
            //     sorter: (a, b) => a.parentCmt.length - b.parentCmt.length,
            //     sortDirections: ['descend', 'ascend'],
            //     ...this.getColumnSearchProps('parentCmt'),
            //     // sorter: (a, b) => a.value - b.value,
            // },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    <span>
                        {this.props.commentReducer.commentList.length >= 1
                            ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteComment(record.commentId)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            ) : null}
                    </span>
                ),
            }
        ]
            ;
        this.props.getAllComments();
        this.state = {
            searchText: '',
        };
    }
    render() {
    
        const data = this.props.commentReducer.commentList.map((data, index) => (
            {
                commentId: data.commentId,
                commentCnt: data.commentCnt,
                commentDate: new Date(data.commentDate).toLocaleDateString(),
                parentCmt: data.parentCmt
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
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    commentReducer: state.commentReducer
})

const mapDispatchToProps = dispatch => {
    return {
        getAllComments: () => {
            dispatch(actions.getAllComments());
        },
        deleteComment: (comment) => {
            dispatch(actions.deleteComment(comment));
        }
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(CommentsList);