import { css } from '@emotion/react';

export const ANGOLA_STYLES = {
  color: {
    white: '#ffffff',
    gray: '#e5e5e5',
    dark: '#9a9a9a',
    text: '#404040',
    levels: [
      { fill: '#ff6666', text: '#ffffff' },
      { fill: '#f78e61', text: '#ffffff' },
      { fill: '#ffc83b', text: '#404040' },
      { fill: '#78d968', text: '#404040' },
      { fill: '#58D0E0', text: '#ffffff' },
      { fill: '#588EE0', text: '#ffffff' },
      { fill: '#C370E9', text: '#ffffff' },
      {
        fill: 'linear-gradient(90deg, rgba(255, 102, 102, 0.70) 0%, rgba(247, 142, 97, 0.70) 16.67%, rgba(255, 200, 59, 0.70) 33.68%, rgba(120, 217, 104, 0.70) 49.83%, rgba(88, 208, 224, 0.70) 65.63%, rgba(88, 142, 224, 0.70) 82.81%, rgba(195, 112, 233, 0.70) 99.48%)',
        text: '#404040',
      },
    ],
  },
  textSize: {
    symbol: '48px',
    titleLg: '24px',
    title: '20px',
    titleSm: '18px',
    text: '16px',
  },
  shadow: {
    input: {
      default: '0px 6px 0px 0px rgba(64, 64, 64, 0.50) inset',
      focus: `0px 6px 0px 0px #404040 inset`,
    },
    button: {
      default: '0px 6px 0px 0px #404040',
      hover: '0px 10px 0px 0px #404040',
    },
    buttonSm: {
      default: '0px 4px 0px 0px #404040',
      hover: '0px 6px 0px 0px #404040',
    },
  },
  border: {
    default: '2px solid #404040',
  },
} as const;

export const commonStyles = css`
  @font-face {
    font-family: 'MabinogiClassicR';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2207-01@1.0/MabinogiClassicR.woff2')
      format('woff2');
    font-weight: normal;
    font-style: normal;
  }
  body {
    background-color: ${ANGOLA_STYLES.color.gray};
    padding: 0 80px;
    margin: 0;
  }
  * {
    font-family: 'MabinogiClassicR';
    color: ${ANGOLA_STYLES.color.text};
    font-size: ${ANGOLA_STYLES.textSize.title};
  }
`;
