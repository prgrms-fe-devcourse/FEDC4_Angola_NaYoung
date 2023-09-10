export const getPathname = (segment: number) => {
  return location.pathname.split('/')[segment];
};
