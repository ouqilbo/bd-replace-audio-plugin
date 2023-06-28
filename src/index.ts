import { name as pluginName } from "./plugin.json";
const { Patcher, UI: { showToast }, Webpack } = BdApi;


const AudioNames = {
    notsocoolRingtone: "call_ringing",
    coolRingtone: "call_ringing_beat"
};
const playRingtoneModule = Webpack.getModule(m => typeof m.Z === "function" && m.Z.toString().includes("else if(!function("));
const playSoundModule = Webpack.getByKeys("tu", "uk", "GN");

function replaceAudio(useCoolRingtone: boolean): void
{
    let isRingtonePatched = false;
    Patcher.unpatchAll(pluginName);
    Patcher.before(pluginName, playRingtoneModule, "Z", (_, args: any) => !isRingtonePatched && args?.[1]?.length && (args[1] = []));
    Patcher.before(pluginName, playSoundModule, "tu", (_, args) =>
    {
        if(args?.[0] === AudioNames.notsocoolRingtone)
        {
            args[0] = AudioNames[useCoolRingtone ? "coolRingtone" : "notsocoolRingtone"];
            isRingtonePatched = true;
        }
        else if(args?.[0] === AudioNames.coolRingtone)
        {
            showToast(
                "wooo, you legit got the rare ringtone. I'd brag about it in BetterDiscord server",
                { forceShow: true, type: "success", timeout: 10e3, icon: false }
            );
        }
    });
}

export default class
{
    start = () => replaceAudio(true);
    stop = () => replaceAudio(false);
}