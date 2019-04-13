import React from 'react';
import $ from 'jquery';

export default class ThemeSwitcher extends React.Component {

    render() {
        return (
            <div id="switcher">
                <div className="switcher white" id="sw-theme">
                    <a href="#" data-ui-toggle-class="active" data-ui-target="#sw-theme" className="white sw-btn">
                        <i className="fa fa-gear text-muted" />
                    </a>
                    <div className="box-header">
                        <strong>Theme Switcher</strong>
                    </div>
                    <div className="box-divider" />
                    <div className="box-body">
                        <p>Colors:</p>
                        <p data-target="color">
                            <label className="radio radio-inline m-a-0 ui-check ui-check-color ui-check-md">
                                <input type="radio" name="color" defaultValue="primary" />
                                <i className="primary" />
                            </label>
                            <label className="radio radio-inline m-a-0 ui-check ui-check-color ui-check-md">
                                <input type="radio" name="color" defaultValue="accent" />
                                <i className="accent" />
                            </label>
                            <label className="radio radio-inline m-a-0 ui-check ui-check-color ui-check-md">
                                <input type="radio" name="color" defaultValue="warn" />
                                <i className="warn" />
                            </label>
                            <label className="radio radio-inline m-a-0 ui-check ui-check-color ui-check-md">
                                <input type="radio" name="color" defaultValue="success" />
                                <i className="success" />
                            </label>
                            <label className="radio radio-inline m-a-0 ui-check ui-check-color ui-check-md">
                                <input type="radio" name="color" defaultValue="info" />
                                <i className="info" />
                            </label>
                            <label className="radio radio-inline m-a-0 ui-check ui-check-color ui-check-md">
                                <input type="radio" name="color" defaultValue="blue" />
                                <i className="blue" />
                            </label>
                            <label className="radio radio-inline m-a-0 ui-check ui-check-color ui-check-md">
                                <input type="radio" name="color" defaultValue="warning" />
                                <i className="warning" />
                            </label>
                            <label className="radio radio-inline m-a-0 ui-check ui-check-color ui-check-md">
                                <input type="radio" name="color" defaultValue="danger" />
                                <i className="danger" />
                            </label>
                        </p>
                        <p>Themes:</p>
                        <div data-target="bg" className="text-u-c text-center _600 clearfix">
                            <label className="p-a col-xs-3 light pointer m-a-0">
                                <input type="radio" name="theme" defaultValue hidden />
                                <i className="active-checked fa fa-check" />
                            </label>
                            <label className="p-a col-xs-3 grey pointer m-a-0">
                                <input type="radio" name="theme" defaultValue="grey" hidden />
                                <i className="active-checked fa fa-check" />
                            </label>
                            <label className="p-a col-xs-3 dark pointer m-a-0">
                                <input type="radio" name="theme" defaultValue="dark" hidden />
                                <i className="active-checked fa fa-check" />
                            </label>
                            <label className="p-a col-xs-3 black pointer m-a-0">
                                <input type="radio" name="theme" defaultValue="black" hidden />
                                <i className="active-checked fa fa-check" />
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}