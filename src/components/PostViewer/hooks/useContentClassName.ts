interface useContentClassNameProps {
  isPostPage: boolean;
  voteValue?: string;
}
export const useContentClassName = ({
  isPostPage,
  voteValue,
}: useContentClassNameProps) => {
  const getClassName = (value: string) => {
    return isPostPage && voteValue === value ? 'active' : '';
  };
  return getClassName;
};
