import App from "next/app"
import React, { Fragment } from "react"
import { ApolloProvider } from "@apollo/client"
import withApollo from "../lib/withApollo"
import { ThemeProvider } from "styled-components"
import theme from "../global/theme"
import GlobalStyle from "../global/globalStyles"
import { Provider } from "react-redux"
import withReduxStore from "../lib/withRedux"
import { getLoggedInState } from "../store/actions/"

class BonVivantApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    // console.log(ctx)
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
