// FIXME: This sucks... fix.
function setScreen(rect, screen) {
  screen = screen || Window.focused().screen();
  const scr = screen.flippedVisibleFrame();
  var r = {
    x: Math.round(scr.x + rect.x * scr.width),
    y: Math.round(scr.y + rect.y * scr.height),
    width: Math.round(scr.width * rect.width),
    height: Math.round(scr.height * rect.height)
  };
  const before = Window.focused().frame();
  Window.focused().setFrame(r);
  const after = Window.focused().frame();

  if (isRectEqual(before, after)) {
    setScreen(rect, screen.next());
  }
}

const isRectEqual = (a, b) =>
  a.x === b.x && a.y === b.y && a.width === b.width && a.height === b.height;
