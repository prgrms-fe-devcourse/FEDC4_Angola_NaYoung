import { ANGOLA_STYLES } from '@styles/commonStyles';
import { User } from '@type/index';

const LEVEL_EMOJI = ['🌱', '🥚', '🐣', '🐥', '🐔', '🕊️', '🐉', '👑'];

export const calculateLevel = (user: User): number => {
  const score = user.comments.length + user.posts.length;
  if (score > 60) return 7;
  if (score <= 10) return Math.floor((score + 4) / 10);
  return Math.floor(score / 10) + 1;
};

export const getUserLevelInfo = (level: number) => {
  return {
    userColor: ANGOLA_STYLES.color.levels[level].fill,
    userEmoji: LEVEL_EMOJI[level],
  };
};
