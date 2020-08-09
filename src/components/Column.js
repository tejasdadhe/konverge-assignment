import React from 'react';
import Card from './Card';
import '../stylesheets/Column.css';


export default class Column extends React.Component {
   
  render() {
    const cards = this.props.cards.map((card, index) => {
      return ( 
        <li key={index}>
          <Card {...card} onDragStart={this.props.onDragStart} />
        </li>
      );
    })
      
    return (
      <div>
        <h2 className={`name-header name-${this.props.id}`}>{this.props.title}</h2>
        <ul className="column" onDragOver={this.props.onDragOver} onDrop={this.props.onDrop}>
          {cards}
          <li className="add-column-wrapper">
            {/* <NewTaskModal formNum={this.props.id} onAdd={this.props.onAdd} /> */}
          </li>
        </ul>
      </div>
    );
  }
  
}

