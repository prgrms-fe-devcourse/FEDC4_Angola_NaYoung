import { NavigateFunction } from 'react-router-dom';

interface HandleClickTabBarProps {
  value: string;
  target?: string;
  navigate: NavigateFunction;
}

export const handleClickTabBar = ({
  value,
  target,
  navigate,
}: HandleClickTabBarProps) => {
  if (value === 'user') {
    if (target === 'user') {
      return;
    }
    navigate('/search/user?sort=follower');
  }

  if (value === 'post') {
    if (target === 'post') {
      return;
    }
    navigate('/search/post?sort=recent');
  }
};
