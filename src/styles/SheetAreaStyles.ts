import { transparentize } from "polished";
import styled from "styled-components";
import { SelectionInfo } from "../components/sheetarea/SheetArea";
export const SheetAreaContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  overflow: auto;
  width: 100%;
  height: calc(100vh - 77px);
  position: relative;
`;
export const TableCorner = styled.div`
  width: 50px;
  height: 24px;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-width: 1px 5px 5px 1px;
  flex-shrink: 0;
  box-sizing: border-box;
  position: sticky;
  z-index: 4;
  background-color: white;
  left: 0;
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

type RowHeaderContainer = {
  selected: boolean;
};

export const RowHeaderContainer = styled.div<RowHeaderContainer>`
  width: 50px;
  height: ${(props) => props.theme.size.cell.height};
  background-color: ${(props) =>
    props.selected ? props.theme.colors.blue[200] : "white"};
  text-align: center;
  line-height: ${(props) => props.theme.size.cell.height};
  position: sticky;
  left: 0;
  flex-shrink: 0;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-width: 0 1px 1px 0;
  box-sizing: border-box;
  user-select: none;
  z-index: 3;
`;
type ColumnHeaderItemProps = {
  selected: boolean;
};

export const ColumnHeaderItem = styled.div<ColumnHeaderItemProps>`
  height: 24px;
  width: ${(props) => props.theme.size.cell.width};
  text-align: center;
  flex-shrink: 0; /* Flex 아이템이 축소되지 않도록 설정 */
  line-height: 24px;
  border: 1px solid ${(props) => props.theme.colors.gray[300]};
  border-width: 1px 1px 1px 0;
  box-sizing: border-box;
  user-select: none;
  background-color: ${(props) =>
    props.selected
      ? transparentize(0.8, props.theme.colors.blue[600])
      : "transparent"};
`;

export const EditingCell = styled.input`
  width: ${(props) => props.theme.size.cell.width};
  height: ${(props) => props.theme.size.cell.height};
  border: 3px solid ${(props) => props.theme.colors.blue[800]};
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
  user-select: none;
  line-height: ${(props) => props.theme.size.cell.height};
  font-size: 12px;
`;

export const Selection = styled.div<SelectionInfo>`
  position: absolute;
  background-color: ${(props) => props.background};
  top: ${(props) => props.top}px;
  left: ${(props) => props.left}px;
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
  border: 1px solid ${(props) => props.theme.colors.blue[600]};
  pointer-events: none;
  box-sizing: border-box;
`;
