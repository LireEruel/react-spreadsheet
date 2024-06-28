import RowHeader from "./RowHeader";
import ColumnHeader from "./ColumnHeader";
import Cell from "./Cell";
import {
  SheetAreaContainer,
  ColumnHeaderContainer,
  RowContainer,
  Row,
} from "./SheetAreaStyles";

const SheetArea = () => {
  const rows = Array.from({ length: 100 }, (_, i) => i + 1);
  const columns = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );

  return (
    <SheetAreaContainer>
      <ColumnHeaderContainer>
        <ColumnHeader columns={columns} />
      </ColumnHeaderContainer>
      <RowContainer>
        {rows.map((row) => (
          <Row key={row}>
            <RowHeader row={row} />
            {columns.map((col) => (
              <Cell key={`${col}${row}`} />
            ))}
          </Row>
        ))}
      </RowContainer>
    </SheetAreaContainer>
  );
};

export default SheetArea;
