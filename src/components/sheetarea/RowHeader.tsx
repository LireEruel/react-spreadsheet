import { memo } from "react";
import { RowHeaderContainer } from "./SheetAreaStyles";
type RowHeaderProp = {
  row: number;
};

const RowHeader = memo(({ row }: RowHeaderProp) => {
  return <RowHeaderContainer> {row} </RowHeaderContainer>;
});

export default RowHeader;
