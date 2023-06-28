import { name as pluginName } from "./plugin.json";
const { Data } = BdApi;



export class SettingsUtils
{
    private constructor() {};
    static changeValue = (settings: SettingsDefault, key: SettingsDefaultKeys, newValue: any): void =>
    {
        settings[key] = newValue;
        Data.save(pluginName, "settings", settings);
    };
    static load = (settings?: SettingsDefault): SettingsDefault => Object.assign({}, settings && settings, Data.load(pluginName, "settings"));
}
type SettingsDefaultKeys = "ringtone";
export const SettingsDefault: { [key in SettingsDefaultKeys]: AudioNames } = {
    ringtone: "call_ringing_beat"
};
type SettingsDefault = typeof SettingsDefault;


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
] as const;
type AudioNames = typeof AudioNames[number];


const onOptionChange = (settings: SettingsDefault, key: SettingsDefaultKeys, event: any) => SettingsUtils.changeValue(settings, key, event.target.value);

export const getSettingsUI = (settings: SettingsDefault) => (
    <div>
        <select onChange={(event) => onOptionChange(settings, "ringtone", event)} className="choice"> {
            AudioNames.map(v => (
                <option value={v}>{v}</option>
            ))
        }
        </select>

        <button>test</button>
    </div>
);