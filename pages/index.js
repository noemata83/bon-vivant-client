import React from 'react';
import styled from 'styled-components';
import SpecList from '../components/SpecList'
import Page from '../layouts/main';

const Index = () => (
  <Page>
    <Main>
      <SpecList />
    </Main>
  </Page>
);

const Main = styled.div`
  background-color: ${({theme}) => theme.color.background};
  color: #333;
  flex-grow: 1;
`; 

export default Index;