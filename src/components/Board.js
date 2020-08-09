import React, { Component } from 'react';
import '../stylesheets/Board.css';
import Column from './Column';
import NewTaskModal from './NewTaskModal';

export default class Board extends Component {
  constructor(props) {
    super(props);
    if(localStorage.getItem('columns')) {
      const rawLS = localStorage.getItem('columns');
      const parsedLS = JSON.parse(rawLS);
      this.state = { columns: parsedLS }
    } else {
      this.state = {
        columns: [
          {
            title: 'Backlogs',
            id: 0,
            cards: []
          },
          {
            title: 'Development',
            id: 1,
            cards: []
          },
          {
            title: 'Code Review',
            id: 2,
            cards: []
          },
          {
            title: 'Acceptance',
            id: 3,
            cards: []
          }
        ]
      }
      localStorage.setItem('columns', JSON.stringify(this.state.columns))
    }
  }

  onDragStart = (e, fromColumn) => {
    const dragInfo = {
      taskId: e.currentTarget.id,
      fromColumn: fromColumn
    }
    localStorage.setItem('dragInfo', JSON.stringify(dragInfo));
  }

  onDragOver = (e) => {
    e.preventDefault();
  }

  onDrop = (e, columnNum) => {
    const droppedTask = localStorage.getItem('dragInfo');
    const rawLS = localStorage.getItem('columns');
    const parsedLS = JSON.parse(rawLS);
    const parsedDragInfo = JSON.parse(droppedTask)

    console.log("c no : ",columnNum,parsedLS[1].cards.length)

    if(columnNum == 1 && parsedLS[1].cards.length>=4)
    {
      alert("There are already 4 items under \"Development\"");
      return;
    }
    if(columnNum == 0 && parsedLS[0].cards.length>=5)
    {
      alert("There are already 5 items under \"Backlogs\"");
      return;
    }
    

    const cardsArray = parsedLS[parsedDragInfo.fromColumn].cards
    const taskCard = cardsArray.find(card => card.taskDueDate === parsedDragInfo.taskId)
    const indexOfCard = cardsArray.findIndex(card => card.taskDueDate === parsedDragInfo.taskId)
    parsedLS[parsedDragInfo.fromColumn].cards.splice(indexOfCard, 1)
    parsedLS[columnNum].cards.push({...taskCard, columnNumber: parseInt(columnNum)})
   
    this.setState({
      columns: parsedLS
    });
    localStorage.setItem('columns', JSON.stringify(parsedLS));
    
  }


  addCard(taskTitle,taskDescription,taskDueDate) {


    const rawLS = localStorage.getItem('columns');
    const parsedLS = JSON.parse(rawLS);

    const newTask = {
      taskTitle,
      taskDescription,
      columnNumber:0,
      taskDueDate: taskDueDate
    }

    if(parsedLS[0].cards.length<5) // Only 5 items are allowed in first column
    {
      parsedLS[0].cards.push(newTask);

      this.setState({
        columns: parsedLS
      })
      localStorage.setItem('columns', JSON.stringify(parsedLS));
    }
    else
    {
       alert("5 Tasks are already under development");
    }

  }

render() {
  const columns = this.state.columns.map((column, index) => (
    <li className={"column-wrapper wrapper-" + index} key={index} >
      <Column {...column} 
        onDragStart={(e, fromColumn) => this.onDragStart(e, `${column.id}`)}
        onDragOver={(e) => this.onDragOver(e)} 
        onDrop={(e, columnNum) => {this.onDrop(e, `${column.id}`)}}
      />
    </li>
  ));
   
  return (
    <div className="board">
      <ul className="columns">
        {columns}
      </ul>
      <NewTaskModal formNum={this.props.id} onAdd={(taskTitle, taskDescription,taskDueDate) => this.addCard(taskTitle,taskDescription,taskDueDate)} />
    </div>
  );
  }
}




