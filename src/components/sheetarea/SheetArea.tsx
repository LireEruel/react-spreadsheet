import RowHeader from "./RowHeader";
import ColumnHeader from "./ColumnHeader";
import Cell from "./Cell";
import {
  SheetAreaContainer,
  ColumnHeaderContainer,
  RowContainer,
  Row,
} from "./SheetAreaStyles";
import { useCallback, useState } from "react";

const SheetArea = () => {
  const rows = Array.from({ length: 100 }, (_, i) => i + 1);
  const columns = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  const [selectedCell, setSelectedCell] = useState("A1");
  const [isEditing, setIsEditing] = useState(false);
  const handleKeyDown = useCallback((event: React.KeyboardEvent) => {
    const { key, ctrlKey, altKey, metaKey } = event;
    // 예외 키 필터링
    const isSpecialKey =
      ctrlKey || altKey || metaKey || (key >= "F1" && key <= "F12");

    if (!isSpecialKey) {
      setIsEditing(true);
    }
  }, []);

  const onSelectCell = useCallback((key: string) => {
    setSelectedCell(key);
    setIsEditing(false);
  }, []);

  return (
    <SheetAreaContainer tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      <ColumnHeaderContainer>
        <ColumnHeader columns={columns} />
      </ColumnHeaderContainer>
      <RowContainer>
        {rows.map((row) => (
          <Row key={row}>
            <RowHeader row={row} />
            {columns.map((col) => (
              <Cell
                key={`${col}${row}`}
                x={col}
                y={row}
                selected={selectedCell === `${col}${row}`}
                isEditing={selectedCell === `${col}${row}` && isEditing}
                selectCell={onSelectCell}
                setIsEditing={setIsEditing}
              />
            ))}
          </Row>
        ))}
      </RowContainer>
    </SheetAreaContainer>
  );
};

export default SheetArea;
