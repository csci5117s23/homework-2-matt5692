/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const palepink = "#F5D9E2";
const pink = "#E3ABB5";
const darkblue = "#008393";

export const navbar = css`
    line-height: 1.7em;
    background-color: ${pink};

    a {
        color: ${darkblue};
    }

    a:hover{
        background-color: ${palepink};
    }
`

export const header = css`
    text-align: center;
    width: 80%;
    height: 70%;
    position: absolute;
    top: 20px; left: 0; bottom: 0; right: 0;
    margin: auto;

    h1{
        font-size: 5em;
        font-weight: bold;
        padding: 1em 1.6em;
        font-weight: 100;
        border-radius: 5px;
        line-height: 1em;
    }
    `

export const todoItem = css`
    text-align: center;
    border-radius: 8px;
    border-style: solid;
    font-size: 1.5em;
    background-color: ${palepink};

    a {
        text-decoration: none;
        color: black;
    }
`

export const todoItemDone = css`
    text-align: center;
    border-radius: 8px;
    border-style: solid;
    font-size: 1.5em;
    background-color: grey;

    a {
        text-decoration: line-through;
        color: black;
    }

    input {
        text-decoration: line-through;
    }
`

export const customButton = css `
    margin-left: 10px;
    margin-right: 10px;
    border-radius: 4px;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
    background-color: ${darkblue};
    margin-top:10px;
    margin-bottom:10px;
    color: white;
`

export const li = css`
    list-style-type: none;
    margin-bottom: 10px;
    margin-top: 10px;
`

export const userButton = css`
    margin-left: 20px;
    margin-right: 10px;
`
