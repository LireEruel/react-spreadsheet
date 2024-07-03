import { memo } from "react";
import { RowHeaderContainer, ColumnHeaderItem } from "./SheetAreaStyles";

const ColumnHeader = memo(() => {
  const columns = Array.from({ length: 26 }, (_, i) =>
    String.fromCharCode(65 + i)
  );
  return (
    <>
      <RowHeaderContainer> </RowHeaderContainer>
      {columns.map((col) => (
        <ColumnHeaderItem key={col}>{col}</ColumnHeaderItem>
      ))}
    </>
  );
});

export default ColumnHeader;
