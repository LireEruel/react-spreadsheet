import { RowHeaderContainer } from "./SheetAreaStyles";
type RowHeaderProp = {
  row: number;
  selected: boolean;
};

const RowHeader = ({ row, selected }: RowHeaderProp) => {
  return <RowHeaderContainer selected={selected}> {row} </RowHeaderContainer>;
};

export default RowHeader;
