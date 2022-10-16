import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyles = createGlobalStyle`
    ${reset};

    html {
      font-size: 10px;
    }

    body {
        padding: 0;
        margin: 0;
        font-size: 1.6rem;
        font-family: 'Inter';
        overflow-x: hidden;
    };

    ::-webkit-scrollbar {
      width: 5px;
      z-index: 9;
    }

    ::-webkit-scrollbar-thumb {
      width: 100%;
      border-radius: 10px;
      background: #D9D9D9;
    }

    ::-webkit-scrollbar-track {
      width: 100%;
      background-color: transparent;
    }

    a {
      text-decoration: none;
      color: #000;
    }

    *, *::before, *::after {
      box-sizing: border-box;
    }
`;

export default GlobalStyles;
