import { DEFAULT_COLORS } from '@styles/contants';

const getRandomNumbers = () => {
  const numbers: number[] = [0, 1, 2, 3];
  const selectedNumbers: number[] = [];

  for (let i = 0; i < 2; i++) {
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const selectedNumber = numbers.splice(randomIndex, 1)[0];
    selectedNumbers.push(selectedNumber);
  }

  return selectedNumbers;
};

export const getRandomTwoColor = (): { colorA: string; colorB: string } => {
  const colors = Object.keys(DEFAULT_COLORS);
  const [indexA, indexB] = getRandomNumbers();

  return {
    colorA: DEFAULT_COLORS[colors[indexA]],
    colorB: DEFAULT_COLORS[colors[indexB]],
  };
};
