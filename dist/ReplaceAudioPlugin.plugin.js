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

// icons/audioIconOn.png
const img$1 = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAnZQTFRFAAAAEBggERcgDxggERggDRUdERkgDxghEhgeEBcgEBkfEBghEBgfDxkhEBoeDxQgERkfDxkgEBkhEBceEBkgDxcfDxceEBYgDhkhEBggEBggEBggEBkgEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggERgfEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggERchEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBcgEBggEBggEBggEBggEBggEBggEBggEBcfEBggEBggEBggEBggEBggEBggEBggEBgfEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggERggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBghEBggERciEBggEBggEBggEBggEBggEBggERcfEBggEBggEBgg////xX6xoAAAANB0Uk5TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAERDwEMcMzIVCqp+MoSBlrX4R4clPMCSP4Tguvy+QE5ufzBYOLkihfSU6Am4GYLtDIB6notEAkYHUDDQgMfsuy4GXm82O+JdDPE/VJllgiipPVZ+yTCybqfMAdB6IOOCgGQvw6ELm/QBHJE519prgUBk6YEO0f3IN8hKe0x2wE38V621c0bfO6n5vZdI9xKNIt+Fi/dd3VbrCeqXBpuvtRXYa9tzjyzSUt7gANMAY9sVqUoZwE1xlkTJMwAAAABYktHRNF50f8KAAAACXBIWXMAAOw4AADsOAFxK8o4AAADSElEQVRYw+2X51sTQRCHb0wsAbHXBA1CQpQWg6gQSBSQCKKhKwaxgBpREETsiAW7oqAoiIAiNhQbNuy9t/2TnLuQcJeE6G2ex0/Ml2zIzrs7+5udWRim3/6DwUS5wh+88J80WRkwZQAtQSINDFIRog6mBIBm6jSCFhJKBQAIC48g9ADQTlfrCDVgIETOiGKdZ86iAsDs6Bg9uuti4ww0ABTPyC0/Z25oiHiAZBAnHiHxCRqgANjFUyXOGwziAQ7xkkzz0U00wC6ePjllAeslEuAQL3VhJAxhnAAyH8Uis+9QVzc/v7T0UM4yMm3iZWXn9KzJB8DiJblLA2GYS9CWvGX5IZwlLefEW2EB+54FgJX4Y4zFKRwJrCooJHyLX63pnSMArGG3t9YqJIAlS+CuX4fiMe4B5iKcsH4D+PD8fSGPDTqXC8BYTIixRLCAQAUI24iTSwVBgLUM/7apnDvCaKOLZA4AbE4DGVRsIaTQBBLehHTMutwUcFnNCQDWrdu2g2zHTlxuV2VfMXoAWHerVHEghSrcZEQmBWAP3q69GQD7gnAL+2G4aED1AQz+IB7FIUz0w0dANODoMVz5+AmAGrxppZXiAXDyFJZ3BUBtHX4/TQE4gwLW4adciaqVewFQqAmpP0sZQimGEHZOmK3/CmhgD7EoB6DxPCFKuXhANZvDTShjE17dCxqxgNqKZtxASyuANhEHF2GEOMCltsvo1n5FOhKuXsNyfZ2fyuxlqr/hGWArFB1WgFE3caS8xQdw17ktxeN1Zq29w4wn0Hkbh3eAD4C7mNy6eo8FBZdvuZeG/ub7OM53mpEeKyhpxW1dLiVN9eDho9Hob+3Aoqh/DAKABKqe6ASI7qfOKhlsuQ/PMJnIc7lTWR4DlhdlwrIe3uq+rLPJ9DLQtUuNHedoLK9ec40l4I3WXWN5ayzurgFfpm/D1vYuld1E1Hs3rQ0+dH4sGS9jPBposwu45hrT+ImiuXK6tn7m2rvhC1V7ZxGar83cA+NbF80Dg1VW+r1IZReUBsA+sn4YbIJaMqgADPz8lcwJ+ttE9czjCUr50GR6BfXmsd0jKC2gV1BqgF1QtZwWwApqUioTJnjzT5N/cHCDF/799nf7A+mCJeQV1DCGAAAAJXRFWHRkYXRlOmNyZWF0ZQAyMDE5LTAxLTAyVDE1OjQ4OjEwKzAxOjAw02i+3AAAACV0RVh0ZGF0ZTptb2RpZnkAMjAxOS0wMS0wMlQxNTo0ODoxMCswMTowMKI1BmAAAABGdEVYdHNvZnR3YXJlAEltYWdlTWFnaWNrIDYuNy44LTkgMjAxNi0wNi0xNiBRMTYgaHR0cDovL3d3dy5pbWFnZW1hZ2ljay5vcmfmvzS2AAAAGHRFWHRUaHVtYjo6RG9jdW1lbnQ6OlBhZ2VzADGn/7svAAAAGHRFWHRUaHVtYjo6SW1hZ2U6OmhlaWdodAA1MTLA0FBRAAAAF3RFWHRUaHVtYjo6SW1hZ2U6OldpZHRoADUxMhx8A9wAAAAZdEVYdFRodW1iOjpNaW1ldHlwZQBpbWFnZS9wbmc/slZOAAAAF3RFWHRUaHVtYjo6TVRpbWUAMTU0NjQ0MDQ5MGTCjyUAAAATdEVYdFRodW1iOjpTaXplADEyLjVLQkLoe5uAAAAAXXRFWHRUaHVtYjo6VVJJAGZpbGU6Ly8uL3VwbG9hZHMvNTYvV1cyV1BKYi8xNzQ0LzM2NDM3MzMtbG93LXNvdW5kLXNwZWFrZXItdm9pY2Utdm9sdW1lXzExMzQxNC5wbmel4RhSAAAAAElFTkSuQmCC";

// icons/audioIconOff.png
const img = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAACdt4HsAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAAdpQTFRFAAAAEBggERcgDxggERggDRUdERkgDxghEhgeDxkhEBogEBwgERghEBghEhYlExUlEB0gEBgfERciDxkgEBkgDxcfDxceDhkhEBggEBggEBggEBkgEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggERgfEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggERchEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBghEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggEBggDxggEBggEBggEBggEBggEBggEBggERciEBggEBggEBggEBggEBggEBggEBggERcfEBggEBggERggEBgg////oB8u0wAAAJx0Uk5TAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAREPAQxwzMhUKqn4yhIGWtfhHhyU8wJI/hOC6/L5ATm5/MFg4uSKF9JToCbgZgu0MgHqegkYHUDDQgMZebzY74kzxP1SA6I0kiMfkOz7JM64IbMxCLqfMM0osrextjwau73pr+2nIMd1Liwniy++1FcDbRtJe4A3AY9sVtWlpGcBNcYBmgP/iwAAAAFiS0dEnQa78rEAAAAJcEhZcwAA7DgAAOw4AXEryjgAAALBSURBVFjD7ZfrWxJBFMb3RDe7WHQ3DSouBRhhVoBBaWkQBSlYmVQUKaVFppR20dTsbvf7Zf7YZmZ3dmfTghmep0+ej/vs+9uZec+cc1ZRFuI/BGyp21oPVegbttns2xfJEiyLd+x0IOR0SQLAvWs3wuHxSgEAfI17kDwA/HudASQNWAJN+5qJeP8BKQAcDIbCWB5oORSRAWDzovTzh494PeIAy1JqHkKtbW6QADDzHEePLQNxgG5ee8dxLBMGMPPCsfgJohIE6OYlTjbBcqVSQE3NqaSXRuq0al5nV1qTVAAAyHSfOeuh0X6OmteTAaYoD7DA+d4s4qP1gtt43wAApFesNHSrLmofgUynSR6+hM1T5gIAcpevgE6A/NUcJayGbrLpPrqBaD9C0YJpuQwAEL+Grg8wAqQGke0GIcDNIgbcGqJHGIzO2a8OKNzG7zEC0SNkGyaAJM66vjj87cB0QGYE6QRVj0qpPzLtXwAFfHcYQdPfzUOtAIAj8HoBACOURkc4vQhAI2QTYU4vBGBr4PViAAXGSlR/zwtrFCmAL0QB9/OwVgagnT+XUYKHSPXZB2GeIGKj+v1Y8CG/BoFE0vPHyEkRAJd/JgK9TOO58pdpLMblv0ooevXrPBEve50f2fn8pYTJAi1UU7iKB8bLFRQrTNv5/MOEyce0JEGyxVTS+idm5i1pVhh6MsD05HnPU7UoWmD6WcCEeP5i3qJqtabX1Rrk9S9Z5d4AmVdFc1lvnBUo6zg2btIby+ggbSz21/7KGwsfuLW9SZBFNL8VaW2mU/d39dLmGnr3XqK5EgXMfqDtPfJRqr0ThPvTZzpgfJmRGTAUMp8Of3UwQ2UAZMj6FlENzaSkAAp8/xGjhv7skBrzOEMlB03FMLSaYVszVBZgGCoNYIY66+T/eaChw2Zr21zNT1O9y/WrCv1ClI/fwBy7Qun+1uUAAAAldEVYdGRhdGU6Y3JlYXRlADIwMTktMDEtMDJUMTU6NDg6NTIrMDE6MDDAvaEPAAAAJXRFWHRkYXRlOm1vZGlmeQAyMDE5LTAxLTAyVDE1OjQ4OjUyKzAxOjAwseAZswAAAEZ0RVh0c29mdHdhcmUASW1hZ2VNYWdpY2sgNi43LjgtOSAyMDE2LTA2LTE2IFExNiBodHRwOi8vd3d3LmltYWdlbWFnaWNrLm9yZ+a/NLYAAAAYdEVYdFRodW1iOjpEb2N1bWVudDo6UGFnZXMAMaf/uy8AAAAYdEVYdFRodW1iOjpJbWFnZTo6aGVpZ2h0ADUxMsDQUFEAAAAXdEVYdFRodW1iOjpJbWFnZTo6V2lkdGgANTEyHHwD3AAAABl0RVh0VGh1bWI6Ok1pbWV0eXBlAGltYWdlL3BuZz+yVk4AAAAXdEVYdFRodW1iOjpNVGltZQAxNTQ2NDQwNTMyceFstAAAABJ0RVh0VGh1bWI6OlNpemUAOC4zS0JCY+SZOQAAAF50RVh0VGh1bWI6OlVSSQBmaWxlOi8vLi91cGxvYWRzLzU2L1dXMldQSmIvMTc0NC8zNjQzNzMyLW11dGUtc291bmQtc3BlYWtlci12b2ljZS12b2x1bWVfMTEzNDM5LnBuZ486H/cAAAAASUVORK5CYII=";

// plugin.json
const name = "ReplaceAudioPlugin";

// utils.tsx
const { Data, React, Webpack: { getModule } } = BdApi;
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
const audioFilenameResolver = getModule((m) => m.id && m.keys?.().some((r) => r.endsWith(".mp3")));
const resolveAudioFilename = (audioName) => audioFilenameResolver(audioName);
let currentPlayingAudio;
let isButtonMuted = [false, () => isButtonMuted[0]];
const onOptionChange = (settings, key, event) => {
	SettingsUtils.changeValue(settings, key, event.target.value);
	if (key === "ringtone" && !isButtonMuted[1]()) {
		if (currentPlayingAudio) {
			currentPlayingAudio.pause();
			currentPlayingAudio.currentTime = 0;
			currentPlayingAudio = void 0;
		}
		currentPlayingAudio = new Audio(resolveAudioFilename(`./${event.target.value}.mp3`));
		currentPlayingAudio.play();
	}
};
const ButtonComponent = () => {
	const [buttonState, setButtonState] = React.useState(false);
	const handleClick = () => {
		setButtonState(!buttonState);
		isButtonMuted[0] = !isButtonMuted[0];
		if (isButtonMuted[1]() && currentPlayingAudio) {
			currentPlayingAudio.pause();
			currentPlayingAudio.currentTime = 0;
			currentPlayingAudio = void 0;
		}
	};
	return BdApi.React.createElement("button", { onClick: handleClick }, BdApi.React.createElement("img", { src: !buttonState ? img$1 : img, style: { width: "auto", height: "22px" } }));
};
const getSettingsUI = (settings) => BdApi.React.createElement("div", { style: { display: "flex", alignItems: "center" } }, BdApi.React.createElement("select", { onChange: (event) => onOptionChange(settings, "ringtone", event), className: "choice", style: { height: "30px" } }, " ", AudioNames.map((v) => BdApi.React.createElement("option", { value: v, style: { height: "30px" } }, v))), BdApi.React.createElement(ButtonComponent, null));

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