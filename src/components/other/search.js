import React, { Component } from 'react';

class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            val: ''
        }

        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange(e) {
        this.setState({val: e.target.value});
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.action(this.state.val);
    }

    render() {
        return(
            <div>    
                <form onSubmit={this.handleSubmit}>
                    <div className="input-group">
                        <input type="text" 
                            className="form-control" 
                            placeholder="Search for ..." 
                            onChange={this.handleInputChange}
                            
                            value={this.state.val}
                            />
                        <span className="input-group-btn">
                            <button className="btn btn-secondary" type="submit">Go!</button>
                        </span>
                    </div>
                </form>
                
            </div>
        )
    }
}

export default Search;