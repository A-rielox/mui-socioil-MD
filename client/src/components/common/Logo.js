import styled from 'styled-components';
import logo from '../../assets/images/logo.png';

const Logo = () => {
   return (
      <Wrapper>
         <img src={logo} alt="logo" className="logo" />
      </Wrapper>
   );
};

export default Logo;

const Wrapper = styled.div`
   img {
      width: 100%;
      display: block;
      object-fit: cover;
   }
`;
