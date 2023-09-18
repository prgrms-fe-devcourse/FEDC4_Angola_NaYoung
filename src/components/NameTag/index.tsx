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
  textSize?: string;
}

const NameTag = ({
  level,
  userName,
  userId,
  userLevel,
  isNav,
  showLevel,
  textSize,
}: NameTagProps) => {
  const navigate = useNavigate();
  const handleClickTag = () => {
    if (!isNav) return;
    navigate(`/user/${userId}`);
  };
  return (
    <TagContainer
      level={userLevel}
      onClick={handleClickTag}
      textSize={textSize}>
      <div>
        {showLevel && `Lv.${level} `}
        {userName}
      </div>
    </TagContainer>
  );
};

export default NameTag;

const TagContainer = styled.div<{ level: number; textSize?: string }>`
  background: ${({ level }) => ANGOLA_STYLES.color.levels[level].fill};
  color: ${({ level }) => ANGOLA_STYLES.color.levels[level].text};
  font-size: ${({ textSize }) => textSize || ANGOLA_STYLES.textSize.titleLg};
  white-space: nowrap;
  padding: 8px 12px 4px 12px;
  border-radius: 100px;
  height: fit-content;
  > div {
    color: ${({ level }) => ANGOLA_STYLES.color.levels[level].text};
  }
`;
