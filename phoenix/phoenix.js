function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
        for(var i = 0, arr2 = new Array(arr.length); i < arr.length; i++){
            arr2[i] = arr[i];
        }
        return arr2;
    }
}
function _instanceof(left, right) {
    if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) {
        return right[Symbol.hasInstance](left);
    } else {
        return left instanceof right;
    }
}
function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
}
function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
}
var _typeof = function(obj) {
    return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj;
};
function frameRatio(a, b) {
    var widthRatio = b.width / a.width;
    var heightRatio = b.height / a.height;
    return function(param) {
        var width = param.width, height = param.height, x = param.x, y = param.y;
        width = Math.round(width * widthRatio);
        height = Math.round(height * heightRatio);
        x = Math.round(b.x + (x - a.x) * widthRatio);
        y = Math.round(b.y + (y - a.y) * heightRatio);
        return {
            width: width,
            height: height,
            x: x,
            y: y
        };
    };
}
function pointInsideFrame(point, frame) {
    return point.x >= frame.x && point.x <= frame.x + frame.width && point.y >= frame.y && point.y <= frame.y + frame.height;
}
function screenAt(point) {
    var screens = Screen.all();
    var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
    try {
        for(var _iterator = screens[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
            var s = _step.value;
            if (pointInsideFrame(point, s.flippedFrame())) return s;
        }
    } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
    } finally{
        try {
            if (!_iteratorNormalCompletion && _iterator.return != null) {
                _iterator.return();
            }
        } finally{
            if (_didIteratorError) {
                throw _iteratorError;
            }
        }
    }
    throw new Error("point out of range");
}
// Extend ScreenObject.
Screen.at = screenAt;
var frameCache = new Map();
Event.on("windowDidClose", function(win) {
    // Cleanup references to unmaximized window frames
    frameCache.delete(win.hash());
});
function clearUnmaximized(win) {
    frameCache.delete(win.hash());
}
function unmaximizedFrame(win) {
    var c = frameCache.get(win.hash());
    if (!c) c = {
        screen: win.screen().flippedVisibleFrame(),
        window: win.frame()
    };
    var ratio = frameRatio(c.screen, win.screen().flippedVisibleFrame());
    return ratio(c.window);
}
function toggleMaximized(win) {
    var id = win.hash();
    if (frameCache.has(id)) {
        win.setFrame(unmaximizedFrame(win));
        win.clearUnmaximized();
        return;
    }
    frameCache.set(id, {
        screen: win.screen().flippedVisibleFrame(),
        window: win.frame()
    });
    win.maximize();
}
Window.prototype.clearUnmaximized = function _clearUnmaximized() {
    clearUnmaximized(this);
};
Window.prototype.toggleMaximized = function _toggleMaximized() {
    toggleMaximized(this);
};
var hyper = [
    "cmd",
    "ctrl",
    "alt"
];
var hyperShift = [
    "cmd",
    "ctrl",
    "alt",
    "shift", 
];
var handlers = new Map();
function onKey(keys, mod, cb) {
    if (Array.isArray(keys)) {
        var unbinds = keys.map(function(key) {
            return onKeySingle(key, mod, cb);
        });
        return function() {
            return unbinds.forEach(function(u) {
                return u();
            });
        };
    }
    return onKeySingle(keys, mod, cb);
}
function onKeySingle(key, mod, cb) {
    var handler = new Key(key, mod, cb);
    var id = createID(key, mod);
    handlers.set(id, handler);
    return function() {
        return unbind(id);
    };
}
function unbind(id) {
    var handler = handlers.get(id);
    if (handler) {
        handler.disable();
        handlers.delete(id);
    }
}
function createID(key, mod) {
    return key + mod.sort().join();
}
function log() {
    for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
        args[_key] = arguments[_key];
    }
    var _Phoenix, // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
    _console;
    args = args.map(function(arg) {
        return stringify(arg);
    });
    (_Phoenix = Phoenix).log.apply(_Phoenix, _toConsumableArray(args));
    (_console = console).trace.apply(_console, _toConsumableArray(args));
}
const __default = Object.assign(log, {
    notify: function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        var _Phoenix, // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        _console;
        args = args.map(function(arg) {
            return stringify(arg);
        });
        (_Phoenix = Phoenix).log.apply(_Phoenix, _toConsumableArray(args));
        var message = args.join(" ");
        Phoenix.notify(message);
        (_console = console).trace.apply(_console, _toConsumableArray(args));
    },
    noTrace: function() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        var _Phoenix, // eslint-disable-next-line @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        _console;
        args = args.map(function(arg) {
            return stringify(arg);
        });
        (_Phoenix = Phoenix).log.apply(_Phoenix, _toConsumableArray(args));
        (_console = console).log.apply(_console, _toConsumableArray(args));
    }
});
function stringify(value) {
    if (_instanceof(value, Error)) {
        var stack = "";
        if (value.stack) {
            var s = value.stack.trim().split("\n");
            s[0] += " (:".concat(value.line, ":").concat(value.column, ")");
            var indented = s.map(function(line) {
                return "\t at " + line;
            }).join("\n");
            stack = "\n".concat(indented);
        }
        return "\n".concat(value.toString()).concat(stack);
    }
    switch(typeof value === "undefined" ? "undefined" : _typeof(value)){
        case "object":
            return "\n" + JSON.stringify(value, null, 2);
        case "function":
            return value.toString();
        default:
            return value;
    }
}
function titleModal(text, param, icon) {
    var duration = param === void 0 ? 1 : param;
    var m = new Modal();
    m.text = text;
    m.duration = duration;
    if (icon) m.icon = icon;
    m.showTitleOn(Screen.main());
}
Modal.prototype.showTitleOn = function _showTitleOn(screen) {
    showAt(this, screen, 2, 1 + 1 / 3);
};
Modal.prototype.showCenterOn = function _showCenterOn(screen) {
    showAt(this, screen, 2, 2);
};
function showAt(modal, screen, widthDiv, heightDiv) {
    var ref = modal.frame(), height = ref.height, width = ref.width;
    var sf = screen.visibleFrame();
    modal.origin = {
        x: sf.x + (sf.width / widthDiv - width / 2),
        y: sf.y + (sf.height / heightDiv - height / 2)
    };
    modal.show();
}
Phoenix.set({
    daemon: true,
    openAtLogin: true
});
var closeAppsOnBlur = [
    "com.apple.Preview",
    "com.apple.ActivityMonitor",
    "com.apple.Console", 
];
var prevActiveAppClose = null;
Event.on("appDidActivate", function(app, h) {
    // Close certain apps if they have no windows and lose focus.
    var prevClose = prevActiveAppClose;
    prevActiveAppClose = null;
    var id = app.bundleIdentifier();
    if (closeAppsOnBlur.some(function(v) {
        return v === id;
    })) prevActiveAppClose = app;
    if (prevClose && !prevClose.isTerminated() && prevClose.windows().length === 0) prevClose.terminate();
});
var composeFrame = function(frame) {
    return {
        x: frame[0],
        y: frame[1],
        width: frame[2],
        height: frame[3]
    };
};
var namedFrame1 = {
    h1: composeFrame([
        0,
        0,
        0.5,
        1
    ]),
    h2: composeFrame([
        0.5,
        0,
        0.5,
        1
    ]),
    t1: composeFrame([
        0,
        0,
        1 / 3,
        1
    ]),
    t2: composeFrame([
        1 / 3,
        0,
        1 / 3,
        1
    ]),
    t3: composeFrame([
        2 / 3,
        0,
        1 / 3,
        1
    ]),
    tt1: composeFrame([
        0,
        0,
        2 / 3,
        1
    ]),
    tt2: composeFrame([
        1 / 3,
        0,
        2 / 3,
        1
    ])
};
var createFrame = function(frame, namedFrame) {
    var isPortrait = frame.width / frame.height <= 1;
    var widthModifier = isPortrait ? namedFrame.height : namedFrame.width;
    var heightModifier = isPortrait ? namedFrame.width : namedFrame.height;
    var xModifier = isPortrait ? namedFrame.y : namedFrame.x;
    var yModifier = isPortrait ? namedFrame.x : namedFrame.y;
    return {
        x: frame.x + Math.ceil(frame.width * xModifier),
        y: frame.y + Math.ceil(frame.height * yModifier),
        width: Math.floor(frame.width * widthModifier),
        height: Math.floor(frame.height * heightModifier)
    };
};
var loopFrames = function(visibleFrame, namedFrames, win) {
    var frames = namedFrames.map(function(nF) {
        return createFrame(visibleFrame, namedFrame1[nF]);
    });
    var frame = frames[0];
    frames.forEach(function(element, index) {
        var last = frames.length - 1 === index;
        if (!last && isRectEqual(win.frame(), element)) frame = frames[index + 1];
    });
    return frame;
};
/**
 * Tile the window in the given frame,
 * tile it horizontally or vertically depending
 * on what makes the most sense
 */ onKey("z", hyper, function() {
    var win = Window.focused();
    if (!win) return;
    var visibleFrame = win.screen().flippedVisibleFrame();
    var frame = loopFrames(visibleFrame, [
        "h1",
        "h2",
        "t1",
        "t2",
        "t3"
    ], win);
    win.setFrame(frame);
    win.clearUnmaximized();
});
/**
 * Tile the window with a larger portion
 */ onKey("z", hyperShift, function() {
    var win = Window.focused();
    if (!win) return;
    var visibleFrame = win.screen().flippedVisibleFrame();
    var frame = loopFrames(visibleFrame, [
        "tt1",
        "tt2"
    ], win);
    win.setFrame(frame);
    win.clearUnmaximized();
});
/**
 * Move the window to the next screen
 */ onKey("tab", hyper, function() {
    var win = Window.focused();
    if (!win) return;
    var oldScreen = win.screen();
    var newScreen = oldScreen.next();
    if (oldScreen.isEqual(newScreen)) return;
    var ratio = frameRatio(oldScreen.flippedVisibleFrame(), newScreen.flippedVisibleFrame());
    win.setFrame(ratio(win.frame()));
});
/**
 * Toggle maximized state of window
 */ onKey("c", hyper, function() {
    var win = Window.focused();
    if (win) win.toggleMaximized();
});
/**
 * Center the window on the screen if it's not fullscreen,
 * otherwise, resize it to 60% of the screen size and center it.
 */ onKey("c", hyperShift, function() {
    var win = Window.focused();
    if (!win) return;
    var ref = win.frame(), windowWidth = ref.width, windowHeight = ref.height;
    var ref1 = win.screen().flippedVisibleFrame(), screenWidth = ref1.width, screenHeight = ref1.height, x = ref1.x, y = ref1.y;
    var newWindowWidth = windowWidth !== screenWidth ? windowWidth : screenWidth * 0.6;
    var newWindowHeight = windowHeight !== screenHeight ? windowHeight : screenHeight * 0.6;
    __default(screenWidth);
    __default("windowWith", windowWidth);
    win.setFrame({
        height: newWindowHeight,
        width: newWindowWidth,
        x: x + screenWidth / 2 - newWindowWidth / 2,
        y: y + screenHeight / 2 - newWindowHeight / 2
    });
});
function isRectEqual(a, b) {
    var akeys = Object.keys(a);
    if (akeys.length !== Object.keys(b).length) return false;
    return akeys.every(function(k) {
        return a[k] === b[k];
    });
}
var phoenixApp = App.get("Phoenix");
titleModal("Reloaded!", 2, phoenixApp && phoenixApp.icon());
