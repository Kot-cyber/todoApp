import React from 'react';
import './App.css';
import ToDoItems from './components/todocard/ToDoItems.js';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos : [],
            addNewTodoName: ''
        };
    };


    componentDidMount() {
        fetch('http://localhost:3000',{
            method: 'GET'
        }).then(response => response.text())
            .then(data => {
                this.setState({todos : JSON.parse(data)});
            });


    };

    onAddToDoHandler = () => {
        fetch('http://localhost:3000', {
            method: 'POST',
            body: JSON.stringify(this.state.addNewTodoName)
        }).then(response => response.text())
            .then(data => {
                this.setState({todos : JSON.parse(data),
                    addNewTodoName: ''
                })
            });
    };

    newTodoNameHandler = (e) => {
        this.setState((oldState, props) => ({
            addNewTodoName : e.target.value
        }))
    };

    onDeleteHandler = (itemId) => {
        fetch(`http://localhost:3000/${itemId}`, {
            method: 'DELETE'
        }).then(response => response.text())
            .then(data => {
                this.setState({todos : JSON.parse(data)});
            })
        }

    onIsDoneHandler = (itemId) => {
        let changingElement = this.state.todos.find( (elem) => {
            return elem.id === itemId
        })
        fetch(`http://localhost:3000`, {
            method: 'PATCH',
            body: JSON.stringify(changingElement)
        }).then(response => response.text())
            .then(data => {
                this.setState({todos : JSON.parse(data)});
            })
    }


    render() {
        return (
            <div className='App'>
                <h1 className='title'>ToDos</h1>
                <label htmlFor='newToDo'>Add new ToDo</label>
                <input onChange={this.newTodoNameHandler}
                       value={this.state.addNewTodoName}
                       type="text"
                       name={'newToDo'}/>
                <button onClick={this.onAddToDoHandler}
                        name={'newToDo'}>Add ToDo</button>
                <ToDoItems todos={this.state.todos} onDeleteHandler={this.onDeleteHandler} onIsDoneHandler={this.onIsDoneHandler}/>
            </div>
        );
    }
};

export default App;
