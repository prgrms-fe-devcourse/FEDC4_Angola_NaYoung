import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
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
    <>
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
    </>
  );
};

export default Main;
