import styled from '@emotion/styled';

interface PostListItemProps {
  id: string;
  image?: string;
  title: string;
}

const PostListItem = ({ id, image, title }: PostListItemProps) => {
  return (
    <ListItemContainer>
      {image && <Profile>프로필</Profile>}
      <Title>{title}</Title>
      <More> more</More>
    </ListItemContainer>
  );
};

export default PostListItem;

const ListItemContainer = styled.li`
  display: flex;
  border: 1px solid black;
  margin: 30px 0;
  gap: 20px;
  border-radius: 12px;
`;

const Profile = styled.div`
  border: 1px solid black;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  margin-left: 10px;
  margin: 10px 0 10px 10px;
`;

const Title = styled.div`
  border: 1px solid black;
  border-radius: 30px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 14px 0;
`;

const More = styled.div`
  border-left: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  cursor: pointer;
`;
