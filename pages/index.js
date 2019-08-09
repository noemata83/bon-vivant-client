import React from 'react';
import styled from 'styled-components';
import SpecList from '../components/SpecList'

const Index = () => (
  <Main>
    <h1>Hi from Bon Vivant Cocktails!</h1>
    <SpecList />
  </Main>
);

const Main = styled.main`
  background-color: #333;
  color: white;
`; 

export default Index;