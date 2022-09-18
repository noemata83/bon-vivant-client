import React, { Component } from "react"
import { getDataFromTree } from "@apollo/client/react/ssr"
import Head from "next/head"

import initApollo from "./initApollo"
import parseCookies from "./parseCookies"

const withApollo = (App) => {
  return class WithData extends Component {
    public apolloClient

    static displayName = `WithData(${App.displayName})`

    static async getInitialProps(ctx) {
      const {
        AppTree,
        ctx: { req, res },
      } = ctx
      const apollo = initApollo(
        {},
        {
          getToken: (req) => parseCookies(req).appToken,
          mode: "same-origin",
        }
      )

      ctx.ctx.apolloClient = apollo

      let appProps = {}
      if (App.getInitialProps) {
        appProps = await App.getInitialProps(ctx)
      }

      if (res && res.finished) {
        // When redirecting, response is finished. No need to render further.
        return {}
      }

      if (typeof window === "undefined") {
        // Run all graphql queries in the tree
        // and extract the resulting data
        try {
          await getDataFromTree(<AppTree {...appProps} apolloClient={apollo} />)
        } catch (error) {
          console.error("Oh noes! Error while running `getDataFromTree`", error)
        }
      }

      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState,
      }
    }

    constructor(props) {
      super(props)

      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().appToken
        },
      })
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />
    }
  }
}

export default withApollo
