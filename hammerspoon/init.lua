hs.alert.show("Hammerspoon config loaded")

hyper = {"cmd", "alt", "ctrl"}

hs.hotkey.bind(hyper, "R", hs.reload)

function fuzzy(choices, func)
  local chooser = hs.chooser.new(func)
  chooser:choices(choices)
  chooser:searchSubText(true)
  chooser:bgDark(true)
  -- chooser:fgColor({hex="#bbf"})
  chooser:subTextColor({hex="#aaa"})
  chooser:width(15)
  chooser:show()
end

function selectAudio(audio)
  if audio == nil then -- nothing selected
    return
  end
  local device = hs.audiodevice.findDeviceByUID(audio.uid)
  hs.alert.show("Setting "..audio.subText.." device: "..device:name())
  if device:isOutputDevice() then
    device:setDefaultOutputDevice()
  else
    device:setDefaultInputDevice()
  end
end

function showAudioFuzzy()
  local devices = hs.audiodevice.allDevices()
  local choices = {}
  local active_input = hs.audiodevice.defaultInputDevice()
  local active_output = hs.audiodevice.defaultOutputDevice()
  local active, subtext
  for i=1, #devices do
    if devices[i]:isOutputDevice() then
      active = devices[i]:uid() == active_output:uid()
      subtext = "output"
    else
      active = devices[i]:uid() == active_input:uid()
      subtext = "input"
    end
    if active then
      subtext = subtext .. " (active)"
    end
    choices[i] = {
      text = devices[i]:name(),
      uid = devices[i]:uid(),
      subText = subtext,
      valid = not active,
    }
  end
  fuzzy(choices, selectAudio)
end


hs.hotkey.bind(hyper, "A", showAudioFuzzy)
