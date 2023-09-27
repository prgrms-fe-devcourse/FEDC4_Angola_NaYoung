import type { User } from '@type';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import type { Archives } from '@type/level';

const LEVEL_EMOJI = ['🌱', '🥚', '🐣', '🐥', '🐔', '🕊️', '🐉', '👑'];

const makeScoreToLevel = (score: number) => {
  if (score > 60) return 7;
  if (score <= 10) return Math.floor((score + 4) / 10);
  return Math.floor(score / 10) + 1;
};

export const calculateLevelByArchives = (archives: Archives) => {
  const score = archives.commentsLength + archives.postsLength;
  return makeScoreToLevel(score);
};

export const calculateLevel = (user: User): number => {
  const score = user.posts.length + user.comments.length;
  return makeScoreToLevel(score);
};

export const getUserLevelInfo = (level: number) => {
  return {
    userColor: ANGOLA_STYLES.color.levels[level].fill,
    userEmoji: LEVEL_EMOJI[level],
  };
};
