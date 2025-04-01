
import './App.css'
import AddTodoComponent from './components/addTodoComponent'
import CardRenderComponent from './components/cardRenderComponent'
function App() {

  return (
    <div className='w-full min-h-screen bg-gray-600 text-white'>
      <AddTodoComponent />
      <CardRenderComponent title='title' description='description'/>
    </div>
  )
}

export default App
