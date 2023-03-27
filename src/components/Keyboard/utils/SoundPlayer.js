import { Resolved, Defer } from 'synctasks';
import lodash from 'lodash';
import { MyAudio } from './CustomAudio';

function getSoundPath(path = '') {
  const getDocRoot = () => '/';
  return getDocRoot() + 'media/' + path;
}

export class SoundPlayer {
  constructor(soundDescription, setSoundOutputVolumn, getOutputDevice, getOutputVolume) {
    this._soundDescription = soundDescription;
    this._setOutputVolume = setSoundOutputVolumn;
    this._getOutputDevice = getOutputDevice;
    this._getOutputVolume = getOutputVolume;
    this._piiFilenames = ['Skype_Dtmf_1', 'Skype_Dtmf_2'];
    this._nextPlayerToken = 0;
    this._players = {};
  }

  get filename() {
    return this._soundDescription.name + '.' + this._soundDescription.extension;
  }

  _createPlayer(player, t) {
    const index = ++this._nextPlayerToken;
    const playerObj = {
      token: index,
      player: MyAudio.openFile(
        getSoundPath(this.filename),
        this._soundDescription.extension,
        this._soundDescription.type,
      ),
    };
    this._players[index] = playerObj;
    const _player = player && player.unmute;
    this._updateOutputVolume(
      playerObj,
      {
        force: true,
        unmute: _player,
      },
      t,
    );
    this._updateOutputMuted(
      playerObj,
      {
        force: true,
        unmute: _player,
      },
      t,
    );
    return this._updateOutputDevice(playerObj, t, !0).always(() => playerObj);
    return playerObj;
    return Resolved().always(() => playerObj);
  }

  playRepeating(e, t) {
    return this._createPlayer(t, e).then((playerObj) => {
      playerObj.player.play(true);
    });
  }

  playOnce(e, t) {
    return this._createPlayer(t, e).then((playerObj) => {
      const i = Defer();
      let n = playerObj.player.endedEvent.subscribe(() => {
        if (!n) {
          return;
        }
        this.dispose(playerObj.token, e);
        n.unsubscribe();
        i.resolve();
      });
      playerObj.player.play(false);
      return i.promise();
    });
  }

  dispose(token, t) {
    const playerObj = this._players[token];
    if (playerObj) {
      playerObj.player.stop();
      playerObj.player.release();
      delete this._players[token];
      return;
    }
  }

  _updateOutputDevice(e, t, i) {
    const outputDevice = this._getOutputDevice(!!this._soundDescription.secondary);
    if (!outputDevice || (outputDevice.id === this._deviceId && !i)) {
      return Resolved();
    }
    return fromThenable(e);
    return fromThenable(e.player.setOutputDevice(outputDevice.id, outputDevice.browserId))
      .then(() => {
        this._deviceId = outputDevice.id;
      })
      .catch((err) => alert('err'));
  }

  _updateOutputVolume(myPlayer, t, i) {
    let outputVolume = this._getOutputVolume();
    if (
      (outputVolume !== this._volume || t.force) &&
      t.unmute &&
      this._soundDescription.secondary
    ) {
      outputVolume = 0.5;
    } else {
      outputVolume = outputVolume > 0 ? outputVolume : 0.5;
      this._setOutputVolume(outputVolume);
    }
    this._volume = outputVolume;
    myPlayer.player.setVolume(outputVolume);
  }

  _updateOutputMuted(myPlayer, t, i) {
    let s = myPlayer.player.getMuted();
    if (
      lodash.isUndefined(t.unmute) ||
      (t.unmute && s && !t.force) ||
      (t.unmute && !this._soundDescription.secondary && CallingCapabilities.unmuteDeviceSupported())
    ) {
      myPlayer.player.setMuted(true);
    }
  }
}
