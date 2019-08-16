import styled from 'styled-components'
import Container from '../../components/layout/container'
import Logo from './logo'
import Link from 'next/link'

export default props => (
	<Header>
		<Container>
			<TitleBox>
				<Link href="/"><a><Logo /></a></Link>
				<Link href="/"><Title>Bon Vivant Cocktails</Title></Link>
			</TitleBox>
		</Container>
	</Header>
)

const TitleBox = styled.div`
	display: flex;
	width: 100%;
	align-items: flex-end;
`

const Header = styled.header`
	background-color: ${({ theme }) => theme.color.primary};
	color: #fff;
	padding: 1rem 2rem 2rem;
	box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.4), 4px 0px 10px rgba(0, 0, 0, 0.1);
	letter-spacing: 0.5ch;
  position: relative;
  z-index: 100;
`

const Title = styled.h1`
	padding: 0;
	margin: 0;
`