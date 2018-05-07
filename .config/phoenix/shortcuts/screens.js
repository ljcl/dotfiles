setHandler('x', HYPER_SHIFT, () => {
  const window = Window.focused();
  if (!window) return;

  const oldScreen = window.screen();
  const newScreen = oldScreen.next();

  if (oldScreen.isEqual(newScreen)) {
    return;
  }

  const ratio = frameRatio(
    oldScreen.flippedVisibleFrame(),
    newScreen.flippedVisibleFrame(),
  );
  window.setFrame(ratio(window.frame()));
});
