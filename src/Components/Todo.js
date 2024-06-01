import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { faTrash } from '@fortawesome/free-solid-svg-icons';


const todo = ({task, toggleComplete, deleteToDo, editTodo}) => {
  return (
    <div>
      <div className='Todo'>
          <p onClick={()=>toggleComplete(task.id) } className={`${task.completed ? 'completed' : ''}`}>{task.task}</p>
          <FontAwesomeIcon className="edit-icon" icon={faTrash} onClick={() => deleteToDo(task.id)}/>
          <FontAwesomeIcon className="delete-icon" icon={faPenToSquare} onClick={()=> editTodo(task.id)}/>
      </div>
      
    </div>
    
  )
}

export default todo;
