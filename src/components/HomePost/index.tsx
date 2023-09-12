import styled from '@emotion/styled';

interface PostProps {
  postId: string;
  authorName: string;
  authorId: string;
  postTitle: string;
  likeId: string | undefined;
  numberOfComments: number;
  numberOfLikes: number;
}

const HomePost = ({
  postId,
  postTitle,
  authorName,
  authorId,
  likeId,
  numberOfComments,
  numberOfLikes,
}: PostProps) => {
  return (
    <HomePostContainer>
      <Title>
        <Name>{authorName}</Name>
        {postTitle}
      </Title>
      <BalanceContainer>
        <APost>A</APost>
        <div style={{ fontSize: '30px' }}>VS</div>
        <BPost>B</BPost>
      </BalanceContainer>
    </HomePostContainer>
  );
};

export default HomePost;

const HomePostContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 20px;
  padding-bottom: 20px;
  overflow: hidden;
  background-color: #e7e6e6;
  border-top: none;
  padding-top: 20px;
`;

const Title = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 570px;
  position: relative;
  background-color: white;
`;

const BalanceContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 30px;
`;

const Name = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  padding: 10px;
  border-radius: 20px;
  width: 10%;
  position: absolute;
  left: 0;
  border-left: none;
  background-color: white;
`;

const APost = styled.div`
  width: 250px;
  height: 250px;
  border: 1px solid black;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  background-color: white;
`;
const BPost = styled.div`
  width: 250px;
  height: 250px;
  border: 1px solid black;
  border-radius: 20px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
  background-color: white;
`;
