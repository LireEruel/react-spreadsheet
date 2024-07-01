import styled from "styled-components";

export const SheetAreaContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  height: calc(100vh - 77px);
`;

export const ColumnHeaderContainer = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background: white;
  z-index: 1;
  width: 100%;
  box-sizing: border-box;
`;

export const RowContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
`;

export const RowHeaderContainer = styled.div`
  width: 50px;
  height: 30px;
  background-color: #f9f9f9;
  text-align: center;
  line-height: 30px;
  position: sticky;
  left: 0;
  background: white;
  flex-shrink: 0;
  border: 1px solid gray;
  box-sizing: border-box;
`;

export const ColumnHeaderItem = styled.div`
  width: 100px;
  background-color: #f9f9f9;
  text-align: center;
  flex-shrink: 0; /* Flex 아이템이 축소되지 않도록 설정 */
  border: 1px solid gray;
  padding: 3px 0;
  box-sizing: border-box;
`;

export const EditingCell = styled.input`
  width: 100px;
  height: 30px;
  border: 3px solid darkblue;
  flex-shrink: 0; /* Flex 아이템이 축소되지 않도록 설정 */
  padding: 0;
  &:focus {
    outline: none; /* 기본 outline 제거 */
  }
  box-sizing: border-box;
`;

type CellContainerProps = {
  selected: boolean;
};

export const CellContainer = styled.div<CellContainerProps>`
  width: 100px;
  height: 30px;
  border: ${(props) => (props.selected ? "3px" : "1px")} solid
    ${(props) => (props.selected ? "blue" : "gray")};
  flex-shrink: 0; /* Flex 아이템이 축소되지 않도록 설정 */
  padding: 0;
  box-sizing: border-box;
`;
