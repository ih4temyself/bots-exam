import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
    @font-face {
        font-family: 'Satoshi-Regular';
        src: url('../assets/fonts/Satoshi-Regular.ttf') format('truetype');
        font-weight: normal;
        font-style: normal;
    }

    @font-face {
        font-family: 'Satoshi-Bold';
        src: url('../assets/fonts/Satoshi-Bold.ttf') format('truetype');
        font-weight: bold;
        font-style: normal;
    }

    html, body {
        font-family: 'Satoshi-Regular', sans-serif;
        background-color: #140C1F;
        color: white;
        margin: 0;
        padding: 0;
        height: 100%;
    }
    
`;

export default GlobalStyles;
