/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { todoItem } from "@/styles/styles";
import { customButton } from "@/styles/styles";
import { li } from "@/styles/styles";
import { updateDone } from "@/modules/Data";
import { useAuth } from "@clerk/nextjs";

export default function TodoItem({todo}){
    const [done, setDone] = useState(todo.done);
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    async function changeDone(){
        const token = await getToken({ template: "codehooks" });
        todo.done = !todo.done;
        console.log(todo.done);
        const updatedTodo = await updateDone(token, todo);
        setDone(!done);

    }

    if(!done){
        return(<>
            <div css={todoItem}>
                <span>{todo.content}</span>
                <button className="pure-button-primary" onClick={changeDone} css={customButton}>Done</button>
            </div>
        </>);
    }
    else{
        return(<>
            <div css={todoItem}>
                <span>{todo.content} this is done</span>
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