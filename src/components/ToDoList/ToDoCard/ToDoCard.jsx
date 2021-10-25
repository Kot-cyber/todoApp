import './todocard.css';

const ToDoCard = (props) => {

    return (
        <div id={props.item.id} className={Boolean(+props.item.isDone) === true ? 'todo-list__card todo-list__card--checked' : 'todo-list__card'}>
            <input className='todo-list__card-input' onChange={() => {props.onIsDoneHandler(props.item.id)}} type='checkbox' checked={Boolean(+props.item.isDone)}/>
            <p className={Boolean(+props.item.isDone) === true ? 'todo-list__card-name--checked' : 'todo-list__card-name'}>{props.item.todos_name}</p>
            <button className='todo-list__card-btn btn' onClick={() => {props.onDeleteHandler(props.item.id)}}>Delete</button>
        </div>)
}

export default ToDoCard;
