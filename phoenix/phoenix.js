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
function moveToFrame(a, b) {
    // TODO(mafredri): Try to keep window edges within b.
    return function(param) {
        var width = param.width, height = param.height, x = param.x, y = param.y;
        x = b.x + x - a.x;
        y = b.y + y - a.y;
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
    'cmd',
    'ctrl',
    'alt'
];
var hyperShift = [
    'cmd',
    'ctrl',
    'alt',
    'shift', 
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
    var ref = modal.frame(), height = ref.height, width = ref.width, x = ref.x, y = ref.y;
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
onKey("z", hyper, function() {
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
onKey("z", hyperShift, function() {
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
onKey("tab", hyper, function() {
    var win = Window.focused();
    if (!win) return;
    var oldScreen = win.screen();
    var newScreen = oldScreen.next();
    if (oldScreen.isEqual(newScreen)) return;
    var ratio = frameRatio(oldScreen.flippedVisibleFrame(), newScreen.flippedVisibleFrame());
    win.setFrame(ratio(win.frame()));
});
onKey("tab", hyperShift, function() {
    var win = Window.focused();
    if (!win) return;
    var oldScreen = win.screen();
    var newScreen = oldScreen.next();
    if (oldScreen.isEqual(newScreen)) return;
    var move = moveToFrame(oldScreen.flippedVisibleFrame(), newScreen.flippedVisibleFrame());
    win.setFrame(move(win.frame()));
});
onKey("c", hyper, function() {
    var win = Window.focused();
    if (win) win.toggleMaximized();
});
onKey("c", hyperShift, function() {
    var win = Window.focused();
    if (!win) return;
    var ref = win.frame(), width = ref.width, height = ref.height;
    var ref1 = win.screen().flippedVisibleFrame(), sWidth = ref1.width, sHeight = ref1.height, x = ref1.x, y = ref1.y;
    win.setFrame({
        height: height,
        width: width,
        x: x + sWidth / 2 - width / 2,
        y: y + sHeight / 2 - height / 2
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
