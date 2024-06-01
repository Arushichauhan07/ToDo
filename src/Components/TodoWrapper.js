import React, {useState} from 'react'
import TodoForm from './TodoForm';
import EditTodoForm from './EditTodoForm'
import Todo from './Todo';
import {v4 as uuidv4} from 'uuid';
import { toast } from 'react-toastify';
uuidv4();

const TodoWrapper = () => {
    const[toDos, setTodos] = useState([])

    var newTodoDetails = null;

    localStorage.setItem("ToDos", JSON.stringify(toDos))

    const TodoDetails = JSON.parse(localStorage.getItem("ToDos"));
    // console.log("TodoDetails", TodoDetails);
    const TodoDetailsItems = TodoDetails.map((item) => {
      return({
        task:item.task,
        id:item.id,
        completed:item.completed,
        isEditing:item.isEditing
      })
    });
    // console.log("TodoDetailsItems1", TodoDetailsItems);
   
    const SortItem = () => {
        TodoDetailsItems.sort((a,b) => (a.task > b.task) ? 1 : ((b.task > a.task) ? -1 : 0))
        // console.log("TodoDetailsItems2", TodoDetailsItems);
        setTodos(TodoDetailsItems)
        toast.info("You have sorted the list")
      }
      // console.log("toDos", toDos);
    const FilterItem = (todo) => {
      let FilterToDos = TodoDetails.filter((ToDo)=>{
        return ToDo.task === todo ;
      });
      localStorage.setItem("newToDos", JSON.stringify(TodoDetails));
      setTodos(FilterToDos);
    }

    const ResetItems = () => {
      newTodoDetails = JSON.parse(localStorage.getItem("newToDos"));
      setTodos(newTodoDetails)
    }
    const addToDo = (todo) => {
        setTodos([...toDos, {id: uuidv4(), task: todo, completed: false, isEditing: false}])
        toast.success("You have added new task")
        
    }
    const toggleComplete = (id) =>{
        setTodos(toDos.map((todo) => todo.id === id ? {...todo, completed: !todo.completed} : todo))
        toast.info("Your task is completed")
    }
    const deleteToDo = (id) => {
      setTodos(toDos.filter((todo) => todo.id !== id))
      toast.warning("You have deleted the task")
    }
    const editTodo = (id) => {
      setTodos(toDos.map((todo) => todo.id === id ? {...todo, isEditing: !todo.isEditing} : todo))
    }

    const editTask = (task, id) => {
      setTodos(toDos.map((todo) => todo.id === id ? {...todo, task, isEditing: !todo.isEditing} : todo))
      toast.info("You have edited the task")
    }


    // console.log("todosList", toDos);
  return (
    <div className='TodoWrapper'>
      <h1>Create Your ToDo list</h1>
      <TodoForm addToDo={addToDo} SortItem={SortItem} FilterItem={FilterItem} ResetItems={ResetItems} toDos={toDos}/>

      {toDos.map((todo) => (
        todo.isEditing ? (
          <EditTodoForm editToDo={editTask} task={todo}/>
        ) : (
           <Todo task={todo} key={todo.id} 
           toggleComplete={toggleComplete} 
           deleteToDo={deleteToDo} editTodo={editTodo}  />
        )
      ))}
      
    </div>
  )
}

export default TodoWrapper;
