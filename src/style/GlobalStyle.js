import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
    * {
        box-sizing: border-box;
        font-family: 'Lato', sans-serif;
        font-style: normal;
        font-weight: 400;
    }

        html, body, #root {
        min-height: 100vh;
        color: #ffffff;
    }

    body {
        font-family: 'Lato', sans-serif;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background-color: #333333;
        overflow-x: hidden;
    }
    h1{
        font-family: Oswald;
        font-size: 2.7em;
        font-weight: 700;
        padding-bottom: 1em;
        padding-top: 1em;
    }
    h2{
        color: #707070;
        font-family: Lato;
        font-size: 20px;
        font-weight: 300;
    }
    h3{
        font-family: Oswald;
        font-size: 1.7em;
        font-weight: 700;
    }
    h4{

    }
    h5{
        font-size: 19px;
    }
    p{
        font-size: 17px;
        line-height: 120%;
    }
`

export default GlobalStyle;