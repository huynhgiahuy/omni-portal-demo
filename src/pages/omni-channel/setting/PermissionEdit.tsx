import React, { useEffect, useState } from 'react';
import {
  Table,
  Space,
  Modal,
  Spin,
  Avatar,
  Typography,
  Form,
  Input,
  Button,
  Select,
  message,
  Tooltip,
  Empty,
} from 'antd';
import {
  EditOutlined,
  DeleteOutlined,
  CloseCircleFilled,
  SaveOutlined,
  CloseOutlined,
  CheckOutlined,
  UserOutlined,
  SearchOutlined,
  CheckCircleFilled,
  ClockCircleFilled,
  MinusCircleFilled,
  RollbackOutlined,
} from '@ant-design/icons';
import {
  requestDeleteUserPermission,
  requestGroupPermissionData,
  requestTeamPermissionData,
  requestDeleteTeamPermission,
  requestAllUserInfoFinal,
  requestDetailUserInfoFinal,
  requestCreateNewTeam,
  requestUpdateUserInfoFinal,
} from './services';
import styles from '../setting/style.less';
import type { ColumnsType } from 'antd/es/table';
import { OPTIONS_POSITION, OPTIONS_WORK_ADDRESS } from '@/constants';
import { useRequest } from 'umi';
import { debounce } from 'lodash';
import Ellipse from '../../../assets/Ellipse.svg';
import OfflineIcon from '../../../../public/offline.png';
import moment from 'moment';
import NoFoundPage from '@/pages/404';
import { OPTIONS_FILTER_NLV, OPTIONS_FILTER_STATUS } from '@/constants';
import useSubWs from '@/hooks/useSocket';
import api from '@/api';

interface PaginationProps {
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  pageSizeOptions: string[];
}

interface GroupPermission {
  code?: string;
  desc?: string;
  id?: string;
}

interface TeamPermission {
  name: string;
  id: string;
}

interface DataAllUserInfoFinal {
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
  status: any;
  last_update: any;
}

const formItemLayout = {
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

const submitFormLayout = {
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

const PermissionEdit: React.FC = () => {
  const [isView, setIsView] = useState<string>();
  const [isClickUpdatePermission, setClickUpdatePermission] = useState(false);
  const [userKey, setUserKey] = useState<string | any>();
  const [teamKey, setTeamKey] = useState<string | any>();
  const [roleKey, setRoleKey] = useState<string | any>();

  const [listAllUserInfoFinal, setListAllUserInfoFinal] = useState<DataAllUserInfoFinal[]>([]);
  const [listAllUserInfoLengthFinal, setListAllUserInfoLengthFinal] = useState<string | any>();
  const [listEditUserInfoFinal, setListEditUserInfoFinal] = useState<DataAllUserInfoFinal[]>([]);
  const [newTeamValue, setNewTeamValue] = useState<string | any>();
  const [listGroupPermission, setListGroupPermission] = useState<GroupPermission[]>([]);
  const [listTeamPermission, setListTeamPermission] = useState<TeamPermission[]>([]);

  const [clickAddNewTeam, setClickAddNewTeam] = useState(false);
  const [isInfoUpdated, setInfoUpdated] = useState(false);

  const [listValueTeam, setListValueTeam] = useState<string[] | any>();
  const [listValueNLV, setListValueNLV] = useState<string[]>();
  const [listValueNQ, setListValueNQ] = useState<string[] | any>();
  const [listValueStatus, setListValueStatus] = useState<string[] | any>();
  const [valueKeyWord, setValueKeyWord] = useState<string | any>();
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [sortColumn, setSortColumn] = useState<any>({ last_update: 0 });

  const [isTeamFilter, setTeamFilter] = useState(false);
  const [isNLVFilter, setNLVFilter] = useState(false);
  const [isNQFilter, setNQFilter] = useState(false);
  const [isStatusFilter, setStatusFilter] = useState(false);

  const [form] = Form.useForm();
  const [formFilter] = Form.useForm();
  const [formTeam] = Form.useForm();

  const [isGroupPermission, setIsGroupPermission] = useState(false);

  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 5,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '20', '30', '40', '50'],
  });

  const fetchListAllUserInfoFinal = useRequest(
    async () => {
      const res: { success: boolean; length: number; error_code: number } =
        await requestAllUserInfoFinal(
          pagination.pageSize,
          pagination.current,
          valueKeyWord,
          sortColumn,
          listValueTeam,
          listValueNLV,
          listValueNQ,
          listValueStatus,
        );
      if (res.success === false) {
        if (res.error_code === 4030102) {
          setIsView('403');
          return;
        } else if (res.error_code === 4010106) {
          message.error('Không tìm thấy dữ liệu');
          setListAllUserInfoFinal([]);
          setListAllUserInfoLengthFinal(0);
          return;
        } else {
          message.error('Không tìm thấy dữ liệu');
          setListAllUserInfoFinal([]);
          setListAllUserInfoLengthFinal(0);
          return;
        }
      } else {
        setListAllUserInfoLengthFinal(res.length);
      }
      return res;
    },
    {
      onSuccess: (res: any) => {
        if (res) {
          setListAllUserInfoFinal(res);
        }
      },
      manual: true,
    },
  );

  const fetchListAllUserInfoFinalSocket = useRequest(
    async () => {
      const res: { success: boolean; length: number; error_code: number } =
        await requestAllUserInfoFinal(
          pagination.pageSize,
          pagination.current,
          valueKeyWord,
          listValueTeam,
          listValueNLV,
          listValueNQ,
          listValueStatus,
        );
      if (!res.success) {
        if (res.error_code === 4030102) {
          setIsView('403');
          return;
        } else if (res.error_code === 4010106) {
          message.error('Không tìm thấy dữ liệu');
          setListAllUserInfoFinal([]);
          setListAllUserInfoLengthFinal(0);
          return;
        } else {
          message.error('Không tìm thấy dữ liệu');
          setListAllUserInfoFinal([]);
          setListAllUserInfoLengthFinal(0);
          return;
        }
      } else {
        setListAllUserInfoLengthFinal(res.length);
      }
      return res;
    },
    {
      onSuccess: (res: any) => {
        if (res) {
          setListAllUserInfoFinal(res);
        }
      },
      manual: true,
    },
  );

  const fetchGroupPermissionData = async () => {
    const resPer = await requestGroupPermissionData();
    if (resPer.success === true) {
      setListGroupPermission(resPer.data);
      setIsGroupPermission(false);
    } else {
      setIsGroupPermission(true);
    }
  };

  const fetchTeamPermissionData = async () => {
    const resTeam = await requestTeamPermissionData();
    if (resTeam.success === true) {
      setListTeamPermission(resTeam.data);
    }
  };

  useEffect(() => {
    fetchListAllUserInfoFinal.run();
  }, [pagination]);

  useEffect(() => {
    fetchTeamPermissionData();
    fetchGroupPermissionData();
  }, []);

  useSubWs('user_status', (data: { email: string; status: number }) => {
    const index = listAllUserInfoFinal.findIndex((user) => {
      return user.email === data.email;
    });
    if (index > 0) {
      listAllUserInfoFinal[index].status = data.status;
      fetchListAllUserInfoFinalSocket.run();
    }
  });

  const fetchDetaiUserInfoFinal = async (user_id: any) => {
    const resDetail = await requestDetailUserInfoFinal(user_id);
    if (resDetail.success === true) {
      setListEditUserInfoFinal(resDetail.data);
      if (isGroupPermission === true) {
        setListGroupPermission([
          { code: resDetail.data[0].role_code, id: resDetail.data[0].role_id },
        ]);
      }
    }
  };

  const handleDeleteUserPermission = async (user_ids: React.Key[]) => {
    const response_delete = await requestDeleteUserPermission(user_ids);
    if (response_delete.success === true) {
      message.success('Xóa người dùng thành công!');
      fetchListAllUserInfoFinal.run();
      setSelectedRowKeys([]);
    } else if (response_delete.error_code === 4030102) {
      message.error('Bạn không có quyền xóa thông tin này!');
    } else {
      message.error('Xóa người dùng thất bại!');
    }
  };

  const handleDeleteTeamPermission = async (team_id: string) => {
    const resDelTeam = await requestDeleteTeamPermission(team_id);
    if (resDelTeam.success === true) {
      message.success('Xóa team thành công!');
    } else if (resDelTeam.error_code === 4030102) {
      message.error('Bạn không có quyền xóa thông tin này!');
    } else {
      message.error('Xóa team thất bại!');
    }
  };

  const handleCreateNewTeamPermission = async (newTeamValue: string) => {
    const resNewTeam = await requestCreateNewTeam(newTeamValue);
    if (resNewTeam.success === true) {
      message.success('Cập nhật team mới thành công!');
    } else if (resNewTeam.error_code === 4030102) {
      message.error('Bạn không có quyền cập nhật thông tin!');
    } else {
      message.error('Cập nhật team thất bại!');
    }
  };

  const handleSubmitNewTeam = async (e: any, values: any) => {
    if (arrListTeam.includes(values)) {
      message.error('Team đã tồn tại!');
    } else if (values === undefined || values === '') {
      e.stopPropagation();
      e.preventDefault();
      message.error('Vui lòng nhập Team mới!');
    } else {
      await handleCreateNewTeamPermission(values);
      await fetchTeamPermissionData();
      formTeam.setFieldsValue({ newTeamValue: undefined });
      setNewTeamValue(undefined);
      setClickAddNewTeam(false);
    }
  };

  const handleCallApiUpdateUserInfo = useRequest(
    async (values: DataAllUserInfoFinal) => {
      const resSubmitUpdate: { success: boolean; error_code: number } =
        await requestUpdateUserInfoFinal(
          userKey,
          teamKey,
          roleKey,
          values.title,
          values.phone_number,
          values.ip_phone,
          values.level,
          values.work_address,
        );
      if (resSubmitUpdate.success === true) {
        message.success('Cập nhật thông tin thành công!');
        await fetchListAllUserInfoFinal.run();
        handleCancleUpdatePermission();
      } else if (resSubmitUpdate.error_code === 4030102) {
        message.error('Bạn không có quyền cập nhật thông tin!');
        handleCancleUpdatePermission();
      } else {
        message.error('Cập nhật thông tin thất bại!');
        handleCancleUpdatePermission();
      }
    },
    {
      manual: true,
    },
  );

  const handleSubmitUpdateUserInfoFinal = (values: DataAllUserInfoFinal) => {
    handleCallApiUpdateUserInfo.run(values);
    setInfoUpdated(false);
  };

  const handleClickDeleteTeam = async (e: any, id: string) => {
    await e.stopPropagation();
    await e.preventDefault();
    await handleDeleteTeamPermission(id);
    await fetchTeamPermissionData();
  };

  const handleSelectTeam = (values: any) => {
    setClickAddNewTeam(false);
    setTeamKey(values);
  };

  const handleSelectRole = (values: any) => {
    setRoleKey(values);
  };

  const arrListTeam = listTeamPermission?.map((item) => item.name);

  const handleClickUpdatePermission = () => {
    setClickUpdatePermission(true);
  };
  const handleCancleUpdatePermission = () => {
    setClickUpdatePermission(false);
    form.resetFields();
    setInfoUpdated(false);
  };
  const handleClickDeleteUser = (user_ids: string[]) => {
    Modal.confirm({
      title: 'Thao tác xóa?',
      content: 'Bạn chắc chắn muốn xóa thông tin này',
      okText: 'Xóa',
      onOk() {
        handleDeleteUserPermission(user_ids);
      },
      cancelText: 'Hủy',
      icon: <CloseCircleFilled style={{ color: 'red' }} />,
      okButtonProps: { danger: true },
      centered: true,
    });
  };
  const handleTableChange = (newPagination: any, filters: any, sorters: any) => {
    let last_update = 0;
    if (sorters.order === 'ascend') {
      last_update = 1;
    } else if (sorters.order === 'descend') {
      last_update = -1;
    } else {
      last_update = 0;
    }
    setSortColumn({ last_update });
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const handleRenderStatusActivity = (status: any) => {
    if (status === 1) {
      return (
        <div style={{ border: '1px solid #1eaf61', borderRadius: 4 }}>
          <CheckCircleFilled style={{ color: ' #1eaf61' }} />
          <span className={styles.readyStatusText}>Sẵn sàng</span>
        </div>
      );
    } else if (status === 2) {
      return (
        <div style={{ border: '1px solid #FAAD14', borderRadius: 4 }}>
          <ClockCircleFilled style={{ color: ' #FAAD14' }} />
          <span className={styles.abscentStatusText}>Vắng mặt</span>
        </div>
      );
    } else if (status === 3) {
      return (
        <div style={{ border: '1px solid #F5222D', borderRadius: 4 }}>
          <MinusCircleFilled style={{ color: '#F5222D' }} />
          <span className={styles.notDisturbStatusText}>Không làm phiền</span>
        </div>
      );
    } else if (status === 4) {
      return (
        <div className={styles.noActivityStatusDisplay}>
          <img src={Ellipse} alt="..." width={14} height={14} />
          <div className={styles.noActivityStatusText}>Không hoạt động</div>
        </div>
      );
    } else if (status === 5) {
      return (
        <div className={styles.offlineStatusDisplay}>
          <img src={OfflineIcon} width={14} height={14} style={{ marginTop: 3 }} />
          <div className={styles.offlineStatusText}>Đang offline</div>
        </div>
      );
    }
    return;
  };

  const columns: ColumnsType<DataAllUserInfoFinal> = [
    {
      title: '#',
      align: 'center',
      width: '30px',
      render: (text, record, index) => {
        if (valueKeyWord === '' || valueKeyWord === undefined) {
          return (
            <>
              {(pagination.current - 1) * pagination.pageSize +
                listAllUserInfoFinal.indexOf(record) +
                1}
            </>
          );
        } else {
          return index + 1;
        }
      },
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '250px',
      render: (text, record) => {
        if (record.avatar !== null) {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <Avatar
                  src={`${api.UMI_API_BASE_URL}/user-service/api/user/get_user_avatar?file_name=${record?.avatar}`}
                  size="large"
                  className={styles.avatarImg}
                />
              </div>
              <div style={{ flex: 3, textAlign: 'left' }}>
                <Typography.Text>{record.name}</Typography.Text>
                <br></br>
                <Typography.Text
                  className={styles.emailPermissionTable}
                  style={{ textAlign: 'center', alignItems: 'center' }}
                >
                  {record.email}
                </Typography.Text>
              </div>
            </div>
          );
        } else {
          return (
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <div style={{ flex: 1 }}>
                <Avatar size="large" icon={<UserOutlined />} className={styles.avatarImg} />
              </div>
              <div style={{ flex: 3, textAlign: 'left' }}>
                <Typography.Text>{record.name}</Typography.Text>
                <br></br>
                <Typography.Text
                  className={styles.emailPermissionTable}
                  style={{ textAlign: 'center', alignItems: 'center' }}
                >
                  {record.email}
                </Typography.Text>
              </div>
            </div>
          );
        }
      },
    },
    {
      title: 'Số IPP',
      dataIndex: 'ip_phone',
      key: 'ip_phone',
      width: '70px',
      align: 'center',
      render: (text, record) => {
        return text === null || text === undefined ? '-' : text;
      },
    },
    {
      title: 'Team',
      dataIndex: 'team_name',
      key: 'team_name',
      width: '100px',
      align: 'center',
      render: (text, record) => {
        return text === null || text === undefined ? '-' : text;
      },
    },
    {
      title: 'Nơi làm việc',
      dataIndex: 'work_address',
      key: 'work_address',
      align: 'center',
      width: '100px',
      render: (text, record) => {
        return text === 'mn' ? 'Miền Nam' : text === 'mb' ? 'Miền Bắc' : '-';
      },
    },
    {
      title: 'Nhóm quyền',
      dataIndex: 'role_code',
      key: 'role_code',
      align: 'center',
      width: '100px',
      render: (text, record) => {
        return text === null || text === undefined ? '-' : text;
      },
    },
    {
      title: 'Cập nhật lần cuối',
      dataIndex: 'last_update',
      key: 'last_update',
      align: 'center',
      width: '110px',
      render: (text, record) => {
        return text === null || text === undefined
          ? '-'
          : moment.unix(text).format('DD-MM-YYYY HH:mm:ss');
      },
      sorter: true,
    },
    {
      title: 'Trạng thái hoạt động',
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      width: '110px',
      render: (text, record) => {
        return text === null || text === undefined
          ? '-'
          : handleRenderStatusActivity(record.status);
      },
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: '100px',
      render: (record) => (
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
    },
  ];
  const onReset = (e: any) => {
    if (
      listValueTeam === undefined &&
      listValueNLV === undefined &&
      listValueNQ === undefined &&
      listValueStatus === undefined &&
      valueKeyWord === undefined
    ) {
      e.stopPropagation();
      e.preventDefault();
    } else {
      formFilter.resetFields();
      setTeamFilter(false);
      setNLVFilter(false);
      setNQFilter(false);
      setStatusFilter(false);
      setListValueTeam(undefined);
      setListValueNLV(undefined);
      setListValueNQ(undefined);
      setListValueStatus(undefined);
      setValueKeyWord(undefined);
      setPagination({
        ...pagination,
        current: 1,
      });
    }
  };

  const handleSelectValueTeam = (values: any) => {
    if (values.length === 0) {
      setTeamFilter(false);
      setListValueTeam(undefined);
      setPagination({
        ...pagination,
        current: 1,
      });
    } else {
      setTeamFilter(true);
      setListValueTeam(values);
      setPagination({
        ...pagination,
        current: 1,
      });
    }
  };

  const handleSelectValueNLV = (values: any) => {
    if (values.length === 0) {
      setNLVFilter(false);
      setListValueNLV(undefined);
      setPagination({
        ...pagination,
        current: 1,
      });
    } else {
      setNLVFilter(true);
      setListValueNLV([values]);
      setPagination({
        ...pagination,
        current: 1,
      });
    }
  };

  const handleSelectValueNQ = (values: any) => {
    if (values.length === 0) {
      setNQFilter(false);
      setListValueNQ(undefined);
      setPagination({
        ...pagination,
        current: 1,
      });
    } else {
      setNQFilter(true);
      setListValueNQ(values);
      setPagination({
        ...pagination,
        current: 1,
      });
    }
  };

  const handleSelectValueStatus = (values: any) => {
    if (values.length === 0) {
      setStatusFilter(false);
      setListValueStatus(undefined);
      setPagination({
        ...pagination,
        current: 1,
      });
    } else {
      setStatusFilter(true);
      setListValueStatus(values);
      setPagination({
        ...pagination,
        current: 1,
      });
    }
  };

  const onSelectRowChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const handleRowSelection = {
    selectedRowKeys,
    onChange: onSelectRowChange,
  };

  const hasSelected = selectedRowKeys.length > 0;

  const handleConfirmDeleteMultiple = (user_id: React.Key[]) => {
    Modal.confirm({
      title: 'Thao tác xóa?',
      content: 'Bạn chắc chắn muốn xóa thông tin này',
      onOk() {
        handleDeleteUserPermission(user_id);
      },
      okText: 'Xóa',
      cancelText: 'Hủy',
      icon: <CloseCircleFilled style={{ color: 'red' }} />,
      okButtonProps: { danger: true },
      centered: true,
    });
  };

  return isView === '403' ? (
    <NoFoundPage status="403" title="403" subTitle="Bạn không có quyền xem trang này" />
  ) : fetchListAllUserInfoFinal.data === undefined ? (
    <></>
  ) : (
    <>
      <Form className={styles.filterFormPermissionEdit} layout="vertical" form={formFilter}>
        <div>
          <div className={styles.filterFormPermissionEditDisplay}>
            <div style={{ width: 217 }}>
              <Form.Item
                label={
                  <Typography.Text className={isTeamFilter ? `${styles.filterFieldActive}` : ''}>
                    Team
                  </Typography.Text>
                }
                name="team_id"
                style={{ marginBottom: 'unset' }}
              >
                <Select
                  onChange={handleSelectValueTeam}
                  mode="multiple"
                  placeholder="Tất cả"
                  maxTagCount="responsive"
                >
                  {listTeamPermission &&
                    listTeamPermission.map((item: TeamPermission) => (
                      <Select.Option value={item.name} key={item.id}>
                        {item.name}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
            <div style={{ width: 217 }}>
              <Form.Item
                label={
                  <Typography.Text className={isNLVFilter ? `${styles.filterFieldActive}` : ''}>
                    Nơi làm việc
                  </Typography.Text>
                }
                name="work_address"
                style={{ marginBottom: 'unset' }}
              >
                <Select
                  onChange={handleSelectValueNLV}
                  placeholder="Tất cả"
                  options={OPTIONS_FILTER_NLV}
                />
              </Form.Item>
            </div>
            <div style={{ width: 217 }}>
              <Form.Item
                label={
                  <Typography.Text className={isNQFilter ? `${styles.filterFieldActive}` : ''}>
                    Nhóm quyền
                  </Typography.Text>
                }
                name="role_id"
                style={{ marginBottom: 'unset' }}
              >
                <Select
                  onChange={handleSelectValueNQ}
                  mode="multiple"
                  placeholder="Tất cả"
                  maxTagCount="responsive"
                >
                  {listGroupPermission &&
                    listGroupPermission.map((item: GroupPermission) => (
                      <Select.Option value={item.code} key={item.id}>
                        {item.code}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
            </div>
            <div style={{ width: 217 }}>
              <Form.Item
                label={
                  <Typography.Text className={isStatusFilter ? `${styles.filterFieldActive}` : ''}>
                    Trạng thái hoạt động
                  </Typography.Text>
                }
                name="status"
                style={{ marginBottom: 'unset' }}
              >
                <Select
                  onChange={handleSelectValueStatus}
                  mode="multiple"
                  placeholder="Tất cả"
                  maxTagCount="responsive"
                  options={OPTIONS_FILTER_STATUS}
                />
              </Form.Item>
            </div>
            <div style={{ paddingTop: '29px' }}>
              <Form.Item style={{ marginBottom: 'unset' }} label="">
                <Button type="link" style={{ color: 'blue' }} onClick={(e) => onReset(e)}>
                  Reset
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '29px' }}>
          <Form.Item name="search_name">
            <Input
              style={{ width: 217 }}
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm tên người dùng"
              allowClear
              onChange={debounce(
                (e) => {
                  const { value } = e.target;
                  if (value === '') {
                    setValueKeyWord(undefined);
                    fetchListAllUserInfoFinal.run();
                  } else {
                    setValueKeyWord(value);
                    setPagination({
                      ...pagination,
                      current: 1,
                    });
                  }
                },
                500,
                {
                  trailing: true,
                  leading: false,
                },
              )}
            />
          </Form.Item>
        </div>
      </Form>
      {hasSelected ? (
        <div className={styles.selectedRowLayout}>
          <Typography.Text style={{ paddingRight: 32 }}>
            Đã chọn:{' '}
            <Typography.Text style={{ fontWeight: 'bold' }}>
              {selectedRowKeys.length}
            </Typography.Text>
          </Typography.Text>
          <Space>
            <Button icon={<RollbackOutlined />} onClick={() => setSelectedRowKeys([])}>
              Hủy
            </Button>
            <Button
              icon={<DeleteOutlined style={{ color: '#F5222D' }} />}
              style={{ color: '#F5222D' }}
              onClick={() => handleConfirmDeleteMultiple(selectedRowKeys)}
            >
              Xóa
            </Button>
          </Space>
        </div>
      ) : (
        <></>
      )}
      <Table
        dataSource={listAllUserInfoFinal}
        columns={columns}
        rowKey={(item) => item.id}
        className={styles.permissionTable}
        onChange={handleTableChange}
        pagination={{
          ...pagination,
          total: listAllUserInfoLengthFinal,
          locale: {
            items_per_page: '/ Trang',
            jump_to: 'Đến trang',
            page: '',
            next_page: 'Trang sau',
            prev_page: 'Trang trước',
            next_3: '3 trang sau',
            next_5: '5 trang sau',
            prev_3: '3 trang trước',
            prev_5: '5 trang trước',
          },
        }}
        locale={{
          triggerDesc: 'Chọn sắp xếp giảm dần',
          triggerAsc: 'Chọn sắp xếp tăng dần',
          cancelSort: 'Chọn hủy sắp xếp',
          emptyText: (
            <>
              <Empty description={false} />
              <p>Không có dữ liệu</p>
            </>
          ),
        }}
        scroll={{
          x: window.innerWidth < 1900 ? 100 : undefined,
        }}
        loading={{
          indicator: <Spin />,
          spinning: fetchListAllUserInfoFinal.loading,
        }}
        rowSelection={handleRowSelection}
      />
      <Modal
        open={isClickUpdatePermission}
        onCancel={handleCancleUpdatePermission}
        title={listEditUserInfoFinal[0]?.name}
        footer={false}
        width={900}
        centered
        className={styles.editModalFormUser}
      >
        <Form
          {...formItemLayout}
          form={form}
          layout="vertical"
          onFinish={handleSubmitUpdateUserInfoFinal}
          requiredMark={false}
          onValuesChange={() => {
            form.validateFields().catch((error) => {
              setInfoUpdated(false);
              if (
                error.errorFields.length === 0 &&
                (error.values.team_id !== listEditUserInfoFinal[0].team_id ||
                  error.values.role_id !== listEditUserInfoFinal[0].role_id ||
                  error.values.phone_number !== listEditUserInfoFinal[0].phone_number ||
                  error.values.ip_phone !== listEditUserInfoFinal[0].ip_phone ||
                  error.values.level !== listEditUserInfoFinal[0].level ||
                  error.values.work_address !== listEditUserInfoFinal[0].work_address ||
                  error.values.title !== listEditUserInfoFinal[0].title)
              ) {
                setInfoUpdated(true);
              }
            });
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <Form.Item label="Tên người dùng" name="name">
                <Input disabled style={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.7)' }} />
              </Form.Item>
              <Form.Item label="Phòng ban" name="department">
                <Input disabled style={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.7)' }} />
              </Form.Item>
              <Form.Item
                label={
                  <Typography.Text>
                    IP Phone <span style={{ color: 'red' }}>(*)</span>
                  </Typography.Text>
                }
                name="ip_phone"
                rules={[
                  {
                    validator: (_, value: any) => {
                      const numberReg = /^[0-9]{4,7}$/;
                      if (value === undefined || !value || value.length === 0) {
                        return Promise.reject('Vui lòng nhập IP Phone');
                      } else if (value.length < 4 && numberReg.test(value) === true) {
                        return Promise.reject('IP Phone không hợp lệ');
                      } else if (!numberReg.test(value)) {
                        return Promise.reject('IP Phone không hợp lệ');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <Typography.Text>
                    Số di động <span style={{ color: 'red' }}>(*)</span>
                  </Typography.Text>
                }
                name="phone_number"
                rules={[
                  {
                    validator: (_, value: any) => {
                      const phoneReg = /((0[3|5|7|8|9])+([0-9]{8,9})\b)/;
                      if (value === undefined || !value || value.length === 0) {
                        return Promise.reject('Vui lòng nhập Số di động');
                      } else if (value.length < 10 || value.length > 11) {
                        return Promise.reject('Số di động không hợp lệ');
                      } else if (!phoneReg.test(value)) {
                        return Promise.reject('Số di động không hợp lệ');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label={
                  <Typography.Text>
                    Cấp độ <span style={{ color: 'red' }}>(*)</span>
                  </Typography.Text>
                }
                name="level"
                rules={[
                  {
                    validator: (_, value: any) => {
                      const levelReg = /[a-zA-Z0-9]+$/;
                      if (value === undefined || !value || value.length === 0) {
                        return Promise.reject('Vui lòng nhập Cấp độ');
                      } else if (!levelReg.test(value)) {
                        return Promise.reject('Cấp độ không hợp lệ');
                      }
                      return Promise.resolve();
                    },
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item label="Email" name="email">
                <Input disabled style={{ fontWeight: 'bold', color: 'rgba(0,0,0,0.7)' }} />
              </Form.Item>
              <Form.Item
                label={
                  <Typography.Text>
                    Nhóm quyền <span style={{ color: 'red' }}>(*)</span>
                  </Typography.Text>
                }
                name="role_id"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập Nhóm quyền',
                  },
                ]}
              >
                <Select onChange={handleSelectRole} menuItemSelectedIcon={<CheckOutlined />}>
                  {listGroupPermission &&
                    listGroupPermission.map((item: GroupPermission) => (
                      <Select.Option value={item.id} key={item.id}>
                        {item.code}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <Typography.Text>
                    Chức danh <span style={{ color: 'red' }}>(*)</span>
                  </Typography.Text>
                }
                name="title"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập Chức danh',
                  },
                ]}
              >
                <Select options={OPTIONS_POSITION} menuItemSelectedIcon={<CheckOutlined />} />
              </Form.Item>
              <Form.Item
                label={
                  <Typography.Text>
                    Team <span style={{ color: 'red' }}>(*)</span>
                  </Typography.Text>
                }
                name="team_id"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập Team',
                  },
                ]}
              >
                <Select
                  onChange={handleSelectTeam}
                  dropdownRender={(menu) => (
                    <>
                      {menu}
                      <div className={styles.addNewTeamText}>
                        <hr></hr>
                        {clickAddNewTeam === false ? (
                          <Button
                            className={styles.addNewTeamBtn}
                            type="text"
                            onClick={() => setClickAddNewTeam(true)}
                          >
                            Chỉnh sửa / Thêm team mới
                          </Button>
                        ) : (
                          <Form form={formTeam}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                              <div style={{ flex: 1 }}>
                                <Form.Item name="newTeamValue" style={{ marginBottom: 'unset' }}>
                                  <Input
                                    allowClear
                                    placeholder="Nhập team mới tại đây"
                                    className={styles.addNewTeamPlaceholder}
                                    onChange={(e) => setNewTeamValue(e.target.value)}
                                  />
                                </Form.Item>
                              </div>
                              <div>
                                <Form.Item style={{ marginBottom: 'unset' }}>
                                  <Space>
                                    <SaveOutlined
                                      style={{ marginLeft: 10, fontSize: 14 }}
                                      onClick={(e) => handleSubmitNewTeam(e, newTeamValue)}
                                    />
                                    <CloseOutlined
                                      style={{ fontSize: 14 }}
                                      onClick={() => setClickAddNewTeam(false)}
                                    />
                                  </Space>
                                </Form.Item>
                              </div>
                            </div>
                          </Form>
                        )}
                      </div>
                    </>
                  )}
                  onDropdownVisibleChange={(open) => {
                    if (open === false) {
                      setClickAddNewTeam(false);
                    }
                    return;
                  }}
                >
                  {listTeamPermission &&
                    listTeamPermission.map((item: TeamPermission) => (
                      <Select.Option value={item.id} key={item.id}>
                        <div className={styles.flexLayout}>
                          <div>{item.name}</div>
                          {clickAddNewTeam === true ? (
                            <DeleteOutlined onClick={(e) => handleClickDeleteTeam(e, item.id)} />
                          ) : (
                            ''
                          )}
                        </div>
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item
                label={
                  <Typography.Text>
                    Nơi làm việc <span style={{ color: 'red' }}>(*)</span>
                  </Typography.Text>
                }
                name="work_address"
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập Nơi làm việc',
                  },
                ]}
              >
                <Select options={OPTIONS_WORK_ADDRESS} menuItemSelectedIcon={<CheckOutlined />} />
              </Form.Item>
            </div>
          </div>
          <Form.Item {...submitFormLayout} style={{ marginBottom: 'unset' }}>
            <Button
              style={{ marginRight: '10px' }}
              onClick={handleCancleUpdatePermission}
              disabled={handleCallApiUpdateUserInfo.loading}
            >
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={handleCallApiUpdateUserInfo.loading}
              disabled={isInfoUpdated ? false : true}
            >
              Cập nhật
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PermissionEdit;
