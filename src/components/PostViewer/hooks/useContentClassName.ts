import { POST_CONTENTS } from '../constants';

interface useContentClassNameProps {
  isPostPage: boolean;
  voteValue?: string;
}
export const useContentClassName = ({
  isPostPage,
  voteValue,
}: useContentClassNameProps) => {
  const getClassName = (value: string) => {
    return isPostPage && voteValue === value ? POST_CONTENTS.ACTIVE_CLASS : '';
  };

  return getClassName;
};
