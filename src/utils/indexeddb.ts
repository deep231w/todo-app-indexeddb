
type Todo={
    id:string,
    title:string,
    description:string
}

export function OpenDB():Promise<IDBDatabase>{
    return new Promise(( resolve, reject)=>{
        const OpenRequest= indexedDB.open("todo-app",1);
        OpenRequest.onupgradeneeded=(e:any)=>{
            console.log("from upgrade",e.target.result);
            const db= OpenRequest.result;
            if(!db.objectStoreNames.contains("todos")){
                const store= db.createObjectStore("todos",{keyPath:"id"});
                store.createIndex("title","title",{unique:false});
                store.createIndex("description","description",{unique:false});
            }
        }

        OpenRequest.onsuccess=(e:any)=>{
            console.log("from success db created", e.target.result);
            resolve(e);
        }

        OpenRequest.onerror=(e:any)=>{
            console.log("from error", e.target.error);
            reject(e);
        }
    })
}

export function AddTodoToIndexeddb(todos:Todo):Promise<void>{
    return new Promise(async(reject,resolve)=>{
        const db= await OpenDB();
        const transaction= db.transaction("todos","readwrite");
        const store= transaction.objectStore("todos");

        const request= store.add(todos);

        request.onsuccess=()=>{
            console.log("from success");
            resolve();
        }

        request.onerror= (e:any)=>{
            console.log("error ");
            reject(e);
        }
    })
}






















// const OpenRequest= indexedDB.open("todo-app",2);

// export function AddTodoToIndexeddb({id,title, description}:Todo){OpenRequest.onsuccess=(e:any)=>{
//     console.log("from success", e.target.result);
//     const db= OpenRequest.result;
//     const transaction= db.transaction("todos","readwrite");
//     const objectStore= transaction.objectStore("todos")
//     const request= objectStore.add({
//         id:id,
//         title:title,
//         description:description
//     })
//     request.onsuccess=(e:any)=>{
//         console.log("from success", e.target.result)
//     }
//     request.onerror=(e:any)=>{
//         console.log("error", e);
//     }
// }
// OpenRequest.onupgradeneeded=(e:any)=>{
//     const db=OpenRequest.result;
//     if(!db.objectStoreNames.contains("todos")){
//         const request= db.createObjectStore("todos",{keyPath:"id"});
//         request.createIndex("title","title",{unique:false})
//         request.createIndex("description","description",{unique:false})
//     }
// }
// OpenRequest.onerror= (e:any)=>{
//     console.log("error", e.target.error);
// }}