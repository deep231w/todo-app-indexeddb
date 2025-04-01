import { Input } from "./ui/input";
import { Button } from "./ui/button";
export default function AddTodoComponent(){

    return (
        <div className="flex items-center justify-center">
            <div className="flex flex-col gap-2 ">
                <Input className="text-white bg-black" type="text" placeholder="Title"/>
                <Input className="bg-black" type="text" placeholder="Description"/>
                <Button 
                    variant={"outline"}
                    className="bg-gray-800 text-white"
                    >Add Todo
                </Button>
            </div>
        </div>
    );
}