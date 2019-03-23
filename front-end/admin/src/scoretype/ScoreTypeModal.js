import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Modal, Spin, Button, Form, Input, Icon, Checkbox, InputNumber, notification, Alert } from 'antd';
import { closeModal, updateScoreType, createScoreType } from './ScoreTypeAction';
import { DraggableModal } from 'ant-design-draggable-modal'
import { openNotificationWithIcon } from '../common/notification';

class ScoreTypeModal extends Component {
    constructor(props) {
        super(props);
        this.scoreRef = React.createRef();
        this.state = {
            errorpositive: false,
            errornotinput: false,
        }
    }
    handleOk = () => {
        let value = this.scoreRef.current.props.value;
        if (value <= 0 || value == null) {
            if (value <= 0) {
                this.setState((state) => {
                    // Important: read `state` instead of `this.state` when updating.
                    return { errorpositive: true }
                });
                setTimeout(() => {
                    this.setState((state) => {
                        // Important: read `state` instead of `this.state` when updating.
                        return { errorpositive: false }
                    });
                }, 2000);
            }

            if (value == null) {
                this.setState((state) => {
                    // Important: read `state` instead of `this.state` when updating.
                    return { errornotinput: true }
                });
                setTimeout(() => {
                    this.setState((state) => {
                        // Important: read `state` instead of `this.state` when updating.
                        return { errornotinput: false }
                    });
                }, 2000);
            }
        }else{
            if(this.props.scoreTypeModal.scoreType.scoreId==0){
                var requestData={
                    scoreValue:value,
                }
                this.props.createScoreType(requestData);

            }else{
                var requestData={
                    scoreId:this.props.scoreTypeModal.scoreType.scoreId,
                    scoreValue:value,
                }
                this.props.updateScoreType(requestData.scoreId,requestData);
            }
            
        }


    }
    handleCancel = () => {
        this.props.closeModal();
    
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const { errornotinput, errorpositive } = this.state;
         if(this.props.scoreTypeModal.isShow){
            return <div>
            <Spin spinning={this.props.scoreTypeModal.isLoading}>
                <Modal
                    zIndex={99999}
                    title={this.props.scoreTypeModal.scoreType.scoreId == 0 ? "Create New Score Type" : "Edit Score Type"}
                    visible={this.props.scoreTypeModal.isShow}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key="back" onClick={this.handleCancel}>Return</Button>,
                        <Button key="submit" type="primary" loading={this.props.scoreTypeModal.isLoading} onClick={this.handleOk}>
                            Submit
            </Button>,
                    ]}
                >
                    {errornotinput == true &&
                        <Alert
                            message="Value need be enter"
                            type="error"
                            closable={true}
                        />}
                    {
                        errorpositive == true &&
                        <Alert
                            message="Value need to >0"
                            type="error"
                            closable={true}
                        />
                    }
                    <Form className="login-form"
                    >
                        <Form.Item>
                            {getFieldDecorator('scoreValue', {
                                rules: [{
                                    required: true,
                                    message: 'Please input scoreValue!'
                                }],
                                initialValue: this.props.scoreTypeModal.scoreType.scoreValue,

                            })(
                                <InputNumber
                                    ref={this.scoreRef}
                                    name="scoreType"
                                    placeholder="Value" />
                            )}
                        </Form.Item>
                    </Form>
                </Modal >
            </Spin>
        </div>
        }
        return null;
    }
}
const mapStateToProps = (state) => ({
    scoreTypeModal: state.scoreTypeModal
})

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal()),
        updateScoreType:(id,data)=>dispatch(updateScoreType(id,data)),
        createScoreType:(data)=>dispatch(createScoreType(data))
    }
}
const WrappedNormalLoginForm = Form.create({ name: 'ScoreTypeForm' })(ScoreTypeModal);

export default connect(mapStateToProps, mapDispatchToProps)(WrappedNormalLoginForm);

