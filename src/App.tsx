import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

const App = () => {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<div>test</div>
			</QueryClientProvider>
		</RecoilRoot>
	);
};

export default App;
