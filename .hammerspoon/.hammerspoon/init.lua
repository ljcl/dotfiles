
-- A global variable for the Hyper Mode
k = hs.hotkey.bind({"cmd","alt","shift","ctrl"}, "F1",
  function()
    hs.alert.show("good fn key pressed")
  end
)
