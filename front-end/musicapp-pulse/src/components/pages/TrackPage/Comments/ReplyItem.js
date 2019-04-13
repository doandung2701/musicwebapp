import React, { Fragment } from 'react';
import moment from 'moment';

class ReplyItem extends React.Component {
    render() {
        let cmt = this.props.cmt;
        return (
            <div className="sl-item">
                <div className="sl-left">
                    <img src={cmt.img} alt="." className="img-circle" />
                </div>
                <div className="sl-content">
                    <div className="sl-author m-b-0">
                        <a href="#">{cmt.author}</a>&nbsp;
                        <span className="sl-date text-muted">{moment(cmt.time).fromNow()}</span>
                    </div>
                    <div>
                        <p>{cmt.content}</p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ReplyItem;