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
import { HyperFormula } from "hyperformula";
import { CellLocation } from "../../types";

type SheetAreaProp = {
  sheetData: string[][];
  hfInstance: HyperFormula | null;
  selectedCell: [number, number];
  setSelectedCell: (value: [number, number]) => void;
  handleChangedCell: ({ x, y }: CellLocation, value: string) => void;
};
const SheetArea = ({
  sheetData,
  hfInstance,
  selectedCell,
  setSelectedCell,
  handleChangedCell,
}: SheetAreaProp) => {
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

  const onSelectCell = (key: [number, number]) => {
    setSelectedCell(key);
    setIsEditing(false);
  };

  const executeFormula = ({ x, y }: CellLocation) => {
    return hfInstance!.getCellValue({
      sheet: 0,
      col: x,
      row: y,
    });
  };

  return (
    <SheetAreaContainer tabIndex={0} onKeyDown={(e) => handleKeyDown(e)}>
      <ColumnHeaderContainer>
        <ColumnHeader />
      </ColumnHeaderContainer>
      <RowContainer>
        {sheetData.map((row, rowIndex) => (
          <Row key={rowIndex}>
            <RowHeader row={rowIndex + 1} />
            {row.map((data, colIndex) => (
              <Cell
                key={`${colIndex}${rowIndex}`}
                x={colIndex}
                y={rowIndex}
                selected={
                  selectedCell[0] === colIndex && selectedCell[1] === rowIndex
                }
                isEditing={
                  selectedCell[0] === colIndex &&
                  selectedCell[1] === rowIndex &&
                  isEditing
                }
                selectCell={onSelectCell}
                setIsEditing={setIsEditing}
                value={data}
                onChangedValue={handleChangedCell}
                executeFormula={executeFormula}
              />
            ))}
          </Row>
        ))}
      </RowContainer>
    </SheetAreaContainer>
  );
};

export default SheetArea;
