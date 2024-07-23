import { useState } from "react";
import {
  HeaderContainer,
  FileNameInput,
  FileButton,
  ButtonsContainer,
} from "../../styles/HeaderStyles";
import { getFileName } from "../util/getFileName";
import { FocusEvent } from "react";

type HeaderProps = {
  sheetData: string[][];
  fileName: string;
  setFileName: (fileName: string) => void;
};
const Header = ({ sheetData, fileName, setFileName }: HeaderProps) => {
  const [curtFileName, setCurtFileName] = useState(getFileName(fileName));
  const convertToCSV = (data: string[][]) => {
    return data
      .slice(1)
      .map((row, index) => (index == 0 ? "" : row.join(",")))
      .join("\n");
  };

  const handleFocus = (event: FocusEvent) => {
    if (
      fileName.trim().length == 0 &&
      event.target instanceof HTMLInputElement
    ) {
      event.target.select();
    }
  };

  const handleBlur = () => {
    setFileName(curtFileName);
    setCurtFileName(getFileName(curtFileName));
  };

  const onClickDownloadButton = () => {
    const csvData = convertToCSV(sheetData);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", `${getFileName(fileName)}.csv`);
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <HeaderContainer>
      <FileNameInput
        value={curtFileName}
        onChange={(e) => setCurtFileName(e.target.value)}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
      <ButtonsContainer>
        <FileButton onClick={onClickDownloadButton}>CSV 다운로드</FileButton>
      </ButtonsContainer>
      {/* 기타 메뉴 아이템들 */}
    </HeaderContainer>
  );
};

export default Header;
