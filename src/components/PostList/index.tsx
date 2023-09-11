import PostListItem from '@components/PostListItem';
import { useFetchAllPosts } from '@apis/post';
import { useFetchSearchPosts } from '@apis/search';
import { getSortPostList } from './utils';

interface PostListProps {
  keyword?: string;
  sort: string;
}

const PostList = ({ keyword, sort }: PostListProps) => {
  const { searchPostsData } = useFetchSearchPosts({ query: keyword });
  const { allPostsData } = useFetchAllPosts();
  const resultData = keyword
    ? getSortPostList(searchPostsData, sort, keyword)
    : getSortPostList(allPostsData, sort, keyword);

  return (
    <ul>
      {resultData?.map((post) => (
        <PostListItem
          key={post._id}
          id={post._id}
          image={post.author.image}
          title={post.title}
        />
      ))}
    </ul>
  );
};

export default PostList;
