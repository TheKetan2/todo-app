// import logo from './logo.svg';
// import './App.css';

import React, { Component } from "react";

import TodoBanner from "./TodoBanner";
import TodoRow from "./TodoRow";
import TodoCreator from "./TodoCreator";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Adam",
      todoItems: [
        { action: "Buy Flowers", done: false },
        { action: "Buy Car", done: false },
        { action: "Buy Plane", done: true },
        { action: "Buy Joe", done: false }
      ],
      newItemText: ""
    };
  }
  updateNewTextValue = event => {
    this.setState({ newItemText: event.target.value });
  };

  createNewTodo = task => {
    if (!this.state.todoItems.find(item => item.action === task)) {
      this.setState({
        todoItems: [...this.state.todoItems, { action: task, done: false }]
        // newItemText: ""
      });
    }
  };

  toggleTodo = todo =>
    this.setState({
      todoItems: this.state.todoItems.map(item =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      )
    });

  todoTableRows = () =>
    this.state.todoItems.map(item => (
      <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
    ));

  render() {
    return (
      <div>
        <h4 className="bg-primary text-white text-center p-2">
          <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
          {/* {this.state.userName}'s To Do List (
          {this.state.todoItems.filter(t => !t.done).length} items to do) */}
        </h4>
        <div className="container-fluid">
          <TodoCreator callback={this.createNewTodo} />
          <table className="table table-striped table-bordered mt-2">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows()}</tbody>
          </table>
        </div>
      </div>
    );
  }
}
