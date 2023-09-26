import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { Header, LevelViewer } from '@components';
import { PARAM_VALUES, SEARCH_VALUES } from '@constants';
import styled from '@emotion/styled';
import { useCurrentPage, useScrollToTop } from '@hooks';
import { redirects, routes } from '@routes';
import { useRecoilValue } from 'recoil';
import { useFetchUserArchives } from '@apis/level';
import { authInfoState } from '@store/auth';
import { decodeUri } from '@utils/decodeUri';
import { ANGOLA_STYLES } from '@styles/commonStyles';
import ToTopButton from './ToTopButton';

const Main = () => {
  const { title, name, params, search } = useCurrentPage();
  const [prevPageName, setPrevPageName] = useState(name);
  const [scrollTargetRef, scrollToTop] = useScrollToTop<HTMLDivElement>();
  const location = useLocation();
  const auth = useRecoilValue(authInfoState);

  useFetchUserArchives();

  useEffect(() => {
    if (name === 'post' && prevPageName === 'post') {
      return;
    }
    scrollToTop();
    setPrevPageName(name);
  }, [location.pathname, name, prevPageName, scrollToTop]);

  const objectForSort = {
    target: params.target || PARAM_VALUES.TARGET.POST,
    sort: (() => {
      if (search.sort) {
        return search.sort;
      } else if (params.target === PARAM_VALUES.TARGET.POST) {
        return SEARCH_VALUES.SORT.RECENT;
      } else {
        return SEARCH_VALUES.SORT.FOLLOWER;
      }
    })(),
  };

  return (
    <MainContainer>
      <LevelViewer />
      <Header
        title={title}
        sortProps={name === 'search' ? objectForSort : undefined}
        keyword={
          name === 'search'
            ? (search.keyword && decodeUri({ keyword: search.keyword })) ||
              (params.target === 'user' ? '전체 유저' : '전체 포스트')
            : undefined
        }
      />
      <PageContainer ref={scrollTargetRef}>
        <Routes>
          {routes.map(({ path, name, component, authRequired }) => (
            <Route
              key={name}
              path={path}
              element={
                authRequired && !auth ? (
                  <Navigate to="/login" />
                ) : (
                  React.createElement(component, {
                    ...params,
                    ...search,
                  })
                )
              }></Route>
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
  height: 100%;
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
  box-shadow: 0px 10px 0px 6px rgba(64, 64, 64, 0.8);
`;

const PageContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  height: 100%;
  padding: 32px 40px 0px 40px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex: 1 0 0;
  align-self: stretch;
  overflow: auto;
`;
