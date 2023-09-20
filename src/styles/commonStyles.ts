export const ANGOLA_STYLES = {
  color: {
    white: '#ffffff',
    gray: '#e5e5e5',
    dark: '#9a9a9a',
    text: '#404040',
    black: '#000000',
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
    buttonXs: {
      default: '0px 2px 0px 0px #404040',
      hover: '0px 4px 0px 0px #404040',
    },
  },
  border: {
    default: '2px solid #404040',
    hover: '3px solid #404040',
  },
} as const;
