
import { useState } from 'react'
import './App.css'
import AddTodoComponent from './components/addTodoComponent'
import CardRenderComponent from './components/cardRenderComponent'
type Todo={
  title:string;
  description:string;
}
function App() {
  const [todos, setTodos]=useState<Todo[]>([]);
  function HandleDeleteTodo(index:number){
    setTodos(todos.filter((_,i)=>i!=index));
  }
  return (
    <div className='w-full min-h-screen bg-gray-600 text-white'>
      <AddTodoComponent setTodos={setTodos} todos={todos}/>
      <div className=''>
        {todos.map((todo,index)=>(
          <CardRenderComponent key={index} title={todo.title} description={todo.description} deleteTodo={()=>{HandleDeleteTodo(index)}}/>
        ))}
      </div>
    </div>
  )
}

export default App
