import { CSSProperties } from 'react';
import styled from '@emotion/styled';
import {
  faComment as faEmptyComment,
  faHeart as faEmptyHeart,
} from '@fortawesome/free-regular-svg-icons';
import {
  faBell,
  faCheck,
  faCircleExclamation,
  faComment,
  faComments,
  faHeart,
  faHeartCirclePlus,
  faPen,
  faPenToSquare,
  faSearch,
  faSortDown,
  faTrash,
  faUser,
  faUsers,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ANGOLA_STYLES } from '@styles/commonStyles';

type IconName =
  | 'alert'
  | 'check'
  | 'warn'
  | 'edit'
  | 'comments'
  | 'comment'
  | 'comment_empty'
  | 'heart'
  | 'heart_empty'
  | 'heart_plus'
  | 'post'
  | 'search'
  | 'trash'
  | 'user'
  | 'close'
  | 'follower'
  | 'select_down';

const iconMap = {
  alert: faBell,
  check: faCheck,
  warn: faCircleExclamation,
  edit: faPen,
  comment: faComment,
  comments: faComments,
  comment_empty: faEmptyComment,
  heart: faHeart,
  heart_plus: faHeartCirclePlus,
  heart_empty: faEmptyHeart,
  post: faPenToSquare,
  search: faSearch,
  trash: faTrash,
  user: faUser,
  close: faXmark,
  follower: faUsers,
  select_down: faSortDown,
};

interface IconProps {
  name: IconName;
  size?: string;
  color?: string;
}

const Icon = ({ name, size, color }: IconProps) => {
  const iconStyles: CSSProperties = {
    width: size || ANGOLA_STYLES.textSize.title,
    height: size || ANGOLA_STYLES.textSize.title,
  };
  return (
    <IconContainer color={color || ANGOLA_STYLES.color.text}>
      <FontAwesomeIcon
        icon={iconMap[name]}
        style={iconStyles}
      />
    </IconContainer>
  );
};

export default Icon;

const IconContainer = styled.div<{ color: string }>`
  display: inline;
  > svg {
    > path {
      fill: ${({ color }) => color};
    }
  }
`;
