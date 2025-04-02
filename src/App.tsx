import './App.css'
import AddTodoComponent from './components/addTodoComponent'
import CardRenderComponent from './components/cardRenderComponent'
import { useFetchTodos } from './context/IndexeddbContext'
import { DeleteTodoFromIndexeddb as DeleteTodo } from './utils/indexeddb'

type Todo={
  id:number,
  title:string;
  description:string;
}
function App() {
  const {AddNewTodo, todos, setTodos}=useFetchTodos();

  async function HandleDeleteTodo(id:number){
    
    await DeleteTodo(id);
    setTodos(todos.filter((todo)=>todo.id!=id));
  }

  async function HandleAddTodo(todo:Todo){
    
    await AddNewTodo(todo);
  }
  return (
    <div className='w-full min-h-screen bg-gray-600 text-white'>
      <AddTodoComponent setTodos={HandleAddTodo} todos={todos}/>
      <div className=''>
        {todos.map((todo,id)=>(
          <CardRenderComponent key={id} title={todo.title} description={todo.description} deleteTodo={()=>HandleDeleteTodo(todo.id)}/>
        ))}
      </div>
    </div>
  )
}

export default App
