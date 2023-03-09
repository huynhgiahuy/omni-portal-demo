import { message, Space } from 'antd';
import { useAtom } from 'jotai';
import { debounce } from 'lodash';
import React, { useEffect, useState } from 'react';
import { useModel, useRequest } from 'umi';

import api from '@/api';
import useSubWs from '@/hooks/useSocket';
import {
  requestAddUserContact,
  requestGetTakeCallNote,
  requestGetTranferInfo,
  requestSaveCallNote,
} from '@/pages/omni-channel/report/services';
import { socketAtom } from '@/socketio';

import { ListTransferButtonShareProps } from '../Atom/ButtonShare';
import { customerInfoProps } from '../Molecules/CustomerInfoForm';
import { notesProps } from '../Molecules/HistoryCall';
import NoticeIconView from '../NoticeIcon';
import ModalCall, { CallRedirectProps, CallTypeProps } from '../Organisms/ModalCall';
import Avatar from './AvatarDropdown';
import Diapad from './Diapad';
//import HeaderSearch from '../HeaderSearch';
import styles from './index.less';
import WorkingStatus from './WorkingStatus';

export type SiderTheme = 'light' | 'dark';

export type dataProps = {
  call_id: string;
  phone: string;
  direction: CallRedirectProps;
  event: string;
  call_history: string;
  name: string;
  is_ip_phone: boolean;
  contact: {
    email: string;
    full_name: string;
    phone_number: string;
    work_unit: string;
    name_unit: string;
    ip_phone: string;
  };
  contact_email: string;
  call_type: string;
  image: string;
};

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  const [socket] = useAtom(socketAtom);
  const [openModal, setOpenModal] = useState(false);
  const [callType, setCallType] = useState<CallTypeProps>('ring');
  const [callRedirect, setCallRedirect] = useState<CallRedirectProps>('inbound');
  const [dataTranfers, setDataTranfers] = useState<ListTransferButtonShareProps[]>([]);
  const [customerInfo, setCustomerInfo] = useState<customerInfoProps>({});
  const [listNotes, setListNotes] = useState<notesProps[]>([]);

  const [dataCall, setDataCall] = useState<dataProps>();
  const token = localStorage.getItem('access_token');

  const getTranferInfo = useRequest(
    async (data) => {
      const res: { success: boolean; data: { id: string; name: string; ip_phone: string }[] } =
        await requestGetTranferInfo(token ? token : '', data ? data : {});
      if (!res.success) {
        return;
      }
      const dataTranfers = res.data.map((item) => {
        return { id: item.id, label: item.name, value: item.ip_phone };
      });
      setDataTranfers(dataTranfers);
      return res;
    },
    {
      manual: true,
    },
  );

  const addUserContact = useRequest(
    async (data) => {
      const result: { success: boolean; error: string; data: customerInfoProps } =
        await requestAddUserContact(token ? token : '', data);
      if (!result.success) {
        message.error('Lưu thất bại');
        return;
      } else {
        message.success('Lưu thành công');
        setCustomerInfo({
          full_name: data.full_name,
          name_unit: data.name_unit ? data.name_unit : '',
          phone_number: data.phone_number,
          email: data.email,
          work_unit: data.work_unit,
          ip_phone: data.ip_phone,
        });
      }
    },
    {
      manual: true,
    },
  );

  const sendSaveCallNote = useRequest(
    async (data) => {
      const res: { success: boolean; data: any } = await requestSaveCallNote(
        token ? token : '',
        data,
      );
      if (!res.success) {
        message.error('Lưu thất bại');
        return;
      } else {
        message.success('Lưu thành công');
        getTakeCallNote.run({ phone_number: dataCall?.phone, call_direction: dataCall?.direction });
      }
      return res;
    },
    {
      manual: true,
    },
  );

  const getTakeCallNote = useRequest(
    async (data) => {
      const res: { success: boolean; data: any } = await requestGetTakeCallNote(
        token ? token : '',
        data,
      );
      if (!res.success) {
        message.error('Không lấy được lịch sử note');
        return;
      } else {
        setListNotes(res.data);
      }
      return res;
    },
    {
      manual: true,
    },
  );

  const handleUserTransfer = debounce(
    (keyword?: string) => {
      getTranferInfo.run({ keyword });
    },
    500,
    {
      trailing: true,
      leading: false,
    },
  );

  useSubWs('emit_call_event', (data: dataProps) => {
    const { contact } = data;
    setDataCall(data);
    setCustomerInfo({
      full_name: contact ? contact?.full_name : '',
      name_unit: contact ? contact?.name_unit : '',
      phone_number: contact ? contact?.phone_number : !data?.is_ip_phone ? data?.phone : '',
      email: contact ? contact?.email : '',
      work_unit: contact ? contact?.work_unit : '',
      ip_phone: contact ? contact?.ip_phone : data?.is_ip_phone ? data?.phone : '',
    });
    setCallRedirect(data.direction);
    const eventCall = data.event;
    switch (eventCall) {
      case 'ringing_call':
        setOpenModal(true);
        setCallType('ring');
        break;
      case 'hangup_call':
        setTimeout(() => {
          setOpenModal(false);
          setCallType('ring');
        }, 0);
        break;
      case 'answered_call':
        setOpenModal(true);
        setCallType('answer');
        break;
      default:
        break;
    }
  });

  useEffect(() => {
    if (openModal) {
      getTranferInfo.run({});
    }
  }, [openModal]);

  useEffect(() => {
    socket?.on('reload_user_status', () => {
      if (openModal) {
        getTranferInfo.run({});
      }
    });
  }, [token]);

  const handleSaveForm = (values: customerInfoProps) => {
    addUserContact.run(values);
  };

  const handleFormNote = (note: string) => {
    const data = {
      call_id: dataCall?.call_id,
      phone_number: dataCall?.contact ? dataCall?.contact.phone_number : dataCall?.phone,
      call_direction: dataCall?.direction,
      personnel: initialState?.currentUser?.name ? initialState?.currentUser?.name : 'Chưa có tên',
      content: note,
    };

    sendSaveCallNote.run(data);
  };

  const onClickChangeCall = () => {
    console.log('changeCall');
  };

  return (
    <Space className={className}>
      {/* <HeaderSearch
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
      /> */}
      <div style={{ display: 'flex' }}>
        <WorkingStatus />
      </div>
      <Diapad />
      <NoticeIconView />
      <Avatar />

      <ModalCall
        open={openModal}
        callType={callType}
        callRedirect={callRedirect}
        customerInfo={customerInfo}
        notes={listNotes}
        avatar={`${api.UMI_API_BASE_URL}/user-service/api/settings/get_user_avatar_by_email?email=${dataCall?.image}`}
        listTransfer={dataTranfers}
        handleUserTransfer={handleUserTransfer}
        handleSaveForm={handleSaveForm}
        handleFormNote={handleFormNote}
        onClickChangeCall={onClickChangeCall}
      />
    </Space>
  );
};
export default GlobalHeaderRight;
