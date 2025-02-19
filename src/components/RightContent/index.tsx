import { Space } from 'antd';
// import { useAtom } from 'jotai';
// import { debounce } from 'lodash';
// import React, { useEffect, useState } from 'react';
// import { useModel, useRequest } from 'umi';
// import useSubWs from '@/hooks/useSocket';
// import { requestGetTranferInfo } from '@/pages/omni-channel/report/services';
// import { socketAtom } from '@/socketio';
// import AgentModalRing from '../AgentModalRing';
// import NoticeIconView from '../NoticeIcon';
import Avatar from './AvatarDropdown';
// import Diapad from './Diapad';
//import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
// import WorkingStatus from './WorkingStatus';

export type SiderTheme = 'light' | 'dark';

export type dataProps = {
  call_id: string;
  phone: string;
  direction: string;
  event: string;
  call_history: string;
  name: string;
  is_ip_phone: boolean;
  contact: {
    full_name: string;
    phone_number: string;
    work_unit: string;
    ip_phone: string;
  };
  contact_email: string;
  call_type: string;
  image: string;
};

const GlobalHeaderRight: React.FC = () => {
  // const [socket] = useAtom(socketAtom);
  // const { initialState } = useModel('@@initialState');
  // const [isModalOpenRing, setIsModalOpenRing] = useState(false);
  // const [isModalOpenAnswer, setIsModalOpenAnswer] = useState(false);
  // const [isFullScreenModal, setIsFullScreenModal] = useState(false);
  // const [dataTranfers, setDataTranfers] = useState<
  //   { id: string; name: string; ip_phone: string }[]
  // >([]);

  // const [isVisibleHistoryCall, setVisibleHistoryCall] = useState(false);
  // const [isActiveIconHistory, setActiveIconHistory] = useState(false);
  // const [isVisibleNoteCall, setVisibleNoteCall] = useState(false);
  // const [isActiveIconNote, setActiveIconNote] = useState(false);
  // const [dataCall, setDataCall] = useState<dataProps>();
  // const access_token = localStorage.getItem('access_token');

  // const getTranferInfo = useRequest(
  //   async (data) => {
  //     const res: { success: boolean; data: { id: string; name: string; ip_phone: string }[] } =
  //       await requestGetTranferInfo(access_token ? access_token : '', data ? data : {});
  //     if (!res.success) {
  //       return;
  //     }
  //     setDataTranfers(res.data);
  //     return res;
  //   },
  //   {
  //     manual: true,
  //   },
  // );

  // const handelUserTransfer = debounce(
  //   (keyword?: string) => {
  //     getTranferInfo.run({ keyword });
  //   },
  //   500,
  //   {
  //     trailing: true,
  //     leading: false,
  //   },
  // );

  // useSubWs('emit_call_event', (data: dataProps) => {
  //   setDataCall(data);
  //   const eventCall = data.event;
  //   switch (eventCall) {
  //     case 'ringing_call':
  //       setTimeout(() => {
  //         setIsModalOpenRing(true);
  //       }, 0);

  //       break;
  //     case 'hangup_call':
  //       setTimeout(() => {
  //         setIsModalOpenRing(false);
  //         setIsModalOpenAnswer(false);
  //         setIsFullScreenModal(false);
  //         setVisibleHistoryCall(false);
  //       }, 0);

  //       break;
  //     case 'answered_call':
  //       setTimeout(() => {
  //         setIsModalOpenRing(false);
  //         setIsModalOpenAnswer(true);
  //       }, 0);

  //       break;
  //     default:
  //       break;
  //   }
  // });

  // useEffect(() => {
  //   if (isModalOpenRing || isModalOpenAnswer) {
  //     getTranferInfo.run({});
  //   }
  // }, [isModalOpenRing, isModalOpenAnswer]);

  // useEffect(() => {
  //   socket?.on('reload_user_status', () => {
  //     if (isModalOpenAnswer || isModalOpenRing) {
  //       getTranferInfo.run({});
  //     }
  //   });
  // }, [access_token]);

  // if (!initialState || !initialState.settings) {
  //   return null;
  // }

  // const { navTheme, layout } = initialState.settings;
  // let className = styles.right;

  // if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
  //   className = `${styles.right}  ${styles.dark}`;
  // }

  // const handleOkRing = () => {
  //   setIsModalOpenRing(false);
  // };

  // const handleCancelRing = () => {
  //   setIsModalOpenRing(false);
  // };

  // const showModalAnswer = () => {
  //   setIsModalOpenAnswer(true);
  //   setIsModalOpenRing(false);
  // };

  // const handleOkAnswer = () => {
  //   setIsModalOpenAnswer(false);
  // };

  // const handleCancelAnswer = () => {
  //   setIsModalOpenAnswer(false);
  // };

  // const handleFullScreenModal = () => {
  //   setIsFullScreenModal(!isFullScreenModal);
  // };

  // const handleClickIconHistory = () => {
  //   setVisibleHistoryCall(!isVisibleHistoryCall);
  //   setActiveIconHistory(!isActiveIconHistory);
  //   setVisibleNoteCall(false);
  //   setActiveIconNote(false);
  // };

  // const handleClickIconNote = () => {
  //   setVisibleNoteCall(!isVisibleNoteCall);
  //   setActiveIconNote(!isActiveIconNote);
  //   setVisibleHistoryCall(false);
  //   setActiveIconHistory(false);
  // };

  return (
    <Space>
      <span
        className={styles.action}
        onClick={() => {
          window.open('https://pro.ant.design/docs/getting-started');
        }}
      >
      </span>
      <Avatar />
      <div>test</div>
    </Space>
  );
};
export default GlobalHeaderRight;
