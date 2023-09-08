import { QueryClient, QueryClientProvider } from 'react-query';
import { RecoilRoot } from 'recoil';
import Test from './components/Test';

const queryClient = new QueryClient();

const App = () => {
	return (
		<RecoilRoot>
			<QueryClientProvider client={queryClient}>
				<Test />
			</QueryClientProvider>
		</RecoilRoot>
	);
};

export default App;
