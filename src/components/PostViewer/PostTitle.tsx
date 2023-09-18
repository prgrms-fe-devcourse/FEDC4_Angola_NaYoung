import styled from '@emotion/styled';
import { rgba } from 'emotion-rgba';
import NameTag from '@components/NameTag';
import { getUserLevelInfo } from '@utils/calculateUserLevel';
import { ANGOLA_STYLES } from '@styles/commonStyles';

interface PostTitleProps {
  title: string;
  authorName: string;
  authorId: string;
  authorLevel: number;
}

const PostTitle = ({
  title,
  authorName,
  authorId,
  authorLevel,
}: PostTitleProps) => {
  const levelColor = getUserLevelInfo(authorLevel).userColor;
  return (
    <TitleContainer>
      <TitleShadow
        levelColor={levelColor}
        isGradient={authorLevel === 7}
      />
      <Title>
        <Tag>
          <NameTag
            isNav={true}
            showLevel={true}
            userName={authorName}
            userId={authorId}
            userLevel={authorLevel}
            level={authorLevel}
            textSize={ANGOLA_STYLES.textSize.title}
          />
        </Tag>
        <Text>{title}</Text>
      </Title>
    </TitleContainer>
  );
};

export default PostTitle;

const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: 72px;
`;

const Title = styled.div`
  position: absolute;
  background: ${ANGOLA_STYLES.color.white};
  border-radius: 24px;
  border: ${ANGOLA_STYLES.border.default};
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 8px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 16px solid transparent;
    border-top: 24px solid ${ANGOLA_STYLES.color.white};
    border-bottom: 0;
    margin-left: -16px;
    margin-bottom: -24px;
  }
  &::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 18px solid transparent;
    border-top: 28px solid ${ANGOLA_STYLES.color.text};
    border-bottom: 0;
    margin-left: -18px;
    margin-bottom: -28px;
  }
`;

const Tag = styled.div`
  position: absolute;
  width: min-content;
  left: 8px;
`;

const Text = styled.div``;

const TitleShadow = styled(Title)<{ levelColor: string; isGradient: boolean }>`
  position: absolute;
  top: 4px;
  background: ${({ levelColor }) => levelColor};
  border: none;
  &::before {
    display: none;
  }
  &::after {
    transform: scale(1.4);
    border-top-color: ${({ levelColor, isGradient }) =>
      isGradient ? rgba(ANGOLA_STYLES.color.levels[3].fill, 0.6) : levelColor};
  }
`;
