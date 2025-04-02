import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import { AddTodoToIndexeddb as AddToDb} from '../utils/indexeddb'
import { FetchTodoFromIndexeddb as GetAllTodo } from "../utils/indexeddb";

type Todo={
    id:number,
    title:string,
    description:string
}

type Todos= {
    todos:Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
    AddNewTodo: (todo: Todo) => Promise<void>;
    FetchTodos:()=>Promise<void>;
}

const FetchTodoContext= createContext<Todos | null>(null);

export const IndexeddbContextProvider= ({children}:{children:ReactNode})=>{
    const [todos, setTodos]=useState<Todo[]>([]);

    const AddNewTodo=async (todo:Todo)=>{
        await AddToDb(todo);
       setTodos((prev)=>[...prev,todo]);
    }
    const FetchTodos= async()=>{
        const FetchTodofromDb= await GetAllTodo();
        setTodos(FetchTodofromDb);
    }

    useEffect(()=>{
        FetchTodos();
    },[])
    return(
        <FetchTodoContext.Provider value={{todos, setTodos,AddNewTodo,FetchTodos}}>
            {children}
        </FetchTodoContext.Provider>
    )
}

export const useFetchTodos= ()=>{
    const context= useContext(FetchTodoContext);
    if(!context){
        throw new Error(" must be used within AuthProvider")
    }
    return context;
}