import { useRouter } from 'next/router';
import Page from '../../layouts/main';
import styled from 'styled-components';
import Spec from '../../components/Spec';

const SpecDetail = () => {
  const router = useRouter();

  return (
    <Page>
      <Spec slug={router.query.slug} />
    </Page>
  )
}

const Main = styled.div`
  background-color: ${({theme}) => theme.color.background};
  color: #333;
  flex-grow: 1;
`; 

export default SpecDetail;