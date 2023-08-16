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

    }
    h2{

    }
    h3{

    }
    h4{

    }
    h5{
        font-size: 19px;
    }
    p{
        font-size: 17px;
    }
`

export default GlobalStyle;