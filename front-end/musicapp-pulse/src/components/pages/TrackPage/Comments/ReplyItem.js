import React, { Fragment } from 'react';
import moment from 'moment';
import { Tooltip } from 'antd';

class ReplyItem extends React.Component {
    render() {
        let cmt = this.props.cmt;
        return (
            <div className="sl-item">
                <div className="sl-left">
                    <img src={cmt.user.imageUrl} alt="." className="img-circle" />
                </div>
                <div className="sl-content">
                    <div className="sl-author m-b-0">
                        <a href="#">{cmt.user.name}</a>&nbsp;
                        <Tooltip title={moment(cmt.commentDate).format("HH:mm:ss DD.MM.YYYY")}>
                            <span className="sl-date text-muted">{moment(cmt.commentDate).fromNow()}</span>
                        </Tooltip>
                    </div>
                    <div>
                        <p>{cmt.commentCnt}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReplyItem;