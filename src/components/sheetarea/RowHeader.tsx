import { RowHeaderContainer } from "./SheetAreaStyles";
type RowHeaderProp = {
  row: number;
};

const RowHeader = ({ row }: RowHeaderProp) => {
  return <RowHeaderContainer> {row} </RowHeaderContainer>;
};

export default RowHeader;
