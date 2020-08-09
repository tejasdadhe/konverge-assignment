import React from 'react';
import '../stylesheets/NewTaskModal.css';

export default class NewTaskModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editing: false
    }
  }

  onSubmit(event) {
    event.preventDefault();
    const taskTitle = this.textInputTitle.value.trim();
    const taskDescription = this.textInputDescription.value.trim();
    const taskDueDate = new Date(this.textInputDueDate.value).toDateString();;
    if (taskTitle && taskDescription && taskDueDate) {
      this.props.onAdd(taskTitle, taskDescription,taskDueDate);
    }
    this.textInputTitle.value = '';
    this.textInputDescription.value = null;
    this.textInputTitle.value = '';

    this.setState({
      editing: false
    });
  }

 setEditing(editing) {
    this.setState({
      editing
    });
  }

  render() {
    if(!this.state.editing) {
      return (
        <div style={{width:"100%",textAlign:"center"}}>
          <button className="open-add-button" onClick={() => this.setEditing(true)}>
            Add Task
          </button> 
        </div> 
        ); 
    }
      return (
        <div className="pop-up-form">
          <form className="card add-task-form" onSubmit={(e) => this.onSubmit(e)}>
          <input type="text" class="task-input" ref={input => this.textInputTitle = input} aria-label="Task Title" placeholder="Title"/>
          <textarea class="task-input" ref={input => this.textInputDescription = input} aria-label="Task Description" placeholder="Description"/>
          <input type="date" class="task-input" ref={input => this.textInputDueDate = input} aria-label="Task Due Date" placeholder="Due Date" />
            <div>
              <button className="button add-button">Add Task</button>
              <button className="button cancel-button" onClick={() => this.setEditing(false)}>Close</button>
            </div>
          </form>
        </div>
      );
  }
}