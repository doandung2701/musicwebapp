import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import * as actions from './SongsAction';
import SongModal from './SongsModal';
import ListSinger from './ListSinger';
import ListCategory from './ListCategory';
import ListAuthor from './ListAuthor';

class SongList extends React.Component {

    // state = {
    //     modalSongVisible: false,
    //     type: 'upload',
    //     songToEdit: null
    // }
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
                title: 'SONG ID',
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
                render: (text, record) => <a href="javascript:;">{text}</a>,
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
                render: (text, record) => <a href={record.songSrc} target="_blank">Link Song</a>,
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'BRIEF DESCIPTION',
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
                render: (text, record) => <a href={record.thumbnail} target="_blank">View Thumbnail</a>,
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
            // {
            //     title: 'AUTHORS',
            //     dataIndex: 'authors',
            //     key: 'authors',
            //     onFilter: (value, record) => record.authors.indexOf(value) === 0,
            //     sorter: (a, b) => a.authors.length - b.authors.length,
            //     sortDirections: ['descend', 'ascend'],
            //     ...this.getColumnSearchProps('authors'),
            //     // sorter: (a, b) => a.value - b.value,
            // },
            {
                title: 'SINGERS',
                dataIndex: 'singers',
                key: 'singers',
                onFilter: (value, record) => record.singers.indexOf(value) === 0,
                sorter: (a, b) => a.singers.length - b.singers.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('singers'),
                // sorter: (a, b) => a.value - b.value,
                render: (text, record) => <ListSinger listSinger={record.singers}/>,
            },
            {
                title: 'CATEGORIES',
                dataIndex: 'categories',
                key: 'categories',
                onFilter: (value, record) => record.categories.indexOf(value) === 0,
                sorter: (a, b) => a.categories.length - b.categories.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('categories'),
                render: (text, record) => <ListCategory listCategory={record.categories}/>,
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
                render: (text, record) => <ListAuthor listAuthor={record.authors}/>,
                // sorter: (a, b) => a.value - b.value,
            },
            // {
            //     title: 'PLAYLISTS',
            //     dataIndex: 'playLists',
            //     key: 'playLists',
            //     onFilter: (value, record) => record.playLists.indexOf(value) === 0,
            //     sorter: (a, b) => a.playLists.length - b.playLists.length,
            //     sortDirections: ['descend', 'ascend'],
            //     ...this.getColumnSearchProps('playLists'),
            //     // sorter: (a, b) => a.value - b.value,
            // },
            // {
            //     title: 'USER',
            //     dataIndex: 'user',
            //     key: 'user',
            //     onFilter: (value, record) => record.user.indexOf(value) === 0,
            //     sorter: (a, b) => a.user.length - b.user.length,
            //     sortDirections: ['descend', 'ascend'],
            //     ...this.getColumnSearchProps('user'),
            //     // sorter: (a, b) => a.value - b.value,
            // },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    <span>
                        {this.props.songReducer.songList.length >= 1
                            ? (<Fragment>
                                <a href="javascript:;" onClick={()=>{this.setState({
                                    type: 'edit',
                                    songToEdit: record,
                                    modalSongVisible: true
                                }); 
                                this.props.openModal({songId: record.songId, songName: record.songName, briefDesciption: record.briefDesciption, authors: record.authors, singers: record.singers,categories: record.categories, songSrc: record.songSrc, thumbnail: record.thumbnail})}}
                                style={{ marginLeft: 5, marginRight: 5 }}
                                >Edit</a>

                                <Popconfirm
                                    title="Sure to delete?" onConfirm={() => this.props.deleteSong(record.songId)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            </Fragment>
                            ) : null}
                    </span>
                ),
            }
        ]
            ;
        this.props.getAllSongs();
        this.state = {
            searchText: '',
            modalSongVisible: false,
            type: 'upload',
            songToEdit: null
        };
    }

    closeModalSong = () => {
        this.setState({
            modalSongVisible: false
        })
    }
    openUploadSongModal = () => {
        this.props.openModal();
        this.setState({
            modalSongVisible: true,
            type: 'upload',
            songToEdit: null
        })
    }

    render() {
        const data = this.props.songReducer.songList.map((data, index) => (
            {
                songId: data.songId,
                songName: data.songName,
                uploadDate: data.uploadDate === null ? 'No Data' : new Date(data.uploadDate).toLocaleDateString(),
                songSrc: data.songSrc === null ? 'No Data' : data.songSrc,
                briefDesciption: data.briefDesciption == null ? 'No Data' : data.briefDesciption,
                thumbnail: data.thumbnail === null ? 'No Data' : data.thumbnail,
                checked: data.checked === true ? 'true' : 'false',
                authors: data.authors === null ? 'No Data' : data.authors,
                singers: data.singers,
                categories: data.categories,
                // playLists: 'No Data'
            }
        ))
        return (
            <div style={{
                position: 'relative'
            }}>
                <Button onClick={this.openUploadSongModal}
                    style={{ marginLeft: 5 }} type="primary">Upload a song</Button>
                <div style={{
                    position: "absolute",
                    top: '-45px',
                    right: '10px',
                }}>
                </div>
                <div>
                    <Table columns={this.columns} dataSource={data}
                        rowKey={record => record.songId}
                        pagination={{ pageSize: 7 }}
                        loading={this.props.songReducer.isGettingSongList || this.props.songReducer.isloadingDelete}
                    />
                </div>
                <SongModal type={this.state.type} songToEdit={this.state.songToEdit}
                    user={null} isShow={this.state.modalSongVisible} closeModal={this.closeModalSong} />
            </div>
        )
    }
}

const mapStateToProps = state => ({
    songReducer: state.songList
})

const mapDispathToProps = dispatch => {
    return {
        getAllSongs: () => {
            dispatch(actions.getAllSongs());
        },
        deleteSong: (songId) => {
            dispatch(actions.deleteSong(songId))
        },
        openModal: (data) => {dispatch(actions.openModal(data))},
    }
}

export default connect(mapStateToProps, mapDispathToProps)(SongList);