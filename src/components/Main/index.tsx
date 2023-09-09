import React from 'react';
import { Route, Routes } from 'react-router-dom';
import useCurrentPage from '@/hooks/useCurrentPage';
import { routes } from '@/routes';

const Main = () => {
	const { title, params, search } = useCurrentPage();

	return (
		<>
			<div>
				<h1>{title}</h1>
			</div>
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
			</Routes>
		</>
	);
};

export default Main;
