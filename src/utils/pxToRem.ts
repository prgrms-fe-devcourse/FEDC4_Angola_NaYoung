// 현재 브라우저의 기본 글꼴 크기를 가져오는 함수
const getBaseFontSize = () => {
  const html = document.querySelector('html');
  const computedStyle = window.getComputedStyle(html as HTMLHtmlElement);
  const fontSize = computedStyle.getPropertyValue('font-size');
  return parseFloat(fontSize);
};

const baseFontSize = getBaseFontSize();

export const pxToRem = (pxValue: number | string) => {
  if (typeof pxValue === 'string') {
    pxValue = Number(pxValue.replace('px', ''));
  }
  return `${pxValue / baseFontSize}rem`;
};
