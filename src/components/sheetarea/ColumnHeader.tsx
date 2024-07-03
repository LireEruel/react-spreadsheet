import { memo } from "react";
import { RowHeaderContainer, ColumnHeaderItem } from "./SheetAreaStyles";

type ColumnHeader = {
  columns: string[];
};

const ColumnHeader = memo(({ columns }: ColumnHeader) => {
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
