import App, { Container } from "next/app"
import React from "react"
import { ApolloProvider } from "react-apollo"
import withApollo from "../lib/withApollo"
import { ThemeProvider } from "styled-components"
import theme from "../global/theme"
import GlobalStyle from "../global/globalStyles"
import { Provider } from "react-redux"
import withReduxStore from "../lib/withRedux"
// import { createStore, compose } from "redux"
// import reducers from "../store/reducers/"
import { getLoggedInState } from "../store/actions/"

// const composeEnhancers =
//   (typeof window !== "undefined" &&
//     window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose

// const store = createStore(reducers, composeEnhancers())

class BonVivantApp extends App {
  static async getInitialProps({ Component, router, ctx }) {
    let pageProps = {}
    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }
    ctx.reduxStore.dispatch(getLoggedInState())
    return { ...pageProps }
  }

  render() {
    const { Component, pageProps, apolloClient, reduxStore } = this.props
    return (
      <Container>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <ApolloProvider client={apolloClient}>
            <Provider store={reduxStore}>
              <Component {...pageProps} />
            </Provider>
          </ApolloProvider>
        </ThemeProvider>
      </Container>
    )
  }
}

export default withApollo(withReduxStore(BonVivantApp))
