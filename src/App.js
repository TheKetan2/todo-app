// import logo from './logo.svg';
// import './App.css';

import React, { Component } from "react";

import TodoBanner from "./TodoBanner";
import TodoRow from "./TodoRow";
import TodoCreator from "./TodoCreator";
import VisibilityControl from "./VisibilityControl";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Ketan",
      todoItems: [
        { action: "Buy Flowers", done: false },
        { action: "Jump from bed", done: false },
        { action: "wake up at mid night", done: true },
        { action: "Catch ball", done: false }
      ],
      showCompleted: true
    };
  }
  updateNewTextValue = event => {
    this.setState({ newItemText: event.target.value });
  };

  createNewTodo = task => {
    if (!this.state.todoItems.find(item => item.action === task)) {
      this.setState(
        {
          todoItems: [...this.state.todoItems, { action: task, done: false }]
          // newItemText: ""
        },
        () => {
          localStorage.setItem("todos", JSON.stringify(this.state));
        }
      );
    }
  };

  toggleTodo = todo =>
    this.setState(
      {
        todoItems: this.state.todoItems.map(item =>
          item.action === todo.action ? { ...item, done: !item.done } : item
        )
      },
      () => {
        localStorage.setItem("todos", JSON.stringify(this.state));
      }
    );

  todoTableRows = doneValue =>
    this.state.todoItems
      .filter(item => item.done === doneValue)
      .map(item => (
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
      ));

  componentDidMount = () => {
    let data = localStorage.getItem("todos");
    this.setState(
      data != null
        ? JSON.parse(data)
        : {
            userName: "Ketan",
            todoItems: [
              { action: "Buy Flowers", done: false },
              { action: "Jump from bed", done: false },
              { action: "wake up at mid night", done: true },
              { action: "Catch ball", done: false }
            ],
            showCompleted: true
          }
    );
  };

  render() {
    return (
      <div>
        <h4 className="bg-primary text-white text-center p-2">
          <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />
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
            <tbody>{this.todoTableRows(false)}</tbody>{" "}
          </table>

          <div className="bg-secondary text-white text-center p-2">
            <VisibilityControl
              description="Completed Tasks"
              isChecked={this.state.showCompleted}
              callback={checked => this.setState({ showCompleted: checked })}
            />
          </div>
          {this.state.showCompleted && (
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>Description</th>
                  <th>Done</th>
                </tr>
              </thead>
              <tbody>{this.todoTableRows(true)}</tbody>
            </table>
          )}
        </div>
      </div>
    );
  }
}
