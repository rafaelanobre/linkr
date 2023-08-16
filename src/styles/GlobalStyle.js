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
`

export default GlobalStyle;