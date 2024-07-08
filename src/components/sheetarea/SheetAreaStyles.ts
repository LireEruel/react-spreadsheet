import styled from "styled-components";
export const SheetAreaContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  height: calc(100vh - 77px);
`;
export const TableCorner = styled.div`
  width: 50px;
  height: 24px;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-width: 1px 5px 5px 1px;
  flex-shrink: 0;
  box-sizing: border-box;
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
  height: ${(props) => props.theme.size.cell.height};
  background-color: ${(props) => props.theme.colors.slate[50]};
  text-align: center;
  line-height: ${(props) => props.theme.size.cell.height};
  position: sticky;
  left: 0;
  background: white;
  flex-shrink: 0;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-width: 0 1px 1px 0;
  box-sizing: border-box;
  user-select: none;
`;

export const ColumnHeaderItem = styled.div`
  height: 24px;
  width: ${(props) => props.theme.size.cell.width};
  text-align: center;
  flex-shrink: 0; /* Flex 아이템이 축소되지 않도록 설정 */
  line-height: 24px;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-width: 1px 1px 1px 0;
  box-sizing: border-box;
  user-select: none;
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
  width: ${(props) => props.theme.size.cell.width};
  height: ${(props) => props.theme.size.cell.height};
  border-width: ${(props) => (props.selected ? "3px" : "0 1px 1px 0")};
  border-style: solid;
  border-color: ${(props) =>
    props.selected
      ? props.theme.colors.blue[600]
      : props.theme.colors.gray[200]};
  flex-shrink: 0; /* Flex 아이템이 축소되지 않도록 설정 */
  padding: 0;
  box-sizing: border-box;
`;
