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
import { CellLocation, SheetData } from "../../types";
import { numberToString } from "../../util/numberToString";
import { transparentize } from "polished";
import { theme } from "../../assets/theme";
import { handleCtrlEvent } from "../../hooks/useKeyboardEvents";
import { times } from "lodash";
import { getSheetDataValue } from "../../util/getSheetDataValue";

type SheetAreaProp = {
  sheetData: SheetData;
  hfInstance: HyperFormula | null;
  selectedCells: [[number, number], [number, number]];
  setSelectedCells: (value: [[number, number], [number, number]]) => void;
  handleChangedCell: ({ x, y }: CellLocation, value: string) => void;
  setSheetData: (newSheetData: SheetData) => void;
};

export type SelectionInfo = {
  left: number;
  top: number;
  width: number;
  height: number;
  background: string;
};

const SheetArea = ({
  sheetData,
  hfInstance,
  selectedCells,
  setSelectedCells,
  handleChangedCell,
  setSheetData,
}: SheetAreaProp) => {
  const SheetAreaContainerRef = useRef<HTMLDivElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectionInfo, setSelectionInfo] = useState<SelectionInfo>();
  const [isDragging, setIsDragging] = useState(false);

  const checkToggleEditingMode = ({
    key,
    ctrlKey,
    altKey,
    metaKey,
  }: {
    key: string;
    ctrlKey: boolean;
    altKey: boolean;
    metaKey: boolean;
  }) => {
    const isSpecialKey =
      ctrlKey || altKey || metaKey || (key >= "F1" && key <= "F12");

    if (!isEditing && !isSpecialKey) {
      setIsEditing(true);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    const { key, ctrlKey, altKey, metaKey } = event;
    // 예외 키 필터링
    checkToggleEditingMode({ key, ctrlKey, altKey, metaKey });
    if (ctrlKey && hfInstance !== null) {
      handleCtrlEvent({ event, hfInstance, selectedCells, setSheetData });
    }
  };

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

    const scrollLeft =
      SheetAreaContainerRef.current?.scrollLeft != undefined
        ? SheetAreaContainerRef.current?.scrollLeft
        : 0;

    const scrollTop =
      SheetAreaContainerRef.current?.scrollTop != undefined
        ? SheetAreaContainerRef.current?.scrollTop
        : 0;

    const newSelectionInfo: SelectionInfo = {
      left:
        Math.min(startCellElement.left, endCellElement.left) -
        tableElement.left +
        scrollLeft,
      top:
        Math.min(startCellElement.top, endCellElement.top) -
        tableElement.top +
        scrollTop,
      width:
        Math.max(startCellElement.left, endCellElement.left) -
        Math.min(startCellElement.left, endCellElement.left) +
        startCellElement.width,
      height:
        Math.max(startCellElement.top, endCellElement.top) -
        Math.min(startCellElement.top, endCellElement.top) +
        startCellElement.height,
      background:
        selectedCells[0][0] === selectedCells[1][0] &&
        selectedCells[0][1] === selectedCells[1][1]
          ? "transparent"
          : transparentize(0.8, theme.colors.blue[300]),
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
        {times(100, (rowIndex: number) => (
          <Row key={rowIndex}>
            <RowHeader row={rowIndex + 1} selected={isSelectedRow(rowIndex)} />
            {times(26, (colIndex: number) => (
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
                value={getSheetDataValue(sheetData, colIndex, rowIndex)}
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
          background={selectionInfo.background}
        />
      ) : null}
    </SheetAreaContainer>
  );
};

export default SheetArea;
