// const useDeleteComment = () => {
//   const [isClickedDeleteBtn, setIsClickedDeleteBtn] = useState<boolean>(false);
//   const [commentId, setCommentId] = useState<string>('');
//   const deleteButtonRef = useRef<HTMLButtonElement>(null);

//   const handleClickDeleteComment = (e: MouseEvent) => {
//     setCommentId(e.currentTarget.classList[0]);
//     setIsClickedDeleteBtn(true);
//     deleteButtonRef.current && deleteButtonRef.current.blur();
//   };

//   const handleClickDeleteCommentModalBtn = () => {
//     deleteComment(commentId);
//     setIsClickedDeleteBtn(false);
//   };
// };

// export default useDeleteComment;
