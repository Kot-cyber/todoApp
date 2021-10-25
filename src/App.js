import React from 'react';
import './App.css';
import ToDoList from './components/ToDoList/ToDoList.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [],
            addNewTodoName: ''
        };
        this.addTodoInput = React.createRef()
    };


    componentDidMount() {
        fetch('http://localhost:3000', {
            method: 'GET'
        }).then(response => response.text())
            .then(data => {
                this.setState({todos: JSON.parse(data)});
            });


    };

    onAddToDoHandler = () => {
        if (!this.state.addNewTodoName || this.state.addNewTodoName.trim() === '') {
            this.addTodoInput.current.className = 'add-bar__input add-bar__input--invalid';

        } else {
            fetch('http://localhost:3000', {
                method: 'POST',
                body: JSON.stringify(this.state.addNewTodoName.trim())
            }).then(response => response.text())
                .then(data => {
                    this.setState({
                        todos: JSON.parse(data),
                        addNewTodoName: ''
                    })
                });
        }
    };

    newTodoNameHandler = (e) => {
        if(e.target.className !== "add-bar__input") {
            e.target.className = "add-bar__input";
        }
        this.setState((oldState, props) => ({
            addNewTodoName: e.target.value
        }))
    };

    onDeleteHandler = (itemId) => {
        fetch(`http://localhost:3000/${itemId}`, {
            method: 'DELETE'
        }).then(response => response.text())
            .then(data => {
                this.setState({todos: JSON.parse(data)});
            })
    }

    onIsDoneHandler = (itemId) => {
        let changingElement = this.state.todos.find((elem) => {
            return elem.id === itemId
        })
        fetch(`http://localhost:3000`, {
            method: 'PATCH',
            body: JSON.stringify(changingElement)
        }).then(response => response.text())
            .then(data => {
                this.setState({todos: JSON.parse(data)});
            })
    }


    render() {
        return (
            <div className='todo-App'>
                <div className="header">
                    <h1 className='todo-App__title'>ToDos</h1>
                </div>
                <ToDoList todos={this.state.todos}
                          onDeleteHandler={this.onDeleteHandler}
                          onIsDoneHandler={this.onIsDoneHandler}/>
                <div className="add-bar">
                    <label htmlFor='newToDo'>
                        Add new ToDo :
                    </label>
                    <input className='add-bar__input'
                           onChange={this.newTodoNameHandler}
                           value={this.state.addNewTodoName}
                           type="text"
                           id='newToDo'
                           name='addNewTodo'
                           placeholder='Write todo name'
                           ref={this.addTodoInput}
                    />
                    <button className='add-bar__add-btn btn' onClick={this.onAddToDoHandler}
                            name='newToDo'>Add ToDo
                    </button>
                </div>
            </div>
        );
    }
};

export default App;
