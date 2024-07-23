import { HyperFormula } from "hyperformula";
import { SheetData } from "../types";
type handleCtrlEventProps = {
  event: React.KeyboardEvent;
  hfInstance: HyperFormula;
  selectedCells: [[number, number], [number, number]];
  setSheetData: (data: SheetData) => void;
};

const handleCopyCells = (
  hfInstance: HyperFormula,
  selectedCells: [[number, number], [number, number]]
) => {
  hfInstance.copy({
    start: { sheet: 0, col: selectedCells[0][0], row: selectedCells[0][1] },
    end: { sheet: 0, col: selectedCells[1][0], row: selectedCells[1][1] },
  });
};

const handleCutCells = (
  hfInstance: HyperFormula,
  selectedCells: [[number, number], [number, number]]
) => {
  hfInstance.cut({
    start: { sheet: 0, col: selectedCells[0][0], row: selectedCells[0][1] },
    end: { sheet: 0, col: selectedCells[1][0], row: selectedCells[1][1] },
  });
};

const handlePasteCells = (
  hfInstance: HyperFormula,
  selectedCells: [[number, number], [number, number]],
  setSheetData: (newSheetData: SheetData) => void
) => {
  hfInstance.paste({
    sheet: 0,
    col: selectedCells[0][0],
    row: selectedCells[0][1],
  });
  const newSheetData = hfInstance.getSheetSerialized(0);

  const serializedSheetData = newSheetData.map((row) =>
    row.map((data) => (data ? data?.toString() : ""))
  );

  console.log(serializedSheetData);
  setSheetData(serializedSheetData);
};

export const handleCtrlEvent = ({
  event,
  hfInstance,
  selectedCells,
  setSheetData,
}: handleCtrlEventProps) => {
  const { key } = event;

  const normalizedKey = key.toLowerCase();
  switch (normalizedKey) {
    case "c":
      handleCopyCells(hfInstance, selectedCells);
      break;
    case "x":
      handleCutCells(hfInstance, selectedCells);
      break;
    case "v":
      handlePasteCells(hfInstance, selectedCells, setSheetData);
      break;
  }
};
