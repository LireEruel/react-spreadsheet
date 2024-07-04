import { useCallback, memo, useRef, useEffect } from "react";
import { EditingCell, CellContainer } from "./SheetAreaStyles";
import { CellLocation } from "../../types";
import { CellValue, DetailedCellError } from "hyperformula";

type CellProps = {
  x: number;
  y: number;
  selected: boolean;
  isEditing: boolean;
  selectCell: (key: [number, number]) => void;
  setIsEditing: (value: boolean) => void;
  value: string;
  onChangedValue: ({ x, y }: CellLocation, value: string) => void;
  executeFormula: ({ x, y }: CellLocation) => CellValue | DetailedCellError;
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
  }: CellProps) => {
    const inputValueRef = useRef<HTMLInputElement>(null);
    const onClickCell = useCallback(() => {
      selectCell([x, y]);
    }, [selectCell, x, y]);
    const onDoubleClickCell = useCallback(() => {
      selectCell([x, y]);
      setIsEditing(true);
    }, [selectCell, setIsEditing, x, y]);

    const handleEditCell = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangedValue({ x, y }, e.target.value);
    };

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

    useEffect(() => {
      if (isEditing) {
        if (inputValueRef.current !== null) {
          inputValueRef.current.focus();
        }
      }
    }, [isEditing]);

    return (
      <>
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
            onClick={onClickCell}
            onDoubleClick={onDoubleClickCell}
          >
            {determineDisplay()}
          </CellContainer>
        )}
      </>
    );
  }
);

export default Cell;
