import { NavigateFunction } from 'react-router-dom';

interface HandleClickTabBarProps {
  value: string;
  TARGET_VALUE?: string;
  navigate: NavigateFunction;
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
