import { TableCorner, ColumnHeaderItem } from "../../styles/SheetAreaStyles";
import { numberToString } from "../../util/numberToString";

type ColumnHeaderProps = {
  isSelectedColumn: (columnIndex: number) => boolean;
  col: number;
  handleSelectAllCells: () => void;
};

const ColumnHeader = ({
  isSelectedColumn,
  col,
  handleSelectAllCells,
}: ColumnHeaderProps) => {
  const columns = Array.from({ length: col }, (_, i) => numberToString(i));
  return (
    <>
      <TableCorner onClick={handleSelectAllCells}> </TableCorner>
      {columns.map((col, colIndex) => (
        <ColumnHeaderItem key={col} selected={isSelectedColumn(colIndex)}>
          {col}
        </ColumnHeaderItem>
      ))}
    </>
  );
};

export default ColumnHeader;
