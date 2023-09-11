import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main from '@components/Main';
import Navbar from '@components/Navbar';

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Navbar />
          <Main />
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
