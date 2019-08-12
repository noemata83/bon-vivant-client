import styled from 'styled-components';
import Container from '../../components/layout/container';

export default (props) => (
  <Header>
    <Container>
    <Title>Bon Vivant Cocktails</Title>
    </Container>
  </Header>
);

const Header = styled.header`
  background-color: ${({theme}) => theme.color.primary};
  color: #fff;
  padding: 1rem 2rem 2rem;
  box-shadow: 2px 2px 8px rgba(0,0,0,0.4), 4px 0px 10px rgba(0,0,0,0.1);
  letter-spacing: 0.5ch;
`;

const Title = styled.h1`
  padding: 0;
  margin: 0;
`;