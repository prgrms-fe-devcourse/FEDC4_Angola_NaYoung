// 현재 브라우저의 기본 글꼴 크기를 가져오는 함수
const getBaseFontSize = () => {
  const html = document.querySelector('html');
  const computedStyle = window.getComputedStyle(html as HTMLHtmlElement);
  const fontSize = computedStyle.getPropertyValue('font-size');
  return parseFloat(fontSize);
};

// 동적으로 baseFontSize를 설정
export const baseFontSize = getBaseFontSize();

// px를 rem으로 변환하는 함수
export const pxToRem = (pxValue: number) => {
  return `${pxValue / baseFontSize}rem`;
};
