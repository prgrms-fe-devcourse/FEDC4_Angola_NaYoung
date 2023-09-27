import { POST_CONTENTS } from '../constants';

export const useContentClassName = (voteValue: string | undefined) => {
  const getClassName = (value: string) => {
    return voteValue === value ? POST_CONTENTS.ACTIVE_CLASS : '';
  };

  return getClassName;
};
