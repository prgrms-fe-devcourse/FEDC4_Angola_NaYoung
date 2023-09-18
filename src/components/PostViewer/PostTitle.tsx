import styled from '@emotion/styled';
import NameTag from '@components/NameTag';
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
  return (
    <TitleContainer>
      <NameTag
        isNav={true}
        showLevel={true}
        userName={authorName}
        userId={authorId}
        userLevel={authorLevel}
        level={authorLevel}
      />
      <h2>{title}</h2>
    </TitleContainer>
  );
};

export default PostTitle;

const TitleContainer = styled.div`
  position: relative;
  background: ${ANGOLA_STYLES.color.levels[5].fill};
  border-radius: 24px;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 8px;

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    width: 0;
    height: 0;
    border: 24px solid transparent;
    border-top: 48px solid ${ANGOLA_STYLES.color.levels[5].fill};
    border-bottom: 0;
    margin-left: -24px;
    margin-bottom: -24px;
  }
`;
