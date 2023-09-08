import { useFetchFollow } from '@/apis/follow';

const FollowTest = () => {
	const {
		followMutate,
		followData,
		isFollowSuccess,
		isFollowError,
		isFollowLoading,
	} = useFetchFollow();

	return (
		<>
			<button
				onClick={() => {
					followMutate({ userId: '64f9848ef1dd5711361d61e9' });
				}}>
				팔로우 하기
			</button>
			<div>
				<h1>follow: </h1>
				<div>
					Data: followId: {followData.followId}
					follower: {followData.follower}
					userId: {followData.userId}
				</div>
				<div>success : {isFollowSuccess ? 'success' : 'fail'}</div>
				<div>error : {isFollowError ? 'error' : 'none'}</div>
				<div>loading : {isFollowLoading ? 'loading' : 'not loading'}</div>
			</div>
		</>
	);
};

export default FollowTest;
