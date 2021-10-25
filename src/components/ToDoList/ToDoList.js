import React from 'react';
import './todolist.css';
import ToDoCard from './ToDoCard/ToDoCard';

const ToDoList = (props) => {

    let todoCards =[];
    if (props.todos.length !== 0) {
        todoCards = props.todos.map((item) => {
                return <ToDoCard key={item.id} item={item}
                                 onDeleteHandler={props.onDeleteHandler}
                                 onIsDoneHandler={props.onIsDoneHandler}/>
            }
        );
    };

    return (
        <div className="todo-App__todo-list">
            {todoCards}
        </div>

    );

};

export default ToDoList;