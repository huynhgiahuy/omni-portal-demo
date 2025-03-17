import SoundPlayer from './SetupSoundPlayer';

const mapDtmfSounds = {
  1: {
    tone: 'Num1',
    // sound: () => newSetup.SkypeDtmf1
    sound: () => SoundPlayer.OncxDtmf1,
  },
  2: {
    tone: 'Num2',
    sound: () => SoundPlayer.OncxDtmf2,
  },
  3: {
    tone: 'Num3',
    sound: () => SoundPlayer.OncxDtmf3,
  },
  4: {
    tone: 'Num4',
    // sound: () => newSetup.SkypeDtmf1
    sound: () => SoundPlayer.OncxDtmf4,
  },
  5: {
    tone: 'Num5',
    sound: () => SoundPlayer.OncxDtmf5,
  },
  6: {
    tone: 'Num6',
    sound: () => SoundPlayer.OncxDtmf6,
  },
  7: {
    tone: 'Num7',
    // sound: () => newSetup.SkypeDtmf1
    sound: () => SoundPlayer.OncxDtmf7,
  },
  8: {
    tone: 'Num8',
    sound: () => SoundPlayer.OncxDtmf8,
  },
  9: {
    tone: 'Num9',
    sound: () => SoundPlayer.OncxDtmf9,
  },
  0: {
    tone: 'Num0',
    // sound: () => newSetup.SkypeDtmf1
    sound: () => SoundPlayer.OncxDtmf0,
  },
  '*': {
    tone: 'Num*',
    sound: () => SoundPlayer.OncxDtmfStar,
  },
  '#': {
    tone: 'Num#',
    sound: () => SoundPlayer.OncxDtmfPound,
  },
};

export default new (class {
  constructor() {
    this._toneChains = {};
    this._callDtmfs = {};
    this.setCallDTMF = (e, t) => {
      this._callDtmfs[e] = t;
    };

    this.playDTMFSound = (e, t) => {
      const soundPlayer = this._inputStringToSoundPlayer(e);
      if (soundPlayer) {
        soundPlayer.playOnce(t);
      }
    };

    this.playRepeating = () => {
      const soundPlayer = this._inputStringToSoundPlayer('connecting');
      if (soundPlayer) {
        soundPlayer.playRepeating('aaaa');
      }
    };
  }

  _inputStringToSoundPlayer(string) {
    return mapDtmfSounds[string] && mapDtmfSounds[string].sound();
  }
})();
