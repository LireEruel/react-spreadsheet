import { useState, useCallback, memo } from "react";
import { EditingCell, CellContainer } from "./SheetAreaStyles";

type CellProps = {
  x: string;
  y: number;
  selected: boolean;
  isEditing: boolean;
  selectCell: (key: string) => void;
  setIsEditing: (value: boolean) => void;
};

export const Cell = memo(
  ({ x, y, selected, isEditing, selectCell, setIsEditing }: CellProps) => {
    const [value, setValue] = useState("");
    const onClickCell = useCallback(() => {
      selectCell(`${x}${y}`);
    }, [selectCell, x, y]);
    const onDoubleClickCell = useCallback(() => {
      selectCell(`${x}${y}`);
      setIsEditing(true);
    }, [selectCell, setIsEditing, x, y]);

    if (isEditing) {
      return (
        <EditingCell
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      );
    } else {
      return (
        <CellContainer
          selected={selected}
          onClick={onClickCell}
          onDoubleClick={onDoubleClickCell}
        >
          {value}
        </CellContainer>
      );
    }
  }
);

export default Cell;
