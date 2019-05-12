import React from 'react';
import {connect} from 'react-redux';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import * as actions from './CategoryAction';
import CategoryModal from './CategoryModal';

class CategoryList extends React.Component {
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
                title: 'Category ID',
                dataIndex: 'categoryId',
                key: 'categoryId',
            }, {
                title: 'Category Name',
                dataIndex: 'categoryName',
                key: 'categoryName',
                onFilter: (value, record) => record.categoryName.indexOf(value) === 0,
                sorter: (a, b) => a.categoryName.length - b.categoryName.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('categoryName'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'Category Description',
                dataIndex: 'categoryDes',
                key: 'categoryDes',
                onFilter: (value, record) => record.categoryDes.indexOf(value) === 0,
                sorter: (a, b) => a.categoryDes.length - b.categoryDes.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('categoryDes'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    <span>
                        {this.props.categoryList.categoryList.length >= 1
                            ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteCategory(record.categoryId)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            ) : null}
                            <Divider type="vertical" />
                            <Button type="primary" onClick={() => {
                                this.props.openModal({ categoryId: record.categoryId, categoryName: record.categoryName, categoryDes: record.categoryDes}) // sua lai cho nay
                            }}>Edit</Button>
                    </span>
                ),
            }
        ]
            ;
        this.props.getAllCategory();
        this.state = {
            searchText: '',
        };
    }
    render() {
        const data = this.props.categoryList.categoryList.map((data, index) => (
            {
                categoryId: data.categoryId,
                categoryName: data.categoryName,
                categoryDes: data.categoryDes == null || data.categoryDes == undefined ? 'No Data' : data.categoryDes
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
                        rowKey={record => record.categoryId}
                        pagination={{ pageSize: 7 }}
                        loading={this.props.categoryList.isGettingCategoryList || this.props.categoryList.isloadingDelete}
                    />
                    <CategoryModal categoryListP = {this.props.categoryList.categoryList}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    categoryList: state.categoryList
})

const mapDispathToProps = dispatch => {
    return {
        getAllCategory: ()=> {
            dispatch(actions.getAllCategory());
        },
        deleteCategory: (authorId)=> {
            dispatch(actions.deleteCategory(authorId));
        },
        openModal: (data) => {dispatch(actions.openModal(data));},
    }
}

export default connect(mapStateToProps,mapDispathToProps) (CategoryList);