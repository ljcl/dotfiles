/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/phoenix.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/config.ts":
/*!***********************!*\
  !*** ./src/config.ts ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nexports.hyper = ['cmd', 'ctrl', 'alt'];\nexports.hyperShift = [\n    'cmd',\n    'ctrl',\n    'alt',\n    'shift',\n];\n\n\n//# sourceURL=webpack:///./src/config.ts?");

/***/ }),

/***/ "./src/helpers/calc.ts":
/*!*****************************!*\
  !*** ./src/helpers/calc.ts ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction frameRatio(a, b) {\n    const widthRatio = b.width / a.width;\n    const heightRatio = b.height / a.height;\n    return ({ width, height, x, y }) => {\n        width = Math.round(width * widthRatio);\n        height = Math.round(height * heightRatio);\n        x = Math.round(b.x + (x - a.x) * widthRatio);\n        y = Math.round(b.y + (y - a.y) * heightRatio);\n        return { width, height, x, y };\n    };\n}\nexports.frameRatio = frameRatio;\nfunction moveToFrame(a, b) {\n    // TODO(mafredri): Try to keep window edges within b.\n    return ({ width, height, x, y }) => {\n        x = b.x + x - a.x;\n        y = b.y + y - a.y;\n        return { width, height, x, y };\n    };\n}\nexports.moveToFrame = moveToFrame;\nfunction pointInsideFrame(point, frame) {\n    return (point.x >= frame.x &&\n        point.x <= frame.x + frame.width &&\n        point.y >= frame.y &&\n        point.y <= frame.y + frame.height);\n}\nexports.pointInsideFrame = pointInsideFrame;\nfunction sizeMatches(size, match) {\n    return (Math.abs(size.height - match.height) < 1 &&\n        Math.abs(size.width - match.width) < 1);\n}\nexports.sizeMatches = sizeMatches;\n\n\n//# sourceURL=webpack:///./src/helpers/calc.ts?");

/***/ }),

/***/ "./src/helpers/key.ts":
/*!****************************!*\
  !*** ./src/helpers/key.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst handlers = new Map();\nfunction onKey(keys, mod, cb) {\n    if (Array.isArray(keys)) {\n        const unbinds = keys.map(key => onKeySingle(key, mod, cb));\n        return () => unbinds.forEach(u => u());\n    }\n    return onKeySingle(keys, mod, cb);\n}\nexports.onKey = onKey;\nfunction onKeySingle(key, mod, cb) {\n    const handler = new Key(key, mod, cb);\n    const id = createID(key, mod);\n    handlers.set(id, handler);\n    return () => unbind(id);\n}\nfunction unbind(id) {\n    const handler = handlers.get(id);\n    if (handler) {\n        handler.disable();\n        handlers.delete(id);\n    }\n}\nfunction createID(key, mod) {\n    return key + mod.sort().join();\n}\nfunction getHandler(key, mod) {\n    const id = createID(key, mod);\n    return handlers.get(id);\n}\nexports.getHandler = getHandler;\n\n\n//# sourceURL=webpack:///./src/helpers/key.ts?");

/***/ }),

/***/ "./src/helpers/modal.ts":
/*!******************************!*\
  !*** ./src/helpers/modal.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nfunction titleModal(text, duration = 1, icon) {\n    const m = new Modal();\n    m.text = text;\n    m.duration = duration;\n    if (icon) {\n        m.icon = icon;\n    }\n    m.showTitleOn(Screen.main());\n}\nexports.titleModal = titleModal;\nModal.prototype.showTitleOn = function _showTitleOn(screen) {\n    showAt(this, screen, 2, 1 + 1 / 3);\n};\nModal.prototype.showCenterOn = function _showCenterOn(screen) {\n    showAt(this, screen, 2, 2);\n};\nfunction showAt(modal, screen, widthDiv, heightDiv) {\n    const { height, width, x, y } = modal.frame();\n    const sf = screen.visibleFrame();\n    modal.origin = {\n        x: sf.x + (sf.width / widthDiv - width / 2),\n        y: sf.y + (sf.height / heightDiv - height / 2)\n    };\n    modal.show();\n}\n\n\n//# sourceURL=webpack:///./src/helpers/modal.ts?");

/***/ }),

/***/ "./src/helpers/screen.ts":
/*!*******************************!*\
  !*** ./src/helpers/screen.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst calc_1 = __webpack_require__(/*! ./calc */ \"./src/helpers/calc.ts\");\nfunction screenAt(point) {\n    const screens = Screen.all();\n    for (const s of screens) {\n        if (calc_1.pointInsideFrame(point, s.flippedFrame())) {\n            return s;\n        }\n    }\n    throw new Error(\"point out of range\");\n}\n// Extend ScreenObject.\nScreen.at = screenAt;\n\n\n//# sourceURL=webpack:///./src/helpers/screen.ts?");

/***/ }),

/***/ "./src/helpers/window.ts":
/*!*******************************!*\
  !*** ./src/helpers/window.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst calc_1 = __webpack_require__(/*! ./calc */ \"./src/helpers/calc.ts\");\nconst frameCache = new Map();\nEvent.on(\"windowDidClose\", (win) => {\n    // Cleanup references to unmaximized window frames\n    frameCache.delete(win.hash());\n});\nfunction clearUnmaximized(win) {\n    frameCache.delete(win.hash());\n}\nexports.clearUnmaximized = clearUnmaximized;\nfunction unmaximizedFrame(win) {\n    let c = frameCache.get(win.hash());\n    if (!c) {\n        c = {\n            screen: win.screen().flippedVisibleFrame(),\n            window: win.frame()\n        };\n    }\n    const ratio = calc_1.frameRatio(c.screen, win.screen().flippedVisibleFrame());\n    return ratio(c.window);\n}\nfunction toggleMaximized(win) {\n    const id = win.hash();\n    if (frameCache.has(id)) {\n        win.setFrame(unmaximizedFrame(win));\n        win.clearUnmaximized();\n        return;\n    }\n    frameCache.set(id, {\n        screen: win.screen().flippedVisibleFrame(),\n        window: win.frame()\n    });\n    win.maximize();\n}\nexports.toggleMaximized = toggleMaximized;\nWindow.prototype.clearUnmaximized = function _clearUnmaximized() {\n    clearUnmaximized(this);\n};\nWindow.prototype.toggleMaximized = function _toggleMaximized() {\n    toggleMaximized(this);\n};\n\n\n//# sourceURL=webpack:///./src/helpers/window.ts?");

/***/ }),

/***/ "./src/phoenix.ts":
/*!************************!*\
  !*** ./src/phoenix.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\n__webpack_require__(/*! ./helpers/screen */ \"./src/helpers/screen.ts\");\n__webpack_require__(/*! ./helpers/window */ \"./src/helpers/window.ts\");\nconst config_1 = __webpack_require__(/*! ./config */ \"./src/config.ts\");\nconst calc_1 = __webpack_require__(/*! ./helpers/calc */ \"./src/helpers/calc.ts\");\nconst key_1 = __webpack_require__(/*! ./helpers/key */ \"./src/helpers/key.ts\");\nconst modal_1 = __webpack_require__(/*! ./helpers/modal */ \"./src/helpers/modal.ts\");\nPhoenix.set({\n    daemon: true,\n    openAtLogin: true\n});\nconst closeAppsOnBlur = [\n    \"com.apple.Preview\",\n    \"com.apple.ActivityMonitor\",\n    \"com.apple.Console\"\n];\nlet prevActiveAppClose = null;\nEvent.on(\"appDidActivate\", (app, h) => {\n    // Close certain apps if they have no windows and lose focus.\n    const prevClose = prevActiveAppClose;\n    prevActiveAppClose = null;\n    const id = app.bundleIdentifier();\n    if (closeAppsOnBlur.some(v => v === id)) {\n        prevActiveAppClose = app;\n    }\n    if (prevClose &&\n        !prevClose.isTerminated() &&\n        prevClose.windows().length === 0) {\n        prevClose.terminate();\n    }\n});\nconst composeFrame = (frame) => ({\n    x: frame[0],\n    y: frame[1],\n    width: frame[2],\n    height: frame[3]\n});\nconst namedFrame = {\n    h1: composeFrame([0, 0, 1 / 2, 1]),\n    h2: composeFrame([1 / 2, 0, 1 / 2, 1]),\n    t1: composeFrame([0, 0, 1 / 3, 1]),\n    t2: composeFrame([1 / 3, 0, 1 / 3, 1]),\n    t3: composeFrame([2 / 3, 0, 1 / 3, 1]),\n    tt1: composeFrame([0 / 3, 0, 2 / 3, 1]),\n    tt2: composeFrame([1 / 3, 0, 2 / 3, 1])\n};\nconst createFrame = (frame, namedFrame) => {\n    const isPortrait = frame.width / frame.height <= 1;\n    const widthModifier = isPortrait ? namedFrame.height : namedFrame.width;\n    const heightModifier = isPortrait ? namedFrame.width : namedFrame.height;\n    const xModifier = isPortrait ? namedFrame.y : namedFrame.x;\n    const yModifier = isPortrait ? namedFrame.x : namedFrame.y;\n    return {\n        x: frame.x + Math.ceil(frame.width * xModifier),\n        y: frame.y + Math.ceil(frame.height * yModifier),\n        width: Math.floor(frame.width * widthModifier),\n        height: Math.floor(frame.height * heightModifier)\n    };\n};\nconst loopFrames = (visibleFrame, namedFrames, win) => {\n    const frames = namedFrames.map(nF => createFrame(visibleFrame, namedFrame[nF]));\n    let frame = frames[0];\n    frames.forEach((element, index) => {\n        const last = frames.length - 1 === index;\n        if (!last && objEq(win.frame(), element))\n            frame = frames[index + 1];\n    });\n    return frame;\n};\nkey_1.onKey(\"z\", config_1.hyper, () => {\n    const win = Window.focused();\n    if (!win)\n        return;\n    const visibleFrame = win.screen().flippedVisibleFrame();\n    const frame = loopFrames(visibleFrame, [\"h1\", \"h2\", \"t1\", \"t2\", \"t3\"], win);\n    win.setFrame(frame);\n    win.clearUnmaximized();\n});\nkey_1.onKey(\"z\", config_1.hyperShift, () => {\n    const win = Window.focused();\n    if (!win)\n        return;\n    const visibleFrame = win.screen().flippedVisibleFrame();\n    const frame = loopFrames(visibleFrame, [\"tt1\", \"tt2\"], win);\n    win.setFrame(frame);\n    win.clearUnmaximized();\n});\nkey_1.onKey(\"tab\", config_1.hyper, () => {\n    const win = Window.focused();\n    if (!win) {\n        return;\n    }\n    const oldScreen = win.screen();\n    const newScreen = oldScreen.next();\n    if (oldScreen.isEqual(newScreen)) {\n        return;\n    }\n    const ratio = calc_1.frameRatio(oldScreen.flippedVisibleFrame(), newScreen.flippedVisibleFrame());\n    win.setFrame(ratio(win.frame()));\n});\nkey_1.onKey(\"tab\", config_1.hyperShift, () => {\n    const win = Window.focused();\n    if (!win) {\n        return;\n    }\n    const oldScreen = win.screen();\n    const newScreen = oldScreen.next();\n    if (oldScreen.isEqual(newScreen)) {\n        return;\n    }\n    const move = calc_1.moveToFrame(oldScreen.flippedVisibleFrame(), newScreen.flippedVisibleFrame());\n    win.setFrame(move(win.frame()));\n});\nkey_1.onKey(\"c\", config_1.hyper, () => {\n    const win = Window.focused();\n    if (win) {\n        win.toggleMaximized();\n    }\n});\nkey_1.onKey(\"c\", config_1.hyperShift, () => {\n    const win = Window.focused();\n    if (!win) {\n        return;\n    }\n    const { width, height } = win.frame();\n    const { width: sWidth, height: sHeight, x, y } = win.screen().flippedVisibleFrame();\n    win.setFrame({\n        height,\n        width,\n        x: x + sWidth / 2 - width / 2,\n        y: y + sHeight / 2 - height / 2\n    });\n});\nfunction objEq(a, b) {\n    const akeys = Object.keys(a);\n    if (akeys.length !== Object.keys(b).length) {\n        return false;\n    }\n    return akeys.every(k => a[k] === b[k]);\n}\nconst phoenixApp = App.get(\"Phoenix\");\nmodal_1.titleModal(\"Reloaded!\", 2, phoenixApp && phoenixApp.icon());\n\n\n//# sourceURL=webpack:///./src/phoenix.ts?");

/***/ })

/******/ });