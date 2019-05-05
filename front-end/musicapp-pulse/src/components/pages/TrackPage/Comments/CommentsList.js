import React, { Fragment } from 'react';
import CommentItem from './CommentItem';
import { Divider, message } from 'antd';
import { history } from '../../../../helpers/helper';

class CommentsList extends React.Component {

    constructor(props) {
        super(props);
        this.props.getCommentsBySongId(this.props.songId);
        this.state = {
            cmtCnt: sessionStorage.getItem('cmtCnt'),
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.songId !== this.props.songId) {
            this.props.getCommentsBySongId(this.props.songId);
        }
    }

    postComment = (userId, comment, e) => {
        if (userId < 0) {
            if (window.confirm("Please login to post your comments.")) {
                history.push("/signin", {
                    commentCnt: this.state.cmtCnt,
                    from: this.props.location
                });
                sessionStorage.setItem("cmtCnt", this.state.cmtCnt);
                sessionStorage.setItem("from", this.props.location.pathname);
                sessionStorage.setItem("currentScroll", window.scrollY);
            }
        } else {
            if (!comment.cmtCnt || comment.cmtCnt.length === 0)
                message.error("Comment content must not be null", 3);
            else {
                this.props.postComment(comment);
                sessionStorage.removeItem("cmtCnt");
                this.setState({
                    cmtCnt: ''
                })
            }
        }
    }


    handleInputChange = (e) => {
        let target = e.target;
        let value = target.value;
        let name = target.name;
        this.setState({
            [name]: value
        })
    }

    render() {
        let { comments } = this.props.comments;
        let comment = {...this.state,songId: this.props.songId,userId: this.props.userId};
        console.log(this.state)
        return (
            <Fragment>
                <h5 className="m-b">Comments</h5>
                <div className="streamline m-b m-l">
                    {comments.map((value) => (
                        <CommentItem postReply={this.props.postReply} userId={this.props.userId}
                            id={value.commentId} songId={this.props.songId} location={this.props.location}
                            key={value.commentId} cmt={value} />
                    ))}
                </div>
                <Divider />
                <p>Leave your comments here</p>
                <div className="box m-a-0 b-a collapse in"
                    aria-expanded="true" style={{
                        transition: '0.5s ease-in',
                        overflow: 'hidden', border: 'none'
                    }}>
                    <form >
                        <textarea value={this.state.cmtCnt} onChange={this.handleInputChange}
                            name='cmtCnt'
                            className="form-control no-border"
                            rows={3} placeholder="Type something..." />
                    </form>
                    <div className="box-footer clearfix">
                        <button onClick={() => this.postComment(this.props.userId, comment)}
                            className="btn btn-info pull-right btn-sm">Post</button>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default CommentsList;