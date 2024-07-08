import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  background-color: ${(props) => props.theme.colors.slate[50]};
`;

export const FileNameInput = styled.input`
  visibility: visible;
  width: 220px;
  background: none;
  border-radius: 4px !important;
  padding: 1px 6px;
  color: ${(props) => props.theme.colors.gray[600]};
  border: 1px solid transparent;
  font-size: 18px;
  font-variant-ligatures: no-contextual;
  height: 22px;
  line-height: 18px;
  margin: 0;
  min-width: 1px;
  box-sizing: border-box;
  &:focus {
    border: 2px solid ${(props) => props.theme.colors.blue[600]} !important;
    border-radius: 4px !important;
    box-shadow: none;
    color: ${(props) => props.theme.colors.gray[800]};
    margin: 0 -1px;
    outline: none;
  }
  &:hover {
    border: 1px solid ${(props) => props.theme.colors.gray[600]};
  }
`;

export const ButtonsContainer = styled.div`
  display: flex;
`;

export const FileButton = styled.button`
  margin-bottom: -4px;
  margin-top: 8px;
  padding: 2px 7px;
  overflow: hidden;
  vertical-align: text-bottom;
  border: 1px solid transparent;
  border-radius: 4px;
  box-shadow: none;
  color: ${(props) => props.theme.colors.gray[800]};
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0.2px;
  outline: none;
  background-color: transparent;
  font-size: 1rem;

  &:hover {
    background-color: ${(props) => props.theme.colors.gray[200]};
  }
`;
