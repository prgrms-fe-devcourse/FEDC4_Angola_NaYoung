import styled from '@emotion/styled';
import { rgba } from 'emotion-rgba';
import NameTag from '@components/NameTag';
import { useElementWidth } from '@components/PostViewer/hooks';
import { getUserLevelInfo } from '@utils/calculateUserLevel';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import { POST_TITLE } from '../constants';

interface PostTitleProps {
  title: string;
  authorName: string;
  authorId: string;
  authorLevel: number;
  isPostPage: boolean;
  onGoDetailPage: VoidFunction;
}

const PostTitle = ({
  title,
  authorName,
  authorId,
  authorLevel,
  isPostPage,
  onGoDetailPage: goDetailPage,
}: PostTitleProps) => {
  const { userColor: levelColor } = getUserLevelInfo(authorLevel);
  const [tagRef, tagWidth] = useElementWidth(POST_TITLE.DEFAULT_TAG_WIDTH);
  const handleClickTitleText = () => {
    if (isPostPage) return;
    goDetailPage();
  };

  return (
    <TitleContainer>
      <TitleShadow
        levelColor={levelColor}
        isGradient={authorLevel === 7}
        isDetail={isPostPage}
      />
      <Title isDetail={isPostPage}>
        <Tag ref={tagRef}>
          <NameTag
            isNav={true}
            showLevel={true}
            userName={authorName}
            userId={authorId}
            userLevel={authorLevel}
            level={authorLevel}
            textSize={ANGOLA_STYLES.textSize.titleSm}
          />
        </Tag>
        <Text
          className={
            isPostPage
              ? POST_TITLE.LOCATION_CLASS.POST
              : POST_TITLE.LOCATION_CLASS.HOME
          }
          isDetail={isPostPage}
          tagWidth={tagWidth}
          onClick={handleClickTitleText}>
          {title}
        </Text>
      </Title>
    </TitleContainer>
  );
};

export default PostTitle;

const TitleContainer = styled.div`
  position: relative;
  width: 100%;
  height: fit-content;
  margin-bottom: 32px;
`;

const Title = styled.div<{ isDetail: boolean }>`
  background: ${ANGOLA_STYLES.color.white};
  border-radius: 24px;
  border: ${ANGOLA_STYLES.border.default};
  min-height: 48px;
  height: ${({ isDetail }) => (isDetail ? 'fit-content' : '48px')};
  display: flex;
  gap: 8px;
  align-items: center;
  width: 100%;
  padding: 8px;
  position: relative;
  z-index: 10;

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
  width: min-content;
`;

const Text = styled.div<{ tagWidth: number; isDetail: boolean }>`
  flex-grow: 1;
  flex-shrink: 0;
  font-size: ${ANGOLA_STYLES.textSize.title};
  max-width: calc(100% - 12px - ${({ tagWidth }) => `${tagWidth}px`});
  white-space: ${({ isDetail }) => (isDetail ? 'normal' : 'nowrap')};
  overflow: hidden;
  text-overflow: ellipsis;
  height: 100%;
  border-radius: 24px;
  padding: 4px 8px;
  line-height: 24px;
  @media (max-width: 800px) {
    font-size: ${ANGOLA_STYLES.textSize.titleSm};
  }
  &.inHome {
    cursor: pointer;
    transition: 0.2s;
    &:hover {
      background: ${ANGOLA_STYLES.color.gray};
    }
  }
`;

const TitleShadow = styled(Title)<{
  levelColor: string;
  isGradient: boolean;
}>`
  position: absolute;
  z-index: 0;
  bottom: -4px;
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
