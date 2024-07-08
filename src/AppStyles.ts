import styled, { createGlobalStyle } from "styled-components";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
`;

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
    width: 100%;
    color: ${(props) => props.theme.colors.gray[900]};
    font-weight: 400;
    font-size: 11px;
    font-family: Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  }

  #root {
    display: flex;
    flex-direction: column;
    height: 100%;    
    width: 100%;
  }
`;
