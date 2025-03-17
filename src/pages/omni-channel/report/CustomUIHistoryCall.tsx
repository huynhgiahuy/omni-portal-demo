import { Tooltip, Spin, Tag } from 'antd';
import { PlayCircleFilled, FormOutlined } from '@ant-design/icons';
import moment from 'moment';
import CallInboundIcon from '@/components/PhoneCallType/CallInboundIcon';
import CallInterval from '@/components/PhoneCallType/CallInterval';
import CallOutboundIcon from '@/components/PhoneCallType/CallOutboundIcon';
import DownloadIcon from '../../../../public/cloud_download.svg';
import styles from '../report/style.less';

export interface DataLSCGType {
  uuid: string;
  _id: string;
  call_direction: string;
  sip_from_user: string;
  caller_destination: string;
  start_epoch: number;
  billsec: number;
  hangup_cause: string;
  record_path: string;
  record_name: string;
  note?: any[];
  caller_name: string;
  receiver_name: string;
  result: number;
  transferInfo: [
    {
      receiver_name: string;
      line: number;
      caller_name?: string;
    },
  ];
}

export interface PaginationProps {
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  pageSizeOptions: string[];
}

export interface NotesProps {
  call_direction: string;
  content: string;
  create_at: number;
  personnel: string;
}

export interface ListNotesProps {
  call_id: string;
  id: string;
  note: NotesProps[];
  phone_number: string;
}

export const CustomUI_CallDirection = {
  parsing: () => ({
    render: (_: any, { call_direction }: DataLSCGType) => {
      let newCallDirection;
      if (call_direction === 'inbound') {
        newCallDirection = 'Gọi vào';
        return (
          <>
            <CallInboundIcon /> {newCallDirection}
          </>
        );
      } else if (call_direction === 'outbound') {
        newCallDirection = 'Gọi ra';
        return (
          <>
            <CallOutboundIcon /> {newCallDirection}
          </>
        );
      } else if (call_direction === 'local') {
        newCallDirection = 'Gọi nội bộ';
        return (
          <>
            <CallInterval /> {newCallDirection}
          </>
        );
      } else if (call_direction === undefined || call_direction === null) {
        return '-';
      }
      return;
    },
  }),
};

export const customUI_SipFromUser = {
  parsing: () => ({
    render: (text: any, record: DataLSCGType) => {
      return text === null || text === undefined ? '-' : text;
    },
  }),
};

export const customUI_CallerName = {
  parsing: () => ({
    render: (text: any, record: DataLSCGType) => {
      return text === null || text === undefined ? '-' : text;
    },
  }),
};

export const customUI_CallerDestination = {
  parsing: () => ({
    render: (text: any, record: DataLSCGType) => {
      return text === null || text === undefined ? '-' : text;
    },
  }),
};

export const customUI_ReceiverName = {
  parsing: () => ({
    render: (text: any, record: DataLSCGType) => {
      return text === null || text === undefined ? '-' : text;
    },
  }),
};

export const customUI_StartEpoch = {
  parsing: () => ({
    render: (text: any, record: DataLSCGType) => {
      return text === null || text === undefined
        ? '-'
        : moment.unix(text).format('DD-MM-YYYY HH:mm:ss');
    },
  }),
};

export const customUI_BillSec = {
  parsing: () => ({
    render: (text: any, record: DataLSCGType) => {
      let sec_num: any = parseInt(record.billsec?.toString(), 10);
      let hours: any = Math.floor(sec_num / 3600);
      let minutes: any = Math.floor((sec_num - hours * 3600) / 60);
      let seconds: any = sec_num - hours * 3600 - minutes * 60;

      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (seconds < 10) {
        seconds = '0' + seconds;
      }
      return text === null || text === undefined ? '-' : hours + ' : ' + minutes + ' : ' + seconds;
    },
  }),
};

export const customUI_Result = {
  parsing: () => ({
    render: (text: any, record: DataLSCGType) => {
      let color, newResult;
      if (record.result === 1) {
        color = '#87d068';
        newResult = 'Thành công';
      } else if (record.result === 2) {
        color = '#ff0000';
        newResult = 'Thất bại';
      } else if (record.result === 3) {
        color = '#660000';
        newResult = 'Bận';
      } else if (record.result === 4) {
        color = '#FFAC1C';
        newResult = 'Hủy bỏ';
      } else if (record.result === 5) {
        color = '#b1b1b1';
        newResult = 'Không trả lời';
      } else if (record.result === 6) {
        color = '#FA541C';
        newResult = 'Từ chối';
      } else if (record.result === 7 || record.result === 8) {
        return '-';
      }
      return text === null || text === undefined ? (
        '-'
      ) : (
        <Tag color={color} style={{ fontWeight: 'bold', margin: 'unset' }}>
          {newResult}
        </Tag>
      );
    },
  }),
};

export const customUI_RecordAudio = {
  parsing: (
    recordId: string,
    isDownloadFile: boolean,
    handleOpenModalPlaying: (fieldId: string, recordName: string) => void,
    downloadAudio: (filedId: string, recordName: string) => void,
    setRecordId: (recordId: string) => void,
  ) => ({
    render: (text: any, record: DataLSCGType) => {
      return (
        <>
          {record.billsec === 0 || record.billsec === undefined ? (
            '-'
          ) : (
            <Tooltip title="Nghe ghi âm">
              <PlayCircleFilled
                style={{ color: '#1890ff', marginRight: '5px', fontSize: '25px' }}
                onClick={() => handleOpenModalPlaying(record._id, record.record_name)}
              />
            </Tooltip>
          )}
          {isDownloadFile === true && record.billsec !== 0 && record._id === recordId ? (
            <Spin />
          ) : (isDownloadFile === false && record.billsec === 0) ||
            record.billsec === undefined ||
            (isDownloadFile === true && record.billsec === 0) ||
            record.billsec === undefined ? (
            ''
          ) : (
            <Tooltip title="Tải ghi âm">
              <img
                src={DownloadIcon}
                className={styles.fileDownloadIcon}
                onClick={() => {
                  downloadAudio(record._id, record.record_name);
                  setRecordId(record._id);
                }}
              />
            </Tooltip>
          )}
        </>
      );
    },
  }),
};

export const customUI_Note = {
  parsing: (handleGetDetailCallNote: (callId: string) => void) => ({
    render: (text: any, record: DataLSCGType) => {
      return (
        <Tooltip title="Xem ghi chú">
          <FormOutlined
            style={{ fontSize: 20 }}
            onClick={() => handleGetDetailCallNote(record.uuid)}
          />
        </Tooltip>
      );
    },
  }),
};
