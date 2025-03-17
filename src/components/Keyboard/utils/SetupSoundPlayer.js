import Subscribableevent from 'subscribableevent';

import { SoundPlayer } from './SoundPlayer';

class Setup {
    constructor() {
        this._sounds = {};
        this._outputConfigurationChanged = new Subscribableevent();
        this._setOutputVolume = e => {
            if (this._callbacks) {
                return CallingCapabilities.speakerVolumeControlSupported
            }
        }
        this._getOutputVolume = () => {
            if (this._callbacks) {
                return this._callbacks.getOutputVolume() / 100;
            }
            return 1;
        };
        this._getOutputDevice = e => {
            if (this._callbacks) {
                return this._callbacks.getOutputDevice(e)
            }
        }
    }

    setCallbacks(e) {
        if (this._callbacks) {
            this._volumeToken.unsubscribe();
            this._deviceToken.unsubscribe();
            this._volumeToken = void 0;
            this._deviceToken = void 0
        }
        this._callbacks = e;
        this._volumeToken = this._callbacks.onVolumeChanged.subscribe(() => this._outputConfigurationChanged.fire("SoundPlayerCallbacks.Volume"));
        this._deviceToken = this._callbacks.onDeviceChanged.subscribe(() => this._outputConfigurationChanged.fire("SoundPlayerCallbacks.Device"));
    }

    static _keyForSoundDescription(e) {
        return e.name + (e.secondary ? "_additional" : "")
    }

    _getOrCreateSound(e) {
        const t = Setup._keyForSoundDescription(e);
        let sound = this._sounds[t];
        if (!sound) {
            const newSound = new SoundPlayer(
                e,
                this._setOutputVolume,
                this._getOutputDevice,
                this._getOutputVolume,
                this._outputConfigurationChanged
            )
            this._sounds[t] = newSound;
            return newSound;
        };
        return sound;
    }

    get OncxDtmf1() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_1",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmf2() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_2",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmf3() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_3",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmf4() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_4",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmf5() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_5",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmf6() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_6",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmf7() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_7",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmf8() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_8",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmf9() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_9",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmf0() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_0",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmfStar() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_star",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
    get OncxDtmfPound() {
        return this._getOrCreateSound({
            name: "Oncx_Dtmf_pound",
            extension: "m4a",
            type: 'System',
            maybeLoud: true,
        })
    }
}

export default new Setup();
