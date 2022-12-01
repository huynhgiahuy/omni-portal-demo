import { message, Space } from 'antd';
// import { QuestionCircleOutlined } from '@ant-design/icons';
import Timer from 'react-compound-timer';
import React, { useEffect, useRef, useState } from 'react';
import { useModel, useRequest } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import Diapad from './Diapad';
import NoticeIconView from '../NoticeIcon';
import WorkingStatus from './WorkingStatus';
import AgentModalRing from '../AgentModalRing';
import AgentModalAnswer from '../AgentModalAnswer';
import { socket } from '../../socket';
import { dataUserContactProps, requestGetUserContact } from '@/pages/omni-channel/report/services';
import { debounce } from 'lodash';
import { data } from '../../pages/omni-channel/report/FakeData';
const access_token = localStorage.getItem('access_token');

export type SiderTheme = 'light' | 'dark';

export type dataProps = {
  phone: string;
  direction: string;
  event: string;
  call_history: string;
  name: string;
  contact: {
    name: string;
    phone: string;
  };
};

const GlobalHeaderRight: React.FC = () => {
  const refTimer = useRef<any>(null);
  const { initialState } = useModel('@@initialState');
  const [isModalOpenRing, setIsModalOpenRing] = useState(false);
  const [isModalOpenAnswer, setIsModalOpenAnswer] = useState(false);
  const [isFullScreenModal, setIsFullScreenModal] = useState(false);
  const [dataContacts, setDataContacts] = useState<dataUserContactProps[]>([]);

  const [valueCheckboxUser, setValueCheckboxUser] = useState<string>('');
  const [isVisibleHistoryCall, setVisibleHistoryCall] = useState(false);
  const [isActiveIconHistory, setActiveIconHistory] = useState(false);
  const [isVisibleNoteCall, setVisibleNoteCall] = useState(false);
  const [isActiveIconNote, setActiveIconNote] = useState(false);
  const [isCallerName, setCallerName] = useState('');
  const [isCallePhone, setCallerPhone] = useState('');
  const [dataCall, setDataCall] = useState<dataProps>();
  const [directionCall, setDirection] = useState('');

  const token = window.localStorage?.getItem('access_token');

  const getUserContact = useRequest(
    async (data) => {
      const res: { success: boolean } = await requestGetUserContact(
        token ? token : '',
        data ? data : { email_user: initialState?.currentUser?.email },
      );
      if (!res.success) {
        message.error('Không lấy được danh bạ');
        return;
      } else {
      }
      return res;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res) {
          setDataContacts(res);
        }
      },
    },
  );

  useEffect(() => {
    if (isModalOpenRing || isModalOpenAnswer) {
      getUserContact.run({ email_user: initialState?.currentUser?.email });
    }
  }, [isModalOpenRing, isModalOpenAnswer]);

  const handelUserTransfer = debounce(
    (keyword?: string) => {
      getUserContact.run({ email_user: initialState?.currentUser?.email, keyword });
    },
    500,
    {
      trailing: true,
      leading: false,
    },
  );
  useEffect(() => {
    const newToken = {
      token: access_token,
    };
    socket.emit('authen_event', newToken);
    socket.on('emit_call_event', (data) => {
      setDataCall(data);
      if (!data.name) {
        setCallerName('Chưa có trong danh bạ');
      } else {
        setCallerName(data.name);
      }
      if (!data.phone) {
        setCallerPhone('0921 197 398');
      } else {
        setCallerPhone(data.phone);
      }
      const eventCall = data.event;
      switch (eventCall) {
        case 'ringing_call':
          setIsModalOpenRing(true);
          break;
        case 'hangup_call':
          setIsModalOpenRing(false);
          setIsModalOpenAnswer(false);
          break;
        case 'answered_call':
          setIsModalOpenRing(false);
          setIsModalOpenAnswer(true);
          break;
        default:
          break;
      }
    });
  }, []);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const showModalRing = () => {
    setIsModalOpenRing(true);
  };

  const handleOkRing = () => {
    setIsModalOpenRing(false);
  };

  const handleCancelRing = () => {
    setIsModalOpenRing(false);
  };

  const showModalAnswer = () => {
    setIsModalOpenAnswer(true);
    setIsModalOpenRing(false);
  };

  const handleOkAnswer = () => {
    setIsModalOpenAnswer(false);
  };

  const handleCancelAnswer = () => {
    setIsModalOpenAnswer(false);
  };

  const handleFullScreenModal = () => {
    setIsFullScreenModal(!isFullScreenModal);
  };

  const handleSelectForwardUser = (e: any) => {
    setValueCheckboxUser(e.target.value);
  };

  const handleClickIconHistory = () => {
    setVisibleHistoryCall(!isVisibleHistoryCall);
    setActiveIconHistory(!isActiveIconHistory);
    setVisibleNoteCall(false);
    setActiveIconNote(false);
  };

  const handleClickIconNote = () => {
    setVisibleNoteCall(!isVisibleNoteCall);
    setActiveIconNote(!isActiveIconNote);
    setVisibleHistoryCall(false);
    setActiveIconHistory(false);
  };

  return (
    <Space className={className}>
      <HeaderSearch
        className={`${styles.action} ${styles.search}`}
        placeholder="站内搜索"
        defaultValue="umi ui"
        options={[
          { label: <a href="https://umijs.org/zh/guide/umi-ui.html">umi ui</a>, value: 'umi ui' },
          {
            label: <a href="next.ant.design">Ant Design</a>,
            value: 'Ant Design',
          },
          {
            label: <a href="https://protable.ant.design/">Pro Table</a>,
            value: 'Pro Table',
          },
          {
            label: <a href="https://prolayout.ant.design/">Pro Layout</a>,
            value: 'Pro Layout',
          },
        ]}
        onSearch={(value) => {
          console.log('input', value);
        }}
      />
      <div style={{ display: 'flex' }}>
        <WorkingStatus />
      </div>
      <Diapad />
      <NoticeIconView />
      <Avatar />
      {/* <SelectLang className={styles.action} /> */}
      <a
        onClick={showModalRing}
        style={{
          position: 'absolute',
          left: 0,
          background: 'white',
          color: 'white',
          borderColor: 'white',
          bottom: 0,
        }}
      >
        Button
      </a>

      <Timer
        initialTime={0}
        formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
        ref={refTimer}
      >
        {() => (
          <>
            <AgentModalRing
              refTimer={refTimer}
              isModalOpen={isModalOpenRing}
              handleOk={handleOkRing}
              handleCancel={handleCancelRing}
              handleOpenAnswer={showModalAnswer}
              isFullScreenModal={isFullScreenModal}
              handleFullScreenModal={handleFullScreenModal}
              handleSelectForwardUser={handleSelectForwardUser}
              handleClickIconHistory={handleClickIconHistory}
              handleClickIconNote={handleClickIconNote}
              valueCheckboxUser={valueCheckboxUser}
              isVisibleHistoryCall={isVisibleHistoryCall}
              isVisibleNoteCall={isVisibleNoteCall}
              isActiveIconHistory={isActiveIconHistory}
              isActiveIconNote={isActiveIconNote}
              isCallerName={isCallerName}
              isCallerPhone={isCallePhone}
              dataContacts={dataContacts}
              handelUserTransfer={handelUserTransfer}
              dataCall={dataCall}
            />
            <AgentModalAnswer
              hours={<Timer.Hours />}
              minutes={<Timer.Minutes />}
              seconds={<Timer.Seconds />}
              refTimer={refTimer}
              isModalOpen={isModalOpenAnswer}
              handleOk={handleOkAnswer}
              handleCancel={handleCancelAnswer}
              isFullScreenModal={isFullScreenModal}
              handleFullScreenModal={handleFullScreenModal}
              handleSelectForwardUser={handleSelectForwardUser}
              handleClickIconHistory={handleClickIconHistory}
              handleClickIconNote={handleClickIconNote}
              valueCheckboxUser={valueCheckboxUser}
              isVisibleHistoryCall={isVisibleHistoryCall}
              isVisibleNoteCall={isVisibleNoteCall}
              isActiveIconHistory={isActiveIconHistory}
              isActiveIconNote={isActiveIconNote}
              dataContacts={dataContacts}
              handelUserTransfer={handelUserTransfer}
              dataCall={dataCall}
            />
          </>
        )}
      </Timer>
    </Space>
  );
};
export default GlobalHeaderRight;
