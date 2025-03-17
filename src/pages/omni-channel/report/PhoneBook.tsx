import {
  Button,
  Form,
  Input,
  message,
  Modal,
  Segmented,
  Select,
  Space,
  Spin,
  Table,
  TableProps,
  Typography,
  Empty,
  Tooltip,
} from 'antd';
import { debounce } from 'lodash';
import React, { useState } from 'react';
import { useModel, useRequest } from 'umi';

import NoFoundPage from '@/pages/404';
import {
  CloseCircleFilled,
  CloseOutlined,
  DeleteOutlined,
  PlusSquareFilled,
  RollbackOutlined,
  SaveOutlined,
  SearchOutlined,
  StarFilled,
  StarOutlined,
} from '@ant-design/icons';

import styles from '../report/style.less';
import {
  requestCreateNewTeam,
  requestDeleteTeamPermission,
  requestTeamPermissionData,
} from '../setting/services';
import {
  dataUserContactProps,
  requestAddUserContact,
  requestCheckPhoneContact,
  requestDeleteUserContact,
  requestGetUserContact,
  requestSendPinUser,
  requestUpdateUserContact,
} from './services';

import type { ColumnsType } from 'antd/es/table';
interface TeamPermission {
  name: string;
  id: string;
}

interface PaginationProps {
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  pageSizeOptions: string[];
}

const listUnitExternal = [
  {
    label: 'NOC',
    value: 'NOC',
  },
  {
    label: 'IDC',
    value: 'IDC',
  },
  {
    label: 'PMB',
    value: 'PMB',
  },
  {
    label: 'FPL',
    value: 'FPL',
  },
  {
    label: 'CSOC',
    value: 'CSOC',
  },
  {
    label: 'ISC',
    value: 'ISC',
  },
  {
    label: 'CADS',
    value: 'CADS',
  },
  {
    label: 'FSS',
    value: 'FSS',
  },
  {
    label: 'CS',
    value: 'CS',
  },
  {
    label: 'CC',
    value: 'CC',
  },
  {
    label: 'TIN/PNC',
    value: 'TIN/PNC',
  },
  {
    label: 'FOXPAY',
    value: 'FOXPAY',
  },
  {
    label: 'INF',
    value: 'INF',
  },
  {
    label: 'HiFPT',
    value: 'HiFPT',
  },
  {
    label: 'FTI',
    value: 'FTI',
  },
  {
    label: 'FTQ',
    value: 'FTQ',
  },
  {
    label: 'Khác',
    value: 'OTHER',
  },
];

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

type validateFieldsProps = {
  errorFields: { errors: string[]; name: string[] }[];
  values: dataUserContactProps;
};

const PhoneBook: React.FC = () => {
  const { initialState } = useModel('@@initialState');
  const [form] = Form.useForm();
  const [formTeam] = Form.useForm();

  const [external, setExternal] = useState('Khách hàng');
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDisable, setIsDisable] = useState(false);
  const [dataContacts, setDataContacts] = useState<dataUserContactProps[]>([]);
  const [initialUserContact, setInitialUserContact] = useState<dataUserContactProps>();
  const [clickAddNewTeam, setClickAddNewTeam] = useState(false);
  const [newTeamValue, setNewTeamValue] = useState<string | any>();
  const [contactLength, setContactLength] = useState(1);
  const [listTeamPermission, setListTeamPermission] = useState<TeamPermission[]>([]);
  const [isView, setIsView] = useState('');

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleConfirmDeleteMultiple = () => {
    Modal.confirm({
      title: 'Thao tác xóa',
      content: 'Bạn có chắc chắn muốn xóa thông tin này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      icon: <CloseCircleFilled style={{ color: 'red' }} />,
      okButtonProps: { danger: true },
      centered: true,
      onOk() {
        {
          deleteUserContact.run(selectedRowKeys);
        }
      },
    });
  };

  const token = window.localStorage?.getItem('access_token');

  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '20', '30', '50'],
  });

  const handleTableChange: TableProps<dataUserContactProps>['onChange'] = (
    newPagination: any,
    filters: any,
    sorter: any,
    extra,
  ) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
    getUserContact.run({
      email_user: initialState?.currentUser?.email,
      page_number: newPagination.current,
      number: newPagination.pageSize,
      external_customers: external === 'Khách hàng' ? true : false,
    });
  };

  const getUserContactCheckRole = useRequest(
    async (data) => {
      const res: { success: boolean; error_code: number; length: number } =
        await requestGetUserContact(
          token ? token : '',
          data
            ? data
            : {
              email_user: initialState?.currentUser?.email,
              page_number: pagination.current,
              number: pagination.pageSize,
              external_customers: external === 'Khách hàng' ? true : false,
            },
        );
      if (!res.success) {
        if (res.error_code === 4030102) {
          setIsView('403');
          return;
        }
      }
      setContactLength(res.length);
      return res;
    },
    {
      onSuccess: (res) => {
        if (res) {
          setDataContacts(res);
        }
      },
    },
  );

  const getUserContact = useRequest(
    async (data) => {
      const res: { success: boolean; error_code: number; length: number } =
        await requestGetUserContact(
          token ? token : '',
          data
            ? data
            : {
              email_user: initialState?.currentUser?.email,
              page_number: pagination.current,
              number: pagination.pageSize,
              external_customers: external === 'Khách hàng' ? true : false,
            },
        );
      if (!res.success) {
        if (res.error_code === 4030102) {
          setIsView('403');
          return;
        }
      }
      setContactLength(res.length);
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

  const addUserContact = useRequest(
    async (data) => {
      const result: { success: boolean; error_code: number } = await requestAddUserContact(
        token ? token : '',
        data,
      );
      if (!result.success) {
        if (result.error_code === 4030102) {
          message.error('Bạn không có quyền thêm');
          return;
        } else {
          message.error('Thêm thất bại');
          return;
        }
      } else {
        message.success('Thêm thành công');
        getUserContact.run({
          email_user: initialState?.currentUser?.email,
          page_number: pagination.current,
          number: pagination.pageSize,
          external_customers: external === 'Khách hàng' ? true : false,
        });
        handleCancleModal();
      }
    },
    {
      manual: true,
    },
  );

  const updateUserContact = useRequest(
    async (data) => {
      const res: { success: boolean; error_code: number } = await requestUpdateUserContact(
        token ? token : '',
        data,
      );
      if (!res.success) {
        if (res.error_code === 4030102) {
          message.error('Bạn không có quyền cập nhập');
          return;
        } else {
          message.error('Cập nhập thất bại');
          return;
        }
      } else {
        message.success('Cập nhập thành công');
        getUserContact.run({
          email_user: initialState?.currentUser?.email,
          page_number: pagination.current,
          number: pagination.pageSize,
          external_customers: external === 'Khách hàng' ? true : false,
        });
        handleCancleModal();
      }
      return res;
    },
    {
      manual: true,
    },
  );

  const deleteUserContact = useRequest(
    async (id: React.Key[]) => {
      const res: { success: boolean; error_code: number } = await requestDeleteUserContact(
        token ? token : '',
        id,
      );
      if (!res.success) {
        if (res.error_code === 4030102) {
          message.error('Bạn không có quyền xoá');
          return;
        } else {
          message.error('Xoá thất bại');
          return;
        }
      } else {
        message.success('Xoá thành công');
        getUserContact.run({
          email_user: initialState?.currentUser?.email,
          page_number: pagination.current,
          number: pagination.pageSize,
          external_customers: external === 'Khách hàng' ? true : false,
        });
        handleCancleModal();
        setSelectedRowKeys([]);
      }
      return res;
    },
    {
      manual: true,
    },
  );

  const sendPinStart = useRequest(
    async (data) => {
      const res: { success: boolean } = await requestSendPinUser(token ? token : '', data);
      if (!res.success) {
        message.error('Lưu thất bại');
        return;
      } else {
        message.success('Lưu thành công');
        getUserContact.run({
          email_user: initialState?.currentUser?.email,
          page_number: pagination.current,
          number: pagination.pageSize,
          external_customers: external === 'Khách hàng' ? true : false,
        });
      }
      return res;
    },
    {
      manual: true,
    },
  );

  const getListTeam = useRequest(requestTeamPermissionData, {
    onSuccess: (res) => {
      if (res) {
        setListTeamPermission(res);
      }
    },
  });

  const checkPhoneContact = useRequest(
    async (data) => {
      const result: { success: boolean; error_code: number } = await requestCheckPhoneContact(
        token ? token : '',
        data,
      );
      if (result.error_code === 4000201) {
        form.setFields([
          {
            name: 'phone_number',
            errors: ['Số điện thoại đã tồn tại'],
          },
        ]);
        return;
      }
    },
    {
      manual: true,
    },
  );

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCancleModal = () => {
    setIsEdit(false);
    setOpenModal(false);
  };

  const handleOnFinish = (values: dataUserContactProps) => {
    if (isEdit) {
      values.contacts_id = form.getFieldValue('id');
      values.external_customers = external === 'Khách hàng' ? true : false;
      values.pin_user = initialUserContact?.pin_user ? initialUserContact?.pin_user : false;
      updateUserContact.run(values);
    } else {
      values.external_customers = external === 'Khách hàng' ? true : false;
      addUserContact.run(values);
    }
  };

  const handleConfirmDelete = (role_ids: React.Key[]) => {
    Modal.confirm({
      title: 'Thao tác xoá',
      content: 'Bạn có chắc chắn muốn xoá thông tin này?',
      okText: 'Xoá',
      okType: 'danger',
      centered: true,
      okButtonProps: {
        type: 'primary',
      },
      icon: <CloseCircleFilled style={{ color: 'red', fontSize: 22 }} />,
      onOk() {
        {
          deleteUserContact.run(role_ids);
        }
      },

      cancelText: 'Hủy',
    });
  };

  const columnsDanhba: ColumnsType<dataUserContactProps> = [
    {
      title: '',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      width: '10px',
      render: (text, record) => (
        <>
          {record.pin_user ? (
            <Tooltip title="Bỏ bookmark">
              <StarFilled
                style={{ color: '#FFC700', fontSize: 20 }}
                onClick={() => {
                  const data = {
                    contacts_id: record.id,
                    pin_user: false,
                    email_user: initialState?.currentUser?.email,
                  };
                  sendPinStart.run(data);
                }}
              />
            </Tooltip>
          ) : (
            <Tooltip title="Chọn bookmark">
              <StarOutlined
                style={{ fontSize: 20 }}
                onClick={() => {
                  const data = {
                    contacts_id: record.id,
                    pin_user: true,
                    email_user: initialState?.currentUser?.email,
                  };
                  sendPinStart.run(data);
                }}
              />
            </Tooltip>
          )}
        </>
      ),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'full_name',
      key: 'full_name',
      align: 'center',
      width: '250px',
      render: (text, record) => {
        return text === null || text === undefined || text === '' ? (
          '-'
        ) : (
          <Typography.Text
            style={{ cursor: 'pointer', color: '#45911F', fontWeight: 600 }}
            onClick={() => {
              handleOpenModal();
              setIsEdit(true);
              setIsDisable(true);
              form.setFieldsValue(record);
              setInitialUserContact(record);
            }}
          >
            {text}
          </Typography.Text>
        );
      },
    },
    {
      title: 'Số di động',
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
      width: '270px',
      render: (text, record) => {
        return text === null || text === undefined || text === '' ? '-' : text;
      },
    },
    {
      title: external === 'Khách hàng' ? 'Đơn vị' : 'Team',
      dataIndex: external === 'Khách hàng' ? 'work_unit' : 'team',
      key: external === 'Khách hàng' ? 'work_unit' : 'team',
      align: 'center',
      width: '265px',
      render: (text, record) => {
        if (external === 'Khách hàng') {
          return text === 'OTHER' ? 'Khác' : text;
        } else {
          const team = listTeamPermission.filter((team) => team.id === text)[0]?.name;
          return team;
        }
      },
    },
    {
      title: 'Số IPP',
      dataIndex: 'ip_phone',
      key: 'ip_phone',
      align: 'center',
      width: '235px',
      render: (text, record) => {
        return text === null || text === undefined || text === '' ? '-' : text;
      },
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: '340px',
      render: (text, record) => {
        return text === null || text === undefined || text === '' ? '-' : text;
      },
    },
    {
      title: 'Thao tác',
      dataIndex: '',
      key: '',
      align: 'center',
      width: '100px',
      render: (text, record) => {
        return (
          <Space size="middle">
            {/* <div style={{ cursor: 'pointer' }}>
              <Image className={styles.call} width={30} src={Phone} preview={false} />
            </div> */}
            <Tooltip title="Xóa">
              <DeleteOutlined
                style={{ fontSize: '20px' }}
                className={hasSelected ? styles.disableDelete : styles.enableDelete}
                onClick={() => {
                  if (hasSelected) return;
                  record.id && handleConfirmDelete([record.id]);
                }}
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const handleSelectTeam = (values: any) => {
    setClickAddNewTeam(false);
  };

  const fetchTeamPermissionData = async () => {
    const resTeam = await requestTeamPermissionData();
    if (resTeam.success === true) {
      setListTeamPermission(resTeam.data);
    }
  };

  const handleCreateNewTeamPermission = async (newTeamValue: string) => {
    const resNewTeam = await requestCreateNewTeam(newTeamValue);
    if (resNewTeam.success === true) {
      message.success('Thêm thành công');
      setClickAddNewTeam(false);
      getListTeam.run();
      form.setFieldValue('newTeamValue', '');
    } else {
      message.error('Thêm thất bại');
      return;
    }
  };

  const handleDeleteTeamPermission = async (team_id: string) => {
    const resDelTeam = await requestDeleteTeamPermission(team_id);
    if (resDelTeam.success === true) {
      message.success('Xoá thành công');
      form.setFieldValue('newTeamValue', '');
      setNewTeamValue('');
      setClickAddNewTeam(false);
      form.setFieldValue('team', '');
      getListTeam.run();
    } else {
      message.error('Xoá thất bại');
      return;
    }
  };

  const handleClickDeleteTeam = (e: any, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    handleDeleteTeamPermission(id);
    fetchTeamPermissionData();
  };

  const arrListTeam = listTeamPermission?.map((item) => item.name);

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

  return isView === '403' ? (
    <NoFoundPage status="403" title="403" subTitle="Bạn không có quyền xem trang này" />
  ) : getUserContactCheckRole.loading ? (
    <div />
  ) : (
    <>
      <div style={{ marginTop: '20px' }}>
        <Segmented
          size="middle"
          value={external}
          onChange={(e) => {
            setExternal(e.toString());
            form.resetFields();
            getUserContact.run({
              email_user: initialState?.currentUser?.email,
              page_number: pagination.current,
              number: pagination.pageSize,
              external_customers: e.toString() === 'Khách hàng' ? true : false,
            });
            setSelectedRowKeys([]);
          }}
          options={[
            {
              label: 'Khách hàng',
              value: 'Khách hàng',
            },
            {
              label: 'Nội bộ',
              value: 'Nội bộ',
            },
          ]}
          className={styles.antSegmented}
          style={{ backgroundColor: '#e3eaf4', color: 'rgba(0,0,0,1)' }}
        />
      </div>
      <Form layout="vertical" form={form}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <Space size="middle">
            <Form.Item
              label={
                <Typography.Text style={{ color: 'rgba(0,0,0,1)' }}>
                  {external === 'Khách hàng' ? 'Đơn vị' : 'Team'}
                </Typography.Text>
              }
              name={external === 'Khách hàng' ? 'unit' : 'team_unit'}
            >
              <Select
                style={{ width: 250 }}
                placeholder="Tất cả"
                mode="multiple"
                maxTagCount="responsive"
                loading={getListTeam?.loading}
                onChange={debounce(
                  () => {
                    getUserContact.run({
                      keyword: form.getFieldValue('search'),
                      unit: form.getFieldValue('unit'),
                      team: form.getFieldValue('team_unit'),
                      email_user: initialState?.currentUser?.email,
                      page_number: pagination.current,
                      number: pagination.pageSize,
                      external_customers: external === 'Khách hàng' ? true : false,
                    });
                  },
                  500,
                  {
                    trailing: true,
                    leading: false,
                  },
                )}
                options={
                  external === 'Khách hàng'
                    ? listUnitExternal
                    : getListTeam?.data?.map((option: { name: string; id: string }) => ({
                      label: option.name,
                      value: option.name,
                    }))
                }
              />
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                style={{ color: 'blue' }}
                type="link"
                onClick={() => {
                  if (
                    form.getFieldValue('unit') ||
                    form.getFieldValue('team_unit') ||
                    form.getFieldValue('search')
                  ) {
                    getUserContact.run({
                      email_user: initialState?.currentUser?.email,
                      page_number: pagination.current,
                      number: pagination.pageSize,
                      external_customers: external === 'Khách hàng' ? true : false,
                    });
                  }
                  form.resetFields();
                }}
              >
                Reset
              </Button>
            </Form.Item>
          </Space>
          <Space>
            <Form.Item name="search" style={{ marginBottom: 0 }}>
              <Input
                style={{ width: '250px' }}
                prefix={<SearchOutlined />}
                allowClear
                placeholder="Nhập từ khoá"
                onChange={debounce(
                  () => {
                    getUserContact.run({
                      keyword: form.getFieldValue('search'),
                      unit: form.getFieldValue('unit'),
                      email_user: initialState?.currentUser?.email,
                      page_number: pagination.current,
                      number: pagination.pageSize,
                      external_customers: external === 'Khách hàng' ? true : false,
                    });
                  },
                  500,
                  {
                    trailing: true,
                    leading: false,
                  },
                )}
              />
            </Form.Item>
            {external === 'Khách hàng' && (
              <PlusSquareFilled
                style={{ fontSize: 32, color: '#478D46' }}
                onClick={() => {
                  handleOpenModal();
                  setIsEdit(false);
                  form.resetFields();
                }}
              />
            )}
          </Space>
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
            <Button
              icon={<RollbackOutlined />}
              onClick={() => {
                setSelectedRowKeys([]);
              }}
            >
              Hủy
            </Button>
            <Button
              icon={<DeleteOutlined style={{ color: '#F5222D' }} />}
              style={{ color: '#F5222D' }}
              onClick={handleConfirmDeleteMultiple}
            >
              Xóa
            </Button>
          </Space>
        </div>
      ) : (
        <></>
      )}
      <Table
        rowSelection={rowSelection}
        dataSource={dataContacts}
        columns={columnsDanhba}
        className={styles.tableStylePhoneBook}
        onChange={handleTableChange}
        pagination={{
          ...pagination,
          total: contactLength,
          locale: {
            page: '',
            items_per_page: '/ Trang',
            jump_to: 'Đến trang',
            next_page: 'Trang sau',
            prev_page: 'Trang trước',
            next_3: '3 trang sau',
            next_5: '5 trang sau',
            prev_3: '3 trang trước',
            prev_5: '5 trang trước',
          },
        }}
        locale={{
          emptyText: <Empty description="Không có dữ liệu" />,
        }}
        scroll={{ x: 300 }}
        loading={{
          indicator: (
            <div>
              <Spin />
            </div>
          ),
          spinning: getUserContact.loading || sendPinStart.loading,
        }}
        rowKey={(item: any) => item.id}
      />
      <Modal
        open={openModal}
        className={styles.modal}
        onCancel={handleCancleModal}
        title={
          !isEdit && external === 'Khách hàng'
            ? 'Thêm khách hàng'
            : external === 'Khách hàng'
              ? 'Thông tin khách hàng'
              : !isEdit && external === 'Nội bộ'
                ? 'Thêm người dùng'
                : 'Thông tin người dùng'
        }
        footer={false}
        width={620}
        centered
      >
        <Form
          {...formItemLayout}
          form={form}
          onFinish={handleOnFinish}
          layout="vertical"
          onValuesChange={(_changedValues, values: dataUserContactProps) => {
            setIsDisable(false);
            if (isEdit) {
              form.validateFields().catch((error: validateFieldsProps) => {
                setIsDisable(true);
                if (
                  error.errorFields.length === 0 &&
                  (error.values.full_name !== initialUserContact?.full_name ||
                    error.values.phone_number !== initialUserContact?.phone_number ||
                    error.values.ip_phone !== initialUserContact?.ip_phone ||
                    error.values.email !== initialUserContact?.email ||
                    (!!error.values.work_unit &&
                      error.values.work_unit !== initialUserContact?.work_unit) ||
                    (!!error.values.team && error.values.team !== initialUserContact?.team))
                ) {
                  setIsDisable(false);
                }
              });
            }
          }}
        >
          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              Họ và tên{external !== 'Nội bộ' && <span style={{ color: 'red' }}> (*)</span>}
            </Typography.Text>
            <Form.Item
              name="full_name"
              style={{ marginTop: 8 }}
              rules={[
                {
                  whitespace: true,
                  message: 'Vui lòng không để trống thông tin',
                },
                { required: true, message: 'Vui lòng không để trống thông tin' },
                {
                  max: 255,
                  message: 'Vui lòng không nhập quá 255 kí tự',
                },
                {
                  pattern: new RegExp(
                    '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ01234556789 ]+$',
                  ),
                  message: 'Vui lòng không nhập ký tự đặt biệt',
                },
              ]}
            >
              <Input placeholder="Nhập họ và tên" disabled={external === 'Nội bộ'} />
            </Form.Item>
          </div>
          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              Số điện thoại
            </Typography.Text>
            <Form.Item
              name="phone_number"
              style={{ marginTop: 8 }}
              rules={[
                {
                  pattern: /((0[3|5|7|8|9])+([0-9]{8,9})\b)/,
                  message: 'Số điện thoại không hợp lệ',
                },
              ]}
            >
              <Input
                placeholder="Nhập số điện thoại"
                className={styles.inputNumber}
                disabled={external === 'Nội bộ'}
                onBlur={() => {
                  if (form.getFieldValue('phone_number') !== initialUserContact?.phone_number) {
                    checkPhoneContact.run(form.getFieldValue('phone_number'));
                  }
                }}
              />
            </Form.Item>
          </div>

          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              IP phone
            </Typography.Text>
            <Form.Item
              name="ip_phone"
              style={{ marginTop: 8 }}
              rules={[
                {
                  pattern: new RegExp('^[0-9]{4,7}$'),
                  message: 'IP Phone không hợp lệ',
                },
              ]}
            >
              <Input
                disabled={external === 'Nội bộ'}
                className={styles.inputNumber}
                placeholder="Nhập số máy nhánh"
              />
            </Form.Item>
          </div>
          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              Email {external !== 'Nội bộ' && <span style={{ color: 'red' }}> (*)</span>}
            </Typography.Text>
            <Form.Item
              name="email"
              style={{ marginTop: 8 }}
              rules={[
                { required: true, message: 'Vui lòng không để trống thông tin' },
                { type: 'email', message: 'Vui lòng nhập email hợp lệ' },
                {
                  max: 255,
                  message: 'Vui lòng không nhập quá 255 kí tự',
                },
              ]}
            >
              <Input placeholder="Nhập email đơn vị" disabled={external === 'Nội bộ'} />
            </Form.Item>
          </div>
          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              {external === 'Khách hàng' ? 'Đơn vị công tác' : 'Team'}{' '}
              <span style={{ color: 'red' }}>(*)</span>
            </Typography.Text>
            <Form.Item
              name={external === 'Khách hàng' ? 'work_unit' : 'team'}
              style={{ marginTop: 8 }}
              rules={[{ required: true, message: 'Vui lòng không để trống thông tin' }]}
            >
              {external === 'Khách hàng' ? (
                <Select options={listUnitExternal} placeholder="Chọn đơn vị" />
              ) : (
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
              )}
            </Form.Item>
          </div>

          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
            <Button style={{ marginRight: '10px' }} onClick={handleCancleModal}>
              Hủy
            </Button>
            <Button
              type="primary"
              htmlType="submit"
              loading={updateUserContact.loading || addUserContact.loading}
              disabled={isDisable}
            >
              {isEdit ? 'Cập nhập' : 'Tạo mới'}
            </Button>
          </div>
        </Form>
      </Modal>
    </>
  );
};

export default PhoneBook;
