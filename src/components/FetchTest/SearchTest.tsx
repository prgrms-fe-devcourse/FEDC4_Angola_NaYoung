import { useState } from 'react';
import { useFetchSearchPosts, useFetchSearchUsers } from '@/apis/search';

const SearchTest = () => {
	const [query, setQuery] = useState('');
	const {
		searchPostsData,
		isSearchPostsSuccess,
		isSearchPostsError,
		isSearchPostsLoading,
	} = useFetchSearchPosts({ query: 'min' });

	// const {
	// 	searchUsersData,
	// 	isSearchUsersSuccess,
	// 	isSearchUsersError,
	// 	isSearchUsersLoading,
	// } = useFetchSearchUsers({ query });

	return (
		<>
			<div>
				<h1>search</h1>
				<input
					type="text"
					placeholder="유저나 포스트를 검색해보세요!"
					value={query}
					onChange={() => setQuery(query)}
				/>
				<div>Data:</div>
				<div>success : {isSearchPostsSuccess ? 'success' : 'fail'}</div>
				<div>error : {isSearchPostsError ? 'error' : 'none'}</div>
				<div>loading : {isSearchPostsLoading ? 'loading' : 'not loading'}</div>
			</div>
		</>
	);
};

export default SearchTest;
