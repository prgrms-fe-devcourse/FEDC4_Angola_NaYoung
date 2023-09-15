import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';

interface PostTitleProps {
  title: string;
  authorName: string;
  authorId: string;
}

const PostTitle = ({ title, authorName, authorId }: PostTitleProps) => {
  const navigate = useNavigate();
  return (
    <TitleContainer>
      <div onClick={() => navigate(`/user/${authorId}`)}>{authorName}</div>
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
