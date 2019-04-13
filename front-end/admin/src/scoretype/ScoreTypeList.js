import React, { Component } from 'react'
import {
    Table, Icon, Switch, Radio, Form, Divider, Popconfirm, Button, Modal
} from 'antd';
import ScoreTypeModal from './ScoreTypeModal';
import { DraggableModalProvider } from 'ant-design-draggable-modal';

export default class ScoreTypeList extends Component {
    constructor(props) {
        super(props);
        this.columns = [
            {
                title: 'ID',
                dataIndex: 'id',
                key: 'id',
            }, {
                title: 'Value',
                dataIndex: 'value',
                key: 'value',
                sorter: (a, b) => a.value - b.value,
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => (
                    <span>
                        {this.props.scoreTypeList.scoretypeList.length >= 1
                            ? (
                                <Popconfirm title="Sure to delete?" onConfirm={() => this.props.deleteScoreType(record.key)}>
                                    <a href="javascript:;">Delete</a>
                                </Popconfirm>
                            ) : null}
                        <Divider type="vertical" />

                        <Button type="primary" onClick={() => {
                            this.props.openModal({ scoreId: record.id, scoreValue: record.value })
                        }}>Edit</Button>
                    </span>
                ),
            }
        ]
            ;
        this.props.loadAllScoreType();
    }
    render() {
        const data = this.props.scoreTypeList.scoretypeList.map((data, index) => (
            {
                id: data.scoreId,
                value: data.scoreValue
            }
        ))
        return (
            <div style={{
                position:'relative'
            }}>
                <div style={{
                    position: "absolute",
                    top: '-45px',
                    right: '10px',
                }}>
                    <Button type="primary" onClick={()=>this.props.openModal()}>Create</Button>
                </div>
                <div>
                    <Table columns={this.columns} dataSource={data}
                        rowKey={record => record.id}
                        loading={this.props.scoreTypeList.loadingGetAll || this.props.scoreTypeList.isloadingDelete}
                    />
                    <ScoreTypeModal />
                </div>
            </div>
        )
    }
}
