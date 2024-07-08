import Header from "./components/header/Header";
import Toolbar from "./components/toolbar/Toolbar";
import SheetArea from "./components/sheetarea/SheetArea";
import { AppContainer, GlobalStyle } from "./AppStyles";
import { useRef, useState } from "react";
import { HyperFormula } from "hyperformula";
import { CellLocation } from "./types";
import { ThemeProvider } from "styled-components";
import { theme } from "./assets/theme";

const App = () => {
  const [sheetData, setSheetData] = useState(
    Array.from(Array(50), () => Array(26).fill(""))
  );
  const [selectedCell, setSelectedCell] = useState<[number, number]>([0, 0]);
  const hfInstanceRef = useRef<HyperFormula | null>(null); // ref로 선언하지 않으면, 렌더링마다 변수가 초기화되기 때문에 ref로 해야 함.

  if (hfInstanceRef.current === null) {
    hfInstanceRef.current = HyperFormula.buildEmpty({ licenseKey: "gpl-v3" });
    hfInstanceRef.current.addSheet();
  }

  const handleChangedCell = ({ x, y }: CellLocation, value: string) => {
    const newSheetData = sheetData.map((row, rowIndex) => {
      if (rowIndex === y) {
        row[x] = value;
      }
      return row;
    });
    setSheetData(newSheetData);
    hfInstanceRef.current!.setCellContents({ sheet: 0, row: y, col: x }, value);
  };

  return (
    <ThemeProvider theme={theme}>
      <AppContainer>
        <GlobalStyle />
        <Header sheetData={sheetData} />
        <Toolbar
          selectedCell={selectedCell}
          handleChangedCell={handleChangedCell}
          sheetData={sheetData}
        />
        <SheetArea
          sheetData={sheetData}
          hfInstance={hfInstanceRef.current}
          selectedCell={selectedCell}
          setSelectedCell={setSelectedCell}
          handleChangedCell={handleChangedCell}
        />
      </AppContainer>
    </ThemeProvider>
  );
};

export default App;
