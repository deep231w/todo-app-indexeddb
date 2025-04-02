import './App.css'
import AddTodoComponent from './components/addTodoComponent'
import CardRenderComponent from './components/cardRenderComponent'
import { useFetchTodos } from './context/IndexeddbContext'

type Todo={
  id:number,
  title:string;
  description:string;
}
function App() {
  const {AddNewTodo, todos, setTodos}=useFetchTodos();

  function HandleDeleteTodo(index:number){
     setTodos(todos.filter((_,i)=>i!=index));
  }

  async function HandleAddTodo(todo:Todo){
    
    await AddNewTodo(todo);
  }
  return (
    <div className='w-full min-h-screen bg-gray-600 text-white'>
      <AddTodoComponent setTodos={HandleAddTodo} todos={todos}/>
      <div className=''>
        {todos.map((todo,index)=>(
          <CardRenderComponent key={index} title={todo.title} description={todo.description} deleteTodo={()=>{HandleDeleteTodo(index)}}/>
        ))}
      </div>
    </div>
  )
}

export default App
