import React from 'react';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import AlbumModal from './AlbumModal';
class AlbumList extends React.Component {
    state={
        showForm:false,
        id:null,
        create:false,
    }
    openModal=(id)=>{
        if (id) {
            this.setState({
                showForm:true,
                id:id,
                create:false
            })
        }else{
            this.setState({
                showForm:true,
                create:true,
                id:null
            })
        }
      
    }
    closeModal=()=>{
        this.setState({
            showForm:false,
            id:null,
            create:false
        })
    }
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
                textToHighlight={text&&text.toString()}
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
                title: 'Album Name',
                dataIndex: 'albumName',
                key: 'albumName',
                onFilter: (value, record) => record.albumName.indexOf(value) === 0,
                sorter: (a, b) => a.albumName.length - b.albumName.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('albumName'),
            },
            {
                title: 'Created Date',
                dataIndex: 'createdDate',
                key: 'createdDate',
                onFilter: (value, record) => record.createdDate.indexOf(value) === 0,
                sorter: (a, b) => a.createdDate - b.createdDate,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('createdDate'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    <span>
                        {this.props.albumList.albumList.length >= 1
                            ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteAlbum(record.id)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            ) : null}
                        <Divider type="vertical" />
                        <Button type="primary" onClick={() => {
                            this.openModal(record.id)
                        }}>Edit</Button>
                    </span>
                ),
            }
        ]
            ;
        this.props.getAllAlbums();
        this.state = {
            searchText: '',
        };
    }
    render() {
        console.log(this.props.albumList.albumList);
        const data = this.props.albumList.albumList.map((data, index) => (
            {
                id: data.id,
                albumName: data.albumName,
                createdDate: new Date(data.createdDate).toLocaleDateString()
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
                    <Button type="primary" onClick={() => this.openModal()}>Create</Button>
                </div>
                <div>
                    <Table columns={this.columns} dataSource={data}
                        rowKey={record => record.id}
                        pagination={{ pageSize: 7 }}
                        loading={this.props.albumList.isGettingSingerList || this.props.albumList.isloadingDelete}
                    />
                    <AlbumModal id={this.state.id} showForm={this.state.showForm} closeModal={this.closeModal} create={this.state.create}/>
                    {/* <AlbumModal /> */}
                </div>
            </div>
        )
    }
}
    export default AlbumList;