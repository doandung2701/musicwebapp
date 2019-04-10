import React, { Component } from 'react';
// import './NotFound.css';
import "./Comments.css";
import {
    Table, Input, InputNumber, Popconfirm, Form,
  } from 'antd';
import Comments_Form from './Comments_Form';
import EditableTable from './CommentsModal';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import * as api from '../api/commentsApi';
  
class Comments extends Component {
    
    render() {
        return (  
            <div className="mr-15">
                <Comments_Form/>
                <h1  className="pd-10">Quản lý Comments</h1>
                <EditableTable/>
            </div> 
        );
    }
}
export default Comments;