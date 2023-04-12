//Backend helper functions modeled after tech stack demo

const base_url = 'https://homework2-6xkl.api.codehooks.io/dev';

export async function getTodo(authToken) {
    const result = await fetch(base_url+"/todo",{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    return await result.json();
}

export async function getTodoById(authToken, id) {
    const result = await fetch(base_url+"/todo/"+id,{
        'method':'GET',
        'headers': {'Authorization': 'Bearer ' + authToken}
    })
    if(result.status == 403){
        return 403;
    }
    return await result.json();
}

export async function addTodo(authToken, todo) {
    const result = await fetch(base_url+"/todo",{
        'method':'POST',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify({content: todo, done: false})
    })
    return await result.json();
}

export async function updateDone(authToken, todo) {
    const result = await fetch(base_url+"/todo/"+todo._id,{
        'method':'PUT',
        'headers': {'Authorization': 'Bearer ' + authToken,
        'Content-Type': 'application/json'},
        'body': JSON.stringify(todo)
    })
    return await result.json();
}
