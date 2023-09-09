import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import useCurrentPage from '@/hooks/useCurrentPage';
import { redirects, routes } from '@/routes';

// 임시 컴포넌트, Header 합칠 때 삭제해야 함
const Header = ({ title }: { title: string }) => {
	return <h1>{title}</h1>;
};

const Main = () => {
	const { title, params, search } = useCurrentPage();
	return (
		<>
			<Header title={title} />
			<Routes>
				{routes.map(({ path, title, component }) => (
					<Route
						key={title}
						path={path}
						element={React.createElement(component, {
							...params,
							...search,
						})}></Route>
				))}
				{redirects.map(({ from, to }) => (
					<Route
						key={from + to}
						path={from}
						element={<Navigate to={to} />}
					/>
				))}
			</Routes>
		</>
	);
};

export default Main;
