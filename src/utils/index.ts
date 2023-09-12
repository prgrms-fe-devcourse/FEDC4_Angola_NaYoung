export const getPathname = (segment: number) => {
  return location.pathname.split('/')[segment];
};

export const parseQueryString = (queryString: string) => {
  return queryString
    .slice(1)
    .split('&')
    .reduce((obj, query) => {
      const [key, value] = query.split('=');
      return { ...obj, [key]: value };
    }, {});
};
