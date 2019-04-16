import React from 'react';

export default class DeleteModal extends React.Component{
    render(){
        return (
            <div id="delete-modal" className="modal fade animate black-overlay" data-backdrop="false" style={{display: 'none'}} aria-hidden="true">
        <div className="row-col h-v">
          <div className="row-cell v-m">
            <div className="modal-dialog modal-sm">
              <div className="modal-content flip-y">
                <div className="modal-body text-center">          
                  <p className="p-y m-t"><i className="fa fa-remove text-warning fa-3x" /></p>
                  <p>Are you sure to delete this item?</p>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-default p-x-md" data-dismiss="modal">No</button>
                  <button type="button" className="btn red p-x-md" data-dismiss="modal">Yes</button>
                </div>
              </div>{/* /.modal-content */}
            </div>
          </div>
        </div>
      </div>
        )
    }
}