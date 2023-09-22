import React, { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { redirects, routes } from '@routes';
import Header from '@components/Header';
import LevelViewer from '@components/LevelViewer';
import { useFetchUserArchives } from '@apis/level';
import useCurrentPage from '@hooks/useCurrentPage';
import { useScrollToTop } from '@hooks/useScrollToTop';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import ToTopButton from './ToTopButton';

const Main = () => {
  const { title, name, params, search } = useCurrentPage();
  const location = useLocation();
  const [scrollTargetRef, scrollToTop] = useScrollToTop<HTMLDivElement>();
  useFetchUserArchives();

  useEffect(() => {
    scrollToTop();
  }, [location.pathname, scrollToTop]);

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
      <LevelViewer />
      <Header
        title={title}
        sortProps={name === 'search' ? objectForSort : undefined}
        keyword={
          name === 'search'
            ? (search.keyword && decodeURIComponent(search.keyword)) ||
              (params.target === 'user' ? '전체 유저' : '전체 포스트')
            : undefined
        }
      />
      <PageContainer ref={scrollTargetRef}>
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
      <ToTopButton onScrollToTop={scrollToTop} />
    </MainContainer>
  );
};

export default Main;

const MainContainer = styled.div`
  position: relative;
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
