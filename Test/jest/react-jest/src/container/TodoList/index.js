import React, { Component } from 'react';
import Header from './components/Header';
import './style.css';

export default class TodoList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            undoList: [],
        }
    }

    addUndoItem = (value) => {
        this.setState({
            undoList: [...this.state.undoList, value],
        })
    }
    render() {
        return (
            <div>
                <Header addUndoItem={this.addUndoItem}/>
                {
                    this.state.undoList.map((item, index) => {
                        return <div key={index}>{item}</div>
                    })
                }
            </div>
        );
    }
}