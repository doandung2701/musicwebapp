import React from 'react';
import {connect} from 'react-redux';
import { Table, Popconfirm, Divider, Button, Input, Icon } from 'antd';
import Highlighter from 'react-highlight-words';
import * as actions from './RadiosAction';
import RadioModal from './RadioModal';

class RadioList extends React.Component {
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
                title: 'Song ID',
                dataIndex: 'songId',
                key: 'songId',
            }, {
                title: 'Song Name',
                dataIndex: 'songName',
                key: 'songName',
                onFilter: (value, record) => record.songName.indexOf(value) === 0,
                sorter: (a, b) => a.songName.length - b.songName.length,
                sortDirections: ['descend', 'ascend'],
                ...this.getColumnSearchProps('songName'),
                // sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'Song Src',
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
                        {this.props.radioList.radioList.length >= 1
                            ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteRadio(record.songId)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            ) : null}
                            <Divider type="vertical" />
                            <Button type="primary" onClick={() => {
                                this.props.openModal({ songId: record.songId, songName: record.songName, thumbnail: record.thumbnail, songSrc: record.songSrc}) // sua lai cho nay
                            }}>Edit</Button>
                    </span>
                ),
            }
        ]
            ;
        this.props.getAllRadios();
        this.state = {
            searchText: '',
        };
    }
    render() {
        const data = this.props.radioList.radioList.map((data, index) => (
            {
                songId: data.songId,
                songName: data.songName,
                songSrc: data.songSrc == null ? 'No Data' : data.songSrc,
                thumbnail: data.thumbnail == null ? 'No Data' : data.thumbnail
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
                        rowKey={record => record.songId}
                        pagination={{ pageSize: 7 }}
                        loading={this.props.radioList.isGettingRadioList || this.props.radioList.isloadingDelete}
                    />
                    <RadioModal />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    radioList: state.radioList
})

const mapDispathToProps = dispatch => {
    return {
        getAllRadios: ()=> {
            dispatch(actions.getAllRadios());
        },
        deleteRadio: (radioId)=> {
            dispatch(actions.deleteRadio(radioId));
        },
        openModal: (data) => {dispatch(actions.openModal(data));},
    }
}

export default connect(mapStateToProps,mapDispathToProps) (RadioList);