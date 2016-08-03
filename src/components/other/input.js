import React, { Component } from 'react';

export default class Input extends Component {
    constructor(props) {
        super(props);

        this.handleUpdate = this.handleUpdate.bind(this);
    }
    
    handleUpdate(e) {
        this.props.updateState(this.props.stateKey, e.target.value);
    }

    render() {
        if (this.props.textarea)
            return (
                <div>
                    <label className="col-form-label">{this.props.label}</label>
                    <textarea rows={4} required={this.props.required} className="form-control" type="text" readOnly={this.props.readonly} value={this.props.value} onChange={this.handleUpdate}/>
                </div>
            )
        if (this.props.date)
            return (
                <div>
                    <label className="col-form-label">{this.props.label}</label>
                    <input required={this.props.required} className="form-control" type="date" readOnly={this.props.readonly} value={this.props.value} onChange={this.handleUpdate}/>
                </div>
            )
        if (this.props.number)
            return (
                <div>
                    <label className="col-form-label">{this.props.label}</label>
                    <input required={this.props.required} className="form-control" type="number" readOnly={this.props.readonly} value={this.props.value} onChange={this.handleUpdate}/>
                </div>
            )
        return (
            <div>
                <label className="col-form-label">{this.props.label}</label>
                <input required={this.props.required} className="form-control" type="text" readOnly={this.props.readonly} value={this.props.value} onChange={this.handleUpdate}/>
            </div>
        )
    }
}