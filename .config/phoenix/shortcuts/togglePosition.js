const halves = ['half-1', 'half-2', 'third-1', 'third-2', 'third-3'];

let currentFrame = 0;

setHandler('z', HYPER, () => {
  const window = Window.focused();
  const wScreen = window.screen().frame();
  let portrait = false;
  if (wScreen.width / wScreen.height <= 1) portrait = true;
  currentFrame = arrayLoop(halves, currentFrame);

  const nF = getNamedFrame(halves[currentFrame]);

  setFrame(...nF, window, portrait);
});

const arrayLoop = (arr, curr) => {
  const len = arr.length - 1;
  const idx = arr.findIndex(val => val === arr[curr]);
  const debug = `${arr[curr]}, ${len}, ${idx},`;
  if (idx < len) return idx + 1;
  return 0;
};
