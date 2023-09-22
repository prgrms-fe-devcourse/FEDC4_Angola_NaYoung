export const checkIsNumber = (
  target: null | undefined | number,
): target is number => {
  return typeof target === 'number';
};
