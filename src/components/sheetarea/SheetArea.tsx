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
  const [selectedCell, setSelectedCell] = useState("A1");
  const [isEditing, setIsEditing] = useState(false);
  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent) => {
      const { key, ctrlKey, altKey, metaKey } = event;
      // 예외 키 필터링
      const isSpecialKey =
        ctrlKey || altKey || metaKey || (key >= "F1" && key <= "F12");

      if (!isEditing && !isSpecialKey) {
        setIsEditing(true);
      }
    },
    [isEditing]
  );

  const [sheetData, setSheetData] = useState(
    Array.from(Array(50), () => Array(26).fill(""))
  );

  const onSelectCell = useCallback((key: string) => {
    setSelectedCell(key);
    setIsEditing(false);
  }, []);

  const handleChangedCell = (
    { x, y }: { x: number; y: number },
    value: string
  ) => {
    const newSheetData = sheetData.map((row, rowIndex) => {
      if (rowIndex === y) {
        row[x] = value;
      }
      return row;
    });
    setSheetData(newSheetData);
  };

  return (
    <SheetAreaContainer tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      <ColumnHeaderContainer>
        <ColumnHeader />
      </ColumnHeaderContainer>
      <RowContainer>
        {sheetData.map((row, rowIndex) => (
          <Row key={rowIndex}>
            <RowHeader row={rowIndex} />
            {row.map((data, colIndex) => (
              <Cell
                key={`${colIndex}${rowIndex}`}
                x={colIndex}
                y={rowIndex}
                selected={selectedCell === `${colIndex}${rowIndex}`}
                isEditing={
                  selectedCell === `${colIndex}${rowIndex}` && isEditing
                }
                selectCell={onSelectCell}
                setIsEditing={setIsEditing}
                value={data}
                onChangedValue={handleChangedCell}
              />
            ))}
          </Row>
        ))}
      </RowContainer>
    </SheetAreaContainer>
  );
};

export default SheetArea;
