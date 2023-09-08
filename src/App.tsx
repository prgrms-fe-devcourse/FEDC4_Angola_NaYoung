import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import { useFetchCreateComment } from './apis/comment';
import FetchTest from './components/FetchTest';

const queryClient = new QueryClient();

const App = () => {
	const {
		createComment,
		isCreateCommentLoading,
		isCreateCommentError,
		isCreateCommentSuccess,
	} = useFetchCreateComment();

	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<div>test</div>
				<FetchTest />

				<div>댓글 작성 test</div>
				<button
					onClick={() =>
						createComment({
							comment: '댓글 test',
							postId: '64fab28021f5351a7dd21a8e',
						})
					}>
					댓글 작성하기
				</button>
				<div>
					loading : {isCreateCommentLoading ? 'loading' : 'not loading'}
				</div>
				<div>success : {isCreateCommentSuccess ? 'success' : 'fail'}</div>
				<div>error : {isCreateCommentError ? 'error' : 'none'}</div>
			</QueryClientProvider>
		</RecoilRoot>
	);
};

export default App;
