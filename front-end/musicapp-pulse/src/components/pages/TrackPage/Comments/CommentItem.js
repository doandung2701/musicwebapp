import React, { Fragment } from 'react';
import ReplyItem from './ReplyItem';
import moment from 'moment';

class CommentItem extends React.Component {

    toggleRepBox = () => {
        if (this.repBox.style.height === '0px') {
            this.repBox.style.height = '140px';

        }else{
            this.repBox.style.height = '0px';
            this.repBox.style.border = 'none';
        }
    }

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
                    {cmt.reply.map(value => (
                        <ReplyItem cmt={value} key={Math.random()/* luc lam nho thay bang id nhe*/} />
                    ))}
                    <div className="sl-footer">
                        <a href="#" data-toggle="collapse" onClick={this.toggleRepBox} aria-expanded="true">
                            <i className="fa fa-fw fa-mail-reply text-muted" /> Reply
                        </a>
                    </div>
                    <div className="box m-a-0 b-a collapse in" ref={el => this.repBox = el}
                        aria-expanded="true" style={{ height: '0px',transition: '0.5s ease-in',
                         overflow: 'hidden', border: 'none' }}>
                        <form>
                            <textarea className="form-control no-border" rows={3} placeholder="Type something..." defaultValue={""} />
                        </form>
                        <div className="box-footer clearfix">
                            <button className="btn btn-info pull-right btn-sm">Post</button>
                            <ul className="nav nav-pills nav-sm">
                                <li className="nav-item"><a className="nav-link" href="#"><i className="fa fa-camera text-muted" /></a></li>
                                <li className="nav-item"><a className="nav-link" href="#"><i className="fa fa-video-camera text-muted" /></a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentItem;