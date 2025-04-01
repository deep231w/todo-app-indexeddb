import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";

type Todo={
    title:string;
    description:string;
}
type Props={
    setTodos:(todos:Todo[])=>void;
    todos:Todo[];
}
export default function AddTodoComponent({setTodos,todos}:Props){
    const [title, setTitle]=useState("");
    const [description, setDescription]=useState("");

    function AddTodoHandler(){
        if(!title.trim() || !description.trim())return;

        console.log("title",title);
        console.log("description",description)
        const newTodo={title,description}
        setTodos([...todos, newTodo]);
        setTitle("");
        setDescription("");
    }
    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-2 ">
                <Input 
                    onChange={(e)=>{setTitle(e.target.value)}}
                    className="text-white bg-black" 
                    type="text" 
                    placeholder="Title"
                    value={title}
                />
                <Input 
                    value={description}
                    onChange={(e)=> setDescription(e.target.value)}
                    className="bg-black" 
                    type="text" 
                    placeholder="Description"
                />
                <Button 
                    variant={"outline"}
                    className="bg-gray-800 text-white"
                    onClick={AddTodoHandler}
                    >Add Todo
                </Button>
            </div>
        </div>
    );
}