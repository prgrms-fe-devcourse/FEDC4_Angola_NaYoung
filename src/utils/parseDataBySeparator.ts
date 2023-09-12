const ANGOLA_SEPARATOR = '№ДъΨ∬ ㉿ ∛❀♭♨';

interface PostData {
  title: string;
  a: string;
  b: string;
}

interface CommentData {
  vote: string;
  comment?: string;
}

export const joinDataBySeparator = (...targets: string[]): string => {
  return targets.join(ANGOLA_SEPARATOR);
};

export const splitPostBySeparator = (target: string): PostData => {
  const [title, a, b] = target.split(ANGOLA_SEPARATOR);
  return { title, a, b };
};

export const splitCommentBySeparator = (target: string): CommentData => {
  const [vote, comment] = target.split(ANGOLA_SEPARATOR);
  return { vote, comment };
};
