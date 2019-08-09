webpackHotUpdate("static/development/pages/_app.js",{

/***/ "./lib/initApollo.js":
/*!***************************!*\
  !*** ./lib/initApollo.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return initApollo; });
/* harmony import */ var _babel_runtime_corejs2_helpers_esm_objectSpread__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime-corejs2/helpers/esm/objectSpread */ "./node_modules/@babel/runtime-corejs2/helpers/esm/objectSpread.js");
/* harmony import */ var apollo_boost__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-boost */ "./node_modules/apollo-boost/lib/bundle.esm.js");
/* harmony import */ var apollo_link_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! apollo-link-http */ "./node_modules/apollo-link-http/lib/bundle.esm.js");
/* harmony import */ var apollo_link_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! apollo-link-context */ "./node_modules/apollo-link-context/lib/bundle.esm.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! isomorphic-unfetch */ "./node_modules/isomorphic-unfetch/browser.js");
/* harmony import */ var isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(isomorphic_unfetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _config_keys__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../config/keys */ "./config/keys.js");






var apolloClient = null;

if (false) {}

function create(initialState, _ref) {
  var getToken = _ref.getToken,
      fetchOptions = _ref.fetchOptions;
  var isBrowser = "object" !== 'undefined';
  var httpLink = Object(apollo_link_http__WEBPACK_IMPORTED_MODULE_2__["createHttpLink"])({
    uri: _config_keys__WEBPACK_IMPORTED_MODULE_5__["default"].BACKEND_URI,
    credentials: 'same-origin',
    fetchOptions: fetchOptions
  });
  var authLink = Object(apollo_link_context__WEBPACK_IMPORTED_MODULE_3__["setContext"])(function (_, previousContext) {
    var token = getToken();
    return {
      headers: {
        authorization: token ? "Bearer ".concat(token) : ''
      }
    };
  });
  return new apollo_boost__WEBPACK_IMPORTED_MODULE_1__["ApolloClient"]({
    connectToDevTools: isBrowser,
    ssrMode: !isBrowser,
    link: authLink.concat(httpLink),
    cache: new apollo_boost__WEBPACK_IMPORTED_MODULE_1__["InMemoryCache"]().restore(initialState || {})
  });
}

function initApollo(initialState, options) {
  if (false) { var fetchOptions; }

  if (!apolloClient) {
    apolloClient = create(initialState, options);
  }

  return apolloClient;
}

/***/ })

})
//# sourceMappingURL=_app.js.c37576e67214193d95ac.hot-update.js.map