let currentFrameShift = 0;
let currentFrame = 0;

setHandler('z', HYPER, () => {
  togglePosition(
    currentFrame,
    ['half-1', 'half-2', 'third-1', 'third-2', 'third-3'],
    (err, newFrame) => {
      log(newFrame);
      currentFrame = newFrame;
    }
  );
});

setHandler('z', HYPER_SHIFT, () => {
  togglePosition(
    currentFrameShift,
    ['twothird-1', 'twothird-2'],
    (err, newFrame) => {
      log(newFrame);
      currentFrameShift = newFrame;
    }
  );
});

const togglePosition = (currentFrame, positions, cb) => {
  const window = Window.focused();
  if (!window) return;
  const wScreen = window.screen().frame();
  let portrait = false;
  if (wScreen.width / wScreen.height <= 1) portrait = true;

  const nF = getNamedFrame(positions[currentFrame]);

  setFrame(...nF, window, portrait);
  cb(null, arrayLoop(positions, currentFrame));
};

const arrayLoop = (arr, curr) => {
  const len = arr.length - 1;
  const idx = arr.findIndex(val => val === arr[curr]);
  if (idx < len) return idx + 1;
  return 0;
};
