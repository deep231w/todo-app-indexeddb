import React from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
type CardProps={
    title:string,
    description:string
}
const CardRenderComponent:React.FC<CardProps>=({title, description})=>{
    return(
        <div>
            <Card className="w-full max-w-md shadow-md border border-gray-300">
      <CardHeader>
        <CardTitle className="text-xl font-semibold">{title}</CardTitle>
        <CardDescription className="text-gray-500">{description}</CardDescription>
      </CardHeader>
    </Card>
        </div>
    );
}

export default CardRenderComponent;