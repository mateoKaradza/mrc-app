import React from 'react';

function renderOptions(data) {
    return data.map(row => {
        return (
            <option value={row.platform_id} key={row.platform_id}>{row.label}</option>
        )
    })
}

function handleUpdate(e, props) {
        props.updateState(props.stateKey, e.target.value);
    }

export default function(props) {
    return (
        <div>
            <label className="col-form-label">{props.label}</label>
            <select value={props.platform_id} onChange={(e) => handleUpdate(e, props)}className="custom-select form-control">
                {renderOptions(props.data)}
            </select>
        </div>
    )
}