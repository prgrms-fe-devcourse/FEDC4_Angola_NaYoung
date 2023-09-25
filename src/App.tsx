import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter } from 'react-router-dom';
import { Main, NavBar } from '@components';
import styled from '@emotion/styled';
import { RecoilRoot } from 'recoil';

const queryClient = new QueryClient();

const App = () => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <PageContainer id="app">
            <NavBar />
            <Main />
          </PageContainer>
        </QueryClientProvider>
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;

const PageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  padding: 0 80px;
  min-width: 600px;
  max-width: 1400px;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  overflow: hidden;
`;
