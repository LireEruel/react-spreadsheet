export const getSheetDataValue = (
  sheetData: string[][],
  columnIndex: number,
  rowIndex: number
): string => {
  let answer = "";
  if (
    sheetData.length > rowIndex &&
    sheetData[rowIndex] &&
    sheetData[rowIndex].length > columnIndex &&
    sheetData[rowIndex][columnIndex] !== null &&
    sheetData[rowIndex][columnIndex] !== undefined
  ) {
    answer = sheetData[rowIndex][columnIndex];
  }

  return answer;
};
