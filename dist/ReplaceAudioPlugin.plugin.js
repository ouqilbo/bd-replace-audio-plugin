/**
 * @name ReplaceAudioPlugin
 * @author Obliquo
 * @description Changes the classic, monotonous ringtone to the 0.1% one
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

// index.ts
const { Patcher, UI: { showToast }, Webpack } = BdApi;
const AudioNames = {
	notsocoolRingtone: "call_ringing",
	coolRingtone: "call_ringing_beat"
};
const playRingtoneModule = Webpack.getModule((m) => typeof m.Z === "function" && m.Z.toString().includes("else if(!function("));
const playSoundModule = Webpack.getByKeys("tu", "uk", "GN");
function replaceAudio(useCoolRingtone) {
	let isRingtonePatched = false;
	Patcher.unpatchAll(name);
	Patcher.before(name, playRingtoneModule, "Z", (_, args) => !isRingtonePatched && args?.[1]?.length && (args[1] = []));
	Patcher.before(name, playSoundModule, "tu", (_, args) => {
		if (args?.[0] === AudioNames.notsocoolRingtone) {
			args[0] = AudioNames[useCoolRingtone ? "coolRingtone" : "notsocoolRingtone"];
			isRingtonePatched = true;
		} else if (args?.[0] === AudioNames.coolRingtone) {
			showToast(
				"wooo, you legit got the rare ringtone. I'd brag about it in BetterDiscord server",
				{ forceShow: true, type: "success", timeout: 1e4, icon: false }
			);
		}
	});
}
class index {
	start = () => replaceAudio(true);
	stop = () => replaceAudio(false);
}

module.exports = index;

/*@end@*/