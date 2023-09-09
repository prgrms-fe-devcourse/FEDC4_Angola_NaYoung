import { ChangeEvent, FormEvent, useState } from 'react';
import styled from '@emotion/styled';

const SignUp = () => {
	const [email, setEmail] = useState('imsyEmail');
	const [password, setPassword] = useState('imsyPassword');
	const [passwordConfirm, setPasswordConfirm] = useState('imsyPassword');
	const [fullName, setFullName] = useState('imsyFullName');

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};
	const onChangePasswordConfirm = (e: ChangeEvent<HTMLInputElement>) => {
		setPasswordConfirm(e.target.value);
	};
	const onChangeFullName = (e: ChangeEvent<HTMLInputElement>) => {
		setFullName(e.target.value);
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();

		if (email.length < 10) {
			alert('이메일은 10자 이상 입력해주세요.');
			return;
		}
		if (password !== passwordConfirm) {
			alert('비밀번호가 다릅니다.\n다시 확인해주세요.');
			return;
		}
		if (fullName.length < 3 || fullName.length > 10) {
			alert('닉네임은 3자 이상 10자 이하로 입력해주세요.');
			return;
		}
	};
	return (
		<>
			<SignUpContainer>
				<Form onSubmit={onSubmit}>
					<Wrapper>
						<Label>1. 이메일을 입력하세요</Label>
						<InputStyled
							className="email"
							required={true}
							onChange={onChangeEmail}
						/>
						<InputWarning style={{ display: email ? `none` : 'block' }}>
							이메일을 입력해주세요.
						</InputWarning>
					</Wrapper>
					<Wrapper>
						<Label>2. 비밀번호를 입력하세요</Label>
						<InputStyled
							className="password"
							required={true}
							onChange={onChangePassword}
						/>
						<InputWarning style={{ display: password ? `none` : 'block' }}>
							비밀번호를 입력해주세요.
						</InputWarning>
						<InputStyled
							className="passwordConfirm"
							required={true}
							onChange={onChangePasswordConfirm}
						/>
						<InputWarning
							style={{ display: passwordConfirm ? `none` : 'block' }}>
							비밀번호를 재입력해주세요.
						</InputWarning>
					</Wrapper>
					<Wrapper>
						<Label>3. 닉네임을 입력하세요</Label>
						<InputStyled
							className="fullName"
							required={true}
							onChange={onChangeFullName}
						/>
						<InputWarning style={{ display: fullName ? `none` : 'block' }}>
							닉네임을 입력해주세요.
						</InputWarning>
					</Wrapper>
					<ButtonStyled>가입하기</ButtonStyled>
				</Form>
			</SignUpContainer>
		</>
	);
};

export default SignUp;

const SignUpContainer = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100vw;
	height: 100vh;
`;

const Form = styled.form`
	border-bottom-left-radius: 50px;
	border-bottom-right-radius: 50px;
	border: 3px solid black;
	width: 80%;
	height: 60%;
	display: flex;
	flex-direction: column;
	padding: 3rem;
	justify-content: center;
	align-items: center;
	gap: 2.5rem;
`;

const Wrapper = styled.div`
	width: 60%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const Label = styled.label`
	font-size: 20px;
	font-weight: 500;
	line-height: 150%;
`;

const InputStyled = styled.input`
	width: 100%;
	padding: 4px 8px;
	border: 1.5px solid gray;
	border-radius: 4rem;
	box-sizing: border-box;
	font-size: 18px;
`;

const ButtonStyled = styled.button`
	padding: 0.5rem 1.5rem;
	border: 2px solid black;
	border-radius: 50px;
	font-size: 18px;
	font-weight: 600;
	color: red;
	background-color: #47e1a8;

	&:hover {
		background-color: rgba(90, 120, 100, 0.4);
		cursor: pointer;
	}
`;

const InputWarning = styled.div`
	font-size: 15px;
	color: red;
	padding-left: 2rem;
`;
