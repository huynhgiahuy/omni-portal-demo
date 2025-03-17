import lodash from 'lodash';

class CapabilityMap {
    constructor() {
        this._capabilityMap = {}
    }
    _isSupported(e, t) {
        const i = e;
        return lodash.isUndefined(this._capabilityMap[i]) && (this._capabilityMap[i] = t()),
            this._capabilityMap[i]
    }
}

export const CAPABILITIES = {
    UnmuteDevice: 'UnmuteDevice',
    SpeakerVolumeControl: 'SpeakerVolumeControl',
}

export const CallingCapabilities = new class extends CapabilityMap {
    constructor() {
        super(...arguments);
    }

    unmuteDeviceSupported() {
        return this._isSupported(CAPABILITIES.UnmuteDevice, () => false);
    }

    speakerVolumeControlSupported() {
        return true;
    }
}();
