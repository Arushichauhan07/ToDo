import React, {useState} from 'react';
import { toast } from 'react-toastify';

const TodoForm = ({addToDo, SortItem, FilterItem, ResetItems, toDos}) => {

    const [value, setValue] = useState("");
    const [errors, setErrors] = useState({});

    const [filter, setFilter] = useState("");
    const inputValidation = new RegExp(/^[A-Za-z0-9]+$/);

    const handleSubmit = (e) => {
      e.preventDefault();
      var validationErrors = {};
      if(!value.trim()){
      validationErrors.todo = "ToDo can't be blank";
      toast.error(validationErrors.todo)
      }else if(!inputValidation.test(value)){
      validationErrors.todo = "Special Characters are not allowed";
      toast.error(validationErrors.todo)
      }

      if(Object.keys(validationErrors).length === 0){
      addToDo(value);
      }else{
      setErrors(validationErrors);
      }
      setValue("");
    }

    const handleFilter = (e) => {
      e.preventDefault();
      FilterItem(filter);
    }
    

  return (
    <>
    <div>
      <form className='TodoForm' onSubmit={handleSubmit}>
        <input type='text' className='todo-input' name="todo" value={value} placeholder='What is the task today?' 
        onChange={(e)=>setValue(e.target.value)} 
        />
        <button type='submit' className='todo-btn'>Add Task</button>
      </form>
    </div>
    {toDos.length > 0 ? 
    <div className='buttons'>
    <input type='text' className='filter-input' name='search' value={filter} placeholder='Search the todo' 
    onChange={(e)=> setFilter(e.target.value.toLowerCase())}></input>
    <button type='submit'className='filter-btn' onClick={handleFilter} >Filter Tasks</button>
    <button className='sort-btn' onClick={ResetItems} >Reset</button>
    <button className='sort-btn' onClick={SortItem} >Sort Tasks</button>
    </div>
    : "" } 
    </>
  )
}

export default TodoForm;
