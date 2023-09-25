interface PostData {
  title: string;
  a: string;
  b: string;
}

const ANGOLA_SEPARATOR = import.meta.env.VITE_ANGOLA_SEPARATOR;

interface CommentData {
  vote: string;
  comment?: string;
}

export const joinDataBySeparator = (...targets: string[]): string => {
  return targets
    .map((target) => target.replace(ANGOLA_SEPARATOR, ''))
    .join(ANGOLA_SEPARATOR);
};

export const splitPostBySeparator = (target: string): PostData => {
  const [title, a, b] = target.split(ANGOLA_SEPARATOR);
  return { title, a, b };
};

export const splitCommentBySeparator = (target: string): CommentData => {
  const [vote, comment] = target.split(ANGOLA_SEPARATOR);
  return comment ? { vote, comment } : { vote };
};
