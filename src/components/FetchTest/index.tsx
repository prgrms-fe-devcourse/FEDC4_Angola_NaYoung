import { useFetchLogOut, useFetchLogin, useFetchSignUp } from '@apis/auth';
import { useFetchUpdateFullName, useFetchUpdatePassword } from '@apis/profile';

const FetchTest = () => {
  const { signUp, isSignUpError, isSignUpLoading, isSignUpSuccess } =
    useFetchSignUp();
  const { login, loginData, isLoginError, isLoginLoading, isLoginSuccess } =
    useFetchLogin();
  const { logOut, isLogOutError, isLogOutLoading, isLogOutSuccess } =
    useFetchLogOut();
  const {
    updateFullNameMutate,
    updateFullNameData,
    isUpdateFullNameError,
    isUpdateFullNameSuccess,
    isUpdateFullNameLoading,
  } = useFetchUpdateFullName();
  const {
    updatePasswordMutate,
    updatePasswordData,
    isUpdatePasswordError,
    isUpdatePasswordSuccess,
    isUpdatePasswordLoading,
  } = useFetchUpdatePassword();

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
        <button onClick={() => updateFullNameMutate({ fullName: 'lee' })}>
          updateFullName
        </button>
        <button onClick={() => updatePasswordMutate({ password: '1234' })}>
          updatePassword
        </button>
      </div>
      <div>
        <h1>signup</h1>
        <div>loading : {isSignUpLoading ? 'loading' : 'not loading'}</div>
        <div>success : {isSignUpSuccess ? 'success' : 'fail'}</div>
        <div>error : {isSignUpError ? 'error' : 'none'}</div>
      </div>
      <div>
        <h1>login</h1>
        <div>userId : {loginData.userId}</div>
        <div>userName: {loginData.fullName}</div>
        <div>loading : {isLoginLoading ? 'loading' : 'not loading'}</div>
        <div>success : {isLoginSuccess ? 'success' : 'fail'}</div>
        <div>error : {isLoginError ? 'error' : 'none'}</div>
      </div>
      <div>
        <h1>logOut</h1>
        <div>loading : {isLogOutLoading ? 'loading' : 'not loading'}</div>
        <div>success : {isLogOutSuccess ? 'success' : 'fail'}</div>
        <div>error : {isLogOutError ? 'error' : 'none'}</div>
      </div>
      <div>
        <h1>updateFullName</h1>
        <div>fullName: {updateFullNameData.fullName}</div>
        <div>
          loading : {isUpdateFullNameLoading ? 'loading' : 'not loading'}
        </div>
        <div>success : {isUpdateFullNameSuccess ? 'success' : 'fail'}</div>
        <div>error : {isUpdateFullNameError ? 'error' : 'none'}</div>
      </div>
      <div>
        <h1>updatePassword</h1>
        <div>Password: {updatePasswordData.password}</div>
        <div>
          loading : {isUpdatePasswordLoading ? 'loading' : 'not loading'}
        </div>
        <div>success : {isUpdatePasswordSuccess ? 'success' : 'fail'}</div>
        <div>error : {isUpdatePasswordError ? 'error' : 'none'}</div>
      </div>
    </>
  );
};

export default FetchTest;
