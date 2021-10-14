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
        fetch('http://localhost:3000/getAll',{
            method: 'GET'
        })
            .then(response => response.text())
            .then(data => {
                this.setState({todos : JSON.parse(data)});
            });


    };

    onAddToDoHandler = () => {
        fetch('http://localhost:3000/addNewTodo', {
            method: 'POST',
            body: JSON.stringify(this.state.addNewTodoName)
        }).then(response => response.text())
            .then(data => {
                this.setState({todos : JSON.parse(data)})
            });
    };

    newTodoNameHandler = (e) => {
        this.setState((oldState, props) => ({
            addNewTodoName : e.target.value
        }))
    };

    onDeleteHandler = (id) => {
        console.log(id)
        fetch('http://localhost:3000/delete', {
            method: 'DELETE'
        })
        .then( (response) => { console.log(response)})
        //     // fetch('http://localhost:3000/getAll')
        //     // .then(response => response.text())
        //     // .then(data => {
        //     //     this.setState({todos : JSON.parse(data)});
        //     // })
        // })

    }

    // fetch('http://localhost:3000/hello')
    //     .then(response => response.text())
    //     .then(data => console.log(data[0]));
    //
    //

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
                <ToDoItems todos={this.state.todos} onDeleteHandler={this.onDeleteHandler}/>
            </div>
        );
    };
};

export default App;
