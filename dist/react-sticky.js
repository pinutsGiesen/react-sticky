(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"), require("react-dom"));
	else if(typeof define === 'function' && define.amd)
		define(["react", "react-dom"], factory);
	else if(typeof exports === 'object')
		exports["ReactSticky"] = factory(require("react"), require("react-dom"));
	else
		root["ReactSticky"] = factory(root["React"], root["ReactDOM"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Channel = exports.StickyContainer = exports.Sticky = undefined;

	var _sticky = __webpack_require__(5);

	var _sticky2 = _interopRequireDefault(_sticky);

	var _container = __webpack_require__(4);

	var _container2 = _interopRequireDefault(_container);

	var _channel = __webpack_require__(1);

	var _channel2 = _interopRequireDefault(_channel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.Sticky = _sticky2.default;
	exports.StickyContainer = _container2.default;
	exports.Channel = _channel2.default;
	exports.default = _sticky2.default;

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Channel = function Channel(data) {
	  _classCallCheck(this, Channel);

	  var listeners = [];
	  data = data || {};

	  this.subscribe = function (fn) {
	    listeners.push(fn);
	  };

	  this.unsubscribe = function (fn) {
	    var idx = listeners.indexOf(fn);
	    if (idx !== -1) listeners.splice(idx, 1);
	  };

	  this.update = function (fn) {
	    if (fn) fn(data);
	    listeners.forEach(function (l) {
	      return l(data);
	    });
	  };
	};

	exports.default = Channel;
	module.exports = exports['default'];

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _channel = __webpack_require__(1);

	var _channel2 = _interopRequireDefault(_channel);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Container = function (_React$Component) {
	  _inherits(Container, _React$Component);

	  function Container(props) {
	    _classCallCheck(this, Container);

	    var _this = _possibleConstructorReturn(this, (Container.__proto__ || Object.getPrototypeOf(Container)).call(this, props));

	    _this.updateOffset = function (_ref) {
	      var inherited = _ref.inherited;
	      var offset = _ref.offset;

	      _this.channel.update(function (data) {
	        data.inherited = inherited + offset;
	      });
	    };

	    _this.channel = new _channel2.default({ inherited: 0, offset: 0, node: null });
	    return _this;
	  }

	  _createClass(Container, [{
	    key: 'getChildContext',
	    value: function getChildContext() {
	      return { 'sticky-channel': this.channel };
	    }
	  }, {
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      var parentChannel = this.context['sticky-channel'];
	      if (parentChannel) parentChannel.subscribe(this.updateOffset);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      var node = _reactDom2.default.findDOMNode(this);
	      this.channel.update(function (data) {
	        data.node = node;
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.channel.update(function (data) {
	        data.node = null;
	      });

	      var parentChannel = this.context['sticky-channel'];
	      if (parentChannel) parentChannel.unsubscribe(this.updateOffset);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _react2.default.createElement(
	        'div',
	        this.props,
	        this.props.children
	      );
	    }
	  }]);

	  return Container;
	}(_react2.default.Component);

	Container.contextTypes = {
	  'sticky-channel': _react2.default.PropTypes.any
	};
	Container.childContextTypes = {
	  'sticky-channel': _react2.default.PropTypes.any
	};
	exports.default = Container;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(2);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(3);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Sticky = function (_React$Component) {
	  _inherits(Sticky, _React$Component);

	  function Sticky(props) {
	    _classCallCheck(this, Sticky);

	    var _this = _possibleConstructorReturn(this, (Sticky.__proto__ || Object.getPrototypeOf(Sticky)).call(this, props));

	    _this.updateContext = function (_ref) {
	      var inherited = _ref.inherited;
	      var node = _ref.node;

	      _this.containerNode = node;
	      _this.setState({
	        containerOffset: inherited,
	        containerBottom: _this.getContainerRect().bottom,
	        containerTop: _this.getContainerRect().top,
	        placeholderTop: _this.getPlaceholderRect().top
	      });
	    };

	    _this.recomputeState = function () {
	      var isSticky = _this.isSticky();
	      var height = _this.getHeight();
	      var width = _this.getWidth();
	      var xOffset = _this.getXOffset();
	      var containerBottom = _this.getContainerRect().bottom;
	      var containerTop = _this.getContainerRect().top;
	      var placeholderTop = _this.getPlaceholderRect().top;
	      var hasChanged = _this.state.isSticky !== isSticky;
	      var winHeight = window.innerHeight;

	      _this.setState({ isSticky: isSticky, height: height, width: width, xOffset: xOffset, containerBottom: containerBottom, containerTop: containerTop, placeholderTop: placeholderTop, winHeight: winHeight });

	      if (hasChanged) {
	        if (_this.channel) {
	          _this.channel.update(function (data) {
	            data.offset = isSticky ? _this.state.height : 0;
	          });
	        }

	        _this.props.onStickyStateChange(isSticky);
	      }
	    };

	    _this.state = {};
	    return _this;
	  }

	  _createClass(Sticky, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      this.channel = this.context['sticky-channel'];
	      this.channel.subscribe(this.updateContext);
	    }
	  }, {
	    key: 'componentDidMount',
	    value: function componentDidMount() {
	      this.on(['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'], this.recomputeState);
	      this.recomputeState();
	    }
	  }, {
	    key: 'componentWillReceiveProps',
	    value: function componentWillReceiveProps() {
	      this.recomputeState();
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      this.off(['resize', 'scroll', 'touchstart', 'touchmove', 'touchend', 'pageshow', 'load'], this.recomputeState);
	      this.channel.unsubscribe(this.updateContext);
	    }
	  }, {
	    key: 'getXOffset',
	    value: function getXOffset() {
	      return this.refs.placeholder.getBoundingClientRect().left;
	    }
	  }, {
	    key: 'getWidth',
	    value: function getWidth() {
	      return this.refs.placeholder.getBoundingClientRect().width;
	    }
	  }, {
	    key: 'getHeight',
	    value: function getHeight() {
	      return _reactDom2.default.findDOMNode(this.refs.children).getBoundingClientRect().height;
	    }
	  }, {
	    key: 'getPlaceholderRect',
	    value: function getPlaceholderRect() {
	      return this.refs.placeholder.getBoundingClientRect();
	    }
	  }, {
	    key: 'getContainerRect',
	    value: function getContainerRect() {
	      return this.containerNode ? this.containerNode.getBoundingClientRect() : {
	        top: 0,
	        bottom: 0
	      };
	    }
	  }, {
	    key: 'isStickyBottom',
	    value: function isStickyBottom() {
	      var bottomOffset = this.props.bottomOffset;
	      var _state = this.state;
	      var containerOffset = _state.containerOffset;
	      var height = _state.height;
	      var placeholderTop = _state.placeholderTop;
	      var winHeight = _state.winHeight;


	      var bottomBreakpoint = containerOffset - bottomOffset;
	      var placeholderBottom = placeholderTop + height;

	      return placeholderBottom >= winHeight - bottomBreakpoint;
	    }
	  }, {
	    key: 'isStickyTop',
	    value: function isStickyTop() {
	      var distancesFromPlaceholder = this.getPlaceholderRect().top;

	      var topBreakpoint = this.state.containerOffset - this.props.topOffset;
	      var bottomBreakpoint = this.state.containerOffset + this.props.bottomOffset;

	      return distancesFromPlaceholder <= topBreakpoint && this.state.containerBottom >= bottomBreakpoint;
	    }
	  }, {
	    key: 'isSticky',
	    value: function isSticky() {
	      if (!this.props.isActive) {
	        return false;
	      }

	      return this.props.position === 'top' ? this.isStickyTop() : this.isStickyBottom();
	    }
	  }, {
	    key: 'on',
	    value: function on(events, callback) {
	      events.forEach(function (evt) {
	        window.addEventListener(evt, callback);
	      });
	    }
	  }, {
	    key: 'off',
	    value: function off(events, callback) {
	      events.forEach(function (evt) {
	        window.removeEventListener(evt, callback);
	      });
	    }
	  }, {
	    key: 'shouldComponentUpdate',
	    value: function shouldComponentUpdate(newProps, newState) {
	      var _this2 = this;

	      // Have we changed the number of props?
	      var propNames = Object.keys(this.props);
	      if (Object.keys(newProps).length != propNames.length) return true;

	      // Have we changed any prop values?
	      var valuesMatch = propNames.every(function (key) {
	        return newProps.hasOwnProperty(key) && newProps[key] === _this2.props[key];
	      });
	      if (!valuesMatch) return true;

	      // Have we changed any state that will always impact rendering?
	      var state = this.state;
	      if (newState.isSticky !== state.isSticky) return true;

	      // If we are sticky, have we changed any state that will impact rendering?
	      if (state.isSticky) {
	        if (newState.height !== state.height) return true;
	        if (newState.width !== state.width) return true;
	        if (newState.xOffset !== state.xOffset) return true;
	        if (newState.containerOffset !== state.containerOffset) return true;
	        if (newState.containerBottom !== state.containerBottom) return true;
	        if (newState.placeholderTop !== state.placeholderTop) return true;
	        if (newState.containerTop !== state.containerTop) return true;
	      }

	      return false;
	    }
	  }, {
	    key: 'getPositionOffset',
	    value: function getPositionOffset() {
	      var _state2 = this.state;
	      var containerOffset = _state2.containerOffset;
	      var containerTop = _state2.containerTop;
	      var containerBottom = _state2.containerBottom;
	      var height = _state2.height;
	      var _props = this.props;
	      var bottomOffset = _props.bottomOffset;
	      var position = _props.position;
	      var topOffset = _props.topOffset;


	      var bottomLimit = containerBottom - height - bottomOffset;
	      var topLimit = window.innerHeight - containerTop - topOffset;

	      return position === 'top' ? Math.min(containerOffset, bottomLimit) : Math.min(containerOffset, topLimit);
	    }

	    /*
	     * The special sauce.
	     */

	  }, {
	    key: 'render',
	    value: function render() {
	      var _extends2;

	      var _props2 = this.props;
	      var propsClassName = _props2.className;
	      var position = _props2.position;
	      var stickyClassName = _props2.stickyClassName;
	      var stickyStyle = _props2.stickyStyle;
	      var style = _props2.style;

	      var props = _objectWithoutProperties(_props2, ['className', 'position', 'stickyClassName', 'stickyStyle', 'style']);

	      var _state3 = this.state;
	      var isSticky = _state3.isSticky;
	      var height = _state3.height;
	      var width = _state3.width;
	      var xOffset = _state3.xOffset;


	      var placeholderStyle = { paddingBottom: isSticky ? height : 0 };
	      var className = propsClassName + ' ' + (isSticky ? stickyClassName : '');
	      var finalStickyStyle = isSticky && _extends((_extends2 = {
	        position: 'fixed'
	      }, _defineProperty(_extends2, position, this.getPositionOffset()), _defineProperty(_extends2, 'left', xOffset), _defineProperty(_extends2, 'width', width), _extends2), stickyStyle);

	      // To ensure that this component becomes sticky immediately on mobile devices instead
	      // of disappearing until the scroll event completes, we add `transform: translateZ(0)`
	      // to 'kick' rendering of this element to the GPU
	      // @see http://stackoverflow.com/questions/32875046
	      var finalStyle = _extends({
	        transform: 'translateZ(0)'
	      }, style, finalStickyStyle || {});

	      return _react2.default.createElement(
	        'div',
	        null,
	        _react2.default.createElement('div', { ref: 'placeholder', style: placeholderStyle }),
	        _react2.default.createElement(
	          'div',
	          _extends({}, props, { ref: 'children', className: className, style: finalStyle }),
	          this.props.children
	        )
	      );
	    }
	  }]);

	  return Sticky;
	}(_react2.default.Component);

	Sticky.propTypes = {
	  isActive: _react2.default.PropTypes.bool,
	  className: _react2.default.PropTypes.string,
	  position: _react2.default.PropTypes.oneOf(['top', 'bottom']),
	  style: _react2.default.PropTypes.object,
	  stickyClassName: _react2.default.PropTypes.string,
	  stickyStyle: _react2.default.PropTypes.object,
	  topOffset: _react2.default.PropTypes.number,
	  bottomOffset: _react2.default.PropTypes.number,
	  onStickyStateChange: _react2.default.PropTypes.func
	};
	Sticky.defaultProps = {
	  isActive: true,
	  className: '',
	  position: 'top',
	  style: {},
	  stickyClassName: 'sticky',
	  stickyStyle: {},
	  topOffset: 0,
	  bottomOffset: 0,
	  onStickyStateChange: function onStickyStateChange() {}
	};
	Sticky.contextTypes = {
	  'sticky-channel': _react2.default.PropTypes.any
	};
	exports.default = Sticky;
	module.exports = exports['default'];

/***/ }
/******/ ])
});
;