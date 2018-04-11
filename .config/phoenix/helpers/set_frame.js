/* SET FRAME */

function setFrame(
  x,
  y,
  width,
  height,
  window = Window.focused(),
  portrait = false
) {
  if (_.isString(x)) return setFrame(...getNamedFrame(x), y || window);

  if (!window) return;

  const screen = window.screen();
  const frame = screen.flippedVisibleFrame();

  let dimensions = {
    x: frame.x + frame.width * x,
    y: frame.y + frame.height * y,
    width: frame.width * width,
    height: frame.height * height
  };

  if (portrait) {
    dimensions = {
      x: frame.x + frame.width * y,
      y: frame.y + frame.height * x,
      width: frame.width * height,
      height: frame.height * width
    };
  }

  window.setFrame(dimensions);
}
