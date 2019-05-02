import React from 'react';
import {connect} from 'react-redux';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import * as actions from './SongsAction';

class SongList extends React.Component {
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
                title: 'SONG Id',
                dataIndex: 'songId',
                key: 'songId',
            }, 
            {
                title: 'SONG NAME',
                dataIndex: 'songName',
                key: 'songName',
                onFilter: (value, record) => record.songName.indexOf(value) === 0,
                sorter: (a, b) => a.songName.length - b.songName.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('songName'),
                render: (text, record) => <a href="javascript:;" onClick={() => this.props.showListSongsOfSinger(record.id)}>{text}</a>,
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'UPLOAD DATE',
                dataIndex: 'uploadDate',
                key: 'uploadDate',
                onFilter: (value, record) => record.uploadDate.indexOf(value) === 0,
                sorter: (a, b) => a.uploadDate.length - b.uploadDate.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('uploadDate'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'SONG SRC',
                dataIndex: 'songSrc',
                key: 'songSrc',
                onFilter: (value, record) => record.songSrc.indexOf(value) === 0,
                sorter: (a, b) => a.songSrc.length - b.songSrc.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('songSrc'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'BDRIEF DESCIPTION',
                dataIndex: 'briefDesciption',
                key: 'briefDesciption',
                onFilter: (value, record) => record.briefDesciption.indexOf(value) === 0,
                sorter: (a, b) => a.briefDesciption.length - b.briefDesciption.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('briefDesciption'),
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
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'CHECKED',
                dataIndex: 'checked',
                key: 'checked',
                onFilter: (value, record) => record.checked.indexOf(value) === 0,
                sorter: (a, b) => a.checked.length - b.checked.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('checked'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'AUTHORS',
                dataIndex: 'authors',
                key: 'authors',
                onFilter: (value, record) => record.authors.indexOf(value) === 0,
                sorter: (a, b) => a.authors.length - b.authors.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('authors'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'SINGERS',
                dataIndex: 'singers',
                key: 'singers',
                onFilter: (value, record) => record.singers.indexOf(value) === 0,
                sorter: (a, b) => a.singers.length - b.singers.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('singers'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'CATEGORIES',
                dataIndex: 'categories',
                key: 'categories',
                onFilter: (value, record) => record.categories.indexOf(value) === 0,
                sorter: (a, b) => a.categories.length - b.categories.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('categories'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'PLAYLISTS',
                dataIndex: 'playLists',
                key: 'playLists',
                onFilter: (value, record) => record.playLists.indexOf(value) === 0,
                sorter: (a, b) => a.playLists.length - b.playLists.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('playLists'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'USER',
                dataIndex: 'user',
                key: 'user',
                onFilter: (value, record) => record.user.indexOf(value) === 0,
                sorter: (a, b) => a.user.length - b.user.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('user'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    <span>
                        {this.props.songReducer.songList.length >= 1
                            ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteSinger(record.id)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            ) : null}
                    </span>
                ),
            }
        ]
            ;
        this.props.getAllSongs();
        this.state = {
            searchText: '',
        };
    }
    render() {
        const data = this.props.songReducer.songList.map((data, index) => (
            {
                songId: data.songId,
                songName: data.songName,
                uploadDate: data.uploadDate === null ? 'No Data' : data.uploadDate,
                songSrc: data.songSrc === null ? 'No Data' : data.songSrc,
                briefDesciption: data.briefDesciption,
                thumbnail: data.thumbnail === null ? 'No Data' : data.thumbnail,
                checked: data.checked === true ? 'true' : 'false',
                authors: 'No Data',
                singers: 'No Data',
                categories: 'No Data',
                playLists: 'No Data'
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
                        loading={this.props.songReducer.isGettingSongList || this.props.songReducer.isloadingDelete}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    songReducer: state.songReducer
})

const mapDispathToProps = dispatch => {
    return {
        getAllSongs: ()=> {
            dispatch(actions.getAllSongs());
        }
    }
}

export default connect(mapStateToProps,mapDispathToProps) (SongList);