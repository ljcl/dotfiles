function center_window(window = Window.focused(), resize = false) {
  if (!window) return;
  const screen = window.screen();
  const sFrame = screen.frame();
  let wFrame = window.frame();

  if (resize) {
    window.setFrame({
      x: wFrame.x,
      y: wFrame.y,
      width: CENTER_WIDTH,
      height: CENTER_HEIGHT
    });
    wFrame = window.frame();
  }

  window.setFrame({
    x: sFrame.width / 2 - wFrame.width / 2,
    y: sFrame.height / 2 - wFrame.height / 2,
    width: wFrame.width,
    height: wFrame.height
  });
}
