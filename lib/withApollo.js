import React, { Component } from "react"
import cookie from "cookie"
import { getDataFromTree } from "react-apollo"
import Head from "next/head"

import initApollo from "./initApollo"

function parseCookies(req, options = {}) {
  return cookie.parse(req ? req.headers.cookie || "" : document.cookie, options)
}
export default App => {
  return class WithData extends Component {
    static displayName = `WithData(${App.displayName})`

    static async getInitialProps(ctx) {
      const {
        AppTree,
        ctx: { req, res }
      } = ctx
      const apollo = initApollo(
        {},
        {
          getToken: req => parseCookies(req).appToken,
          mode: "same-origin"
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
          console.error("Error while running `getDataFromTree`", error)
        }

        Head.rewind() // This is used to clear a side effect, since getDataFromTree does not call componentWillUnmount()
      }

      const apolloState = apollo.cache.extract()

      return {
        ...appProps,
        apolloState
      }
    }

    constructor(props) {
      super(props)

      this.apolloClient = initApollo(props.apolloState, {
        getToken: () => {
          return parseCookies().appToken
        }
      })
    }

    render() {
      return <App apolloClient={this.apolloClient} {...this.props} />
    }
  }
}
