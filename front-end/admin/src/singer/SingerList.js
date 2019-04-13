import React from 'react';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import SingerModal from './SingerModal';
import Highlighter from 'react-highlight-words';

class SingerList extends React.Component {
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
                textToHighlight={text.toString()}
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
                title: 'Description',
                dataIndex: 'description',
                key: 'description',
                onFilter: (value, record) => record.description.indexOf(value) === 0,
                sorter: (a, b) => a.description.length - b.description.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('description'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    <span>
                        {this.props.singerList.singerList.length >= 1
                            ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteSinger(record.id)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            ) : null}
                        <Divider type="vertical" />
                        <Button type="primary" onClick={() => {
                            this.props.openModal({ id: record.id, name: record.name, description: record.description })
                        }}>Edit</Button>
                    </span>
                ),
            }
        ]
            ;
        this.props.getAllSingers();
        this.state = {
            searchText: '',
        };
    }
    render() {
        console.log(this.props.singerList.singerList);

        const data = this.props.singerList.singerList.map((data, index) => (
            {
                id: data.id,
                name: data.name,
                description: data.description
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
                    <Button type="primary" onClick={() => this.props.openModal()}>Create</Button>
                </div>
                <div>
                    <Table columns={this.columns} dataSource={data}
                        rowKey={record => record.id}
                        pagination={{ pageSize: 7 }}
                        loading={this.props.singerList.isGettingSingerList || this.props.singerList.isloadingDelete}
                    />
                    <SingerModal />
                </div>
            </div>
        )
    }
}
    export default SingerList;