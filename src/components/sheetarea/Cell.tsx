import { useState } from "react";
import { CellContainer } from "./SheetAreaStyles";
const Cell = () => {
  const [value, setValue] = useState("");

  return (
    <CellContainer
      type="text"
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
};

export default Cell;
