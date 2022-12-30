import React, { Fragment, useCallback, useState } from 'react';
import { Input, Button, Popover, AutoComplete } from 'antd';
import Numbpad from '../Icons/numpad';
import styles from './index.less';
import { PhoneFilled } from '@ant-design/icons';
import Keyboard from '../Keyboard';
import InfoUserCard from '../InfoUserCard';
import useSubWs from '@/hooks/useSocket';

type SuffixProps = {
  onClickNumberpad: (number: string) => void;
  children: React.ReactNode;
  setValueInput: React.Dispatch<React.SetStateAction<string>>;
};
const options = [
  { value: '0908776291', name: 'Nguyễn Diệu Nhi' },
  { value: '0918478451', name: 'Huỳnh Nguyễn Ái Nhi' },
  { value: '0818499888', name: 'Trần Thị Nhi Hà' },
  { value: '0918348421', name: 'Nguyễn Thúc Nhiễu' },
  { value: '0918234789', name: 'Huỳnh Nhi' },
];

export const changeNumberPhone = (value: string) => {
  if (value.length === 10) {
    return `${value.slice(0, 4)} ${value.slice(4, 7)} ${value.slice(-3)}`;
  }
  return value;
};

const Suffix: React.FC<SuffixProps> = ({ onClickNumberpad, children, setValueInput }) => {
  const [openPopover, setOpenPopover] = useState(false);
  return (
    <Fragment>
      <Popover
        placement="bottom"
        trigger="click"
        arrowPointAtCenter={false}
        onOpenChange={(e) => {
          setOpenPopover(e);
        }}
        title={
          <div className={styles['suffix-list-dropdown']}>
            <div className={styles['title-dropdown']}>
              {/* <span>Không có trong danh bạ</span> */}
              {options.slice(0, 2).map((user, index) => (
                <InfoUserCard
                  key={`info-user-card-${index}`}
                  userName={user.name}
                  numberPhone={user.value}
                  handlePhone={(e) => setValueInput(e)}
                />
              ))}
            </div>
          </div>
        }
        content={<Keyboard size="small" getValue={(e: string) => onClickNumberpad(e)} />}
      >
        <Button
          style={{ border: 'none', marginRight: 0 }}
          type="link"
          icon={<Numbpad style={{ color: `${openPopover ? '#3D94E4' : 'gray'}` }} />}
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

const Diapad: React.FC<DiapadProps> = ({ isShowPhoneCall = false, onSendDTMF, onClickCall }) => {
  const [valueInput, setValueInput] = useState<string>('');
  const [openAutoComplete, setOpenAutoComplete] = useState(false);
  const [connectSocket, setConnectSocket] = useState(false);

  useSubWs('connect', (data: { success: boolean }) => {
    if (!!data?.success) {
      setConnectSocket(data?.success);
    }
  });

  const handleOnClickNumberpad = useCallback(
    (number: string) => {
      setValueInput((s) => `${s}${number}`);

      onSendDTMF && onSendDTMF(number[0]);
    },
    [onSendDTMF],
  );

  const handleCall = useCallback(() => {
    setValueInput('');
    onClickCall && onClickCall(valueInput);
  }, [onClickCall, valueInput]);

  const renderItem = (title: string, value: string) => ({
    value,
    label: <InfoUserCard userName={title} numberPhone={value} textSearch={valueInput} />,
  });

  const listUserPhone = options.map((user) => {
    return renderItem(user.name, user.value);
  });

  const optionsAuto = [
    {
      label: 'Cuộc gọi gần đây',
      options: listUserPhone,
    },
  ];

  return (
    <AutoComplete
      id="hightlight-text"
      value={valueInput}
      options={optionsAuto}
      open={openAutoComplete}
      onChange={(e) => {
        setValueInput(e);
      }}
      onBlur={() => {
        setOpenAutoComplete(false);
      }}
    >
      <Input
        allowClear
        onChange={(e) => setValueInput(`${e.target.value}`)}
        onClick={() => {
          setOpenAutoComplete(true);
        }}
        className={styles.input}
        placeholder="Nhập tên hoặc số"
        suffix={
          <Suffix onClickNumberpad={handleOnClickNumberpad} setValueInput={setValueInput}>
            <Button
              disabled={!isShowPhoneCall}
              onClick={isShowPhoneCall ? handleCall : () => {}}
              className={`${styles['btn-phone']} ${!isShowPhoneCall && styles['btn-disable']}`}
              shape="circle"
              icon={
                <div style={{ position: 'relative' }}>
                  <PhoneFilled color="gray" />
                  <div
                    className={
                      connectSocket ? styles.status_socket_success : styles.status_socket_fail
                    }
                  />
                </div>
              }
            />
          </Suffix>
        }
        onPressEnter={isShowPhoneCall ? handleCall : () => {}}
      />
    </AutoComplete>
  );
};

export default Diapad;
