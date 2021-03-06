module.exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(204);


/***/ },

/***/ 3:
/***/ function(module, exports) {

	module.exports = function normalizeComponent (
	  rawScriptExports,
	  compiledTemplate,
	  scopeId,
	  cssModules
	) {
	  var esModule
	  var scriptExports = rawScriptExports = rawScriptExports || {}

	  // ES6 modules interop
	  var type = typeof rawScriptExports.default
	  if (type === 'object' || type === 'function') {
	    esModule = rawScriptExports
	    scriptExports = rawScriptExports.default
	  }

	  // Vue.extend constructor export interop
	  var options = typeof scriptExports === 'function'
	    ? scriptExports.options
	    : scriptExports

	  // render functions
	  if (compiledTemplate) {
	    options.render = compiledTemplate.render
	    options.staticRenderFns = compiledTemplate.staticRenderFns
	  }

	  // scopedId
	  if (scopeId) {
	    options._scopeId = scopeId
	  }

	  // inject cssModules
	  if (cssModules) {
	    var computed = options.computed || (options.computed = {})
	    Object.keys(cssModules).forEach(function (key) {
	      var module = cssModules[key]
	      computed[key] = function () { return module }
	    })
	  }

	  return {
	    esModule: esModule,
	    exports: scriptExports,
	    options: options
	  }
	}


/***/ },

/***/ 56:
/***/ function(module, exports) {

	module.exports = require("vue");

/***/ },

/***/ 132:
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/utils/popup");

/***/ },

/***/ 204:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _main = __webpack_require__(205);

	var _main2 = _interopRequireDefault(_main);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = _main2.default;

/***/ },

/***/ 205:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _vue = __webpack_require__(56);

	var _vue2 = _interopRequireDefault(_vue);

	var _popup = __webpack_require__(132);

	var _vdom = __webpack_require__(206);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var NotificationConstructor = _vue2.default.extend(__webpack_require__(207));

	var instance = void 0;
	var instances = [];
	var seed = 1;

	var Notification = function Notification(options) {
	  if (_vue2.default.prototype.$isServer) return;
	  options = options || {};
	  var userOnClose = options.onClose;
	  // 增加点击处理函数
	  var userOnClick = options.onClick;
	  var id = 'notification_' + seed++;

	  options.onClose = function () {
	    Notification.close(id, userOnClose);
	  };
	  // 自定义增加点击函数
	  options.onClick = function () {
	    Notification.click(id, userOnClick);
	  };
	  instance = new NotificationConstructor({
	    data: options
	  });

	  if ((0, _vdom.isVNode)(options.message)) {
	    instance.$slots.default = [options.message];
	    options.message = '';
	  }
	  instance.id = id;
	  instance.vm = instance.$mount();
	  document.body.appendChild(instance.vm.$el);
	  instance.vm.visible = true;
	  instance.dom = instance.vm.$el;
	  instance.dom.style.zIndex = _popup.PopupManager.nextZIndex();

	  var offset = options.offset || 0;
	  var topDist = offset;
	  for (var i = 0, len = instances.length; i < len; i++) {
	    topDist += instances[i].$el.offsetHeight + 16;
	  }
	  topDist += 16;
	  instance.top = topDist;
	  instances.push(instance);
	  return instance.vm;
	};

	['success', 'warning', 'info', 'error'].forEach(function (type) {
	  Notification[type] = function (options) {
	    if (typeof options === 'string' || (0, _vdom.isVNode)(options)) {
	      options = {
	        message: options
	      };
	    }
	    options.type = type;
	    return Notification(options);
	  };
	});

	Notification.close = function (id, userOnClose) {
	  var index = void 0;
	  var removedHeight = void 0;
	  for (var i = 0, len = instances.length; i < len; i++) {
	    if (id === instances[i].id) {
	      if (typeof userOnClose === 'function') {
	        userOnClose(instances[i]);
	      }
	      index = i;
	      removedHeight = instances[i].dom.offsetHeight;
	      instances.splice(i, 1);
	      break;
	    }
	  }

	  if (len > 1) {
	    for (i = index; i < len - 1; i++) {
	      instances[i].dom.style.top = parseInt(instances[i].dom.style.top, 10) - removedHeight - 16 + 'px';
	    }
	  }
	};
	Notification.click = function (id, userOnClick) {
	  var index = void 0;
	  var removedHeight = void 0;
	  for (var i = 0, len = instances.length; i < len; i++) {
	    if (id === instances[i].id) {
	      if (typeof userOnClick === 'function') {
	        userOnClick(instances[i]);
	      }
	      index = i;
	      removedHeight = instances[i].dom.offsetHeight;
	      instances.splice(i, 1);
	      break;
	    }
	  }

	  if (len > 1) {
	    for (i = index; i < len - 1; i++) {
	      instances[i].dom.style.top = parseInt(instances[i].dom.style.top, 10) - removedHeight - 16 + 'px';
	    }
	  }
	};
	exports.default = Notification;

/***/ },

/***/ 206:
/***/ function(module, exports) {

	module.exports = require("element-ui/lib/utils/vdom");

/***/ },

/***/ 207:
/***/ function(module, exports, __webpack_require__) {

	var Component = __webpack_require__(3)(
	  /* script */
	  __webpack_require__(208),
	  /* template */
	  __webpack_require__(209),
	  /* scopeId */
	  null,
	  /* cssModules */
	  null
	)

	module.exports = Component.exports


/***/ },

/***/ 208:
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//

	var typeMap = {
	  success: 'circle-check',
	  info: 'information',
	  warning: 'warning',
	  error: 'circle-cross'
	};

	exports.default = {
	  data: function data() {
	    return {
	      visible: false,
	      title: '',
	      message: '',
	      time: '', // 增加时间显示
	      duration: 4500,
	      type: '',
	      customClass: '',
	      iconClass: '',
	      onClose: null,
	      onClick: null, // 增加的自定义函数
	      closed: false,
	      top: null,
	      timer: null,
	      showConfirmButton: true // 增加是否显示处理按钮标志
	    };
	  },


	  computed: {
	    typeClass: function typeClass() {
	      return this.type && typeMap[this.type] ? 'el-icon-' + typeMap[this.type] : '';
	    }
	  },

	  watch: {
	    closed: function closed(newVal) {
	      if (newVal) {
	        this.visible = false;
	        this.$el.addEventListener('transitionend', this.destroyElement);
	      }
	    }
	  },

	  methods: {
	    destroyElement: function destroyElement() {
	      this.$el.removeEventListener('transitionend', this.destroyElement);
	      this.$destroy(true);
	      this.$el.parentNode.removeChild(this.$el);
	    },
	    close: function close() {
	      this.closed = true;
	      if (typeof this.onClose === 'function') {
	        this.onClose();
	      }
	    },


	    // 增加自定义函数
	    click: function click() {
	      this.closed = true;
	      if (typeof this.onClick === 'function') {
	        this.onClick();
	      }
	    },
	    clearTimer: function clearTimer() {
	      clearTimeout(this.timer);
	    },
	    startTimer: function startTimer() {
	      var _this = this;

	      if (this.duration > 0) {
	        this.timer = setTimeout(function () {
	          if (!_this.closed) {
	            _this.close();
	          }
	        }, this.duration);
	      }
	    }
	  },

	  mounted: function mounted() {
	    var _this2 = this;

	    if (this.duration > 0) {
	      this.timer = setTimeout(function () {
	        if (!_this2.closed) {
	          _this2.close();
	        }
	      }, this.duration);
	    }
	  }
	};

/***/ },

/***/ 209:
/***/ function(module, exports) {

	module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
	  return _c('transition', {
	    attrs: {
	      "name": "el-notification-fade"
	    }
	  }, [_c('div', {
	    directives: [{
	      name: "show",
	      rawName: "v-show",
	      value: (_vm.visible),
	      expression: "visible"
	    }],
	    staticClass: "el-notification",
	    class: _vm.customClass,
	    style: ({
	      top: _vm.top ? _vm.top + 'px' : 'auto'
	    }),
	    on: {
	      "mouseenter": function($event) {
	        _vm.clearTimer()
	      },
	      "mouseleave": function($event) {
	        _vm.startTimer()
	      }
	    }
	  }, [(_vm.type || _vm.iconClass) ? _c('i', {
	    staticClass: "el-notification__icon",
	    class: [_vm.typeClass, _vm.iconClass]
	  }) : _vm._e(), _c('div', {
	    staticClass: "el-notification__group",
	    class: {
	      'is-with-icon': _vm.typeClass || _vm.iconClass
	    }
	  }, [_c('div', {
	    staticClass: "clearfix h24"
	  }, [_c('h2', {
	    staticClass: "el-notification__title fl",
	    domProps: {
	      "textContent": _vm._s(_vm.title)
	    }
	  }), _c('span', {
	    staticClass: "fl fontSize12 marginL15 lineH22",
	    domProps: {
	      "textContent": _vm._s(_vm.time)
	    }
	  })]), _c('div', {
	    staticClass: "el-notification__content"
	  }, [_vm._t("default", [_vm._v(_vm._s(_vm.message))])], 2), _c('div', {
	    staticClass: "el-notification__closeBtn el-icon-close",
	    on: {
	      "click": _vm.close
	    }
	  }), (_vm.showConfirmButton) ? _c('div', {
	    staticClass: "ghost-btn-wrap"
	  }, [_c('button', {
	    staticClass: "el-button ghost-btn fr h30 marginT5 marginL10 el-button--default el-button--small",
	    on: {
	      "click": _vm.click
	    }
	  }, [_vm._v("点击前往")])]) : _vm._e()])])])
	},staticRenderFns: []}

/***/ }

/******/ });