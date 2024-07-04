import styled from "styled-components";

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  gap: 10px;
  background-color: #f9fbfd;
`;

export const FileNameInput = styled.input`
  visibility: visible;
  width: 193px;
  background: none;
  border-radius: 4px !important;
  padding: 1px 6px;
  color: gray;
  border: 1px solid transparent;
  font-size: 18px;
  font-variant-ligatures: no-contextual;
  height: 20px;
  line-height: 22px;
  margin: 0;
  min-width: 1px;
  &:focus {
    border: 2px solid #0b57d0 !important;
    border-radius: 4px !important;
    box-shadow: none;
    color: #1f1f1f;
    margin: 0 -1px;
    outline: none;
  }
  &:hover {
    border: 2px solid gray;
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
  color: #202124;
  cursor: pointer;
  font-size: 14px;
  letter-spacing: 0.2px;
  outline: none;
  background-color: transparent;
  font-size: 1rem;

  &:hover {
    background-color: #e8ebee;
  }
`;
