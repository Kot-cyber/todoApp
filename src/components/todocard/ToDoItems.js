import React from 'react';
import './todocard.css';

const ToDoItems = (props) => {


    let todosCards =[];
    if (props.todos.length !== 0) {
        todosCards = props.todos.map((item) => {
                return (
                    <div key={item.id} id={item.id} className='todo_Item'>
                        <input type='checkbox' defaultChecked={Boolean(+item.isDone)}/>
                        <p>{item.todos_name}</p>
                        <button onClick={() => {props.onDeleteHandler(item.id)}}>Delete</button>
                    </div>)
            }
        );
    };
    return (
        todosCards
    );

};

export default ToDoItems;