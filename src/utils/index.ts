export const getPathname = (segment: number) => {
  return location.pathname.split('/')[segment];
};

export { parseQueryString } from '@utils/parseQueryString';
export {
  joinDataBySeparator,
  splitCommentBySeparator,
  splitPostBySeparator,
} from '@utils/parseDataBySeparator';

export { voteRatio } from '@utils/voteRatio';
export { pxToRem } from '@utils/pxToRem';
export { calculateLevel, getUserLevelInfo } from '@utils/calculateUserLevel';
export {
  checkFullNamePattern,
  checkPassWordPattern,
} from '@utils/userAuthentication';
