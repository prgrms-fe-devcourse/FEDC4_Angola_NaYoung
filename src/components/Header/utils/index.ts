import { NavigateFunction } from 'react-router-dom';

interface HandleClickTabBarProps {
  value: string;
  TARGET_VALUE?: string;
  navigate: NavigateFunction;
}

interface getTruncatedKeyword {
  keyword?: string;
}

export const handleClickTabBar = ({
  value,
  TARGET_VALUE,
  navigate,
}: HandleClickTabBarProps) => {
  if (value === 'user') {
    if (TARGET_VALUE === 'user') {
      return;
    }
    navigate('/search/user?sort=follower');
  }

  if (value === 'post') {
    if (TARGET_VALUE === 'post') {
      return;
    }
    navigate('/search/post?sort=recent');
  }
};

export const getTruncatedKeyword = ({ keyword }: getTruncatedKeyword) => {
  return keyword!.length > 6 ? keyword!.slice(0, 6) + '...' : keyword;
};
