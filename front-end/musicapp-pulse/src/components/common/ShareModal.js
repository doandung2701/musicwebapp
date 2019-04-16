import React from 'react';

export default class ShareModal extends React.Component{
    render(){
        return (
            <div id="share-modal" className="modal fade animate" aria-hidden="true" style={{display: 'none'}}>
            <div className="modal-dialog">
              <div className="modal-content fade-down">
                <div className="modal-header">
                  <h5 className="modal-title">Share</h5>
                </div>
                <div className="modal-body p-lg">
                  <div id="share-list" className="m-b">
                    <a href className="btn btn-icon btn-social rounded btn-social-colored indigo" title="Facebook">
                      <i className="fa fa-facebook" />
                      <i className="fa fa-facebook" />
                    </a>
                    <a href className="btn btn-icon btn-social rounded btn-social-colored light-blue" title="Twitter">
                      <i className="fa fa-twitter" />
                      <i className="fa fa-twitter" />
                    </a>
                    <a href className="btn btn-icon btn-social rounded btn-social-colored red-600" title="Google+">
                      <i className="fa fa-google-plus" />
                      <i className="fa fa-google-plus" />
                    </a>
                    <a href className="btn btn-icon btn-social rounded btn-social-colored blue-grey-600" title="Trumblr">
                      <i className="fa fa-tumblr" />
                      <i className="fa fa-tumblr" />
                    </a>
                    <a href className="btn btn-icon btn-social rounded btn-social-colored red-700" title="Pinterst">
                      <i className="fa fa-pinterest" />
                      <i className="fa fa-pinterest" />
                    </a>
                  </div>
                  <div>
                    <input className="form-control" defaultValue="http://plamusic.com/slug" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
    }
}