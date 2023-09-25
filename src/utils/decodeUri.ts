interface DecodeUriProps {
  keyword: string;
}

export const decodeUri = ({ keyword }: DecodeUriProps) => {
  return decodeURIComponent(keyword!.replace(/\+/g, '%20'));
};
