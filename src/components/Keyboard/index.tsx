import React from 'react';
import style from './styles.less';
import NumberButton from './NumberButton';
import mapDtmfWithSound from './utils/mapDtmfWithSound';

const numberMapByRow = [
  [{ 1: '' }, { 2: 'abc' }, { 3: 'def' }],
  [{ 4: 'ghi' }, { 5: 'jlk' }, { 6: 'mno' }],
  [{ 7: 'pqrs' }, { 8: 'tuv' }, { 9: 'wxyz' }],
  [{ '*': '' }, { 0: '+' }, { '#': '' }],
];

interface KeyboardProps {
  getValue: (e: string) => void;
  size: string;
}

const Keyboard: React.FC<KeyboardProps> = ({ getValue, size = 'normal' }) => {
  const handleOnClick = React.useCallback(
    (keyPress: string) => {
      mapDtmfWithSound.playDTMFSound(keyPress);
      getValue && getValue(keyPress);
    },
    [getValue],
  );

  return (
    <div className={style.keyboard}>
      <div className={style['keyboard-inner']}>
        {numberMapByRow.map((row, index) => {
          return (
            <div key={index} className={style['keyboard-inner__row']}>
              {row.map((numb) => {
                const value = Object.keys(numb)[0];
                const letter: string = Object.values(numb)[0];
                return (
                  <NumberButton
                    key={value}
                    value={value}
                    letter={letter}
                    onClickNumber={() => handleOnClick(value)}
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

Keyboard.defaultProps = {
  size: 'normal',
};

export default Keyboard;
