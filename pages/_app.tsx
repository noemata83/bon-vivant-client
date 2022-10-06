import App from "next/app"
import React, { Fragment } from "react"
import { ApolloProvider } from "@apollo/client"
import withApollo from "../src/lib/withApollo"
import { ThemeProvider } from "styled-components"
import theme from "../src/client/global/theme"
import GlobalStyle from "../src/client/global/globalStyles"
import { Provider } from "react-redux"
import withReduxStore from "../src/lib/withRedux"

import { getLoggedInState } from "../src/client/store/actions"

class BonVivantApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    ctx.reduxStore.dispatch(getLoggedInState({ ctx }))
    return { ...pageProps }
  }

  render() {
    const { Component, pageProps, apolloClient, reduxStore } = this.props
    return (
      <>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <Provider store={reduxStore}>
              <Component {...pageProps} />
            </Provider>
          </ApolloProvider>
        </ThemeProvider>
      </>
    )
  }
}

export default withApollo(withReduxStore(BonVivantApp))
