import { CellInput, NameBox, ToolbarContainer } from "./ToolbarStyles";
import { useEffect, useState } from "react";
import { CellLocation } from "../../types";
import FormulaIcon from "../../assets/formula.svg?react";

type ToolbarProps = {
  selectedCell: [number, number];
  handleChangedCell: ({ x, y }: CellLocation, value: string) => void;
  sheetData: string[][];
};
const Toolbar = ({
  selectedCell,
  handleChangedCell,
  sheetData,
}: ToolbarProps) => {
  const selectedCellKey =
    String.fromCharCode(65 + selectedCell[0]) + (selectedCell[1] + 1);

  const [selectedCellValue, setSelectedCellValue] = useState<string | number>(
    ""
  );

  useEffect(() => {
    setSelectedCellValue(sheetData[selectedCell[1]][selectedCell[0]]);
  }, [selectedCell, sheetData]);

  const handleEditCell = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCellValue(e.target.value);
    handleChangedCell(
      { x: selectedCell[0], y: selectedCell[1] },
      e.target.value
    );
  };

  return (
    <ToolbarContainer>
      <NameBox>{selectedCellKey}</NameBox>
      <FormulaIcon width="17" height="17" />
      <CellInput
        value={selectedCellValue}
        onChange={handleEditCell}
        tabIndex={0}
        contentEditable={true}
      />
    </ToolbarContainer>
  );
};

export default Toolbar;
