import styled from "styled-components";

export const ToolbarContainer = styled.div`
  display: flex;
  padding: 10px;
  align-items: center;
  gap: 1rem;
`;

export const NameBox = styled.span`
  width: 5rem;
  border-right: 1px solid ${(props) => props.theme.colors.gray[300]};
`;

export const CellInput = styled.input`
  background-color: rgb(255, 255, 255);
  font-weight: normal;
  text-decoration: none;
  font-style: normal;
  color: ${(props) => props.theme.colors.gray[800]};
  font-family: Google Sans, Roboto, sans-serif;
  height: calc(100% - 2px);
  margin-top: 2px;
  word-wrap: break-word;
  width: 100%;
  border: none;
  padding: none;
  font-size: 1rem;
  &:focus {
    outline: none; /* 기본 outline 제거 */
  }
`;
