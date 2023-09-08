import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import FetchTest from './components/FetchTest';

const queryClient = new QueryClient();

const App = () => {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<FetchTest />
			</QueryClientProvider>
		</RecoilRoot>
	);
};

export default App;
