import Header from "./components/header/Header";
import Toolbar from "./components/toolbar/Toolbar";
import SheetArea from "./components/sheetarea/SheetArea";
import { AppContainer, GlobalStyle } from "./AppStyles";
import { useRef, useState } from "react";
import { HyperFormula } from "hyperformula";
import { CellLocation } from "./types";
import { ThemeProvider } from "styled-components";
import { theme } from "./assets/theme";
import { cloneDeep } from "lodash";
import { getFileName } from "./components/util/getFileName";

const App = () => {
  const [fileName, setFileName] = useState("");
  const [sheetData, setSheetData] = useState([[""]]);
  const [selectedCells, setSelectedCells] = useState<
    [[number, number], [number, number]]
  >([
    [0, 0],
    [0, 0],
  ]);
  const hfInstanceRef = useRef<HyperFormula | null>(null); // ref로 선언하지 않으면, 렌더링마다 변수가 초기화되기 때문에 ref로 해야 함.

  if (hfInstanceRef.current === null) {
    hfInstanceRef.current = HyperFormula.buildEmpty({ licenseKey: "gpl-v3" });
    hfInstanceRef.current.addSheet();
  }

  const handleChangedCell = ({ x, y }: CellLocation, value: string) => {
    const newSheetData = cloneDeep(sheetData);
    if (!newSheetData[y]) {
      newSheetData[y] = [];
      newSheetData[y][x] = value;
    } else {
      newSheetData[y][x] = value;
    }
    setSheetData(newSheetData);
    hfInstanceRef.current!.setCellContents({ sheet: 0, row: y, col: x }, value);
  };

  return (
    <ThemeProvider theme={theme}>
      <title>{getFileName(fileName)}</title>
      <AppContainer>
        <GlobalStyle />
        <Header
          sheetData={sheetData}
          fileName={fileName}
          setFileName={setFileName}
        />
        <Toolbar
          selectedCells={selectedCells}
          handleChangedCell={handleChangedCell}
          sheetData={sheetData}
        />
        <SheetArea
          sheetData={sheetData}
          hfInstance={hfInstanceRef.current}
          selectedCells={selectedCells}
          setSelectedCells={setSelectedCells}
          handleChangedCell={handleChangedCell}
          setSheetData={setSheetData}
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
