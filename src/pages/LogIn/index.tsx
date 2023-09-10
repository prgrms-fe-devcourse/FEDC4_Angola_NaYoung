import { ChangeEvent, FormEvent, useState } from 'react';
import styled from '@emotion/styled';

const LogIn = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const onChangeEmail = (e: ChangeEvent<HTMLInputElement>) => {
		setEmail(e.target.value);
	};
	const onChangePassword = (e: ChangeEvent<HTMLInputElement>) => {
		setPassword(e.target.value);
	};

	const onSubmit = (e: FormEvent) => {
		e.preventDefault();
	};
	return (
		<>
			<LogInContainer>
				<Form onSubmit={onSubmit}>
					<Wrapper>
						<Label>이메일</Label>
						<InputStyled
							required={true}
							onChange={onChangeEmail}
						/>
					</Wrapper>
					<Wrapper>
						<Label>비밀번호</Label>
						<InputStyled
							required={true}
							onChange={onChangePassword}
						/>
					</Wrapper>
					<SubmitButton>로그인 하기</SubmitButton>
				</Form>
			</LogInContainer>
		</>
	);
};

export default LogIn;

const LogInContainer = styled.div`
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
	width: 40%;
	display: flex;
	flex-direction: column;
	gap: 0.5rem;
`;

const Label = styled.label`
	font-size: 20px;
	font-weight: 500;
	line-height: 150%;
	padding-left: 1rem;
`;

const InputStyled = styled.input`
	width: 100%;
	padding: 4px 8px;
	border: 1.5px solid gray;
	border-radius: 4rem;
	box-sizing: border-box;
	font-size: 18px;
`;

const SubmitButton = styled.button`
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