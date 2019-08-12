import App, { Container } from 'next/app'
import React from 'react'
import { ApolloProvider } from 'react-apollo'
import withApollo from '../lib/withApollo'
import { ThemeProvider } from 'styled-components';
import theme from '../global/theme';
import GlobalStyle from '../global/globalStyles';


class BonVivantApp extends App {
  render() {
    const { Component, pageProps, apolloClient } = this.props
    return (
      <Container>
        <GlobalStyle />

      <ThemeProvider theme={theme}>
        <ApolloProvider client={apolloClient}>
          <Component {...pageProps} />
        </ApolloProvider>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withApollo(BonVivantApp)