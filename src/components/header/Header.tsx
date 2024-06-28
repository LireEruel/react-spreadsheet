import { HeaderContainer, FileNameInput } from "./HeaderStyles";

const Header = () => {
  return (
    <HeaderContainer>
      <FileNameInput placeholder="제목 없는 스프레드 시트" />
      <span>파일</span>
      <span>수정</span>
      {/* 기타 메뉴 아이템들 */}
    </HeaderContainer>
  );
};

export default Header;
