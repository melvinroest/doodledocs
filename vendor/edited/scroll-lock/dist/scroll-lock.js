(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["scrollLock"] = factory();
	else
		root["scrollLock"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/scroll-lock.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/scroll-lock.js":
/*!****************************!*\
  !*** ./src/scroll-lock.js ***!
  \****************************/
/*! exports provided: disablePageScroll, enablePageScroll, getScrollState, clearQueueScrollLocks, getTargetScrollBarWidth, getCurrentTargetScrollBarWidth, getPageScrollBarWidth, getCurrentPageScrollBarWidth, addScrollableTarget, removeScrollableTarget, addScrollableSelector, removeScrollableSelector, addLockableTarget, addLockableSelector, setFillGapMethod, addFillGapTarget, removeFillGapTarget, addFillGapSelector, removeFillGapSelector, refillGaps, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "disablePageScroll", function() { return disablePageScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "enablePageScroll", function() { return enablePageScroll; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getScrollState", function() { return getScrollState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clearQueueScrollLocks", function() { return clearQueueScrollLocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getTargetScrollBarWidth", function() { return getTargetScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentTargetScrollBarWidth", function() { return getCurrentTargetScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getPageScrollBarWidth", function() { return getPageScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCurrentPageScrollBarWidth", function() { return getCurrentPageScrollBarWidth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addScrollableTarget", function() { return addScrollableTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeScrollableTarget", function() { return removeScrollableTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addScrollableSelector", function() { return addScrollableSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeScrollableSelector", function() { return removeScrollableSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLockableTarget", function() { return addLockableTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addLockableSelector", function() { return addLockableSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setFillGapMethod", function() { return setFillGapMethod; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFillGapTarget", function() { return addFillGapTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFillGapTarget", function() { return removeFillGapTarget; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "addFillGapSelector", function() { return addFillGapSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeFillGapSelector", function() { return removeFillGapSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "refillGaps", function() { return refillGaps; });
/* harmony import */ var _tools__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tools */ "./src/tools.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var FILL_GAP_AVAILABLE_METHODS = ['padding', 'margin', 'width', 'max-width', 'none'];
var TOUCH_DIRECTION_DETECT_OFFSET = 3;
var state = {
  scroll: true,
  queue: 0,
  scrollableSelectors: ['[data-scroll-lock-scrollable]'],
  lockableSelectors: ['body', '[data-scroll-lock-lockable]'],
  fillGapSelectors: ['body', '[data-scroll-lock-fill-gap]', '[data-scroll-lock-lockable]'],
  fillGapMethod: FILL_GAP_AVAILABLE_METHODS[0],
  //
  startTouchY: 0,
  startTouchX: 0
};
var disablePageScroll = function disablePageScroll(target) {
  if (state.queue <= 0) {
    state.scroll = false;
    hideLockableOverflow();
    fillGaps();
  }

  addScrollableTarget(target);
  state.queue++;
};
var enablePageScroll = function enablePageScroll(target) {
  state.queue > 0 && state.queue--;

  if (state.queue <= 0) {
    state.scroll = true;
    showLockableOverflow();
    unfillGaps();
  }

  removeScrollableTarget(target);
};
var getScrollState = function getScrollState() {
  return state.scroll;
};
var clearQueueScrollLocks = function clearQueueScrollLocks() {
  state.queue = 0;
};
var getTargetScrollBarWidth = function getTargetScrollBarWidth($target) {
  var onlyExists = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
    var currentOverflowYProperty = $target.style.overflowY;

    if (onlyExists) {
      if (!getScrollState()) {
        $target.style.overflowY = $target.dataset.scrollLockSavedOverflowYProperty;
      }
    } else {
      $target.style.overflowY = 'scroll';
    }

    var width = getCurrentTargetScrollBarWidth($target);
    $target.style.overflowY = currentOverflowYProperty;
    return width;
  } else {
    return 0;
  }
};
var getCurrentTargetScrollBarWidth = function getCurrentTargetScrollBarWidth($target) {
  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
    if ($target === document.body) {
      var documentWidth = document.documentElement.clientWidth;
      var windowWidth = window.innerWidth;
      var currentWidth = windowWidth - documentWidth;
      return currentWidth;
    } else {
      var borderLeftWidthCurrentProperty = $target.style.borderLeftWidth;
      var borderRightWidthCurrentProperty = $target.style.borderRightWidth;
      $target.style.borderLeftWidth = '0px';
      $target.style.borderRightWidth = '0px';

      var _currentWidth = $target.offsetWidth - $target.clientWidth;

      $target.style.borderLeftWidth = borderLeftWidthCurrentProperty;
      $target.style.borderRightWidth = borderRightWidthCurrentProperty;
      return _currentWidth;
    }
  } else {
    return 0;
  }
};
var getPageScrollBarWidth = function getPageScrollBarWidth() {
  var onlyExists = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  return getTargetScrollBarWidth(document.body, onlyExists);
};
var getCurrentPageScrollBarWidth = function getCurrentPageScrollBarWidth() {
  return getCurrentTargetScrollBarWidth(document.body);
};
var addScrollableTarget = function addScrollableTarget(target) {
  if (target) {
    var targets = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(target);
    targets.map(function ($targets) {
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
          $target.dataset.scrollLockScrollable = '';
        } else {
          Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat($target, "\" is not a Element."));
        }
      });
    });
  }
};
var removeScrollableTarget = function removeScrollableTarget(target) {
  if (target) {
    var targets = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(target);
    targets.map(function ($targets) {
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
          delete $target.dataset.scrollLockScrollable;
        } else {
          Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat($target, "\" is not a Element."));
        }
      });
    });
  }
};
var addScrollableSelector = function addScrollableSelector(selector) {
  if (selector) {
    var selectors = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(selector);
    selectors.map(function (selector) {
      state.scrollableSelectors.push(selector);
    });
  }
};
var removeScrollableSelector = function removeScrollableSelector(selector) {
  if (selector) {
    var selectors = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(selector);
    selectors.map(function (selector) {
      state.scrollableSelectors = state.scrollableSelectors.filter(function (sSelector) {
        return sSelector !== selector;
      });
    });
  }
};
var addLockableTarget = function addLockableTarget(target) {
  if (target) {
    var targets = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(target);
    targets.map(function ($targets) {
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
          $target.dataset.scrollLockLockable = '';
        } else {
          Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat($target, "\" is not a Element."));
        }
      });
    });

    if (!getScrollState()) {
      hideLockableOverflow();
    }
  }
};
var addLockableSelector = function addLockableSelector(selector) {
  if (selector) {
    var selectors = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(selector);
    selectors.map(function (selector) {
      state.lockableSelectors.push(selector);
    });

    if (!getScrollState()) {
      hideLockableOverflow();
    }

    addFillGapSelector(selector);
  }
};
var setFillGapMethod = function setFillGapMethod(method) {
  if (method) {
    if (FILL_GAP_AVAILABLE_METHODS.indexOf(method) !== -1) {
      state.fillGapMethod = method;
      refillGaps();
    } else {
      var methods = FILL_GAP_AVAILABLE_METHODS.join(', ');
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat(method, "\" method is not available!\nAvailable fill gap methods: ").concat(methods, "."));
    }
  }
};
var addFillGapTarget = function addFillGapTarget(target) {
  if (target) {
    var targets = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(target);
    targets.map(function ($targets) {
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
          $target.dataset.scrollLockFillGap = '';

          if (!state.scroll) {
            fillGapTarget($target);
          }
        } else {
          Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat($target, "\" is not a Element."));
        }
      });
    });
  }
};
var removeFillGapTarget = function removeFillGapTarget(target) {
  if (target) {
    var targets = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(target);
    targets.map(function ($targets) {
      Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
        if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
          delete $target.dataset.scrollLockFillGap;

          if (!state.scroll) {
            unfillGapTarget($target);
          }
        } else {
          Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])("\"".concat($target, "\" is not a Element."));
        }
      });
    });
  }
};
var addFillGapSelector = function addFillGapSelector(selector) {
  if (selector) {
    var selectors = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(selector);
    selectors.map(function (selector) {
      state.fillGapSelectors.push(selector);

      if (!state.scroll) {
        fillGapSelector(selector);
      }
    });
  }
};
var removeFillGapSelector = function removeFillGapSelector(selector) {
  if (selector) {
    var selectors = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["argumentAsArray"])(selector);
    selectors.map(function (selector) {
      state.fillGapSelectors = state.fillGapSelectors.filter(function (fSelector) {
        return fSelector !== selector;
      });

      if (!state.scroll) {
        unfillGapSelector(selector);
      }
    });
  }
};
var refillGaps = function refillGaps() {
  if (!state.scroll) {
    fillGaps();
  }
};

var hideLockableOverflow = function hideLockableOverflow() {
  var selector = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["arrayAsSelector"])(state.lockableSelectors);
  hideLockableOverflowSelector(selector);
};

var showLockableOverflow = function showLockableOverflow() {
  var selector = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["arrayAsSelector"])(state.lockableSelectors);
  showLockableOverflowSelector(selector);
};

var hideLockableOverflowSelector = function hideLockableOverflowSelector(selector) {
  var $targets = document.querySelectorAll(selector);
  Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
    hideLockableOverflowTarget($target);
  });
};

var showLockableOverflowSelector = function showLockableOverflowSelector(selector) {
  var $targets = document.querySelectorAll(selector);
  Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
    showLockableOverflowTarget($target);
  });
};

var hideLockableOverflowTarget = function hideLockableOverflowTarget($target) {
  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target) && $target.dataset.scrollLockLocked !== 'true') {
    var computedStyle = window.getComputedStyle($target);
    $target.dataset.scrollLockSavedOverflowYProperty = computedStyle.overflowY;
    $target.dataset.scrollLockSavedInlineOverflowProperty = $target.style.overflow;
    $target.dataset.scrollLockSavedInlineOverflowYProperty = $target.style.overflowY;
    $target.style.overflow = 'hidden';
    $target.dataset.scrollLockLocked = 'true';
  }
};

var showLockableOverflowTarget = function showLockableOverflowTarget($target) {
  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target) && $target.dataset.scrollLockLocked === 'true') {
    $target.style.overflow = $target.dataset.scrollLockSavedInlineOverflowProperty;
    $target.style.overflowY = $target.dataset.scrollLockSavedInlineOverflowYProperty;
    delete $target.dataset.scrollLockSavedOverflowYProperty;
    delete $target.dataset.scrollLockSavedInlineOverflowProperty;
    delete $target.dataset.scrollLockSavedInlineOverflowYProperty;
    delete $target.dataset.scrollLockLocked;
  }
};

var fillGaps = function fillGaps() {
  state.fillGapSelectors.map(function (selector) {
    fillGapSelector(selector);
  });
};

var unfillGaps = function unfillGaps() {
  state.fillGapSelectors.map(function (selector) {
    unfillGapSelector(selector);
  });
};

var fillGapSelector = function fillGapSelector(selector) {
  var $targets = document.querySelectorAll(selector);
  var isLockable = state.lockableSelectors.indexOf(selector) !== -1;
  Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
    fillGapTarget($target, isLockable);
  });
};

var fillGapTarget = function fillGapTarget($target) {
  var isLockable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
    var scrollBarWidth;

    if ($target.dataset.scrollLockLockable === '' || isLockable) {
      scrollBarWidth = getTargetScrollBarWidth($target, true);
    } else {
      var $lockableParent = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["findParentBySelector"])($target, Object(_tools__WEBPACK_IMPORTED_MODULE_0__["arrayAsSelector"])(state.lockableSelectors));
      scrollBarWidth = getTargetScrollBarWidth($lockableParent, true);
    }

    if ($target.dataset.scrollLockFilledGap === 'true') {
      unfillGapTarget($target);
    }

    var computedStyle = window.getComputedStyle($target);
    $target.dataset.scrollLockFilledGap = 'true';
    $target.dataset.scrollLockCurrentFillGapMethod = state.fillGapMethod;

    if (state.fillGapMethod === 'margin') {
      var currentMargin = parseFloat(computedStyle.marginRight);
      $target.style.marginRight = "".concat(currentMargin + scrollBarWidth, "px");
    } else if (state.fillGapMethod === 'width') {
      $target.style.width = "calc(100% - ".concat(scrollBarWidth, "px)");
    } else if (state.fillGapMethod === 'max-width') {
      $target.style.maxWidth = "calc(100% - ".concat(scrollBarWidth, "px)");
    } else if (state.fillGapMethod === 'padding') {
      var currentPadding = parseFloat(computedStyle.paddingRight);
      $target.style.paddingRight = "".concat(currentPadding + scrollBarWidth, "px");
    }
  }
};

var unfillGapSelector = function unfillGapSelector(selector) {
  var $targets = document.querySelectorAll(selector);
  Object(_tools__WEBPACK_IMPORTED_MODULE_0__["eachNode"])($targets, function ($target) {
    unfillGapTarget($target);
  });
};

var unfillGapTarget = function unfillGapTarget($target) {
  if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["isElement"])($target)) {
    if ($target.dataset.scrollLockFilledGap === 'true') {
      var currentFillGapMethod = $target.dataset.scrollLockCurrentFillGapMethod;
      delete $target.dataset.scrollLockFilledGap;
      delete $target.dataset.scrollLockCurrentFillGapMethod;

      if (currentFillGapMethod === 'margin') {
        $target.style.marginRight = "";
      } else if (currentFillGapMethod === 'width') {
        $target.style.width = "";
      } else if (currentFillGapMethod === 'max-width') {
        $target.style.maxWidth = "";
      } else if (currentFillGapMethod === 'padding') {
        $target.style.paddingRight = "";
      }
    }
  }
};

var onResize = function onResize(e) {
  refillGaps();
};

var onTouchStart = function onTouchStart(e) {
  if (!state.scroll) {
    state.startTouchY = e.touches[0].clientY;
    state.startTouchX = e.touches[0].clientX;
  }
};

var onTouchMove = function onTouchMove(e) {
  if (!state.scroll) {
    var startTouchY = state.startTouchY,
        startTouchX = state.startTouchX;
    var currentClientY = e.touches[0].clientY;
    var currentClientX = e.touches[0].clientX;

    if (e.touches.length < 2) {
      var selector = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["arrayAsSelector"])(state.scrollableSelectors);
      var direction = {
        up: startTouchY < currentClientY,
        down: startTouchY > currentClientY,
        left: startTouchX < currentClientX,
        right: startTouchX > currentClientX
      };
      var directionWithOffset = {
        up: startTouchY + TOUCH_DIRECTION_DETECT_OFFSET < currentClientY,
        down: startTouchY - TOUCH_DIRECTION_DETECT_OFFSET > currentClientY,
        left: startTouchX + TOUCH_DIRECTION_DETECT_OFFSET < currentClientX,
        right: startTouchX - TOUCH_DIRECTION_DETECT_OFFSET > currentClientX
      };

      var handle = function handle($el) {
        var skip = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

        if ($el) {
          var parentScrollableEl = Object(_tools__WEBPACK_IMPORTED_MODULE_0__["findParentBySelector"])($el, selector, false);

          if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementIsInputRange"])($el)) {
            return false;
          }

          if (skip || Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementIsScrollableField"])($el) && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["findParentBySelector"])($el, selector) || Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementHasSelector"])($el, selector)) {
            var prevent = false;

            if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnStart"])($el) && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnEnd"])($el)) {
              if (direction.up && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnStart"])($el) || direction.down && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnEnd"])($el)) {
                prevent = true;
              }
            } else if (Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnStart"])($el) && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnEnd"])($el)) {
              if (direction.left && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnStart"])($el) || direction.right && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnEnd"])($el)) {
                prevent = true;
              }
            } else if (directionWithOffset.up && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnStart"])($el) || directionWithOffset.down && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollTopOnEnd"])($el) || directionWithOffset.left && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnStart"])($el) || directionWithOffset.right && Object(_tools__WEBPACK_IMPORTED_MODULE_0__["elementScrollLeftOnEnd"])($el)) {
              prevent = true;
            }

            if (prevent) {
              if (parentScrollableEl) {
                handle(parentScrollableEl, true);
              } else {
                e.preventDefault();
              }
            }
          } else {
            handle(parentScrollableEl);
          }
        } else {
          // console.log('e.preventDefault()', e, $el);
          e.preventDefault();
        }
      }; // console.log('handle(e.target)', e);
      // hack -- no clue how to get around it, so I simply do the following -- Melvin


      if (e.target.tagName === 'A' || e.target.tagName === 'INPUT' || e.target.tagName === 'SPAN' || e.target.tagName === 'BUTTON') {
        return;
      }

      handle(e.target);
    }
  }
};

var onTouchEnd = function onTouchEnd(e) {
  if (!state.scroll) {
    state.startTouchY = 0;
    state.startTouchX = 0;
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('resize', onResize);
}

if (typeof document !== 'undefined') {
  document.addEventListener('touchstart', onTouchStart);
  document.addEventListener('touchmove', onTouchMove, {
    passive: false
  });
  document.addEventListener('touchend', onTouchEnd);
}

var deprecatedMethods = {
  hide: function hide(target) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"hide" is deprecated! Use "disablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#disablepagescrollscrollabletarget');
    disablePageScroll(target);
  },
  show: function show(target) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"show" is deprecated! Use "enablePageScroll" instead. \n https://github.com/FL3NKEY/scroll-lock#enablepagescrollscrollabletarget');
    enablePageScroll(target);
  },
  toggle: function toggle(target) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"toggle" is deprecated! Do not use it.');

    if (getScrollState()) {
      disablePageScroll();
    } else {
      enablePageScroll(target);
    }
  },
  getState: function getState() {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"getState" is deprecated! Use "getScrollState" instead. \n https://github.com/FL3NKEY/scroll-lock#getscrollstate');
    return getScrollState();
  },
  getWidth: function getWidth() {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"getWidth" is deprecated! Use "getPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getpagescrollbarwidth');
    return getPageScrollBarWidth();
  },
  getCurrentWidth: function getCurrentWidth() {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"getCurrentWidth" is deprecated! Use "getCurrentPageScrollBarWidth" instead. \n https://github.com/FL3NKEY/scroll-lock#getcurrentpagescrollbarwidth');
    return getCurrentPageScrollBarWidth();
  },
  setScrollableTargets: function setScrollableTargets(target) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"setScrollableTargets" is deprecated! Use "addScrollableTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addscrollabletargetscrollabletarget');
    addScrollableTarget(target);
  },
  setFillGapSelectors: function setFillGapSelectors(selector) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"setFillGapSelectors" is deprecated! Use "addFillGapSelector" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgapselectorfillgapselector');
    addFillGapSelector(selector);
  },
  setFillGapTargets: function setFillGapTargets(target) {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"setFillGapTargets" is deprecated! Use "addFillGapTarget" instead. \n https://github.com/FL3NKEY/scroll-lock#addfillgaptargetfillgaptarget');
    addFillGapTarget(target);
  },
  clearQueue: function clearQueue() {
    Object(_tools__WEBPACK_IMPORTED_MODULE_0__["throwError"])('"clearQueue" is deprecated! Use "clearQueueScrollLocks" instead. \n https://github.com/FL3NKEY/scroll-lock#clearqueuescrolllocks');
    clearQueueScrollLocks();
  }
};

var scrollLock = _objectSpread({
  disablePageScroll: disablePageScroll,
  enablePageScroll: enablePageScroll,
  getScrollState: getScrollState,
  clearQueueScrollLocks: clearQueueScrollLocks,
  getTargetScrollBarWidth: getTargetScrollBarWidth,
  getCurrentTargetScrollBarWidth: getCurrentTargetScrollBarWidth,
  getPageScrollBarWidth: getPageScrollBarWidth,
  getCurrentPageScrollBarWidth: getCurrentPageScrollBarWidth,
  addScrollableSelector: addScrollableSelector,
  removeScrollableSelector: removeScrollableSelector,
  addScrollableTarget: addScrollableTarget,
  removeScrollableTarget: removeScrollableTarget,
  addLockableSelector: addLockableSelector,
  addLockableTarget: addLockableTarget,
  addFillGapSelector: addFillGapSelector,
  removeFillGapSelector: removeFillGapSelector,
  addFillGapTarget: addFillGapTarget,
  removeFillGapTarget: removeFillGapTarget,
  setFillGapMethod: setFillGapMethod,
  refillGaps: refillGaps,
  _state: state
}, deprecatedMethods);

/* harmony default export */ __webpack_exports__["default"] = (scrollLock);

/***/ }),

/***/ "./src/tools.js":
/*!**********************!*\
  !*** ./src/tools.js ***!
  \**********************/
/*! exports provided: argumentAsArray, isElement, isElementList, eachNode, throwError, arrayAsSelector, nodeListAsArray, findParentBySelector, elementHasSelector, elementHasOverflowHidden, elementScrollTopOnStart, elementScrollTopOnEnd, elementScrollLeftOnStart, elementScrollLeftOnEnd, elementIsScrollableField, elementIsInputRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "argumentAsArray", function() { return argumentAsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElement", function() { return isElement; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isElementList", function() { return isElementList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "eachNode", function() { return eachNode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "throwError", function() { return throwError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "arrayAsSelector", function() { return arrayAsSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "nodeListAsArray", function() { return nodeListAsArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "findParentBySelector", function() { return findParentBySelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementHasSelector", function() { return elementHasSelector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementHasOverflowHidden", function() { return elementHasOverflowHidden; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementScrollTopOnStart", function() { return elementScrollTopOnStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementScrollTopOnEnd", function() { return elementScrollTopOnEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementScrollLeftOnStart", function() { return elementScrollLeftOnStart; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementScrollLeftOnEnd", function() { return elementScrollLeftOnEnd; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementIsScrollableField", function() { return elementIsScrollableField; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "elementIsInputRange", function() { return elementIsInputRange; });
var argumentAsArray = function argumentAsArray(argument) {
  return Array.isArray(argument) ? argument : [argument];
};
var isElement = function isElement(target) {
  return target instanceof Node;
};
var isElementList = function isElementList(nodeList) {
  return nodeList instanceof NodeList;
};
var eachNode = function eachNode(nodeList, callback) {
  if (nodeList && callback) {
    nodeList = isElementList(nodeList) ? nodeList : [nodeList];

    for (var i = 0; i < nodeList.length; i++) {
      if (callback(nodeList[i], i, nodeList.length) === true) {
        break;
      }
    }
  }
};
var throwError = function throwError(message) {
  return console.error("[scroll-lock] ".concat(message));
};
var arrayAsSelector = function arrayAsSelector(array) {
  if (Array.isArray(array)) {
    var selector = array.join(', ');
    return selector;
  }
};
var nodeListAsArray = function nodeListAsArray(nodeList) {
  var nodes = [];
  eachNode(nodeList, function (node) {
    return nodes.push(node);
  });
  return nodes;
};
var findParentBySelector = function findParentBySelector($el, selector) {
  var self = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  var $root = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : document;

  if (self && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1) {
    return $el;
  }

  while (($el = $el.parentElement) && nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) === -1) {
    ;
  }

  return $el;
};
var elementHasSelector = function elementHasSelector($el, selector) {
  var $root = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document;
  var has = nodeListAsArray($root.querySelectorAll(selector)).indexOf($el) !== -1;
  return has;
};
var elementHasOverflowHidden = function elementHasOverflowHidden($el) {
  if ($el) {
    var computedStyle = getComputedStyle($el);
    var overflowIsHidden = computedStyle.overflow === 'hidden';
    return overflowIsHidden;
  }
};
var elementScrollTopOnStart = function elementScrollTopOnStart($el) {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    var scrollTop = $el.scrollTop;
    return scrollTop <= 0;
  }
};
var elementScrollTopOnEnd = function elementScrollTopOnEnd($el) {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    var scrollTop = $el.scrollTop;
    var scrollHeight = $el.scrollHeight;
    var scrollTopWithHeight = scrollTop + $el.offsetHeight;
    return scrollTopWithHeight >= scrollHeight;
  }
};
var elementScrollLeftOnStart = function elementScrollLeftOnStart($el) {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    var scrollLeft = $el.scrollLeft;
    return scrollLeft <= 0;
  }
};
var elementScrollLeftOnEnd = function elementScrollLeftOnEnd($el) {
  if ($el) {
    if (elementHasOverflowHidden($el)) {
      return true;
    }

    var scrollLeft = $el.scrollLeft;
    var scrollWidth = $el.scrollWidth;
    var scrollLeftWithWidth = scrollLeft + $el.offsetWidth;
    return scrollLeftWithWidth >= scrollWidth;
  }
};
var elementIsScrollableField = function elementIsScrollableField($el) {
  var selector = 'textarea, [contenteditable="true"]';
  return elementHasSelector($el, selector);
};
var elementIsInputRange = function elementIsInputRange($el) {
  var selector = 'input[type="range"]';
  return elementHasSelector($el, selector);
};

/***/ })

/******/ })["default"];
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nyb2xsLWxvY2suanMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zY3JvbGxMb2NrL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9zY3JvbGxMb2NrL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Njcm9sbExvY2svLi9zcmMvc2Nyb2xsLWxvY2suanMiLCJ3ZWJwYWNrOi8vc2Nyb2xsTG9jay8uL3NyYy90b29scy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJzY3JvbGxMb2NrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInNjcm9sbExvY2tcIl0gPSBmYWN0b3J5KCk7XG59KSh0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9zY3JvbGwtbG9jay5qc1wiKTtcbiIsImltcG9ydCB7XG4gICAgZWFjaE5vZGUsXG4gICAgYXJndW1lbnRBc0FycmF5LFxuICAgIGlzRWxlbWVudCxcbiAgICB0aHJvd0Vycm9yLFxuICAgIGFycmF5QXNTZWxlY3RvcixcbiAgICBmaW5kUGFyZW50QnlTZWxlY3RvcixcbiAgICBlbGVtZW50U2Nyb2xsVG9wT25TdGFydCxcbiAgICBlbGVtZW50U2Nyb2xsVG9wT25FbmQsXG4gICAgZWxlbWVudFNjcm9sbExlZnRPblN0YXJ0LFxuICAgIGVsZW1lbnRTY3JvbGxMZWZ0T25FbmQsXG4gICAgZWxlbWVudElzU2Nyb2xsYWJsZUZpZWxkLFxuICAgIGVsZW1lbnRIYXNTZWxlY3RvcixcbiAgICBlbGVtZW50SXNJbnB1dFJhbmdlXG59IGZyb20gJy4vdG9vbHMnO1xuXG5jb25zdCBGSUxMX0dBUF9BVkFJTEFCTEVfTUVUSE9EUyA9IFsncGFkZGluZycsICdtYXJnaW4nLCAnd2lkdGgnLCAnbWF4LXdpZHRoJywgJ25vbmUnXTtcbmNvbnN0IFRPVUNIX0RJUkVDVElPTl9ERVRFQ1RfT0ZGU0VUID0gMztcblxuY29uc3Qgc3RhdGUgPSB7XG4gICAgc2Nyb2xsOiB0cnVlLFxuICAgIHF1ZXVlOiAwLFxuICAgIHNjcm9sbGFibGVTZWxlY3RvcnM6IFsnW2RhdGEtc2Nyb2xsLWxvY2stc2Nyb2xsYWJsZV0nXSxcbiAgICBsb2NrYWJsZVNlbGVjdG9yczogWydib2R5JywgJ1tkYXRhLXNjcm9sbC1sb2NrLWxvY2thYmxlXSddLFxuICAgIGZpbGxHYXBTZWxlY3RvcnM6IFsnYm9keScsICdbZGF0YS1zY3JvbGwtbG9jay1maWxsLWdhcF0nLCAnW2RhdGEtc2Nyb2xsLWxvY2stbG9ja2FibGVdJ10sXG4gICAgZmlsbEdhcE1ldGhvZDogRklMTF9HQVBfQVZBSUxBQkxFX01FVEhPRFNbMF0sXG4gICAgLy9cbiAgICBzdGFydFRvdWNoWTogMCxcbiAgICBzdGFydFRvdWNoWDogMFxufTtcblxuZXhwb3J0IGNvbnN0IGRpc2FibGVQYWdlU2Nyb2xsID0gKHRhcmdldCkgPT4ge1xuICAgIGlmIChzdGF0ZS5xdWV1ZSA8PSAwKSB7XG4gICAgICAgIHN0YXRlLnNjcm9sbCA9IGZhbHNlO1xuICAgICAgICBoaWRlTG9ja2FibGVPdmVyZmxvdygpO1xuICAgICAgICBmaWxsR2FwcygpO1xuICAgIH1cbiAgICBhZGRTY3JvbGxhYmxlVGFyZ2V0KHRhcmdldCk7XG4gICAgc3RhdGUucXVldWUrKztcbn07XG5leHBvcnQgY29uc3QgZW5hYmxlUGFnZVNjcm9sbCA9ICh0YXJnZXQpID0+IHtcbiAgICBzdGF0ZS5xdWV1ZSA+IDAgJiYgc3RhdGUucXVldWUtLTtcbiAgICBpZiAoc3RhdGUucXVldWUgPD0gMCkge1xuICAgICAgICBzdGF0ZS5zY3JvbGwgPSB0cnVlO1xuICAgICAgICBzaG93TG9ja2FibGVPdmVyZmxvdygpO1xuICAgICAgICB1bmZpbGxHYXBzKCk7XG4gICAgfVxuICAgIHJlbW92ZVNjcm9sbGFibGVUYXJnZXQodGFyZ2V0KTtcbn07XG5leHBvcnQgY29uc3QgZ2V0U2Nyb2xsU3RhdGUgPSAoKSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLnNjcm9sbDtcbn07XG5leHBvcnQgY29uc3QgY2xlYXJRdWV1ZVNjcm9sbExvY2tzID0gKCkgPT4ge1xuICAgIHN0YXRlLnF1ZXVlID0gMDtcbn07XG5leHBvcnQgY29uc3QgZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGggPSAoJHRhcmdldCwgb25seUV4aXN0cyA9IGZhbHNlKSA9PiB7XG4gICAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgICAgICBjb25zdCBjdXJyZW50T3ZlcmZsb3dZUHJvcGVydHkgPSAkdGFyZ2V0LnN0eWxlLm92ZXJmbG93WTtcbiAgICAgICAgaWYgKG9ubHlFeGlzdHMpIHtcbiAgICAgICAgICAgIGlmICghZ2V0U2Nyb2xsU3RhdGUoKSkge1xuICAgICAgICAgICAgICAgICR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZID0gJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tTYXZlZE92ZXJmbG93WVByb3BlcnR5O1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgJHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAnc2Nyb2xsJztcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB3aWR0aCA9IGdldEN1cnJlbnRUYXJnZXRTY3JvbGxCYXJXaWR0aCgkdGFyZ2V0KTtcbiAgICAgICAgJHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSBjdXJyZW50T3ZlcmZsb3dZUHJvcGVydHk7XG5cbiAgICAgICAgcmV0dXJuIHdpZHRoO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgZ2V0Q3VycmVudFRhcmdldFNjcm9sbEJhcldpZHRoID0gKCR0YXJnZXQpID0+IHtcbiAgICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG4gICAgICAgIGlmICgkdGFyZ2V0ID09PSBkb2N1bWVudC5ib2R5KSB7XG4gICAgICAgICAgICBjb25zdCBkb2N1bWVudFdpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgY29uc3Qgd2luZG93V2lkdGggPSB3aW5kb3cuaW5uZXJXaWR0aDtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXaWR0aCA9IHdpbmRvd1dpZHRoIC0gZG9jdW1lbnRXaWR0aDtcblxuICAgICAgICAgICAgcmV0dXJuIGN1cnJlbnRXaWR0aDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IGJvcmRlckxlZnRXaWR0aEN1cnJlbnRQcm9wZXJ0eSA9ICR0YXJnZXQuc3R5bGUuYm9yZGVyTGVmdFdpZHRoO1xuICAgICAgICAgICAgY29uc3QgYm9yZGVyUmlnaHRXaWR0aEN1cnJlbnRQcm9wZXJ0eSA9ICR0YXJnZXQuc3R5bGUuYm9yZGVyUmlnaHRXaWR0aDtcbiAgICAgICAgICAgICR0YXJnZXQuc3R5bGUuYm9yZGVyTGVmdFdpZHRoID0gJzBweCc7XG4gICAgICAgICAgICAkdGFyZ2V0LnN0eWxlLmJvcmRlclJpZ2h0V2lkdGggPSAnMHB4JztcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRXaWR0aCA9ICR0YXJnZXQub2Zmc2V0V2lkdGggLSAkdGFyZ2V0LmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgJHRhcmdldC5zdHlsZS5ib3JkZXJMZWZ0V2lkdGggPSBib3JkZXJMZWZ0V2lkdGhDdXJyZW50UHJvcGVydHk7XG4gICAgICAgICAgICAkdGFyZ2V0LnN0eWxlLmJvcmRlclJpZ2h0V2lkdGggPSBib3JkZXJSaWdodFdpZHRoQ3VycmVudFByb3BlcnR5O1xuXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFdpZHRoO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIDA7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBnZXRQYWdlU2Nyb2xsQmFyV2lkdGggPSAob25seUV4aXN0cyA9IGZhbHNlKSA9PiB7XG4gICAgcmV0dXJuIGdldFRhcmdldFNjcm9sbEJhcldpZHRoKGRvY3VtZW50LmJvZHksIG9ubHlFeGlzdHMpO1xufTtcbmV4cG9ydCBjb25zdCBnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoID0gKCkgPT4ge1xuICAgIHJldHVybiBnZXRDdXJyZW50VGFyZ2V0U2Nyb2xsQmFyV2lkdGgoZG9jdW1lbnQuYm9keSk7XG59O1xuZXhwb3J0IGNvbnN0IGFkZFNjcm9sbGFibGVUYXJnZXQgPSAodGFyZ2V0KSA9PiB7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXJnZXRzID0gYXJndW1lbnRBc0FycmF5KHRhcmdldCk7XG4gICAgICAgIHRhcmdldHMubWFwKCgkdGFyZ2V0cykgPT4ge1xuICAgICAgICAgICAgZWFjaE5vZGUoJHRhcmdldHMsICgkdGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja1Njcm9sbGFibGUgPSAnJztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0Vycm9yKGBcIiR7JHRhcmdldH1cIiBpcyBub3QgYSBFbGVtZW50LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHJlbW92ZVNjcm9sbGFibGVUYXJnZXQgPSAodGFyZ2V0KSA9PiB7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXJnZXRzID0gYXJndW1lbnRBc0FycmF5KHRhcmdldCk7XG4gICAgICAgIHRhcmdldHMubWFwKCgkdGFyZ2V0cykgPT4ge1xuICAgICAgICAgICAgZWFjaE5vZGUoJHRhcmdldHMsICgkdGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tTY3JvbGxhYmxlO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93RXJyb3IoYFwiJHskdGFyZ2V0fVwiIGlzIG5vdCBhIEVsZW1lbnQuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgYWRkU2Nyb2xsYWJsZVNlbGVjdG9yID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IGFyZ3VtZW50QXNBcnJheShzZWxlY3Rvcik7XG4gICAgICAgIHNlbGVjdG9ycy5tYXAoKHNlbGVjdG9yKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZS5zY3JvbGxhYmxlU2VsZWN0b3JzLnB1c2goc2VsZWN0b3IpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHJlbW92ZVNjcm9sbGFibGVTZWxlY3RvciA9IChzZWxlY3RvcikgPT4ge1xuICAgIGlmIChzZWxlY3Rvcikge1xuICAgICAgICBjb25zdCBzZWxlY3RvcnMgPSBhcmd1bWVudEFzQXJyYXkoc2VsZWN0b3IpO1xuICAgICAgICBzZWxlY3RvcnMubWFwKChzZWxlY3RvcikgPT4ge1xuICAgICAgICAgICAgc3RhdGUuc2Nyb2xsYWJsZVNlbGVjdG9ycyA9IHN0YXRlLnNjcm9sbGFibGVTZWxlY3RvcnMuZmlsdGVyKChzU2VsZWN0b3IpID0+IHNTZWxlY3RvciAhPT0gc2VsZWN0b3IpO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGFkZExvY2thYmxlVGFyZ2V0ID0gKHRhcmdldCkgPT4ge1xuICAgIGlmICh0YXJnZXQpIHtcbiAgICAgICAgY29uc3QgdGFyZ2V0cyA9IGFyZ3VtZW50QXNBcnJheSh0YXJnZXQpO1xuICAgICAgICB0YXJnZXRzLm1hcCgoJHRhcmdldHMpID0+IHtcbiAgICAgICAgICAgIGVhY2hOb2RlKCR0YXJnZXRzLCAoJHRhcmdldCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc0VsZW1lbnQoJHRhcmdldCkpIHtcbiAgICAgICAgICAgICAgICAgICAgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tMb2NrYWJsZSA9ICcnO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRocm93RXJyb3IoYFwiJHskdGFyZ2V0fVwiIGlzIG5vdCBhIEVsZW1lbnQuYCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIWdldFNjcm9sbFN0YXRlKCkpIHtcbiAgICAgICAgICAgIGhpZGVMb2NrYWJsZU92ZXJmbG93KCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGFkZExvY2thYmxlU2VsZWN0b3IgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gYXJndW1lbnRBc0FycmF5KHNlbGVjdG9yKTtcbiAgICAgICAgc2VsZWN0b3JzLm1hcCgoc2VsZWN0b3IpID0+IHtcbiAgICAgICAgICAgIHN0YXRlLmxvY2thYmxlU2VsZWN0b3JzLnB1c2goc2VsZWN0b3IpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCFnZXRTY3JvbGxTdGF0ZSgpKSB7XG4gICAgICAgICAgICBoaWRlTG9ja2FibGVPdmVyZmxvdygpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEZpbGxHYXBTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBzZXRGaWxsR2FwTWV0aG9kID0gKG1ldGhvZCkgPT4ge1xuICAgIGlmIChtZXRob2QpIHtcbiAgICAgICAgaWYgKEZJTExfR0FQX0FWQUlMQUJMRV9NRVRIT0RTLmluZGV4T2YobWV0aG9kKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHN0YXRlLmZpbGxHYXBNZXRob2QgPSBtZXRob2Q7XG4gICAgICAgICAgICByZWZpbGxHYXBzKCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBtZXRob2RzID0gRklMTF9HQVBfQVZBSUxBQkxFX01FVEhPRFMuam9pbignLCAnKTtcbiAgICAgICAgICAgIHRocm93RXJyb3IoYFwiJHttZXRob2R9XCIgbWV0aG9kIGlzIG5vdCBhdmFpbGFibGUhXFxuQXZhaWxhYmxlIGZpbGwgZ2FwIG1ldGhvZHM6ICR7bWV0aG9kc30uYCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IGFkZEZpbGxHYXBUYXJnZXQgPSAodGFyZ2V0KSA9PiB7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXJnZXRzID0gYXJndW1lbnRBc0FycmF5KHRhcmdldCk7XG4gICAgICAgIHRhcmdldHMubWFwKCgkdGFyZ2V0cykgPT4ge1xuICAgICAgICAgICAgZWFjaE5vZGUoJHRhcmdldHMsICgkdGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0ZpbGxHYXAgPSAnJztcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzdGF0ZS5zY3JvbGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGxHYXBUYXJnZXQoJHRhcmdldCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aHJvd0Vycm9yKGBcIiR7JHRhcmdldH1cIiBpcyBub3QgYSBFbGVtZW50LmApO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuZXhwb3J0IGNvbnN0IHJlbW92ZUZpbGxHYXBUYXJnZXQgPSAodGFyZ2V0KSA9PiB7XG4gICAgaWYgKHRhcmdldCkge1xuICAgICAgICBjb25zdCB0YXJnZXRzID0gYXJndW1lbnRBc0FycmF5KHRhcmdldCk7XG4gICAgICAgIHRhcmdldHMubWFwKCgkdGFyZ2V0cykgPT4ge1xuICAgICAgICAgICAgZWFjaE5vZGUoJHRhcmdldHMsICgkdGFyZ2V0KSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tGaWxsR2FwO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXN0YXRlLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdW5maWxsR2FwVGFyZ2V0KCR0YXJnZXQpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3dFcnJvcihgXCIkeyR0YXJnZXR9XCIgaXMgbm90IGEgRWxlbWVudC5gKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBhZGRGaWxsR2FwU2VsZWN0b3IgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBpZiAoc2VsZWN0b3IpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3JzID0gYXJndW1lbnRBc0FycmF5KHNlbGVjdG9yKTtcbiAgICAgICAgc2VsZWN0b3JzLm1hcCgoc2VsZWN0b3IpID0+IHtcbiAgICAgICAgICAgIHN0YXRlLmZpbGxHYXBTZWxlY3RvcnMucHVzaChzZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoIXN0YXRlLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIGZpbGxHYXBTZWxlY3RvcihzZWxlY3Rvcik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgcmVtb3ZlRmlsbEdhcFNlbGVjdG9yID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgaWYgKHNlbGVjdG9yKSB7XG4gICAgICAgIGNvbnN0IHNlbGVjdG9ycyA9IGFyZ3VtZW50QXNBcnJheShzZWxlY3Rvcik7XG4gICAgICAgIHNlbGVjdG9ycy5tYXAoKHNlbGVjdG9yKSA9PiB7XG4gICAgICAgICAgICBzdGF0ZS5maWxsR2FwU2VsZWN0b3JzID0gc3RhdGUuZmlsbEdhcFNlbGVjdG9ycy5maWx0ZXIoKGZTZWxlY3RvcikgPT4gZlNlbGVjdG9yICE9PSBzZWxlY3Rvcik7XG4gICAgICAgICAgICBpZiAoIXN0YXRlLnNjcm9sbCkge1xuICAgICAgICAgICAgICAgIHVuZmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IHJlZmlsbEdhcHMgPSAoKSA9PiB7XG4gICAgaWYgKCFzdGF0ZS5zY3JvbGwpIHtcbiAgICAgICAgZmlsbEdhcHMoKTtcbiAgICB9XG59O1xuXG5jb25zdCBoaWRlTG9ja2FibGVPdmVyZmxvdyA9ICgpID0+IHtcbiAgICBjb25zdCBzZWxlY3RvciA9IGFycmF5QXNTZWxlY3RvcihzdGF0ZS5sb2NrYWJsZVNlbGVjdG9ycyk7XG4gICAgaGlkZUxvY2thYmxlT3ZlcmZsb3dTZWxlY3RvcihzZWxlY3Rvcik7XG59O1xuY29uc3Qgc2hvd0xvY2thYmxlT3ZlcmZsb3cgPSAoKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSBhcnJheUFzU2VsZWN0b3Ioc3RhdGUubG9ja2FibGVTZWxlY3RvcnMpO1xuICAgIHNob3dMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3Ioc2VsZWN0b3IpO1xufTtcbmNvbnN0IGhpZGVMb2NrYWJsZU92ZXJmbG93U2VsZWN0b3IgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBjb25zdCAkdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIGVhY2hOb2RlKCR0YXJnZXRzLCAoJHRhcmdldCkgPT4ge1xuICAgICAgICBoaWRlTG9ja2FibGVPdmVyZmxvd1RhcmdldCgkdGFyZ2V0KTtcbiAgICB9KTtcbn07XG5jb25zdCBzaG93TG9ja2FibGVPdmVyZmxvd1NlbGVjdG9yID0gKHNlbGVjdG9yKSA9PiB7XG4gICAgY29uc3QgJHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKTtcbiAgICBlYWNoTm9kZSgkdGFyZ2V0cywgKCR0YXJnZXQpID0+IHtcbiAgICAgICAgc2hvd0xvY2thYmxlT3ZlcmZsb3dUYXJnZXQoJHRhcmdldCk7XG4gICAgfSk7XG59O1xuY29uc3QgaGlkZUxvY2thYmxlT3ZlcmZsb3dUYXJnZXQgPSAoJHRhcmdldCkgPT4ge1xuICAgIGlmIChpc0VsZW1lbnQoJHRhcmdldCkgJiYgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tMb2NrZWQgIT09ICd0cnVlJykge1xuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoJHRhcmdldCk7XG4gICAgICAgICR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrU2F2ZWRPdmVyZmxvd1lQcm9wZXJ0eSA9IGNvbXB1dGVkU3R5bGUub3ZlcmZsb3dZO1xuICAgICAgICAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja1NhdmVkSW5saW5lT3ZlcmZsb3dQcm9wZXJ0eSA9ICR0YXJnZXQuc3R5bGUub3ZlcmZsb3c7XG4gICAgICAgICR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrU2F2ZWRJbmxpbmVPdmVyZmxvd1lQcm9wZXJ0eSA9ICR0YXJnZXQuc3R5bGUub3ZlcmZsb3dZO1xuICAgICAgICAkdGFyZ2V0LnN0eWxlLm92ZXJmbG93ID0gJ2hpZGRlbic7XG4gICAgICAgICR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrTG9ja2VkID0gJ3RydWUnO1xuICAgIH1cbn07XG5jb25zdCBzaG93TG9ja2FibGVPdmVyZmxvd1RhcmdldCA9ICgkdGFyZ2V0KSA9PiB7XG4gICAgaWYgKGlzRWxlbWVudCgkdGFyZ2V0KSAmJiAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0xvY2tlZCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICR0YXJnZXQuc3R5bGUub3ZlcmZsb3cgPSAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja1NhdmVkSW5saW5lT3ZlcmZsb3dQcm9wZXJ0eTtcbiAgICAgICAgJHRhcmdldC5zdHlsZS5vdmVyZmxvd1kgPSAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja1NhdmVkSW5saW5lT3ZlcmZsb3dZUHJvcGVydHk7XG4gICAgICAgIGRlbGV0ZSAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja1NhdmVkT3ZlcmZsb3dZUHJvcGVydHk7XG4gICAgICAgIGRlbGV0ZSAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja1NhdmVkSW5saW5lT3ZlcmZsb3dQcm9wZXJ0eTtcbiAgICAgICAgZGVsZXRlICR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrU2F2ZWRJbmxpbmVPdmVyZmxvd1lQcm9wZXJ0eTtcbiAgICAgICAgZGVsZXRlICR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrTG9ja2VkO1xuICAgIH1cbn07XG5cbmNvbnN0IGZpbGxHYXBzID0gKCkgPT4ge1xuICAgIHN0YXRlLmZpbGxHYXBTZWxlY3RvcnMubWFwKChzZWxlY3RvcikgPT4ge1xuICAgICAgICBmaWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH0pO1xufTtcbmNvbnN0IHVuZmlsbEdhcHMgPSAoKSA9PiB7XG4gICAgc3RhdGUuZmlsbEdhcFNlbGVjdG9ycy5tYXAoKHNlbGVjdG9yKSA9PiB7XG4gICAgICAgIHVuZmlsbEdhcFNlbGVjdG9yKHNlbGVjdG9yKTtcbiAgICB9KTtcbn07XG5jb25zdCBmaWxsR2FwU2VsZWN0b3IgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBjb25zdCAkdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIGNvbnN0IGlzTG9ja2FibGUgPSBzdGF0ZS5sb2NrYWJsZVNlbGVjdG9ycy5pbmRleE9mKHNlbGVjdG9yKSAhPT0gLTE7XG4gICAgZWFjaE5vZGUoJHRhcmdldHMsICgkdGFyZ2V0KSA9PiB7XG4gICAgICAgIGZpbGxHYXBUYXJnZXQoJHRhcmdldCwgaXNMb2NrYWJsZSk7XG4gICAgfSk7XG59O1xuY29uc3QgZmlsbEdhcFRhcmdldCA9ICgkdGFyZ2V0LCBpc0xvY2thYmxlID0gZmFsc2UpID0+IHtcbiAgICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG4gICAgICAgIGxldCBzY3JvbGxCYXJXaWR0aDtcbiAgICAgICAgaWYgKCR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrTG9ja2FibGUgPT09ICcnIHx8IGlzTG9ja2FibGUpIHtcbiAgICAgICAgICAgIHNjcm9sbEJhcldpZHRoID0gZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGgoJHRhcmdldCwgdHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCAkbG9ja2FibGVQYXJlbnQgPSBmaW5kUGFyZW50QnlTZWxlY3RvcigkdGFyZ2V0LCBhcnJheUFzU2VsZWN0b3Ioc3RhdGUubG9ja2FibGVTZWxlY3RvcnMpKTtcbiAgICAgICAgICAgIHNjcm9sbEJhcldpZHRoID0gZ2V0VGFyZ2V0U2Nyb2xsQmFyV2lkdGgoJGxvY2thYmxlUGFyZW50LCB0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICgkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0ZpbGxlZEdhcCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICB1bmZpbGxHYXBUYXJnZXQoJHRhcmdldCk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gd2luZG93LmdldENvbXB1dGVkU3R5bGUoJHRhcmdldCk7XG4gICAgICAgICR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrRmlsbGVkR2FwID0gJ3RydWUnO1xuICAgICAgICAkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0N1cnJlbnRGaWxsR2FwTWV0aG9kID0gc3RhdGUuZmlsbEdhcE1ldGhvZDtcblxuICAgICAgICBpZiAoc3RhdGUuZmlsbEdhcE1ldGhvZCA9PT0gJ21hcmdpbicpIHtcbiAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRNYXJnaW4gPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUubWFyZ2luUmlnaHQpO1xuICAgICAgICAgICAgJHRhcmdldC5zdHlsZS5tYXJnaW5SaWdodCA9IGAke2N1cnJlbnRNYXJnaW4gKyBzY3JvbGxCYXJXaWR0aH1weGA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUuZmlsbEdhcE1ldGhvZCA9PT0gJ3dpZHRoJykge1xuICAgICAgICAgICAgJHRhcmdldC5zdHlsZS53aWR0aCA9IGBjYWxjKDEwMCUgLSAke3Njcm9sbEJhcldpZHRofXB4KWA7XG4gICAgICAgIH0gZWxzZSBpZiAoc3RhdGUuZmlsbEdhcE1ldGhvZCA9PT0gJ21heC13aWR0aCcpIHtcbiAgICAgICAgICAgICR0YXJnZXQuc3R5bGUubWF4V2lkdGggPSBgY2FsYygxMDAlIC0gJHtzY3JvbGxCYXJXaWR0aH1weClgO1xuICAgICAgICB9IGVsc2UgaWYgKHN0YXRlLmZpbGxHYXBNZXRob2QgPT09ICdwYWRkaW5nJykge1xuICAgICAgICAgICAgY29uc3QgY3VycmVudFBhZGRpbmcgPSBwYXJzZUZsb2F0KGNvbXB1dGVkU3R5bGUucGFkZGluZ1JpZ2h0KTtcbiAgICAgICAgICAgICR0YXJnZXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYCR7Y3VycmVudFBhZGRpbmcgKyBzY3JvbGxCYXJXaWR0aH1weGA7XG4gICAgICAgIH1cbiAgICB9XG59O1xuY29uc3QgdW5maWxsR2FwU2VsZWN0b3IgPSAoc2VsZWN0b3IpID0+IHtcbiAgICBjb25zdCAkdGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpO1xuICAgIGVhY2hOb2RlKCR0YXJnZXRzLCAoJHRhcmdldCkgPT4ge1xuICAgICAgICB1bmZpbGxHYXBUYXJnZXQoJHRhcmdldCk7XG4gICAgfSk7XG59O1xuY29uc3QgdW5maWxsR2FwVGFyZ2V0ID0gKCR0YXJnZXQpID0+IHtcbiAgICBpZiAoaXNFbGVtZW50KCR0YXJnZXQpKSB7XG4gICAgICAgIGlmICgkdGFyZ2V0LmRhdGFzZXQuc2Nyb2xsTG9ja0ZpbGxlZEdhcCA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICBjb25zdCBjdXJyZW50RmlsbEdhcE1ldGhvZCA9ICR0YXJnZXQuZGF0YXNldC5zY3JvbGxMb2NrQ3VycmVudEZpbGxHYXBNZXRob2Q7XG4gICAgICAgICAgICBkZWxldGUgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tGaWxsZWRHYXA7XG4gICAgICAgICAgICBkZWxldGUgJHRhcmdldC5kYXRhc2V0LnNjcm9sbExvY2tDdXJyZW50RmlsbEdhcE1ldGhvZDtcblxuICAgICAgICAgICAgaWYgKGN1cnJlbnRGaWxsR2FwTWV0aG9kID09PSAnbWFyZ2luJykge1xuICAgICAgICAgICAgICAgICR0YXJnZXQuc3R5bGUubWFyZ2luUmlnaHQgPSBgYDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEZpbGxHYXBNZXRob2QgPT09ICd3aWR0aCcpIHtcbiAgICAgICAgICAgICAgICAkdGFyZ2V0LnN0eWxlLndpZHRoID0gYGA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGN1cnJlbnRGaWxsR2FwTWV0aG9kID09PSAnbWF4LXdpZHRoJykge1xuICAgICAgICAgICAgICAgICR0YXJnZXQuc3R5bGUubWF4V2lkdGggPSBgYDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudEZpbGxHYXBNZXRob2QgPT09ICdwYWRkaW5nJykge1xuICAgICAgICAgICAgICAgICR0YXJnZXQuc3R5bGUucGFkZGluZ1JpZ2h0ID0gYGA7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5jb25zdCBvblJlc2l6ZSA9IChlKSA9PiB7XG4gICAgcmVmaWxsR2FwcygpO1xufTtcblxuY29uc3Qgb25Ub3VjaFN0YXJ0ID0gKGUpID0+IHtcbiAgICBpZiAoIXN0YXRlLnNjcm9sbCkge1xuICAgICAgICBzdGF0ZS5zdGFydFRvdWNoWSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICBzdGF0ZS5zdGFydFRvdWNoWCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuICAgIH1cbn07XG5jb25zdCBvblRvdWNoTW92ZSA9IChlKSA9PiB7XG4gICAgaWYgKCFzdGF0ZS5zY3JvbGwpIHtcbiAgICAgICAgY29uc3QgeyBzdGFydFRvdWNoWSwgc3RhcnRUb3VjaFggfSA9IHN0YXRlO1xuICAgICAgICBjb25zdCBjdXJyZW50Q2xpZW50WSA9IGUudG91Y2hlc1swXS5jbGllbnRZO1xuICAgICAgICBjb25zdCBjdXJyZW50Q2xpZW50WCA9IGUudG91Y2hlc1swXS5jbGllbnRYO1xuXG4gICAgICAgIGlmIChlLnRvdWNoZXMubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBhcnJheUFzU2VsZWN0b3Ioc3RhdGUuc2Nyb2xsYWJsZVNlbGVjdG9ycyk7XG4gICAgICAgICAgICBjb25zdCBkaXJlY3Rpb24gPSB7XG4gICAgICAgICAgICAgICAgdXA6IHN0YXJ0VG91Y2hZIDwgY3VycmVudENsaWVudFksXG4gICAgICAgICAgICAgICAgZG93bjogc3RhcnRUb3VjaFkgPiBjdXJyZW50Q2xpZW50WSxcbiAgICAgICAgICAgICAgICBsZWZ0OiBzdGFydFRvdWNoWCA8IGN1cnJlbnRDbGllbnRYLFxuICAgICAgICAgICAgICAgIHJpZ2h0OiBzdGFydFRvdWNoWCA+IGN1cnJlbnRDbGllbnRYXG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgY29uc3QgZGlyZWN0aW9uV2l0aE9mZnNldCA9IHtcbiAgICAgICAgICAgICAgICB1cDogc3RhcnRUb3VjaFkgKyBUT1VDSF9ESVJFQ1RJT05fREVURUNUX09GRlNFVCA8IGN1cnJlbnRDbGllbnRZLFxuICAgICAgICAgICAgICAgIGRvd246IHN0YXJ0VG91Y2hZIC0gVE9VQ0hfRElSRUNUSU9OX0RFVEVDVF9PRkZTRVQgPiBjdXJyZW50Q2xpZW50WSxcbiAgICAgICAgICAgICAgICBsZWZ0OiBzdGFydFRvdWNoWCArIFRPVUNIX0RJUkVDVElPTl9ERVRFQ1RfT0ZGU0VUIDwgY3VycmVudENsaWVudFgsXG4gICAgICAgICAgICAgICAgcmlnaHQ6IHN0YXJ0VG91Y2hYIC0gVE9VQ0hfRElSRUNUSU9OX0RFVEVDVF9PRkZTRVQgPiBjdXJyZW50Q2xpZW50WFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGNvbnN0IGhhbmRsZSA9ICgkZWwsIHNraXAgPSBmYWxzZSkgPT4ge1xuICAgICAgICAgICAgICAgIGlmICgkZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFyZW50U2Nyb2xsYWJsZUVsID0gZmluZFBhcmVudEJ5U2VsZWN0b3IoJGVsLCBzZWxlY3RvciwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudElzSW5wdXRSYW5nZSgkZWwpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgICAgICBza2lwIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAoKGVsZW1lbnRJc1Njcm9sbGFibGVGaWVsZCgkZWwpICYmIGZpbmRQYXJlbnRCeVNlbGVjdG9yKCRlbCwgc2VsZWN0b3IpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsZW1lbnRIYXNTZWxlY3RvcigkZWwsIHNlbGVjdG9yKSlcbiAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgcHJldmVudCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsZW1lbnRTY3JvbGxMZWZ0T25TdGFydCgkZWwpICYmIGVsZW1lbnRTY3JvbGxMZWZ0T25FbmQoJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRpcmVjdGlvbi51cCAmJiBlbGVtZW50U2Nyb2xsVG9wT25TdGFydCgkZWwpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGlyZWN0aW9uLmRvd24gJiYgZWxlbWVudFNjcm9sbFRvcE9uRW5kKCRlbCkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHByZXZlbnQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZWxlbWVudFNjcm9sbFRvcE9uU3RhcnQoJGVsKSAmJiBlbGVtZW50U2Nyb2xsVG9wT25FbmQoJGVsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRpcmVjdGlvbi5sZWZ0ICYmIGVsZW1lbnRTY3JvbGxMZWZ0T25TdGFydCgkZWwpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGlyZWN0aW9uLnJpZ2h0ICYmIGVsZW1lbnRTY3JvbGxMZWZ0T25FbmQoJGVsKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcHJldmVudCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGlyZWN0aW9uV2l0aE9mZnNldC51cCAmJiBlbGVtZW50U2Nyb2xsVG9wT25TdGFydCgkZWwpKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIChkaXJlY3Rpb25XaXRoT2Zmc2V0LmRvd24gJiYgZWxlbWVudFNjcm9sbFRvcE9uRW5kKCRlbCkpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgKGRpcmVjdGlvbldpdGhPZmZzZXQubGVmdCAmJiBlbGVtZW50U2Nyb2xsTGVmdE9uU3RhcnQoJGVsKSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAoZGlyZWN0aW9uV2l0aE9mZnNldC5yaWdodCAmJiBlbGVtZW50U2Nyb2xsTGVmdE9uRW5kKCRlbCkpXG4gICAgICAgICAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBwcmV2ZW50ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChwcmV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmVudFNjcm9sbGFibGVFbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBoYW5kbGUocGFyZW50U2Nyb2xsYWJsZUVsLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgaGFuZGxlKHBhcmVudFNjcm9sbGFibGVFbCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmxvZygnZS5wcmV2ZW50RGVmYXVsdCgpJywgZSwgJGVsKTtcbiAgICAgICAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIC8vIGNvbnNvbGUubG9nKCdoYW5kbGUoZS50YXJnZXQpJywgZSk7XG4gICAgICAgICAgICAvLyBoYWNrIC0tIG5vIGNsdWUgaG93IHRvIGdldCBhcm91bmQgaXQsIHNvIEkgc2ltcGx5IGRvIHRoZSBmb2xsb3dpbmcgLS0gTWVsdmluXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZS50YXJnZXQudGFnTmFtZSA9PT0gJ0EnIHx8XG4gICAgICAgICAgICAgICAgZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyB8fFxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnRhZ05hbWUgPT09ICdTUEFOJyB8fFxuICAgICAgICAgICAgICAgIGUudGFyZ2V0LnRhZ05hbWUgPT09ICdCVVRUT04nXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBoYW5kbGUoZS50YXJnZXQpO1xuICAgICAgICB9XG4gICAgfVxufTtcbmNvbnN0IG9uVG91Y2hFbmQgPSAoZSkgPT4ge1xuICAgIGlmICghc3RhdGUuc2Nyb2xsKSB7XG4gICAgICAgIHN0YXRlLnN0YXJ0VG91Y2hZID0gMDtcbiAgICAgICAgc3RhdGUuc3RhcnRUb3VjaFggPSAwO1xuICAgIH1cbn07XG5cbmlmICh0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJykge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBvblJlc2l6ZSk7XG59XG5pZiAodHlwZW9mIGRvY3VtZW50ICE9PSAndW5kZWZpbmVkJykge1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoc3RhcnQnLCBvblRvdWNoU3RhcnQpO1xuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIG9uVG91Y2hNb3ZlLCB7XG4gICAgICAgIHBhc3NpdmU6IGZhbHNlXG4gICAgfSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCBvblRvdWNoRW5kKTtcbn1cblxuY29uc3QgZGVwcmVjYXRlZE1ldGhvZHMgPSB7XG4gICAgaGlkZSh0YXJnZXQpIHtcbiAgICAgICAgdGhyb3dFcnJvcihcbiAgICAgICAgICAgICdcImhpZGVcIiBpcyBkZXByZWNhdGVkISBVc2UgXCJkaXNhYmxlUGFnZVNjcm9sbFwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNkaXNhYmxlcGFnZXNjcm9sbHNjcm9sbGFibGV0YXJnZXQnXG4gICAgICAgICk7XG5cbiAgICAgICAgZGlzYWJsZVBhZ2VTY3JvbGwodGFyZ2V0KTtcbiAgICB9LFxuICAgIHNob3codGFyZ2V0KSB7XG4gICAgICAgIHRocm93RXJyb3IoXG4gICAgICAgICAgICAnXCJzaG93XCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiZW5hYmxlUGFnZVNjcm9sbFwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNlbmFibGVwYWdlc2Nyb2xsc2Nyb2xsYWJsZXRhcmdldCdcbiAgICAgICAgKTtcblxuICAgICAgICBlbmFibGVQYWdlU2Nyb2xsKHRhcmdldCk7XG4gICAgfSxcbiAgICB0b2dnbGUodGFyZ2V0KSB7XG4gICAgICAgIHRocm93RXJyb3IoJ1widG9nZ2xlXCIgaXMgZGVwcmVjYXRlZCEgRG8gbm90IHVzZSBpdC4nKTtcblxuICAgICAgICBpZiAoZ2V0U2Nyb2xsU3RhdGUoKSkge1xuICAgICAgICAgICAgZGlzYWJsZVBhZ2VTY3JvbGwoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGVuYWJsZVBhZ2VTY3JvbGwodGFyZ2V0KTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgZ2V0U3RhdGUoKSB7XG4gICAgICAgIHRocm93RXJyb3IoXG4gICAgICAgICAgICAnXCJnZXRTdGF0ZVwiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImdldFNjcm9sbFN0YXRlXCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2dldHNjcm9sbHN0YXRlJ1xuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBnZXRTY3JvbGxTdGF0ZSgpO1xuICAgIH0sXG4gICAgZ2V0V2lkdGgoKSB7XG4gICAgICAgIHRocm93RXJyb3IoXG4gICAgICAgICAgICAnXCJnZXRXaWR0aFwiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImdldFBhZ2VTY3JvbGxCYXJXaWR0aFwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNnZXRwYWdlc2Nyb2xsYmFyd2lkdGgnXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGdldFBhZ2VTY3JvbGxCYXJXaWR0aCgpO1xuICAgIH0sXG4gICAgZ2V0Q3VycmVudFdpZHRoKCkge1xuICAgICAgICB0aHJvd0Vycm9yKFxuICAgICAgICAgICAgJ1wiZ2V0Q3VycmVudFdpZHRoXCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiZ2V0Q3VycmVudFBhZ2VTY3JvbGxCYXJXaWR0aFwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNnZXRjdXJyZW50cGFnZXNjcm9sbGJhcndpZHRoJ1xuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBnZXRDdXJyZW50UGFnZVNjcm9sbEJhcldpZHRoKCk7XG4gICAgfSxcbiAgICBzZXRTY3JvbGxhYmxlVGFyZ2V0cyh0YXJnZXQpIHtcbiAgICAgICAgdGhyb3dFcnJvcihcbiAgICAgICAgICAgICdcInNldFNjcm9sbGFibGVUYXJnZXRzXCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiYWRkU2Nyb2xsYWJsZVRhcmdldFwiIGluc3RlYWQuIFxcbiBodHRwczovL2dpdGh1Yi5jb20vRkwzTktFWS9zY3JvbGwtbG9jayNhZGRzY3JvbGxhYmxldGFyZ2V0c2Nyb2xsYWJsZXRhcmdldCdcbiAgICAgICAgKTtcblxuICAgICAgICBhZGRTY3JvbGxhYmxlVGFyZ2V0KHRhcmdldCk7XG4gICAgfSxcbiAgICBzZXRGaWxsR2FwU2VsZWN0b3JzKHNlbGVjdG9yKSB7XG4gICAgICAgIHRocm93RXJyb3IoXG4gICAgICAgICAgICAnXCJzZXRGaWxsR2FwU2VsZWN0b3JzXCIgaXMgZGVwcmVjYXRlZCEgVXNlIFwiYWRkRmlsbEdhcFNlbGVjdG9yXCIgaW5zdGVhZC4gXFxuIGh0dHBzOi8vZ2l0aHViLmNvbS9GTDNOS0VZL3Njcm9sbC1sb2NrI2FkZGZpbGxnYXBzZWxlY3RvcmZpbGxnYXBzZWxlY3RvcidcbiAgICAgICAgKTtcblxuICAgICAgICBhZGRGaWxsR2FwU2VsZWN0b3Ioc2VsZWN0b3IpO1xuICAgIH0sXG4gICAgc2V0RmlsbEdhcFRhcmdldHModGFyZ2V0KSB7XG4gICAgICAgIHRocm93RXJyb3IoXG4gICAgICAgICAgICAnXCJzZXRGaWxsR2FwVGFyZ2V0c1wiIGlzIGRlcHJlY2F0ZWQhIFVzZSBcImFkZEZpbGxHYXBUYXJnZXRcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjYWRkZmlsbGdhcHRhcmdldGZpbGxnYXB0YXJnZXQnXG4gICAgICAgICk7XG5cbiAgICAgICAgYWRkRmlsbEdhcFRhcmdldCh0YXJnZXQpO1xuICAgIH0sXG4gICAgY2xlYXJRdWV1ZSgpIHtcbiAgICAgICAgdGhyb3dFcnJvcihcbiAgICAgICAgICAgICdcImNsZWFyUXVldWVcIiBpcyBkZXByZWNhdGVkISBVc2UgXCJjbGVhclF1ZXVlU2Nyb2xsTG9ja3NcIiBpbnN0ZWFkLiBcXG4gaHR0cHM6Ly9naXRodWIuY29tL0ZMM05LRVkvc2Nyb2xsLWxvY2sjY2xlYXJxdWV1ZXNjcm9sbGxvY2tzJ1xuICAgICAgICApO1xuXG4gICAgICAgIGNsZWFyUXVldWVTY3JvbGxMb2NrcygpO1xuICAgIH1cbn07XG5cbmNvbnN0IHNjcm9sbExvY2sgPSB7XG4gICAgZGlzYWJsZVBhZ2VTY3JvbGwsXG4gICAgZW5hYmxlUGFnZVNjcm9sbCxcblxuICAgIGdldFNjcm9sbFN0YXRlLFxuICAgIGNsZWFyUXVldWVTY3JvbGxMb2NrcyxcbiAgICBnZXRUYXJnZXRTY3JvbGxCYXJXaWR0aCxcbiAgICBnZXRDdXJyZW50VGFyZ2V0U2Nyb2xsQmFyV2lkdGgsXG4gICAgZ2V0UGFnZVNjcm9sbEJhcldpZHRoLFxuICAgIGdldEN1cnJlbnRQYWdlU2Nyb2xsQmFyV2lkdGgsXG5cbiAgICBhZGRTY3JvbGxhYmxlU2VsZWN0b3IsXG4gICAgcmVtb3ZlU2Nyb2xsYWJsZVNlbGVjdG9yLFxuXG4gICAgYWRkU2Nyb2xsYWJsZVRhcmdldCxcbiAgICByZW1vdmVTY3JvbGxhYmxlVGFyZ2V0LFxuXG4gICAgYWRkTG9ja2FibGVTZWxlY3RvcixcblxuICAgIGFkZExvY2thYmxlVGFyZ2V0LFxuXG4gICAgYWRkRmlsbEdhcFNlbGVjdG9yLFxuICAgIHJlbW92ZUZpbGxHYXBTZWxlY3RvcixcblxuICAgIGFkZEZpbGxHYXBUYXJnZXQsXG4gICAgcmVtb3ZlRmlsbEdhcFRhcmdldCxcblxuICAgIHNldEZpbGxHYXBNZXRob2QsXG4gICAgcmVmaWxsR2FwcyxcblxuICAgIF9zdGF0ZTogc3RhdGUsXG5cbiAgICAuLi5kZXByZWNhdGVkTWV0aG9kc1xufTtcblxuZXhwb3J0IGRlZmF1bHQgc2Nyb2xsTG9jaztcbiIsImV4cG9ydCBjb25zdCBhcmd1bWVudEFzQXJyYXkgPSAoYXJndW1lbnQpID0+IChBcnJheS5pc0FycmF5KGFyZ3VtZW50KSA/IGFyZ3VtZW50IDogW2FyZ3VtZW50XSk7XG5leHBvcnQgY29uc3QgaXNFbGVtZW50ID0gKHRhcmdldCkgPT4gdGFyZ2V0IGluc3RhbmNlb2YgTm9kZTtcbmV4cG9ydCBjb25zdCBpc0VsZW1lbnRMaXN0ID0gKG5vZGVMaXN0KSA9PiBub2RlTGlzdCBpbnN0YW5jZW9mIE5vZGVMaXN0O1xuZXhwb3J0IGNvbnN0IGVhY2hOb2RlID0gKG5vZGVMaXN0LCBjYWxsYmFjaykgPT4ge1xuICAgIGlmIChub2RlTGlzdCAmJiBjYWxsYmFjaykge1xuICAgICAgICBub2RlTGlzdCA9IGlzRWxlbWVudExpc3Qobm9kZUxpc3QpID8gbm9kZUxpc3QgOiBbbm9kZUxpc3RdO1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGVMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoY2FsbGJhY2sobm9kZUxpc3RbaV0sIGksIG5vZGVMaXN0Lmxlbmd0aCkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn07XG5leHBvcnQgY29uc3QgdGhyb3dFcnJvciA9IChtZXNzYWdlKSA9PiBjb25zb2xlLmVycm9yKGBbc2Nyb2xsLWxvY2tdICR7bWVzc2FnZX1gKTtcbmV4cG9ydCBjb25zdCBhcnJheUFzU2VsZWN0b3IgPSAoYXJyYXkpID0+IHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShhcnJheSkpIHtcbiAgICAgICAgY29uc3Qgc2VsZWN0b3IgPSBhcnJheS5qb2luKCcsICcpO1xuICAgICAgICByZXR1cm4gc2VsZWN0b3I7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBub2RlTGlzdEFzQXJyYXkgPSAobm9kZUxpc3QpID0+IHtcbiAgICBjb25zdCBub2RlcyA9IFtdO1xuICAgIGVhY2hOb2RlKG5vZGVMaXN0LCAobm9kZSkgPT4gbm9kZXMucHVzaChub2RlKSk7XG5cbiAgICByZXR1cm4gbm9kZXM7XG59O1xuZXhwb3J0IGNvbnN0IGZpbmRQYXJlbnRCeVNlbGVjdG9yID0gKCRlbCwgc2VsZWN0b3IsIHNlbGYgPSB0cnVlLCAkcm9vdCA9IGRvY3VtZW50KSA9PiB7XG4gICAgaWYgKHNlbGYgJiYgbm9kZUxpc3RBc0FycmF5KCRyb290LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKS5pbmRleE9mKCRlbCkgIT09IC0xKSB7XG4gICAgICAgIHJldHVybiAkZWw7XG4gICAgfVxuXG4gICAgd2hpbGUgKCgkZWwgPSAkZWwucGFyZW50RWxlbWVudCkgJiYgbm9kZUxpc3RBc0FycmF5KCRyb290LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKS5pbmRleE9mKCRlbCkgPT09IC0xKTtcbiAgICByZXR1cm4gJGVsO1xufTtcbmV4cG9ydCBjb25zdCBlbGVtZW50SGFzU2VsZWN0b3IgPSAoJGVsLCBzZWxlY3RvciwgJHJvb3QgPSBkb2N1bWVudCkgPT4ge1xuICAgIGNvbnN0IGhhcyA9IG5vZGVMaXN0QXNBcnJheSgkcm9vdC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkuaW5kZXhPZigkZWwpICE9PSAtMTtcbiAgICByZXR1cm4gaGFzO1xufTtcbmV4cG9ydCBjb25zdCBlbGVtZW50SGFzT3ZlcmZsb3dIaWRkZW4gPSAoJGVsKSA9PiB7XG4gICAgaWYgKCRlbCkge1xuICAgICAgICBjb25zdCBjb21wdXRlZFN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZSgkZWwpO1xuICAgICAgICBjb25zdCBvdmVyZmxvd0lzSGlkZGVuID0gY29tcHV0ZWRTdHlsZS5vdmVyZmxvdyA9PT0gJ2hpZGRlbic7XG4gICAgICAgIHJldHVybiBvdmVyZmxvd0lzSGlkZGVuO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgZWxlbWVudFNjcm9sbFRvcE9uU3RhcnQgPSAoJGVsKSA9PiB7XG4gICAgaWYgKCRlbCkge1xuICAgICAgICBpZiAoZWxlbWVudEhhc092ZXJmbG93SGlkZGVuKCRlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsVG9wID0gJGVsLnNjcm9sbFRvcDtcbiAgICAgICAgcmV0dXJuIHNjcm9sbFRvcCA8PSAwO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgZWxlbWVudFNjcm9sbFRvcE9uRW5kID0gKCRlbCkgPT4ge1xuICAgIGlmICgkZWwpIHtcbiAgICAgICAgaWYgKGVsZW1lbnRIYXNPdmVyZmxvd0hpZGRlbigkZWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcCA9ICRlbC5zY3JvbGxUb3A7XG4gICAgICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9ICRlbC5zY3JvbGxIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHNjcm9sbFRvcFdpdGhIZWlnaHQgPSBzY3JvbGxUb3AgKyAkZWwub2Zmc2V0SGVpZ2h0O1xuICAgICAgICByZXR1cm4gc2Nyb2xsVG9wV2l0aEhlaWdodCA+PSBzY3JvbGxIZWlnaHQ7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBlbGVtZW50U2Nyb2xsTGVmdE9uU3RhcnQgPSAoJGVsKSA9PiB7XG4gICAgaWYgKCRlbCkge1xuICAgICAgICBpZiAoZWxlbWVudEhhc092ZXJmbG93SGlkZGVuKCRlbCkpIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgc2Nyb2xsTGVmdCA9ICRlbC5zY3JvbGxMZWZ0O1xuICAgICAgICByZXR1cm4gc2Nyb2xsTGVmdCA8PSAwO1xuICAgIH1cbn07XG5leHBvcnQgY29uc3QgZWxlbWVudFNjcm9sbExlZnRPbkVuZCA9ICgkZWwpID0+IHtcbiAgICBpZiAoJGVsKSB7XG4gICAgICAgIGlmIChlbGVtZW50SGFzT3ZlcmZsb3dIaWRkZW4oJGVsKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzY3JvbGxMZWZ0ID0gJGVsLnNjcm9sbExlZnQ7XG4gICAgICAgIGNvbnN0IHNjcm9sbFdpZHRoID0gJGVsLnNjcm9sbFdpZHRoO1xuICAgICAgICBjb25zdCBzY3JvbGxMZWZ0V2l0aFdpZHRoID0gc2Nyb2xsTGVmdCArICRlbC5vZmZzZXRXaWR0aDtcbiAgICAgICAgcmV0dXJuIHNjcm9sbExlZnRXaXRoV2lkdGggPj0gc2Nyb2xsV2lkdGg7XG4gICAgfVxufTtcbmV4cG9ydCBjb25zdCBlbGVtZW50SXNTY3JvbGxhYmxlRmllbGQgPSAoJGVsKSA9PiB7XG4gICAgY29uc3Qgc2VsZWN0b3IgPSAndGV4dGFyZWEsIFtjb250ZW50ZWRpdGFibGU9XCJ0cnVlXCJdJztcbiAgICByZXR1cm4gZWxlbWVudEhhc1NlbGVjdG9yKCRlbCwgc2VsZWN0b3IpO1xufTtcbmV4cG9ydCBjb25zdCBlbGVtZW50SXNJbnB1dFJhbmdlID0gKCRlbCkgPT4ge1xuICAgIGNvbnN0IHNlbGVjdG9yID0gJ2lucHV0W3R5cGU9XCJyYW5nZVwiXSc7XG4gICAgcmV0dXJuIGVsZW1lbnRIYXNTZWxlY3RvcigkZWwsIHNlbGVjdG9yKTtcbn07XG4iXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNWQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ2xGQTtBQWdCQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFUQTtBQVlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQUtBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFLQTtBQUNBO0FBQUE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBTUE7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBREE7QUFNQTtBQUNBO0FBQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSUE7QUFDQTtBQXhFQTtBQUNBO0FBMEVBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFFQTtBQUVBO0FBQ0E7QUFFQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBOUJBO0FBQ0E7QUFrQ0E7Ozs7Ozs7Ozs7OztBQzNrQkE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFBQTtBQUFBO0FBRUE7QUFDQTtBQUNBO0FBQUE7QUFBQTtBQUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUFBO0FBQUE7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QSIsInNvdXJjZVJvb3QiOiIifQ==