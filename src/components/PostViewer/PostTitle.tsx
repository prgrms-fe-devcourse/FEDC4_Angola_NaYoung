import styled from '@emotion/styled';
import NameTag from '@components/NameTag';

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
  display: flex;
  align-items: center;
  gap: 20px;
  > h1 {
    display: block;
    font-size: 20px;
    border: 1px solid black;
    padding: 10px;
  }
  > h2 {
    display: block;
    width: 300px;
    background-color: #d3d3d3af;
    padding: 10px;
  }
`;
