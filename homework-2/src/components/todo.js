/** @jsxImportSource @emotion/react */
import { useState } from "react";
import { todoItem } from "@/styles/styles";
import { customButton } from "@/styles/styles";
import { li } from "@/styles/styles";

export default function TodoItem({content}){
    const [done, setDone] = useState(false);

    if(!done){
        return(<>
            <div css={todoItem}>
                <span>{content}</span>
                <button className="pure-button-primary" onClick={() => setDone(!done)} css={customButton}>Done</button>
            </div>
        </>);
    }
    else{
        return(<>
            <div css={todoItem}>
                <span>{content} this is done</span>
                <button className="pure-button-primary" onClick={() => setDone(!done)} css={customButton}>Done</button>
            </div>
        </>);
    }
}

// map example from https://www.telerik.com/blogs/beginners-guide-loops-in-react-jsx
export function TodoList({todoItems}){
    return(<><ul>
            {todoItems.map(todoItem => (
                <li css={li}>
                    <TodoItem content={todoItem.content}></TodoItem>
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