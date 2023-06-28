import { SettingsDefault, SettingsUtils, getSettingsUI } from "./utils";
import { name as pluginName } from "./plugin.json";
const { Patcher, UI: { showToast }, Webpack } = BdApi;



const playRingtoneModule = Webpack.getModule(m => typeof m.Z === "function" && m.Z.toString().includes("else if(!function("));
const getSoundModule = Webpack.getByKeys("tu", "uk", "GN");
let settings = SettingsUtils.load(SettingsDefault);

function replaceAudio(): void
{
    let lastUsedRingtone = "";
    let arr = ["classic"];

    Patcher.before(pluginName, playRingtoneModule, "Z", (_, args) =>
    {
        args[0] = () => getSoundModule.tu(settings.ringtone, "call_ringing");

        if(settings.ringtone === lastUsedRingtone) return;
        if(typeof args?.[0] !== "function" || !args?.[1]) return;

        arr.push("");
        args[1] = arr;

        lastUsedRingtone = settings.ringtone;
    });

    Patcher.before(pluginName, getSoundModule, "tu", (_, args) => args?.[1] && args[1] === "call_ringing" && arr.pop());
};

async function unpatch(): Promise<void>
{
    for(let i = 3; i >= 1; i--)
    {
        showToast(`Reload in ${i}`, { forceShow: true, type: "success", timeout: 1e3, icon: false });
        await new Promise(r => setTimeout(r, 1e3));
    }
    location.reload();
}

export default class
{
    start = () => replaceAudio();
    stop = () => unpatch();
    getSettingsPanel = () => getSettingsUI(settings);
}