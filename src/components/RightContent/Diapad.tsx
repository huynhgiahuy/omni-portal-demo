import React, { Fragment, useCallback, useState } from 'react';
import { Input, Button, Popover } from 'antd';
import Numbpad from '../Icons/numpad';
import styles from './index.less';
import { PhoneFilled } from '@ant-design/icons';
import Keyboard from '../Keyboard';

type SuffixProps = {
  onClickNumberpad: (number: string) => void;
  children: React.ReactNode;
};
const options = [
  { value: '0908776291', name: 'Nguyễn Diệu Nhi' },
  { value: '0918478451', name: 'Huỳnh Nguyễn Ái Nhi' },
  { value: '0818499888', name: 'Trần Thị Nhi Hà' },
  { value: '0918348421', name: 'Nguyễn Thúc Nhiễu' },
  { value: '0918234789', name: 'Huỳnh Nhi' },
];

const Suffix: React.FC<SuffixProps> = ({ onClickNumberpad, children }) => {
  return (
    <Fragment>
      <Popover
        placement="bottom"
        trigger="click"
        arrowPointAtCenter={false}
        title={
          <div className={styles['suffix-list-dropdown']}>
            <div className={styles['title-dropdown']}>
              <span>Không có trong danh bạ</span>
              {/** Render list contact in here */}
            </div>
          </div>
        }
        content={<Keyboard size="small" getValue={(e: string) => onClickNumberpad(e)} />}
      >
        <Button
          style={{ border: 'none', marginRight: 0 }}
          type="link"
          icon={<Numbpad onClick={() => {}} style={{ color: 'gray' }} />}
        />
      </Popover>
      {children}
    </Fragment>
  );
};

type DiapadProps = {
  isShowPhoneCall?: boolean;
  onSendDTMF?: any;
  onClickCall?: (value: string) => void;
};

const Diapad: React.FC<DiapadProps> = ({
  isShowPhoneCall = false,
  onSendDTMF,

  onClickCall,
}) => {
  const [valueInput, setValueInput] = useState<string>('');

  const handleOnClickNumberpad = useCallback(
    (number) => {
      setValueInput((s) => `${s}${number}`);

      onSendDTMF && onSendDTMF(number[0]);
    },
    [onSendDTMF],
  );

  const handleCall = useCallback(() => {
    setValueInput('');
    onClickCall && onClickCall(valueInput);
  }, [onClickCall, valueInput]);

  return (
    <Input
      allowClear
      value={valueInput}
      onChange={(e) => setValueInput(`${e.target.value}`)}
      className={styles.input}
      placeholder="Nhập tên hoặc số"
      suffix={
        <Suffix onClickNumberpad={handleOnClickNumberpad}>
          <Button
            disabled={!isShowPhoneCall}
            onClick={isShowPhoneCall ? handleCall : () => {}}
            className={`${styles['btn-phone']} ${!isShowPhoneCall && styles['btn-disable']}`}
            shape="circle"
            icon={<PhoneFilled color="gray" />}
          />
        </Suffix>
      }
      onPressEnter={isShowPhoneCall ? handleCall : () => {}}
    />
  );
};

export default Diapad;
