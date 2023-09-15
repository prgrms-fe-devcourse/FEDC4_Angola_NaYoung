import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import { redirects, routes } from '@routes';
import Header from '@components/Header';
import useCurrentPage from '@hooks/useCurrentPage';

const Main = () => {
  const { title, name, params, search } = useCurrentPage();
  const objectForSort = {
    target: params.target || 'post',
    sort: search.sort
      ? search.sort
      : params.target === 'post'
      ? 'recent'
      : 'follower',
  };
  return (
    <MainContainer>
      <Header
        title={title}
        sortProps={
          name === 'home' || name === 'search' ? objectForSort : undefined
        }
        keyword={
          name === 'search'
            ? search.keyword ||
              (params.target === 'user' ? '전체 유저' : '전체 포스트')
            : undefined
        }
      />

      <PageContainer>
        <Routes>
          {routes.map(({ path, name, component }) => (
            <Route
              key={name}
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
      </PageContainer>
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 60px 60px 0px 0px;
  border-top: 4px solid var(--text, #404040);
  border-right: 4px solid var(--text, #404040);
  border-left: 4px solid var(--text, #404040);
  background: var(--white, #fff);
  box-shadow: 0px 10px 10px 5px rgba(0, 0, 0, 0.25);
`;

const PageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  align-self: stretch;
  justify-content: center;
  padding: 50px 50px 0px 50px;
`;
