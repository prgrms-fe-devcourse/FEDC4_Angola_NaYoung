import { useState } from 'react';
import styled from '@emotion/styled';

const SearchBar = () => {
	const [keyword, setKeyword] = useState<string>('');

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setKeyword(value);
	};

	const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (keyword.length) {
		}
	};

	const handleReset = () => {
		setKeyword('');
	};

	return (
		<StyledForm
			onSubmit={handleSearch}
			onReset={handleReset}>
			<StyledInput
				type="text"
				value={keyword}
				placeholder="유저 또는 포스트를 검색하세요"
				onChange={handleInputChange}></StyledInput>

			<StyledButton type="reset">X</StyledButton>

			<StyledButton type="submit">돋보기</StyledButton>
		</StyledForm>
	);
};

const StyledForm = styled.form`
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	border: 2px solid black;
	border-radius: 16px;
	width: 300px;
	padding: 6px 12px;
`;

const StyledInput = styled.input`
	box-sizing: border-box;
	border: none;
	outline: none;
	margin: 0;
	padding: 0;
	height: 30px;
	width: 200px;
`;

const StyledButton = styled.button`
	box-sizing: border-box;
	margin: 0;
	padding: 0;
	height: 30px;
	height: 30px;
`;

export default SearchBar;
