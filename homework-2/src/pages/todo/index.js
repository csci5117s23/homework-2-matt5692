/** @jsxImportSource @emotion/react */
import { header } from "@/styles/styles";
import { useState, useEffect } from "react";
import { TodoList } from "@/components/todo";
import { TodoBuilder } from "@/components/todo";
import Head from 'next/head'
import { useAuth } from "@clerk/nextjs";
import { getTodo, addTodo } from "@/modules/Data";
import { todoItem, customButton } from "@/styles/styles";

export default function Todo(){
    const [todoItemList, setTodoItemList] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newItemContent, setNewItemContent] = useState("");
    const { isLoaded, userId, sessionId, getToken } = useAuth();

    useEffect(() => {
        async function process() {
          if (userId) {
            const token = await getToken({ template: "codehooks" });
            const todoList = await getTodo(token);
            //sort based on slack discussion by Anwaar Hadi
            setTodoItemList(todoList.sort((a, b) => (a.createdOn <= b.createdOn) ? 1 : -1).filter(todoItem => !todoItem.done)); 
            setLoading(false);
          }
        }
        process();
      }, [isLoaded]);

    async function add() {
        const token = await getToken({ template: "codehooks" });
        const newTodo = await addTodo(token, newItemContent);
        setNewItemContent("");
    }

    if(loading){
        return(<><span>LOADING</span></>);
    } else{
    return (
        <>
          <Head>
            <title>Todo list home</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
          </Head>
          <div className="pure-g">
                <div className="pure-u-1" css={header}>
                    <h2>Your todo list</h2>
                    <TodoList todoItems={todoItemList}></TodoList>
                    <div css={todoItem}>
                        <input name="content" id="contentInput" value={newItemContent} onChange={(e) => setNewItemContent(e.target.value)}></input>
                        <button onClick={add} className="pure-button-primary" css={customButton}>Add</button>
                    </div>
                </div>
            </div>
        </>
      )
    }
}