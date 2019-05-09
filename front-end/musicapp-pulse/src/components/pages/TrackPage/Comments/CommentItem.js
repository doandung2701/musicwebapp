import React, { Fragment } from 'react';
import ReplyItem from './ReplyItem';
import moment from 'moment';
import { Tooltip, message } from 'antd';
import { history } from '../../../../helpers/helper';

class CommentItem extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            cmtCnt: sessionStorage.getItem('repCnt'),
        }
    }

    componentDidMount(){
        if (sessionStorage.getItem("currentScroll")&&sessionStorage.getItem('repCnt')){
            this.repBox.style.height = '140px';
        }
    }

    toggleRepBox = () => {
        if (this.repBox.style.height === '0px') {
            this.repBox.style.height = '140px';

        } else {
            this.repBox.style.height = '0px';
            this.repBox.style.border = 'none';
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

    postRep = () => {
        if (this.props.userId < 0) {
            if (window.confirm(this.props.t('loginreq'))) {
                history.push("/signin", {
                    commentCnt: this.state.cmtCnt,
                    from: this.props.location
                })
                sessionStorage.setItem("repCnt", this.state.cmtCnt);
                sessionStorage.setItem("from", this.props.location.pathname);
                sessionStorage.setItem("currentScroll",window.scrollY);
            }
        } else {
            if (!this.state.cmtCnt||this.state.cmtCnt.length === 0) {
                message.error(this.props.t('notnull'),3);
            } else {
                let rep = {
                    ...this.state,
                    songId: this.props.songId,
                    userId: this.props.userId,
                    parentId: this.props.cmt.commentId
                }
                this.props.postReply(rep);
                sessionStorage.removeItem("repCnt");
                this.setState({
                    cmtCnt: ''
                })
            }
        }
    }


    render() {
        let { cmt, songId,t } = this.props;
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
                    {cmt.replies.map(value => (
                        <ReplyItem cmt={value} key={Math.random()/* luc lam nho thay bang id nhe*/} />
                    ))}
                    <div className="sl-footer">
                        <a href="#" data-toggle="collapse" onClick={this.toggleRepBox} aria-expanded="true">
                            <i className="fa fa-fw fa-mail-reply text-muted" /> {t('rep')}
                        </a>
                    </div>
                    <div className="box m-a-0 b-a collapse in" ref={el => this.repBox = el}
                        aria-expanded="true" style={{
                            height: '0px', transition: '0.5s ease-in',
                            overflow: 'hidden', border: 'none'
                        }}>
                        <form>
                            <textarea value={this.state.cmtCnt} onChange={this.handleInputChange}
                                name="cmtCnt"
                                className="form-control no-border"
                                rows={3} placeholder={t('typesth')} />
                        </form>
                        <div className="box-footer clearfix">
                            <button onClick={this.postRep}
                                className="btn btn-info pull-right btn-sm">{t('post')}</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default CommentItem;