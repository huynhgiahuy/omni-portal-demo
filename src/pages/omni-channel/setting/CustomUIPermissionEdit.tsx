import { Avatar, Space, Tooltip, Typography } from 'antd';
import moment from 'moment';

import api from '@/api';
import {
  CheckCircleFilled,
  ClockCircleFilled,
  DeleteOutlined,
  EditOutlined,
  MinusCircleFilled,
  UserOutlined,
} from '@ant-design/icons';

import Ellipse from '../../../../public/Ellipse.svg';
import OfflineIcon from '../../../../public/offline.png';
import styles from '../setting/style.less';

export interface DataAllUserInfoFinal {
  name: string;
  email: string;
  id: string;
  team_name: string;
  team_id: string;
  role_id: string;
  role_code: string;
  ip_phone: string;
  home_address: string;
  work_address: string;
  department: string;
  level: string;
  title: string;
  phone_number: string;
  avatar: string;
  status: number;
  last_update: string;
}

export interface PaginationProps {
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  pageSizeOptions: string[];
}

export interface GroupPermission {
  code: string;
  desc?: string;
  id: string;
}

export interface TeamPermission {
  name: string;
  id: string;
}

export const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 22,
    },
  },
};

export const submitFormLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
    md: {
      span: 10,
      offset: 10,
    },
  },
};

export const customUI_Stt = {
  parsing: (pagination: any, listAllUserInfoFinal: any) => ({
    render: (text: any, record: DataAllUserInfoFinal) => {
      return (
        <>
          {(pagination.current - 1) * pagination.pageSize +
            listAllUserInfoFinal.indexOf(record) +
            1}
        </>
      );
    },
  }),
};

export const customUI_UserInfo = {
  parsing: () => ({
    render: (text: any, record: DataAllUserInfoFinal) => {
      if (record.avatar !== null) {
        return (
          <div className={styles.userInfoField}>
            <div style={{ flex: 1 }}>
              <Avatar
                src={`${api.UMI_API_BASE_URL}/user-service/api/user/get_user_avatar?file_name=${record?.avatar}`}
                size={50}
                className={styles.avatarImg}
              />
            </div>
            <div style={{ flex: 3, textAlign: 'left' }}>
              <Typography.Text className={styles.userInfoName}>{record.name}</Typography.Text>
              <br></br>
              <Typography.Text className={styles.userInfoEmail}>{record.email}</Typography.Text>
            </div>
          </div>
        );
      } else {
        return (
          <div className={styles.userInfoField}>
            <div style={{ flex: 1 }}>
              <Avatar size={50} icon={<UserOutlined />} className={styles.avatarImg} />
            </div>
            <div style={{ flex: 3, textAlign: 'left' }}>
              <Typography.Text className={styles.userInfoName}>{record.name}</Typography.Text>
              <br></br>
              <Typography.Text className={styles.userInfoEmail}>{record.email}</Typography.Text>
            </div>
          </div>
        );
      }
    },
  }),
};

export const customUI_IpPhone = {
  parsing: () => ({
    render: (text: any, record: DataAllUserInfoFinal) => {
      return text === null || text === undefined || text === '' ? '-' : text;
    },
  }),
};

export const customUI_Team = {
  parsing: () => ({
    render: (text: any, record: DataAllUserInfoFinal) => {
      return text === null || text === undefined ? '-' : text;
    },
  }),
};

export const customUI_WorkAddress = {
  parsing: () => ({
    render: (text: any, record: DataAllUserInfoFinal) => {
      return text === 'mn' ? 'Miền Nam' : text === 'mb' ? 'Miền Bắc' : '-';
    },
  }),
};

export const customUI_RoleCode = {
  parsing: () => ({
    render: (text: any, record: DataAllUserInfoFinal) => {
      return text === null || text === undefined ? '-' : text;
    },
  }),
};

export const customUI_LastUpdate = {
  parsing: () => ({
    render: (text: any, record: DataAllUserInfoFinal) => {
      return text === null || text === undefined
        ? '-'
        : moment.unix(text).format('DD-MM-YYYY HH:mm:ss');
    },
  }),
};

export const customUI_Status = {
  parsing: () => ({
    render: (text: any, record: DataAllUserInfoFinal) => {
      if (record.status === 1) {
        return (
          <div style={{ border: '1px solid #1eaf61', borderRadius: 4 }}>
            <CheckCircleFilled style={{ color: ' #1eaf61' }} />
            <span className={styles.readyStatusText}>Sẵn sàng</span>
          </div>
        );
      } else if (record.status === 2) {
        return (
          <div style={{ border: '1px solid #FAAD14', borderRadius: 4 }}>
            <ClockCircleFilled style={{ color: ' #FAAD14' }} />
            <span className={styles.abscentStatusText}>Vắng mặt</span>
          </div>
        );
      } else if (record.status === 3) {
        return (
          <div style={{ border: '1px solid #F5222D', borderRadius: 4 }}>
            <MinusCircleFilled style={{ color: '#F5222D' }} />
            <span className={styles.notDisturbStatusText}>Không làm phiền</span>
          </div>
        );
      } else if (record.status === 4) {
        return (
          <div className={styles.noActivityStatusDisplay}>
            <img src={Ellipse} alt="..." width={14} height={14} />
            <div className={styles.noActivityStatusText}>Không hoạt động</div>
          </div>
        );
      } else if (record.status === 5) {
        return (
          <div className={styles.offlineStatusDisplay}>
            <img src={OfflineIcon} width={14} height={14} />
            <div className={styles.offlineStatusText}>Đang offline</div>
          </div>
        );
      }
      return;
    },
  }),
};

export const customUI_Action = {
  parsing: (
    form: any,
    hasSelected: boolean,
    handleClickUpdatePermission: () => void,
    fetchDetaiUserInfoFinal: (user_id: string) => void,
    setUserKey: (user_id: string) => void,
    handleClickDeleteUser: (users_id: string[]) => void,
  ) => ({
    render: (text: any, record: DataAllUserInfoFinal) => (
      <Space size="large">
        <Tooltip title="Chỉnh sửa">
          <EditOutlined
            style={{ color: '#1890FF', fontSize: '20px' }}
            onClick={() => {
              form.setFieldsValue(record);
              handleClickUpdatePermission();
              fetchDetaiUserInfoFinal(record.id);
              setUserKey(record.id);
            }}
          />
        </Tooltip>
        <Tooltip title="Xóa">
          <DeleteOutlined
            className={
              hasSelected
                ? `${styles.deleteSingleItemDisabled}`
                : `${styles.deleteSingleItemActive}`
            }
            onClick={() => {
              if (hasSelected) return;
              handleClickDeleteUser([record.id]);
            }}
          />
        </Tooltip>
      </Space>
    ),
  }),
};
