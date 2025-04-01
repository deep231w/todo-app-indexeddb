
const OpenRequest= indexedDB.open("todo-app",2);

OpenRequest.onsuccess=(e:any)=>{
    console.log("from success", e.target.result);
    const db= OpenRequest.result;
    const transaction= db.transaction("todos","readwrite");
    const objectStore= transaction.objectStore("todos")
    const request= objectStore.add({
        id:1,
        title:"gym",
        description:"go to gym"
    })
    request.onsuccess=(e:any)=>{
        console.log("from success", e.target.result)
    }
    request.onerror=(e:any)=>{
        console.log("error", e);
    }
}
OpenRequest.onupgradeneeded=(e:any)=>{
    const db=OpenRequest.result;
    if(!db.objectStoreNames.contains("todos")){
        const request= db.createObjectStore("todos",{keyPath:"id"});
        request.createIndex("title","title",{unique:false})
        request.createIndex("description","description",{unique:false})
    }
}
OpenRequest.onerror= (e:any)=>{
    console.log("error", e.target.error);
}