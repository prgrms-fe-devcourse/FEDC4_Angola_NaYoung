import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface NameTagProps {
  level: number;
  userName: string;
  userId: string;
  userLevel: number;
  isNav: boolean;
  showLevel: boolean;
}

const NameTag = ({
  level,
  userName,
  userId,
  userLevel,
  isNav,
  showLevel,
}: NameTagProps) => {
  const navigate = useNavigate();
  const handleClickTag = () => {
    if (!isNav) return;
    navigate(`/user/${userId}`);
  };
  return (
    <TagContainer
      level={userLevel}
      onClick={handleClickTag}>
      <div>
        {showLevel && `Lv.${level} `}
        {userName}
      </div>
    </TagContainer>
  );
};

export default NameTag;

const TagContainer = styled.div<{ level: number }>`
  background: ${({ level }) => ANGOLA_STYLES.color.levels[level].fill};
  color: ${({ level }) => ANGOLA_STYLES.color.levels[level].text};
  font-size: ${ANGOLA_STYLES.textSize.titleLg};
  white-space: nowrap;
  padding: 8px 12px 4px 12px;
  border-radius: 100px;
  > div {
    color: ${({ level }) => ANGOLA_STYLES.color.levels[level].text};
  }
  cursor: pointer;
  transition: 0.2s;
  box-shadow: 0px 3px 0px 0px ${ANGOLA_STYLES.color.gray};
  &:hover {
    box-shadow: 0px 4px 0px 0px ${ANGOLA_STYLES.color.gray};
    transform: scale(1.01);
  }
`;
