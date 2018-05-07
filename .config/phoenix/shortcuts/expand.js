const expansionCache = {};

setHandler('e', HYPER, () => {
  const window = Window.focused();

  if (!window) return;

  const screen = Screen.main(),
    sFrame = screen.flippedVisibleFrame(),
    hash = window.hash(),
    currFrame = window.frame(),
    prevFrame = expansionCache[hash],
    expanding = !prevFrame ||
    currFrame.width < sFrame.width ||
    currFrame.height + 6 < sFrame.height,
    nextFrame = expanding ? {
      x: 0,
      y: 0,
      width: sFrame.width,
      height: sFrame.height
    } : prevFrame;

  if (expanding) {
    expansionCache[hash] = currFrame;
  } else {
    delete expansionCache[hash];
  }

  window.setFrame(nextFrame);
});

setHandler('e', HYPER_SHIFT, () => {
  const window = Window.focused();

  if (!window) return;

  window.setFullScreen(!window.isFullScreen());
});
