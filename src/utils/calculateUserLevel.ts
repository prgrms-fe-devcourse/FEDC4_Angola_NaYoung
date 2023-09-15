import { User } from '@type/index';

const LEVEL_INFO = [
  { color: '#5F5F5F', emoji: '🌱' },
  { color: '#FF6666', emoji: '🥚' },
  { color: '#F78E61', emoji: '🐣' },
  { color: '#FFC83B', emoji: '🐥' },
  { color: '#78D968', emoji: '🐔' },
  { color: '#58D0E0', emoji: '🐲' },
  { color: '#588EE0', emoji: '🐉' },
  { color: '#C370E9', emoji: '👑' },
];

export const calculateLevel = (user: User): number => {
  const score = user.comments.length + user.posts.length;
  if (score > 60) return 7;
  if (score <= 10) return Math.floor((score + 4) / 10);
  return Math.floor(score / 10) + 1;
};

export const getUserLevelInfo = (level: number) => {
  return {
    userColor: LEVEL_INFO[level].color,
    userEmoji: LEVEL_INFO[level].emoji,
  };
};
