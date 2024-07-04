import Header from "./components/header/Header";
import Toolbar from "./components/toolbar/Toolbar";
import SheetArea from "./components/sheetarea/SheetArea";
import { AppContainer, GlobalStyle } from "./AppStyles";
import { useRef, useState } from "react";
import { HyperFormula } from "hyperformula";

const App = () => {
  const [sheetData, setSheetData] = useState(
    Array.from(Array(50), () => Array(26).fill(""))
  );
  const hfInstanceRef = useRef<HyperFormula | null>(null); // ref로 선언하지 않으면, 렌더링마다 변수가 초기화되기 때문에 ref로 해야 함.

  if (hfInstanceRef.current === null) {
    hfInstanceRef.current = HyperFormula.buildEmpty({ licenseKey: "gpl-v3" });
    hfInstanceRef.current.addSheet();
  }

  return (
    <AppContainer>
      <GlobalStyle />
      <Header sheetData={sheetData} />
      <Toolbar />
      <SheetArea
        sheetData={sheetData}
        setSheetData={setSheetData}
        hfInstance={hfInstanceRef.current}
      />
    </AppContainer>
  );
};

export default App;
