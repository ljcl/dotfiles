const halves = ['half-1', 'half-2', 'third-1', 'third-2', 'third-3'];

let currentFrame = 0;
setHandler('z', HYPER, () => {
  currentFrame = arrayLoop(halves, currentFrame);
  alert(halves[currentFrame]);
  setFrame(halves[currentFrame]);
});

const arrayLoop = (arr, curr) => {
  const len = arr.length - 1;
  const idx = arr.findIndex(val => val === arr[curr]);
  const debug = `${arr[curr]}, ${len}, ${idx},`;
  log(arr);
  log(debug);
  if (idx < len) return idx + 1;
  return 0;
};
