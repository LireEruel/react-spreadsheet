import Header from "./components/header/Header";
import Toolbar from "./components/toolbar/Toolbar";
import SheetArea from "./components/sheetarea/SheetArea";
import { AppContainer, GlobalStyle } from "./AppStyles";
import { useState } from "react";

const App = () => {
  const [sheetData, setSheetData] = useState(
    Array.from(Array(50), () => Array(26).fill(""))
  );

  return (
    <AppContainer>
      <GlobalStyle />
      <Header sheetData={sheetData} />
      <Toolbar />
      <SheetArea sheetData={sheetData} setSheetData={setSheetData} />
    </AppContainer>
  );
};

export default App;
