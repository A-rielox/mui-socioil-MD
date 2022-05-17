import image from '../assets/images/not-found.svg';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Error = () => {
   return (
      <Wrapper className="full-page">
         <div>
            <img src={image} alt="not found" />
            <h3>Ohh!! página no encontrada</h3>
            <p>Parece que no existe la página que buscas</p>

            <Link to="/">De vuelta a los aceites</Link>
         </div>
      </Wrapper>
   );
};

export default Error;

const Wrapper = styled.main`
   text-align: center;
   display: flex;
   align-items: center;
   justify-content: center;

   img {
      max-width: 600px;
      display: block;
      margin-bottom: 2rem;
   }
   h3 {
      margin-bottom: 0.5rem;
   }
   p {
      margin-top: 0;
      margin-bottom: 0.5rem;
      color: var(--grey-500);
   }
   a {
      color: var(--primary-500);
      text-decoration: underline;
      text-transform: capitalize;
   }
`;
