export const getPathname = (segment: number) => {
  return location.pathname.split('/')[segment];
};

export { parseQueryString } from '@utils/parseQueryString';
export {
  joinDataBySeparator,
  splitCommentBySeparator,
  splitPostBySeparator,
} from '@utils/parseDataBySeparator';
export { getRandomTwoColor } from '@utils/getRandomTwoColor';
