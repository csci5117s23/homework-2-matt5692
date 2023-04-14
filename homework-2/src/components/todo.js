/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { todoItem } from "@/styles/styles";
import { customButton } from "@/styles/styles";
import { li } from "@/styles/styles";
import { updateDone } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";

export default function TodoItem({todo}){
    const [done, setDone] = useState(todo.done);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    async function changeDone(){
        const token = await getToken({ template: "codehooks" });
        todo.done = !todo.done;
        const updatedTodo = await updateDone(token, todo);
        setDone(!done);
    }

    let url = '/todo/' + todo._id;
    if(!done){
        return(<>
            <div css={todoItem}>
                <Link href={url}>{todo.content}</Link>
                <button className="pure-button-primary" onClick={changeDone} css={customButton}>Done</button>
            </div>
        </>);
    }
    else{
        return(<>
            <div css={todoItem}>
                <Link href={url}>{todo.content} this is done</Link>
                <button className="pure-button-primary" onClick={changeDone} css={customButton}>Done</button>
            </div>
        </>);
    }
}

// map example from https://www.telerik.com/blogs/beginners-guide-loops-in-react-jsx
export function TodoList({todoItems}){
    return(<><ul>
            {todoItems.map(todoItem => (
                <li css={li}>
                    <TodoItem todo={todoItem}></TodoItem>
                </li>
            ))}
        </ul></>);
}

export function TodoBuilder({onAdd}){
    function handleSubmit(e){
        e.preventDefault();

        const content = document.querySelector("#contentInput");
        

        onAdd(content.value);

        content.value = "";
    }

    return(<>
        <div css={todoItem}>
            <form className="pure-form" onSubmit={handleSubmit}>
                <label>
                    <input name="content" id="contentInput"></input>
                </label>
                <button type="submit" className="pure-button-primary" css={customButton}>Add</button>
            </form>
        </div>
    </>);
}

export function TodoId({todo}){
    const [newTodoContent, setNewTodoContent] = useState(todo.content);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    async function update(){
        const token = await getToken({ template: "codehooks" });
        todo.content = newTodoContent;
        await updateDone(token, todo);
    }

    async function changeDone(){
        const token = await getToken({ template: "codehooks" });
        todo.done = !todo.done;
        const updatedTodo = await updateDone(token, todo);
    }
    return(<>
        <div css={todoItem}>
            <input value={newTodoContent} onChange={(e) => setNewTodoContent(e.target.value)}></input>
            <button className="pure-button-primary" onClick={update} css={customButton}>Save</button>
            <button className="pure-button-primary" onClick={changeDone} css={customButton}>Done</button>
        </div>
    </>);
}