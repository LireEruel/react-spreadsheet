import { useCallback, memo, useRef, useEffect } from "react";
import { EditingCell, CellContainer } from "./SheetAreaStyles";
import { CellLocation } from "../../types";
import { CellValue, DetailedCellError } from "hyperformula";
import { numberToString } from "../util/numberToString";

type CellProps = {
  x: number;
  y: number;
  selected: boolean;
  isEditing: boolean;
  selectCell: (key: [[number, number], [number, number]]) => void;
  setIsEditing: (value: boolean) => void;
  value: string;
  onChangedValue: ({ x, y }: CellLocation, value: string) => void;
  executeFormula: ({ x, y }: CellLocation) => CellValue | DetailedCellError;
  isDragging: boolean;
  onMouseDown: ({ x, y }: CellLocation) => void;
  onMouseOver: ({ x, y }: CellLocation) => void;
  onMouseUp: () => void;
};

export const Cell = memo(
  ({
    x,
    y,
    selected,
    isEditing,
    selectCell,
    setIsEditing,
    value,
    onChangedValue,
    executeFormula,
    isDragging,
    onMouseDown,
    onMouseOver,
    onMouseUp,
  }: CellProps) => {
    const inputValueRef = useRef<HTMLInputElement>(null);

    const determineDisplay = useCallback(() => {
      if (value.slice(0, 1) === "=") {
        const res = executeFormula({ x, y });
        //파싱에 실패한 경우
        if (typeof res === "object") {
          return "ERROR! ";
        } else {
          return res;
        }
      } else {
        return value;
      }
    }, [executeFormula, value, x, y]);

    const onDoubleClickCell = useCallback(() => {
      selectCell([
        [x, y],
        [x, y],
      ]);
      setIsEditing(true);
    }, [selectCell, setIsEditing, x, y]);

    const handleEditCell = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        onChangedValue({ x, y }, e.target.value);
      },
      [onChangedValue, x, y]
    );

    const handleMouseDown = useCallback(() => {
      if (!isDragging) {
        onMouseDown({ x, y });
        setIsEditing(false);
      }
    }, [isDragging, onMouseDown, setIsEditing, x, y]);

    const handleMouseOver = () => {
      if (isDragging) {
        onMouseOver({ x, y });
      }
    };

    const handleMouseUp = () => {
      if (isDragging) {
        onMouseUp();
      }
    };
    useEffect(() => {
      if (isEditing) {
        if (inputValueRef.current !== null) {
          inputValueRef.current.focus();
        }
      }
    }, [isEditing]);

    return (
      <div id={`${numberToString(x)}${y}`}>
        {isEditing ? (
          <EditingCell
            type="text"
            value={value}
            onChange={handleEditCell}
            ref={inputValueRef}
          />
        ) : (
          <CellContainer
            selected={selected}
            onDoubleClick={onDoubleClickCell}
            onMouseDown={handleMouseDown}
            onMouseOver={handleMouseOver}
            onMouseUp={handleMouseUp}
          >
            {determineDisplay()}
          </CellContainer>
        )}
      </div>
    );
  }
);

export default Cell;
