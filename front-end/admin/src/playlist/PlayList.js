import React from 'react';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import PlayListModal from './PlayListModal';
import Highlighter from 'react-highlight-words';
import { connect } from 'react-redux';
import * as actions from './PlayListAction';
import "./PlayList.css";
import ListSong from './ListSong';
class PlayList extends React.Component {
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
    findPlayList = (id) => {
        let playlist = {};
        this.props.playListList.playListList.map((data) => {
            if (data.id == id) 
                playlist = data;
        })
        return playlist;
    }
    showSongOfPlayList = (id) => {
        let listSong = [];
        this.props.playListList.playListList.map((data) => {
            if (data.id == id) {
                listSong = data.songs;
            }
        })
        return listSong;
    }
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            }, 
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                onFilter: (value, record) => record.name.indexOf(value) === 0,
                sorter: (a, b) => a.name.length - b.name.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('name'),
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
                title: 'User',
                dataIndex: 'user',
                key: 'user',
                onFilter: (value, record) => record.user.indexOf(value) === 0,
                sorter: (a, b) => a.user.length - b.user.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('user'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'Songs',
                dataIndex: 'songs',
                key: 'songs',
                onFilter: (value, record) => record.Song.indexOf(value) === 0,
                sorter: (a, b) => a.Song.length - b.Song.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('songs'),
                render: (text, record) => <ListSong listSong={this.showSongOfPlayList(record.id)}/>,
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    <span>
                        {this.props.playListList.playListList.length >= 1
                            ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deletePlayList(record.id)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            ) : null}
                        <Divider type="vertical" />
                        <Button type="primary" onClick={() => {
                            this.props.openModal({ id: record.id, name: record.name, thumbnail: record.thumbnail, description: record.description, user: record.user, playListSong: this.showSongOfPlayList(record.id) }) // sua lai cho nay
                        }}>Edit</Button>
                    </span>
                ),
            }
        ]
            ;
        this.props.getAllPlayLists();
        this.state = {
            searchText: '',
        };
    }
    render() {

        const data = this.props.playListList.playListList.map((data, index) => (
            {
                id: data.id,
                name: data.name,
                thumbnail: data.thumbnail !== null || data.thumbnail != undefined ? data.thumbnail : 'No Data',
                description: data.description,
                user: data.user !== null ? `${data.user.email}` : 'No Data',
                // playListSong: playListSong
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
                        loading={this.props.playListList.isGettingplayListList || this.props.playListList.isloadingDelete}
                    />
                    <PlayListModal />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => ({
    playListList : state.playListList
})

const mapDispatchToProps = dispatch => {
    return {
        getAllPlayLists : ()  => { dispatch(actions.getAllPlayLists())},
        openModal: (data) => {dispatch(actions.openModal(data))},
        deletePlayList: (playListId) => {dispatch(actions.deletePlayList(playListId))}
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (PlayList);