/**
 * @name ReplaceAudioPlugin
 * @author Obliquo
 * @description Gives the possibility of changing the classic, monotonous ringtone to another one
 * @version 0.0.1
 */

/*@cc_on
@if (@_jscript)

	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

'use strict';

// plugin.json
const name = "ReplaceAudioPlugin";

// utils.tsx
const { Data } = BdApi;
class SettingsUtils {
	constructor() {
	}
	static changeValue = (settings, key, newValue) => {
		settings[key] = newValue;
		Data.save(name, "settings", settings);
	};
	static load = (settings) => Object.assign({}, settings && settings, Data.load(name, "settings"));
}
const SettingsDefault = {
	ringtone: "call_ringing_beat"
};
const AudioNames = [
	"activities-rocket-time",
	"activity_end",
	"activity_launch",
	"activity_user_join",
	"activity_user_left",
	"call_calling",
	"call_ringing",
	"call_ringing_beat",
	"clip_save",
	"ddr-down",
	"ddr-left",
	"ddr-right",
	"ddr-up",
	"deafen",
	"detune_call_calling",
	"detune_call_ringing",
	"detune_deafen",
	"detune_discodo",
	"detune_disconnect",
	"detune_message1",
	"detune_mute",
	"detune_ptt_start",
	"detune_ptt_stop",
	"detune_stream_ended",
	"detune_stream_started",
	"detune_stream_user_joined",
	"detune_stream_user_left",
	"detune_undeafen",
	"detune_unmute",
	"detune_user_join",
	"detune_user_leave",
	"detune_user_moved",
	"discodo",
	"disconnect",
	"highfive_clap",
	"highfive_whistle",
	"human_man",
	"mention1",
	"mention2",
	"mention3",
	"message1",
	"message2",
	"message3",
	"mute",
	"overlayunlock",
	"poggermode_achievement_unlock",
	"poggermode_applause",
	"poggermode_enabled",
	"poggermode_message_send",
	"ptt_start",
	"ptt_stop",
	"reconnect",
	"robot_man",
	"stage_waiting",
	"stream_ended",
	"stream_started",
	"stream_user_joined",
	"stream_user_left",
	"success",
	"undeafen",
	"unmute",
	"user_join",
	"user_leave",
	"user_moved"
];
const onOptionChange = (settings, key, event) => SettingsUtils.changeValue(settings, key, event.target.value);
const getSettingsUI = (settings) => BdApi.React.createElement("div", null, BdApi.React.createElement("select", { onChange: (event) => onOptionChange(settings, "ringtone", event), className: "choice" }, " ", AudioNames.map((v) => BdApi.React.createElement("option", { value: v }, v))), BdApi.React.createElement("button", null, "test"));

// index.ts
const { Patcher, UI: { showToast }, Webpack } = BdApi;
const playRingtoneModule = Webpack.getModule((m) => typeof m.Z === "function" && m.Z.toString().includes("else if(!function("));
const getSoundModule = Webpack.getByKeys("tu", "uk", "GN");
let settings = SettingsUtils.load(SettingsDefault);
function replaceAudio() {
	let lastUsedRingtone = "";
	let arr = ["classic"];
	Patcher.before(name, playRingtoneModule, "Z", (_, args) => {
		args[0] = () => getSoundModule.tu(settings.ringtone, "call_ringing");
		if (settings.ringtone === lastUsedRingtone)
			return;
		if (typeof args?.[0] !== "function" || !args?.[1])
			return;
		arr.push("");
		args[1] = arr;
		lastUsedRingtone = settings.ringtone;
	});
	Patcher.before(name, getSoundModule, "tu", (_, args) => args?.[1] && args[1] === "call_ringing" && arr.pop());
}
async function unpatch() {
	for (let i = 3; i >= 1; i--) {
		showToast(`Reload in ${i}`, { forceShow: true, type: "success", timeout: 1e3, icon: false });
		await new Promise((r) => setTimeout(r, 1e3));
	}
	location.reload();
}
class index {
	start = () => replaceAudio();
	stop = () => unpatch();
	getSettingsPanel = () => getSettingsUI(settings);
}

module.exports = index;

/*@end@*/