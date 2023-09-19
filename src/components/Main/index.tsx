import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import styled from '@emotion/styled';
import { redirects, routes } from '@routes';
import Header from '@components/Header';
import useCurrentPage from '@hooks/useCurrentPage';
import { ANGOLA_STYLES } from '@styles/commonStyles';

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
        sortProps={name === 'search' ? objectForSort : undefined}
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
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  border-radius: 48px 48px 0px 0px;
  border-top: ${ANGOLA_STYLES.border.default};
  border-right: ${ANGOLA_STYLES.border.default};
  border-left: ${ANGOLA_STYLES.border.default};
  background: ${ANGOLA_STYLES.color.white};
  box-shadow: 0px 20px 20px 6px rgba(64, 64, 64, 0.8);
`;

const PageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  min-height: calc(100vh - 148px);
  padding: 32px 40px 0px 40px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  overflow: auto;
`;
