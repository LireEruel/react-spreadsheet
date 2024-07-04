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
  setSheetData: (value: string[][]) => void;
  hfInstance: HyperFormula | null;
};
const SheetArea = ({ sheetData, setSheetData, hfInstance }: SheetAreaProp) => {
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

  const onSelectCell = (key: string) => {
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
  const handleChangedCell = ({ x, y }: CellLocation, value: string) => {
    const newSheetData = sheetData.map((row, rowIndex) => {
      if (rowIndex === y) {
        row[x] = value;
      }
      return row;
    });
    setSheetData(newSheetData);
    hfInstance!.setCellContents({ sheet: 0, row: y, col: x }, value);
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
                selected={selectedCell === `${colIndex}${rowIndex}`}
                isEditing={
                  selectedCell === `${colIndex}${rowIndex}` && isEditing
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
