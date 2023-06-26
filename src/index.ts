import { name as pluginName } from "./plugin.json";
const { Patcher, Webpack } = BdApi;


const AudioNames = {
    notsocoolRingtone: "call_ringing",
    coolRingtone: "call_ringing_beat",
    discordo: "discodo"
};
const playRingtoneModule = Webpack.getModule(m => typeof m.Z === "function" && m.Z.toString().includes("else if(!function("));
const playSoundModule = Webpack.getByKeys("tu", "uk", "GN");
// const playSound = (audio: keyof typeof AudioNames): any => playSoundModule.GN(AudioNames[audio]);

function replaceAudio(useCoolRingtone: boolean): void
{
    let isRingtonePatched = false;
    Patcher.unpatchAll(pluginName);
    Patcher.before(pluginName, playRingtoneModule, "Z", (_, args: any) => !isRingtonePatched && args?.[1]?.length && (args[1] = []));
    Patcher.before(pluginName, playSoundModule, "tu", (_, args) => args?.[0] === AudioNames.notsocoolRingtone &&
        (args[0] = AudioNames[useCoolRingtone ? "coolRingtone" : "notsocoolRingtone"]) && (isRingtonePatched = true));
}

export default class
{
    start = () => replaceAudio(true);
    stop = () => replaceAudio(false);
}