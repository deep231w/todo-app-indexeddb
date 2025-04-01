import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
type CardProps={
    title:string,
    description:string,
    deleteTodo:()=>void
}
const CardRenderComponent:React.FC<CardProps>=({title, description,deleteTodo})=>{
    return(
        <div>
            <Card className="w-full max-w-md shadow-md border border-gray-300">
                <CardHeader>
                    <CardTitle className="text-xl font-semibold">{title}</CardTitle>
                    <CardDescription className="text-gray-500">{description}</CardDescription>
                </CardHeader>
                <Button 
                    variant="destructive"
                    className=""
                    onClick={deleteTodo}
                >Delete Todo</Button>
            </Card>
        </div>
    );
}

export default CardRenderComponent;