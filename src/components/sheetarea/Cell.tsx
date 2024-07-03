import { useCallback, memo } from "react";
import { EditingCell, CellContainer } from "./SheetAreaStyles";

type CellProps = {
  x: number;
  y: number;
  selected: boolean;
  isEditing: boolean;
  selectCell: (key: string) => void;
  setIsEditing: (value: boolean) => void;
  value: string;
  onChangedValue: ({ x, y }: { x: number; y: number }, value: string) => void;
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
  }: CellProps) => {
    const onClickCell = useCallback(() => {
      selectCell(`${x}${y}`);
    }, [selectCell, x, y]);
    const onDoubleClickCell = useCallback(() => {
      selectCell(`${x}${y}`);
      setIsEditing(true);
    }, [selectCell, setIsEditing, x, y]);

    const handleEditCell = (e: React.ChangeEvent<HTMLInputElement>) => {
      onChangedValue({ x, y }, e.target.value);
    };

    if (isEditing) {
      return (
        <EditingCell type="text" value={value} onChange={handleEditCell} />
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
