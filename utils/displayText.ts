// 텍스트 예외처리 함수
export const displayText = (value?: string | null) => {
  return value?.trim() ? value : "정보 없음";
};
