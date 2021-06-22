import React, { Component } from 'react';

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }

    handleInputChange = (e) => {
        this.setState({ value: e.target.value})
    }

    handleOnKeyup = (e) => {
        const { value } = this.state;
        if (e.keyCode === 13 && value) {
            this.props.addUndoItem(value);
            this.setState({ value: ''});
        }
    }

    render() {
        const {value} = this.state;
        return (
            <div className="header">
                <div className="header-content">
                    TodoList
                    <input
                        placeholder='todo'
                        className="header-input"
                        type="text"
                        data-test="input"
                        value={value}
                        onChange={this.handleInputChange}
                        onKeyUp={this.handleOnKeyup}
                    />
                </div>
            </div>
        );
    }
}