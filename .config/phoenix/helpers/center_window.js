const RESIZE_MODIFIER = 0.78;

function center_window(resize = false) {

  const window = Window.focused();
  const screen = window.screen()
  const frame = screen.flippedVisibleFrame();


  let dimensions = {
    x: 0,
    y: 0,
    width: frame.width,
    height: frame.height
  };

  if (resize) {
    let newFrame = {
      width: frame.width * RESIZE_MODIFIER,
      height: frame.height * RESIZE_MODIFIER
    }
    dimensions = {
      x: (frame.width - newFrame.width) / 2,
      y: (frame.height - newFrame.height) / 2,
      width: newFrame.width,
      height: newFrame.height
    }
  }

  // Debug
  log(frame)
  log(window.title())
  log(dimensions)

  window.setFrame(dimensions);
}
