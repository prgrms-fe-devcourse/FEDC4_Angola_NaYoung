// import styled from '@emotion/styled';

// const MakeComment = () => {
//   const handleClickItemA = () => {
//     votedValue === 'A' ? setVotedValue('') : setVotedValue('A');
//   };

//   const handleClickItemB = () => {
//     votedValue === 'B' ? setVotedValue('') : setVotedValue('B');
//   };
//   return (
//     <>
//       <MakeCommentContainer>
//         <ItemButtonsContainer>
//           <ItemButtonA
//             onClick={handleClickItemA}
//             votedValue={votedValue}>
//             A
//           </ItemButtonA>
//           <ItemButtonB
//             onClick={handleClickItemB}
//             votedValue={votedValue}>
//             B
//           </ItemButtonB>
//         </ItemButtonsContainer>
//         <Comment placeholder="의견 입력창"></Comment>
//         <SubmitButton disabled={votedValue ? false : true}>
//           <p>submit</p>
//           <p>또는</p>
//           <p>skip</p>
//         </SubmitButton>
//       </MakeCommentContainer>
//     </>
//   );
// };

// export default MakeComment;

// const MakeCommentContainer = styled.div`
//   display: flex;
//   flex-direction: row;
//   padding: 1rem;
//   border: 1px solid black;
//   z-index: 100;
//   gap: 1rem;
// `;

// const ItemButtonsContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   border: 1px solid black;
//   border-radius: 40px;
//   overflow: hidden;
//   width: 3rem;
//   height: 6rem;
// `;

// const ItemButtonA = styled.button<{ votedValue: string }>`
//   width: 100%;
//   height: 100%;
//   border: none;
//   background-color: white;
//   font-size: 1.5rem;
//   border-bottom: solid;
//   cursor: pointer;
//   background-color: ${(props) => (props.votedValue === 'A' ? 'pink' : 'none')};

//   &:hover {
//     background-color: gray;
//   }
// `;

// const ItemButtonB = styled.button<{ votedValue: string }>`
//   width: 100%;
//   height: 100%;
//   border: none;
//   background-color: white;
//   font-size: 1.5rem;
//   cursor: pointer;
//   background-color: ${(props) => (props.votedValue === 'B' ? 'pink' : 'none')};

//   &:hover {
//     background-color: gray;
//   }
// `;

// const Comment = styled.input`
//   border: 1px solid black;
//   border-radius: 3rem;
//   padding: 1rem;
//   width: 80%;
// `;

// const SubmitButton = styled.button`
//   background-color: white;
//   border: 1px solid black;
//   border-radius: 2rem;
//   cursor: pointer;

//   &:hover {
//     background-color: gray;
//   }
// `;
