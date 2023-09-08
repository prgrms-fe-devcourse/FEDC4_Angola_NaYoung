import { useFetchLogOut, useFetchLogin, useFetchSignUp } from '@/apis/auth';

const FetchTest = () => {
	const { signUp, isSignUpError, isSignUpLoading, isSignUpSuccess } =
		useFetchSignUp();
	const { login, loginData, isLoginError, isLoginLoading, isLoginSuccess } =
		useFetchLogin();
	const { logOut, isLogOutError, isLogOutLoading, isLogOutSuccess } =
		useFetchLogOut();
	return (
		<>
			<div>
				<button
					onClick={() =>
						signUp({
							email: 'hello',
							password: '1234',
							fullName: 'testName',
						})
					}>
					signup
				</button>
				<button
					onClick={() =>
						login({
							email: 'hello',
							password: '1234',
						})
					}>
					login
				</button>
				<button onClick={() => logOut()}>logout</button>
			</div>
			{/* <div>
				<h1>signup</h1>
				<div>loading : {isSignUpLoading ? 'loading' : 'not loading'}</div>
				<div>success : {isSignUpSuccess ? 'success' : 'fail'}</div>
				<div>error : {isSignUpError ? 'error' : 'none'}</div>
			</div> */}
			<div>
				<h1>login</h1>
				<div>userId : {loginData.userId}</div>
				<div>userName: {loginData.fullName}</div>
				<div>loading : {isLoginLoading ? 'loading' : 'not loading'}</div>
				<div>success : {isLoginSuccess ? 'success' : 'fail'}</div>
				<div>error : {isLoginError ? 'error' : 'none'}</div>
			</div>
			{/* <div>
				<h1>logOut</h1>
				<div>loading : {isLogOutLoading ? 'loading' : 'not loading'}</div>
				<div>success : {isLogOutSuccess ? 'success' : 'fail'}</div>
				<div>error : {isLogOutError ? 'error' : 'none'}</div>
			</div> */}
		</>
	);
};

export default FetchTest;
