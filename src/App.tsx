import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import FetchTest from './components/FetchTest';
import FollowTest from './components/FetchTest/FollowTest';
import SearchTest from './components/FetchTest/SearchTest';

const queryClient = new QueryClient();

const App = () => {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<FetchTest />
				<SearchTest />
				<FollowTest />
			</QueryClientProvider>
		</RecoilRoot>
	);
};

export default App;
