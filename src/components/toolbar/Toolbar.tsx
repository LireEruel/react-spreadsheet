import { CellInput, NameBox, ToolbarContainer } from "./ToolbarStyles";
import { useEffect, useState } from "react";
import { CellLocation } from "../../types";
import FormulaIcon from "../../assets/formula.svg?react";
import { numberToString } from "../util/numberToString";

type ToolbarProps = {
  selectedCells: [[number, number], [number, number]];
  handleChangedCell: ({ x, y }: CellLocation, value: string) => void;
  sheetData: string[][];
};
const Toolbar = ({
  selectedCells,
  handleChangedCell,
  sheetData,
}: ToolbarProps) => {
  const selectedCellsKey =
    numberToString(selectedCells[0][0]) + (selectedCells[0][1] + 1);
  const [selectedCellsValue, setSelectedCellsValue] = useState<string | number>(
    ""
  );

  useEffect(() => {
    setSelectedCellsValue(sheetData[selectedCells[0][1]][selectedCells[0][0]]);
  }, [selectedCells, sheetData]);

  const handleEditCell = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCellsValue(e.target.value);
    handleChangedCell(
      { x: selectedCells[0][0], y: selectedCells[0][1] },
      e.target.value
    );
  };

  return (
    <ToolbarContainer>
      <NameBox>{selectedCellsKey}</NameBox>
      <FormulaIcon width="17" height="17" />
      <CellInput
        value={selectedCellsValue}
        onChange={handleEditCell}
        tabIndex={0}
        contentEditable={true}
      />
    </ToolbarContainer>
  );
};

export default Toolbar;
