import React from 'react';
import '../stylesheets/Card.css';

export default function Card(props) {
  return (
    <div className="task-card" draggable="true" id={[props.taskDueDate]} onDragStart={props.onDragStart}>
      <span className="task-title">{props.taskTitle}</span><br></br>
      <span className="task-description">{props.taskDescription}</span><br></br>
      <span className="task-due-date">Due Date: {new Date(props.taskDueDate).toDateString()} </span>
    </div>
  ) 
};

