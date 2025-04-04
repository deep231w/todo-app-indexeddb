
type Todo={
    id:number,
    title:string,
    description:string
}

export function OpenDB():Promise<IDBDatabase>{
    return new Promise(( resolve, reject)=>{
        const OpenRequest= indexedDB.open("todo-app",1);
        OpenRequest.onupgradeneeded=(e:any)=>{
            console.log("from upgrade",e.target.result);
            const db= e.target.result;
            if(!db.objectStoreNames.contains("todos")){
                const store= db.createObjectStore("todos",{keyPath:"id"});
                store.createIndex("title","title",{unique:false});
                store.createIndex("description","description",{unique:false});
            }
        }

        OpenRequest.onsuccess=(e:any)=>{
            console.log("from success db created", e.target.result);
            resolve(e.target.result);
        }

        OpenRequest.onerror=(e:any)=>{
            console.log("from error", e.target.error);
            reject(e.target.reject);
        }
    })
}

export function AddTodoToIndexeddb(todo:Todo):Promise<void>{
    return new Promise(async(resolve,reject)=>{
        const db= await OpenDB();
        const transaction= db.transaction("todos","readwrite");
        const store= transaction.objectStore("todos");
        console.log("todo in indexeddb.ts:",todo)
        const request= store.add(todo);

        request.onsuccess=()=>{
            console.log("from success");
            resolve();
        }

        request.onerror= (e:any)=>{
            console.log("error ");
            reject(e.target.reject);
        }
    })
}

export function FetchTodoFromIndexeddb():Promise<Todo[]>{
    return new Promise(async (resolve, reject)=>{
        const db= await OpenDB();
        const transaction= db.transaction("todos","readonly")
        const store= transaction.objectStore("todos");
        const request= store.getAll();
        console.log(store.getAll());
        request.onsuccess=(e:any)=>{
            console.log("from success");
            resolve(e.target.result);
        }

        request.onerror=(e:any)=>{
            console.log("from error");
            reject(e.target.reject);
        }
    })
}

export function DeleteTodoFromIndexeddb(id:number):Promise<void>{
    return new Promise(async (resolve, reject)=>{
        const db= await OpenDB();
        const transaction= db.transaction("todos","readwrite");
        const store= transaction.objectStore("todos")
        const request= store.delete(id);

        request.onsuccess=()=>{
            console.log(`Todo with ID ${id} deleted successfully from IndexedDB.`);
            resolve();
        }
        request.onerror=(e:any)=>{
            console.log("from error", e.target.error);
            reject(e.target.error);
        }
    })
}