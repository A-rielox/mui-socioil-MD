import styled from 'styled-components';

const RecipeInfo = ({ icon, text }) => {
   return (
      <Wrapper>
         <span className="icon">{icon}</span>
         <span className="text">{text}</span>
      </Wrapper>
   );
};

export default RecipeInfo;

const Wrapper = styled.div`
   display: flex;
   align-items: center;
   white-space: nowrap;

   .icon {
      font-size: 1rem;
      margin-right: 0.5rem;
      display: flex;
      align-items: center;
      svg {
         color: var(--grey-400);
      }
   }
   .text {
      font-size: 0.8rem;
      text-transform: capitalize;
      letter-spacing: var(--letterSpacing);
   }

   @media (max-width: 576px) {
      margin-top: 10px;
      align-self: center;
   }
`;
