/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

export const navbar = css`
    line-height: 1.7em;
    background-color: #E3ABB5;

    a {
        color: #008393;
    }

    a:hover{
        background-color: #F5D9E2;
    }
`
export const header = css`
    text-align: center;
    width: 80%;
    height: 70%;
    position: absolute;
    top: 20px; left: 0; bottom: 0; right: 0;
    margin: auto;

    & h1{
        font-size: 3em;
        font-weight: bold;
        padding: 1em 1.6em;
        font-weight: 100;
        border-radius: 5px;
        line-height: 1em;
    }
    `