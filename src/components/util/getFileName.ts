export const getFileName = (fileName: string): string => {
  return fileName.trim().length > 0 ? fileName : "제목 없는 스프레드 시트";
};
