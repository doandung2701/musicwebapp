import React from 'react';
import Top5LikeList from '../top5like/Top5LikeList';
import { top5Like } from '../../fakedata/fakedata';

export default class PageRight extends React.Component {
    render() {
        return (
            <div className="col-lg-3 w-xxl w-auto-md" >
                <div className="padding" style={{ bottom: '60px' ,marginTop: 22}} 
                data-ui-jp="stick_in_parent">
                    <Top5LikeList tracks={top5Like} />
                    <h6 className="text text-muted">Go mobile</h6>
                    <div className="btn-groups">
                        <a href="#" className="btn btn-sm dark lt m-r-xs" style={{ width: '135px' }}>
                            <span className="pull-left m-r-sm">
                                <i className="fa fa-apple fa-2x" />
                            </span>
                            <span className="clear text-left l-h-1x">
                                <span className="text-muted text-xxs">Download on the</span>
                                <b className="block m-b-xs">App Store</b>
                            </span>
                        </a>
                        <a href="#" className="btn btn-sm dark lt" style={{ width: '133px' }}>
                            <span className="pull-left m-r-sm">
                                <i className="fa fa-play fa-2x" />
                            </span>
                            <span className="clear text-left l-h-1x">
                                <span className="text-muted text-xxs">Get it on</span>
                                <b className="block m-b-xs m-r-xs">Google Play</b>
                            </span>
                        </a>
                    </div>
                    <div className="b-b m-y" />
                    <div className="nav text-sm _600">
                        <a href="#" className="nav-link text-muted m-r-xs">About</a>
                        <a href="#" className="nav-link text-muted m-r-xs">Contact</a>
                        <a href="#" className="nav-link text-muted m-r-xs">Legal</a>
                        <a href="#" className="nav-link text-muted m-r-xs">Policy</a>
                    </div>
                    <p className="text-muted text-xs p-b-lg">© Copyright 2016</p>
                </div>
            </div>
        )
    }
}