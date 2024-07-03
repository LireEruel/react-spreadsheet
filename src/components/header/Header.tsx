import { useState } from "react";
import {
  HeaderContainer,
  FileNameInput,
  FileButton,
  ButtonsContainer,
} from "./HeaderStyles";

type HeaderProps = {
  sheetData: string[][];
};
const Header = ({ sheetData }: HeaderProps) => {
  const [fileName, setFileName] = useState("제목 없는 스프레드 시트");

  const convertToCSV = (data: string[][]) => {
    return data
      .slice(1)
      .map((row, index) => (index == 0 ? "" : row.join(",")))
      .join("\n");
  };

  const onClickDownloadButton = () => {
    const csvData = convertToCSV(sheetData);
    const blob = new Blob([csvData], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.setAttribute("href", url);
    a.setAttribute("download", "data.csv");
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <HeaderContainer>
      <FileNameInput
        value={fileName}
        onChange={(e) => setFileName(e.target.value)}
      />
      <ButtonsContainer>
        <FileButton onClick={onClickDownloadButton}>CSV 다운로드</FileButton>
      </ButtonsContainer>
      {/* 기타 메뉴 아이템들 */}
    </HeaderContainer>
  );
};

export default Header;
