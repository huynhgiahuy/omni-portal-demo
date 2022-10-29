import React from 'react';
import PT from 'prop-types';

// import audio from '@/assets/musics/soundEffect.wav'
import style from './styles.less';
import NumberButton from './NumberButton';
import mapDtmfWithSound from './utils/mapDtmfWithSound';

// const dtmfFreq = {
//   "1": { f1: 697, f2: 1209 },
//   "2": { f1: 697, f2: 1336 },
//   "3": { f1: 697, f2: 1477 },
//   "4": { f1: 770, f2: 1209 },
//   "5": { f1: 770, f2: 1336 },
//   "6": { f1: 770, f2: 1477 },
//   "7": { f1: 852, f2: 1209 },
//   "8": { f1: 852, f2: 1336 },
//   "9": { f1: 852, f2: 1477 },
//   "*": { f1: 941, f2: 1209 },
//   "0": { f1: 941, f2: 1336 },
//   "#": { f1: 941, f2: 1477 }
// }
// class Tone {
//   AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext;

//   constructor(freq1, freq2) {
//     this.context = new AudioContext();;
//     this.status = 0;
//     this.freq1 = freq1;
//     this.freq2 = freq2;
//   }

//   setup() {
//     this.osc1 = this.context.createOscillator();
//     this.osc2 = this.context.createOscillator();
//     this.osc1.frequency.value = this.freq1;
//     this.osc2.frequency.value = this.freq2;

//     this.gainNode = this.context.createGain();
//     this.gainNode.gain.value = 0.25;

//     this.filter = this.context.createBiquadFilter();
//     this.filter.type = "allpass";

//     this.osc1.connect(this.gainNode);
//     this.osc2.connect(this.gainNode);

//     this.gainNode.connect(this.filter);
//     this.filter.connect(this.context.destination);
//   }

//   start() {
//     this.setup();
//     this.osc1.start(0);
//     this.osc2.start(0);
//     this.status = 1;
//   }

//   stop() {
//     this.osc1.stop(0);
//     this.osc2.stop(0);
//     this.status = 0;
//   }
// }

const numberMapByRow = [
  [{ 1: '' }, { 2: 'abc' }, { 3: 'def' }],
  [{ 4: 'ghi' }, { 5: 'jlk' }, { 6: 'mno' }],
  [{ 7: 'pqrs' }, { 8: 'tuv' }, { 9: 'wxyz' }],
  [{ '*': '' }, { 0: '+' }, { '#': '' }],
];

const Keyboard = ({ getValue, size }) => {
  // const sound = React.useMemo(() => new Tone(450, 540), []);
  // const sound = React.useMemo(() => new Audio('/musics/soundEffect.wav'), []);

  const handleOnClick = React.useCallback(
    (keyPress) => () => {
      mapDtmfWithSound.playDTMFSound(keyPress);
      getValue && getValue(keyPress);
    },
    [getValue],
  );

  // const handleOnMouseDown = React.useCallback((keyPress) => (e) => {
  //   e.preventDefault();
  //   const frequencyPair = dtmfFreq[keyPress];

  //   sound.freq1 = frequencyPair.f1;
  //   sound.freq2 = frequencyPair.f2;
  //   if (sound.status == 0) {
  //     sound.start();
  //   }
  // }, [sound])

  // const handleOnMouseUp = React.useCallback((e) => {
  //   e.preventDefault();
  //   sound.stop();
  // }, [sound])

  return (
    <div className={style.keyboard}>
      <div className={style['keyboard-inner']}>
        {numberMapByRow.map((row, index) => {
          return (
            <div key={index} className={style['keyboard-inner__row']}>
              {row.map((numb) => {
                const value = Object.keys(numb);
                const letter = numb[value];
                return (
                  <NumberButton
                    key={value}
                    value={value}
                    letter={letter}
                    // onMouseUp={handleOnMouseUp}
                    // onMouseDown={handleOnMouseDown(value)}
                    onClick={handleOnClick(value)}
                  />
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
};

Keyboard.propTypes = {
  getValue: PT.func.isRequired,
  size: PT.string,
};

Keyboard.defaultProps = {
  size: 'normal',
};

export default Keyboard;
