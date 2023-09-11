import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { redirects, routes } from '@routes';
import useCurrentPage from '@hooks/useCurrentPage';

// 임시 컴포넌트, Header 합칠 때 삭제해야 함
interface HeaderProps {
  title: string;
  sortProps?: {
    target: string;
    sort?: string;
  };
}
const Header = ({ title, sortProps }: HeaderProps) => {
  console.log(sortProps);
  return <h1>{title}</h1>;
};

const Main = () => {
  const { title, name, params, search } = useCurrentPage();
  const objectForSort = {
    target: (params.target = 'user'),
    sort: search.sort,
  };
  return (
    <>
      <Header
        title={title}
        sortProps={
          name === 'home' || name === 'search' ? objectForSort : undefined
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
