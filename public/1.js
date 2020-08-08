(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/js/components/Layouts/PrivateLayout/private-layout.scss":
/*!**************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./resources/js/components/Layouts/PrivateLayout/private-layout.scss ***!
  \**************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./resources/js/components/Layouts/PrivateLayout/PrivateLayout.js":
/*!************************************************************************!*\
  !*** ./resources/js/components/Layouts/PrivateLayout/PrivateLayout.js ***!
  \************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var services__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! services */ "./resources/js/services/index.js");
/* harmony import */ var modules_auth_selectors__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! modules/auth/selectors */ "./resources/js/modules/auth/selectors.js");
/* harmony import */ var modules_auth_actions__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! modules/auth/actions */ "./resources/js/modules/auth/actions.js");
/* harmony import */ var react_resize_detector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-resize-detector */ "./node_modules/react-resize-detector/lib/esm/index.js");
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
/* harmony import */ var constants__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! constants */ "./resources/js/constants/index.js");
/* harmony import */ var _private_layout_scss__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./private-layout.scss */ "./resources/js/components/Layouts/PrivateLayout/private-layout.scss");
/* harmony import */ var _private_layout_scss__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(_private_layout_scss__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var _constants_auth__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../constants/auth */ "./resources/js/constants/auth.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _constants_variables__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../constants/variables */ "./resources/js/constants/variables.js");
/* harmony import */ var _modules_post_constants__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../modules/post/constants */ "./resources/js/modules/post/constants.js");
/* harmony import */ var _Atoms_Loading_Loading__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../Atoms/Loading/Loading */ "./resources/js/components/Atoms/Loading/Loading.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

















var Content = antd__WEBPACK_IMPORTED_MODULE_3__["Layout"].Content;

var PrivateLayout = /*#__PURE__*/function (_Component) {
  _inherits(PrivateLayout, _Component);

  var _super = _createSuper(PrivateLayout);

  function PrivateLayout(props) {
    var _this;

    _classCallCheck(this, PrivateLayout);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "redirectLogin", function () {
      var _this$props = _this.props,
          history = _this$props.history,
          location = _this$props.location;
      history.push(constants__WEBPACK_IMPORTED_MODULE_9__["ROUTE"].LOGIN);
    });

    _defineProperty(_assertThisInitialized(_this), "handleResize", function () {
      var windowSize = window.innerWidth;
    });

    _defineProperty(_assertThisInitialized(_this), "onResize", function () {});

    _this.state = {
      visible: false,
      openKeys: [],
      pathname: window.location.pathname,
      currentTabSidebar: window.location.pathname
    };
    _this.interval = null;
    _this.redirectLogin = _this.redirectLogin.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(PrivateLayout, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var accesstoken = localStorage.getItem(_constants_auth__WEBPACK_IMPORTED_MODULE_11__["ACCESS_TOKEN"]);
      var refreshToken = localStorage.getItem(_constants_auth__WEBPACK_IMPORTED_MODULE_11__["REFRESH_TOKEN"]);
      var _this$props2 = this.props,
          verifyTokenFnc = _this$props2.verifyTokenFnc,
          userInfo = _this$props2.userInfo;

      if (accesstoken && accesstoken != "") {
        services__WEBPACK_IMPORTED_MODULE_4__["fetchService"].addTokenHeader({
          access_token: accesstoken
        });
        verifyTokenFnc(accesstoken, refreshToken);
      } else {
        this.redirectLogin();
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _this$props3 = this.props,
          isLogged = _this$props3.isLogged,
          logout = _this$props3.logout,
          userInfo = _this$props3.userInfo;
      if (prevProps.isLogged === isLogged) return false;

      if (!isLogged) {
        if (!logout) localStorage.setItem(_constants_variables__WEBPACK_IMPORTED_MODULE_13__["URL_REDIRECT_LOGIN"], location.pathname);
        this.redirectLogin();
      }

      if (userInfo && userInfo.roles && userInfo.roles.length < 1) {
        this.props.history.push(constants__WEBPACK_IMPORTED_MODULE_9__["ROUTE"].CHOOSEROLE);
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "render",
    value: function render() {
      var _this$props4 = this.props,
          children = _this$props4.children,
          loading = _this$props4.loading;

      if (loading) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Layout"], {
          id: "gp-private-layout",
          theme: "dark",
          className: "dark"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Layout"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "content-layout wide-container",
          id: "main-layout"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "header-control"
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_resize_detector__WEBPACK_IMPORTED_MODULE_7__["default"], {
          handleHeight: true,
          handleWidth: true,
          onResize: this.onResize
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Content, {
          className: "body-wrapper"
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Atoms_Loading_Loading__WEBPACK_IMPORTED_MODULE_15__["default"], null))))));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Layout"], {
        id: "gp-private-layout",
        theme: "dark",
        className: "dark"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_3__["Layout"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "content-layout wide-container",
        id: "main-layout"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: "header-control"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_resize_detector__WEBPACK_IMPORTED_MODULE_7__["default"], {
        handleHeight: true,
        handleWidth: true,
        onResize: this.onResize
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Content, {
        className: "body-wrapper"
      }, children)))));
    }
  }]);

  return PrivateLayout;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var mapStateToProps = Object(reselect__WEBPACK_IMPORTED_MODULE_8__["createStructuredSelector"])({
  isLogged: Object(modules_auth_selectors__WEBPACK_IMPORTED_MODULE_5__["selectIsLogged"])(),
  errors: Object(modules_auth_selectors__WEBPACK_IMPORTED_MODULE_5__["selectErrors"])(),
  loading: Object(modules_auth_selectors__WEBPACK_IMPORTED_MODULE_5__["selectLoading"])(),
  logout: Object(modules_auth_selectors__WEBPACK_IMPORTED_MODULE_5__["selectIsLogout"])(),
  userInfo: Object(modules_auth_selectors__WEBPACK_IMPORTED_MODULE_5__["selectUserInfo"])()
});
var mapDispatchToProps = {
  verifyTokenFnc: modules_auth_actions__WEBPACK_IMPORTED_MODULE_6__["verifyToken"]
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_1__["connect"])(mapStateToProps, mapDispatchToProps)(PrivateLayout));

/***/ }),

/***/ "./resources/js/components/Layouts/PrivateLayout/private-layout.scss":
/*!***************************************************************************!*\
  !*** ./resources/js/components/Layouts/PrivateLayout/private-layout.scss ***!
  \***************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!./private-layout.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/js/components/Layouts/PrivateLayout/private-layout.scss");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__(/*! ../../../../../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ })

}]);