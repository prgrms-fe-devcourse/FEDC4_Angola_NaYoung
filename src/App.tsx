import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Route, Routes } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
// import FetchTest from './components/FetchTest';
import LogIn from './pages/LogIn';
import SignUp from './pages/SignUp';

const queryClient = new QueryClient();

const App = () => {
	return (
		<BrowserRouter>
			<RecoilRoot>
				<QueryClientProvider client={queryClient}>
					{/* <FetchTest /> */}
					<Routes>
						<Route
							key={'login'}
							path={'/login'}
							element={React.createElement(LogIn, {})}></Route>
						<Route
							key={'signup'}
							path={'/'}
							element={React.createElement(SignUp, {})}></Route>
					</Routes>
				</QueryClientProvider>
			</RecoilRoot>
		</BrowserRouter>
	);
};

export default App;
