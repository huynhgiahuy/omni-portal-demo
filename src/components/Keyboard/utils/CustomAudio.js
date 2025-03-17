import Subscribableevent from 'subscribableevent';

function getAudioFileContentTypeFromExtension(type) {
    let _type = 'application/unknown';
    switch (type) {
        case 'mp3':
            _type = 'audio/mpeg';
            break;
        case 'mp4':
        case 'm4a':
            _type = 'audio/mp4';
            break;
        case 'wav':
            _type = 'audio/wav';
            break;
        default:
            break;
    }
    return _type;
}

class a44446 {
    constructor() {
        this.progressEvent = new Subscribableevent();
        this.loadedEvent = new Subscribableevent();
        this.endedEvent = new Subscribableevent();
        this.errorEvent = new Subscribableevent();
    }
}

export class CustomAudio extends a44446 {
    constructor(src, type) {
        super();
        this._mySound = new Audio(src);
        // this._mySound = new Audio;
        // this._mySound.appendChild(this._getAudioSource('media/Skype_Dtmf_2', 'm4a'));
        // this._mySound.appendChild(this._getAudioSource(src, type));
        this._mySound.preload = "none";
        this._bufferedDuration = 0;
        this._mySound.addEventListener('progress', () => {
            const buffered = this._mySound.buffered;
            let t;
            for (let i = 0; i < buffered.length; i++) {
                if (buffered.start(i)) {
                    t = buffered.end(i);
                    break;
                }
            }
            if (this._bufferedDuration !== t) {
                this._bufferedDuration = t;
                this._emitProgressUpdateEvent();
            }
        }, true);
        this._mySound.addEventListener('timeupdate', () => {
            this._emitProgressUpdateEvent();
        }, true);
        this._mySound.addEventListener('loadedmetadata', () => {
            this.loadedEvent.fire({
                duration: this._mySound.duration
            })
        }, true);
        this._mySound.addEventListener('error', e => {
            this.errorEvent.fire(e);
        }, true);
        this._mySound.preload = "auto";
    }

    _emitProgressUpdateEvent() {
        this.progressEvent.fire(this._getProgress());
    }

    _getAudioSource(src, type) {
        const sourceElm = document.createElement("source");
        if (type !== '') {
            sourceElm.type = getAudioFileContentTypeFromExtension(type);
            sourceElm.src = src;
        }
        return sourceElm;
    }

    play(isLoop) {
        try {
            this._mySound.loop = isLoop;
            this._mySound.onended = (_, e) => {
                this.endedEvent.fire();
            }
            this._mySound.play();
        } catch (err) {
            console.error(err);
        }
    }

    stop() {
        try {
            this._mySound.pause();
            this._mySound.currentTime = 0;
        } catch (err) {
            console.error(err);
        }
    }

    release() {
        this.stop();
    }

    pause() {
        try {
            this._mySound.pause();
        } catch (err) {
            console.error(err);
        }
    }

    seek(currentTime) {
        try {
            this._mySound.currentTime = currentTime;
        } catch (err) {
            console.error(err);
        }
    }

    _getProgress() {
        return {
            currentPosition: this._mySound.currentTime,
            bufferedDuration: this._bufferedDuration
        }
    }

    getDuration() {
        return this._mySound.duration;
    }

    setOutputDevice(sinkId) {
        if ('setSinkId' in this._mySound) {
            return this._mySound.setSinkId(sinkId);
        }
        return Promise.resolve();
    }

    setVolume(volume) {
        try {
            this._mySound.volume = volume;
        } catch (err) {
            console.error(err);
        }
    }

    getVolume() {
        return this._mySound.volume
    }

    setMuted(e) {
        try {
            this._mySound.muted = e
        } catch (err) {
            console.error(err);
        }
    }

    getMuted() {
        return this._mySound.muted
    }
}

export class MyAudio {
    static openFile(src, extension) {
        return new CustomAudio(src, extension);
    }
}

