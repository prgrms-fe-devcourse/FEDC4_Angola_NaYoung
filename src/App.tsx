import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import Main from '@components/Main';
import NavBar from '@components/NavBar';

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <NavBar />
          <Main />
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
