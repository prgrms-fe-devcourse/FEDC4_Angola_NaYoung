import { useFetchUsers } from '@/apis/user';

const Test = () => {
	const { data, isLoading, isError, isSuccess } = useFetchUsers();
	if (isLoading) {
		return <div>Loading...</div>;
	}
	if (isError) {
		return <div>Error: Failed to fetch user data</div>;
	}
	// map으로 돌리기
	if (isSuccess) {
		return (
			<div>
				<h1>User List</h1>
				<ul>
					{data &&
						data.map((user) => (
							<li key={user._id}>
								<img
									src={user.image}
									alt={user.fullName}
								/>
								<p>Name: {user.fullName}</p>
								<p>Likes: {user.likes}</p>
								<p>Followers: {user.followers}</p>
							</li>
						))}
				</ul>
			</div>
		);
	}

	return null; // 이 외의 상태는 아무것도 렌더링하지 않음
};

export default Test;
