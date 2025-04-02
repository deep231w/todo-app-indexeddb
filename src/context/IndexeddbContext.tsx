import { createContext, ReactNode, useContext, useState } from "react";
import { AddTodoToIndexeddb as AddToDb} from '../utils/indexeddb'

type Todo={
    id:number,
    title:string,
    description:string
}
type Todos= {
    todos:Todo[];
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const FetchTodoContext= createContext<Todos | null>(null);

export const IndexeddbContextProvider= ({children}:{children:ReactNode})=>{
    const [todos, setTodos]=useState<Todo[]>([]);

    return(
        <FetchTodoContext.Provider value={{todos, setTodos}}>
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