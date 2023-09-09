import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';

const SearchBar = () => {
	const [keyword, setKeyword] = useState<string>('');
	const [searchParams, setSearchParams] = useSearchParams();

	const addKeywordToQueryString = ({ keyword }: { keyword: string }) => {
		searchParams.set('keyword', keyword);
		setSearchParams(searchParams);
	};

	const removeKeywordFromQueryString = () => {
		searchParams.delete('keyword');
		setSearchParams(searchParams);
	};

	const onChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setKeyword(value);
	};

	const onSubmitKeyword = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (keyword.length) {
			addKeywordToQueryString({ keyword: keyword });
		} else {
			removeKeywordFromQueryString();
		}
	};

	const onResetKeyword = () => {
		setKeyword('');
	};

	return (
		<StyledForm
			onSubmit={onSubmitKeyword}
			onReset={onResetKeyword}>
			<StyledInput
				type="text"
				value={keyword}
				placeholder="유저 또는 포스트를 검색하세요"
				onChange={onChangeKeyword}></StyledInput>

			<StyledButton type="reset">X</StyledButton>

			<StyledButton type="submit">검색</StyledButton>
		</StyledForm>
	);
};

export default SearchBar;

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
