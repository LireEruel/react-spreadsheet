import Header from "./components/header/Header";
import Toolbar from "./components/toolbar/Toolbar";
import SheetArea from "./components/sheetarea/SheetArea";
import { AppContainer, GlobalStyle } from "./AppStyles";

const App = () => {
  return (
    <AppContainer>
      <GlobalStyle />
      <Header />
      <Toolbar />
      <SheetArea />
    </AppContainer>
  );
};

export default App;
