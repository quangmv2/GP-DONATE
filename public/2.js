(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[2],{

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/js/components/Layouts/PublicLayout/public-layout.scss":
/*!************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src??ref--7-2!./node_modules/sass-loader/dist/cjs.js??ref--7-3!./resources/js/components/Layouts/PublicLayout/public-layout.scss ***!
  \************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ":root {\n  --box-border-radius: 10px;\n  --input-height: 42px;\n  --fs-normal: 14px;\n  --button-height: 60px;\n}\n\n:root.dark {\n  --primary-color: #1890ff;\n  --success-color: #52c41a;\n  --info-color: #1890ff;\n  --warning-color: #faad14;\n  --error-color: #ff4d4f;\n  --highlight-color: #ff4d4f;\n  --body-background: #000000;\n  --component-background: #141414;\n  --component-background-hover: #4c4c4c;\n  --component-background-blur: #1d1d1d;\n  --layout-header-background: #141414;\n  --layout-body-background: #000;\n  --border-color-base: #434343;\n  --border-color-split: #141414;\n  --link-color: #1890ff;\n  --disabled-color: #5b5b5b;\n  --disabled-bg: #262626;\n  --processing-color: #1890ff;\n  --icon-color: #141414;\n  --icon-color-hover: #c4c4c4;\n  --heading-color: #dcdcdc;\n  --text-color: #adadad;\n  --text-color-second: #dcdcdc;\n  --text-color-secondary: #7e7e7e;\n  --text-selection-bg: #1890ff;\n  --text-color-inverse: #ffffff;\n  --text-color-table-header: #ffffff;\n  --text-color-table-hover: #262626;\n  --text-layout-header-color: var(--text-color);\n  --text-layout-header-color-hover: #1890ff;\n}\n\n:root.light {\n  --primary-color: #1890ff;\n  --success-color: #52c41a;\n  --info-color: #1890ff;\n  --warning-color: #faad14;\n  --error-color: #ff4d4f;\n  --highlight-color: #ff4d4f;\n  --body-background: #ffffff;\n  --component-background: #ffffff;\n  --component-background-hover: #e6f7ff;\n  --component-background-blur: #fafafa;\n  --layout-header-background: #509ee2;\n  --layout-body-background: #fff;\n  --border-color-base: #d9d9d9;\n  --border-color-split: #f0f0f0;\n  --link-color: #1890ff;\n  --disabled-color: rgba(0, 0, 0, 0.45);\n  --disabled-bg: #f5f5f5;\n  --processing-color: #1890ff;\n  --icon-color: #ffffff;\n  --icon-color-hover: #404040;\n  --heading-color: #262626;\n  --text-color: #595959;\n  --text-color-second: #262626;\n  --text-color-secondary: #7e7e7e;\n  --text-selection-bg: #1890ff;\n  --text-color-inverse: #ffffff;\n  --text-color-table-header: #262626;\n  --text-color-table-hover: #262626;\n  --text-layout-header-color: rgba(255, 255, 255);\n  --text-layout-header-color-hover: rgba(255, 255, 255);\n}\n\n.header-public {\n  height: 60px;\n  display: flex;\n  align-items: center;\n  padding: 0 20px;\n  border-bottom: 1px solid #ccc;\n  position: absolute;\n  width: 100%;\n  z-index: 2;\n}\n.header-public .header-public__logo {\n  width: 180px;\n  height: 35px;\n}\n.header-public .header-public__logo img {\n  -o-object-fit: contain;\n     object-fit: contain;\n}\n.header-public__right {\n  justify-content: flex-end;\n  display: flex;\n  width: 100%;\n}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./resources/js/components/Layouts/PublicLayout/PublicLayout.js":
/*!**********************************************************************!*\
  !*** ./resources/js/components/Layouts/PublicLayout/PublicLayout.js ***!
  \**********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var components_Atoms_Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! components/Atoms/Image */ "./resources/js/components/Atoms/Image/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! prop-types */ "./node_modules/prop-types/index.js");
/* harmony import */ var prop_types__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(prop_types__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var reselect__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! reselect */ "./node_modules/reselect/es/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var antd__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd */ "./node_modules/antd/es/index.js");
/* harmony import */ var services__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! services */ "./resources/js/services/index.js");
/* harmony import */ var modules_translates_selectors__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! modules/translates/selectors */ "./resources/js/modules/translates/selectors.js");
/* harmony import */ var modules_translates_actions__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! modules/translates/actions */ "./resources/js/modules/translates/actions.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var constants__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! constants */ "./resources/js/constants/index.js");
/* harmony import */ var components_Molecules__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! components/Molecules */ "./resources/js/components/Molecules/index.js");
/* harmony import */ var _public_layout_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./public-layout.scss */ "./resources/js/components/Layouts/PublicLayout/public-layout.scss");
/* harmony import */ var _public_layout_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_public_layout_scss__WEBPACK_IMPORTED_MODULE_12__);
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















var PublicLayout = /*#__PURE__*/function (_Component) {
  _inherits(PublicLayout, _Component);

  var _super = _createSuper(PublicLayout);

  function PublicLayout() {
    var _this;

    _classCallCheck(this, PublicLayout);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this].concat(args));

    _defineProperty(_assertThisInitialized(_this), "menu", function () {
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_5__["Menu"], {
        onClick: _this.handleSelectLanguage
      }, constants__WEBPACK_IMPORTED_MODULE_10__["listLang"].map(function (obj) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(antd__WEBPACK_IMPORTED_MODULE_5__["Menu"].Item, {
          key: obj.lang
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: "lang-menu-item"
        }, renderIcon(obj.icon), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", {
          className: "ml-10"
        }, obj.name)));
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectLanguage", function (_ref) {
      var key = _ref.key;
      var _this$props = _this.props,
          language = _this$props.language,
          switchLanguageCall = _this$props.switchLanguageCall;
      services__WEBPACK_IMPORTED_MODULE_6__["fetchService"].addDefaultHeader(constants__WEBPACK_IMPORTED_MODULE_10__["LANG_PARAM"], key);
      language !== key && switchLanguageCall(key);
    });

    return _this;
  }

  _createClass(PublicLayout, [{
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          children = _this$props2.children,
          language = _this$props2.language;
      var currentLanguage = constants__WEBPACK_IMPORTED_MODULE_10__["listLang"].find(function (l) {
        return l.lang === language;
      });
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, children);
    }
  }]);

  return PublicLayout;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var mapStateToProps = Object(reselect__WEBPACK_IMPORTED_MODULE_3__["createStructuredSelector"])({
  language: Object(modules_translates_selectors__WEBPACK_IMPORTED_MODULE_7__["getLanguageCode"])()
});

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    switchLanguageCall: function switchLanguageCall(languageCode) {
      dispatch(Object(modules_translates_actions__WEBPACK_IMPORTED_MODULE_8__["switchLanguage"])(languageCode));
    }
  };
};

PublicLayout.propTypes = {
  language: prop_types__WEBPACK_IMPORTED_MODULE_2__["PropTypes"].string,
  children: prop_types__WEBPACK_IMPORTED_MODULE_2__["PropTypes"].element
};
/* harmony default export */ __webpack_exports__["default"] = (Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps)(PublicLayout));

/***/ }),

/***/ "./resources/js/components/Layouts/PublicLayout/public-layout.scss":
/*!*************************************************************************!*\
  !*** ./resources/js/components/Layouts/PublicLayout/public-layout.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__(/*! !../../../../../node_modules/css-loader/dist/cjs.js!../../../../../node_modules/postcss-loader/src??ref--7-2!../../../../../node_modules/sass-loader/dist/cjs.js??ref--7-3!./public-layout.scss */ "./node_modules/css-loader/dist/cjs.js!./node_modules/postcss-loader/src/index.js?!./node_modules/sass-loader/dist/cjs.js?!./resources/js/components/Layouts/PublicLayout/public-layout.scss");

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