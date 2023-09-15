import styled from '@emotion/styled';
import { MORE_LINK_BUTTON_STYLES } from '@styles';
import LinkButton from '@components/LinkButton';
import { splitPostBySeparator } from '@utils/parseDataBySeparator';

interface PostListItemProps {
  id: string;
  image?: string;
  title: string;
  likes?: number;
  comments?: number;
}

const PostListItem = ({
  id,
  image,
  title,
  likes,
  comments,
}: PostListItemProps) => {
  const { title: postTitle } = splitPostBySeparator(title);
  return (
    <ListItemContainer>
      <img
        src={
          image
            ? image
            : 'https://hips.hearstapps.com/hmg-prod/images/russian-blue-royalty-free-image-1658451809.jpg?crop=0.667xw:1.00xh;0.128xw,0&resize=980:*'
        }
        alt="프로필"
        style={{ width: '70px', height: '70px', borderRadius: '50%' }}
      />
      <Title>{postTitle}</Title>
      <Info>
        <div>♥️{likes}</div>
        <div>💬{comments}</div>
      </Info>
      <More>
        <LinkButton
          to={`/post/${id}`}
          style={MORE_LINK_BUTTON_STYLES}>
          More
        </LinkButton>
      </More>
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

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 10px;
  flex-shrink: 0;
`;
