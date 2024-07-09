import RowHeader from "./RowHeader";
import ColumnHeader from "./ColumnHeader";
import Cell from "./Cell";
import {
  SheetAreaContainer,
  ColumnHeaderContainer,
  RowContainer,
  Row,
  Selection,
} from "../../styles/SheetAreaStyles";
import { useCallback, useEffect, useRef, useState } from "react";
import { HyperFormula } from "hyperformula";
import { CellLocation } from "../../types";
import { numberToString } from "../util/numberToString";

type SheetAreaProp = {
  sheetData: string[][];
  hfInstance: HyperFormula | null;
  selectedCells: [[number, number], [number, number]];
  setSelectedCells: (value: [[number, number], [number, number]]) => void;
  handleChangedCell: ({ x, y }: CellLocation, value: string) => void;
};

export type SelectionInfo = {
  left: number;
  top: number;
  width: number;
  height: number;
  isTransparentBackground: boolean;
};

const SheetArea = ({
  sheetData,
  hfInstance,
  selectedCells,
  setSelectedCells,
  handleChangedCell,
}: SheetAreaProp) => {
  const SheetAreaContainerRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectionInfo, setSelectionInfo] = useState<SelectionInfo>();
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

  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = ({ x, y }: CellLocation) => {
    setSelectedCells([
      [x, y],
      [x, y],
    ]);
    setIsDragging(true);
  };

  const handleMouseOver = ({ x, y }: CellLocation) => {
    if (isDragging) {
      setSelectedCells([selectedCells[0], [x, y]]);
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const onSelectCell = (key: [[number, number], [number, number]]) => {
    setSelectedCells(key);
    setIsEditing(false);
  };

  const executeFormula = ({ x, y }: CellLocation) => {
    return hfInstance!.getCellValue({
      sheet: 0,
      col: x,
      row: y,
    });
  };

  const isSelectedRow = (rowIndex: number) => {
    return (
      Math.min(selectedCells[0][1], selectedCells[1][1]) <= rowIndex &&
      rowIndex <= Math.max(selectedCells[0][1], selectedCells[1][1])
    );
  };

  const isSelectedColumn = (columnIndex: number) => {
    return (
      Math.min(selectedCells[1][0], selectedCells[0][0]) <= columnIndex &&
      columnIndex <= Math.max(selectedCells[1][0], selectedCells[0][0])
    );
  };

  const calculateSelectionStyle = useCallback(() => {
    const tableElement = SheetAreaContainerRef.current!.getBoundingClientRect();
    const startCellElement = document
      .getElementById(
        `${numberToString(selectedCells[0][0])}${selectedCells[0][1]}`
      )!
      .getBoundingClientRect();
    const endCellElement = document
      .getElementById(
        `${numberToString(selectedCells[1][0])}${selectedCells[1][1]}`
      )!
      .getBoundingClientRect();

    const newSelectionInfo: SelectionInfo = {
      left:
        Math.min(startCellElement.left, endCellElement.left) -
        tableElement.left,
      top:
        Math.min(startCellElement.top, endCellElement.top) - tableElement.top,
      width:
        Math.max(startCellElement.left, endCellElement.left) -
        Math.min(startCellElement.left, endCellElement.left) +
        startCellElement.width,
      height:
        Math.max(startCellElement.top, endCellElement.top) -
        Math.min(startCellElement.top, endCellElement.top) +
        startCellElement.height,
      isTransparentBackground:
        selectedCells[0][0] === selectedCells[1][0] &&
        selectedCells[0][1] === selectedCells[1][1],
    };

    setSelectionInfo(newSelectionInfo);
  }, [selectedCells]);

  useEffect(() => {
    calculateSelectionStyle();
  }, [calculateSelectionStyle]);

  return (
    <SheetAreaContainer
      tabIndex={0}
      onKeyDown={(e) => handleKeyDown(e)}
      onMouseUp={handleMouseUp}
      ref={SheetAreaContainerRef}
    >
      <ColumnHeaderContainer>
        <ColumnHeader isSelectedColumn={isSelectedColumn} />
      </ColumnHeaderContainer>
      <RowContainer>
        {sheetData.map((row, rowIndex) => (
          <Row key={rowIndex}>
            <RowHeader row={rowIndex + 1} selected={isSelectedRow(rowIndex)} />
            {row.map((data, colIndex) => (
              <Cell
                key={`${colIndex}${rowIndex}`}
                x={colIndex}
                y={rowIndex}
                selected={
                  selectedCells[0][0] === colIndex &&
                  selectedCells[0][1] === rowIndex
                }
                isEditing={
                  selectedCells[0][0] === colIndex &&
                  selectedCells[0][1] === rowIndex &&
                  isEditing
                }
                selectCell={onSelectCell}
                setIsEditing={setIsEditing}
                value={data}
                onChangedValue={handleChangedCell}
                executeFormula={executeFormula}
                onMouseDown={handleMouseDown}
                onMouseOver={handleMouseOver}
                onMouseUp={handleMouseUp}
                isDragging={isDragging}
              />
            ))}
          </Row>
        ))}
      </RowContainer>
      {selectionInfo ? (
        <Selection
          width={selectionInfo.width}
          height={selectionInfo.height}
          top={selectionInfo.top}
          left={selectionInfo.left}
          isTransparentBackground={selectionInfo.isTransparentBackground}
        />
      ) : null}
    </SheetAreaContainer>
  );
};

export default SheetArea;
