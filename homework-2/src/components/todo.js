/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { todoItem, todoItemDone, customButton, li } from "@/styles/styles";
import { updateTodo, getTodo } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function TodoItem({todo, updateList}){
    const [done, setDone] = useState(todo.done);
    const { getToken } = useAuth();

    async function changeDone(){
        const token = await getToken({ template: "codehooks" });
        todo.done = !todo.done;
        const updatedTodo = await updateTodo(token, todo);
        setDone(!done);

        //update list in todo or done
        const newList = await getTodo(token);
        updateList(newList);
    }

    const url = '/todo/' + todo._id;
    if(!todo.done){
        return(<>
            <div css={todoItem}>
                <Link href={url}>{todo.content}</Link>
                <button className="pure-button-primary" onClick={changeDone} css={customButton}>Done</button>
            </div>
        </>);
    }
    else{
        return(<>
            <div css={todoItemDone}>
                <Link href={url}>{todo.content}</Link>
                <button className="pure-button-primary" onClick={changeDone} css={customButton}>Done</button>
            </div>
        </>);
    }
}

// map example from https://www.telerik.com/blogs/beginners-guide-loops-in-react-jsx
export function TodoList({todoItems, updateList}){
    return(<><ul>
            {todoItems.map(todoItem => (
                <li css={li}>
                    <TodoItem todo={todoItem} updateList={updateList}></TodoItem>
                </li>
            ))}
        </ul></>);
}

export function TodoId({todo}){
    const [done, setDone] = useState(todo.done);
    const [newTodoContent, setNewTodoContent] = useState(todo.content);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    async function update(){
        const token = await getToken({ template: "codehooks" });
        todo.content = newTodoContent;
        await updateTodo(token, todo);
    }

    async function changeDone(){
        const token = await getToken({ template: "codehooks" });
        todo.done = !todo.done;
        const updatedTodo = await updateTodo(token, todo);
        setDone(!done);
    }
    if(!done){
        return(<>
            <div css={todoItem}>
                <input value={newTodoContent} onChange={(e) => setNewTodoContent(e.target.value)}></input>
                <button className="pure-button-primary" onClick={update} css={customButton}>Save</button>
                <button className="pure-button-primary" onClick={changeDone} css={customButton}>Done</button>
            </div>
        </>);
    } else {
        return(<>
            <div css={todoItemDone}>
                <input value={newTodoContent} onChange={(e) => setNewTodoContent(e.target.value)}></input>
                <button className="pure-button-primary" onClick={update} css={customButton}>Save</button>
                <button className="pure-button-primary" onClick={changeDone} css={customButton}>Done</button>
            </div>
        </>);
    }
    
}