import React from 'react';

export default function(props) {
    return (
        <div className="modal fade" id="modalDelete" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <button type="button" className="close" data-dismiss="modal">
                    <span aria-hidden="true">&times;</span>
                    </button>
                    <h4 className="modal-title">You are about to delete this</h4>
                </div>
                <div className="modal-body">
                    <p>This action is irreversible! Are you sure?</p>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary m-r-1" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-danger" data-dismiss="modal" onClick={() => props.action(props.id, props.id2)}>Delete</button>
                </div>
                </div>
            </div>
        </div>
    )
}