import React, { Component } from 'react';
import './App.css';
import ReactDOM from 'react-dom';
import { nanoid } from 'nanoid'; //for stable id's for each note

export default class App extends Component {
  state = {
    tasks: [
      {name: "hello",
      content: '',
      category:"wip",
      bgcolor: "pink"
      }
    ],
    input: '',
    taskName: '',
    count: 0,
    category: [],
  }

  onDragOver = (ev) => {
    ev.preventDefault();
  }

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("id");
    let tasks = this.state.tasks.filter((task) => {
      if (task.name === id) {
        task.category = cat;
      }
      return task;
    });
    this.setState({...this.state, tasks});
  }

  onDragStart = (ev, id) => {
    console.log('dragstart:', id);
    ev.dataTransfer.setData("id", id);
  }

  makeNewSticky = () => {
    var count = this.state.count;
    var task = this.state.taskName
    this.setState({tasks: this.state.tasks.concat(
      {name: nanoid(),
      content: '',
      /*task: task,
      count: count,*/
      category:"wip",
      bgcolor: "yellow"}
    )});
    this.setState({count: this.state.count + 1});
  }

  onInputChange = (event) => {
  this.setState({input: event.target.value});
}

  onSubmit = () => {
    this.setState({taskName: this.state.input});
  }

  deleteSticky = () => {
    this.setState({tasks: this.state.tasks.splice()});
  }

  makeNewBucket =() => {
    this.state.category.push(
      <div
      className="bucket"
      onDragOver={(e)=>this.onDragOver(e)}
      onDrop={(e)=>{this.onDrop(e, "bucket3")}}>
      <span className="task-header">Bucket3</span>
      {this.state.category.bucket3}
      </div>);
  }

  render () {

    var tasks = {
        wip: [],
        complete: []
    }

    this.state.tasks.map ((t) => {
      tasks[t.category].push(
        <div
        key= {this.state.tasks.name}
        onDragStart={(e)=>this.onDragStart(e, t.name)}
        draggable
        className="draggable"
        style={{backgroundColor: t.bgcolor}}>
        <input onChange={this.onInputChange} className="sticky" />
        <button onClick={this.onSubmit} >Enter</button>
        {this.state.taskName}
        {this.state.content}
        <button onClick={this.deleteSticky}>Delete</button>
        </div>);
      });

    return (
      <div className="container-drag">
      <div className="mainheader">
        <h2 className="header">Affinity Map</h2>
        <button className="buttons" onClick={this.makeNewSticky} >Make a New Sticky Note</button>
        <button className="buttons" onCLick={this.makeNewBucket} >Make a new bucket</button>
      </div>
      <div className="buckets">
        <div
        className="bucket"
        onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=>{this.onDrop(e, "wip")}}>
        <span className="task-header">Bucket 1</span>
        {tasks.wip}
        </div>
        <div className="bucket"
        onDragOver={(e)=>this.onDragOver(e)}
        onDrop={(e)=>this.onDrop(e, "complete")}>
        <span className="task-header">Bucket 2</span>
        {tasks.complete}
        </div>
      </div>
      </div>
    );
  }
}
