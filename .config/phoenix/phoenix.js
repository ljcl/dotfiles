Phoenix.set({
  // daemon: true,
  openAtLogin: true
});

require('./config.js');

require('./helpers/alert.js');
require('./helpers/center_window.js');
require('./helpers/find_window.js');
require('./helpers/focus_window.js');
require('./helpers/get_named_frame.js');
require('./helpers/log.js');
require('./helpers/osascript.js');
require('./helpers/read_file.js');
require('./helpers/set_event_handler.js');
require('./helpers/set_events_handler.js');
require('./helpers/set_frame.js');
require('./helpers/set_handler.js');
require('./helpers/set_handlers.js');
require('./helpers/write_file.js');

require('./helpers/set_window.js');

require('./shortcuts/center.js');
require('./shortcuts/corners.js');
require('./shortcuts/expand.js');
require('./shortcuts/fullscreen.js');
require('./shortcuts/halves.js');
require('./shortcuts/info.js');
require('./shortcuts/sides.js');
require('./shortcuts/thirds.js');
require('./shortcuts/windows.js');

require('./spaces/alfred.js');
require('./spaces/list.js');
require('./spaces/overlay.js');

alert('Loaded', App.get('Phoenix').icon());

// alert('woo');
