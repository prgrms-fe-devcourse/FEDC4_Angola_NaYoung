import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';


const SearchBar = () => {
	const [keyword, setKeyword] = useState<string>('');

	const [searchParams, setSearchParams] = useSearchParams();

	const addKeywordToQueryString = ({keyword}: {keyword: string}) => {
		searchParams.set('keyword', keyword);
		setSearchParams(searchParams);	
	}

	const removeKeywordToQueryString = () => {
		searchParams.delete('keyword');
		setSearchParams(searchParams);	
	}

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = e.target;
		setKeyword(value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (keyword.length) {
			addKeywordToQueryString({keyword: keyword});
		}
		else{
			removeKeywordToQueryString();
		}
	};

	const handleReset = () => {
		setKeyword('');
	};

	return (
		<StyledForm
			onSubmit={handleSubmit}
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
