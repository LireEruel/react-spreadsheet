import { TableCorner, ColumnHeaderItem } from "./SheetAreaStyles";
import { numberToString } from "../util/numberToString";

type ColumnHeaderProps = {
  isSelectedColumn: (columnIndex: number) => boolean;
};

const ColumnHeader = ({ isSelectedColumn }: ColumnHeaderProps) => {
  const columns = Array.from({ length: 26 }, (_, i) => numberToString(i));
  return (
    <>
      <TableCorner> </TableCorner>
      {columns.map((col, colIndex) => (
        <ColumnHeaderItem key={col} selected={isSelectedColumn(colIndex)}>
          {col}
        </ColumnHeaderItem>
      ))}
    </>
  );
};

export default ColumnHeader;
