import React, { useState } from 'react';
import {
  Button,
  Input,
  Table,
  Card,
  Segmented,
  Space,
  Image,
  Modal,
  Form,
  Typography,
  message,
  Select,
  Spin,
} from 'antd';
import {
  SearchOutlined,
  StarOutlined,
  PlusSquareFilled,
  StarFilled,
  DeleteOutlined,
  CloseCircleFilled,
  CheckOutlined,
  SaveOutlined,
  CloseOutlined,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import styles from '../report/style.less';
import Phone from '../../../../public/phone.svg';
import {
  dataUserContactProps,
  requestAddUserContact,
  requestDeleteUserContact,
  requestGetUserContact,
  requestUpdateUserContact,
} from './services';
import { useRequest } from 'umi';
import {
  requestCreateNewTeam,
  requestDeleteTeamPermission,
  requestTeamPermissionData,
} from '../setting/services';
import { debounce } from 'lodash';

interface TeamPermission {
  name: string;
  id: string;
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

const PhoneBook: React.FC = () => {
  const [form] = Form.useForm();
  const [external, setExternal] = useState('Khách hàng');
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataContacts, setDataContacts] = useState<dataUserContactProps[]>([]);
  const [clickAddNewTeam, setClickAddNewTeam] = useState(false);
  const [teamKey, setTeamKey] = useState<string | any>();
  const [newTeamValue, setNewTeamValue] = useState<string | any>();
  const [listTeamPermission, setListTeamPermission] = useState<TeamPermission[]>([]);

  const getUserContact = useRequest(
    async (data) => {
      const res: { success: boolean } = await requestGetUserContact(data);
      if (!res.success) {
        message.error('Không lấy được danh bạ');
        return;
      } else {
      }
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

  const dataExternalContacts = dataContacts.filter(
    (user: { external_customers: boolean }) => user.external_customers,
  );

  const dataInternalContacts = dataContacts.filter(
    (user: { external_customers: boolean }) => !user.external_customers,
  );

  const addUserContact = useRequest(
    async (data) => {
      const result: { success: boolean; error: string } = await requestAddUserContact(data);
      if (!result.success) {
        message.error('Thêm thất bại, vui lòng thử lại');
        return;
      } else {
        message.success('Thêm thành công');
        getUserContact.refresh();
        handleCancleModal();
      }
    },
    {
      manual: true,
    },
  );

  const updateUserContact = useRequest(
    async (data) => {
      const res: { success: boolean } = await requestUpdateUserContact(data);
      if (!res.success) {
        message.error('Cập nhập thất bại');
        return;
      } else {
        message.success('Cập nhập thành công');
        getUserContact.refresh();
        handleCancleModal();
      }
      return res;
    },
    {
      manual: true,
    },
  );

  const deleteUserContact = useRequest(
    async (id) => {
      const res: { success: boolean } = await requestDeleteUserContact(id);
      if (!res.success) {
        message.error('Xoá thất bại');
        return;
      } else {
        message.success('Xoá thành công');
        getUserContact.refresh();
        handleCancleModal();
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
      updateUserContact.run(values);
    } else {
      values.external_customers = external === 'Khách hàng' ? true : false;
      addUserContact.run(values);
    }
  };

  const handleConfirmDelete = (role_id: string) => {
    Modal.confirm({
      title: 'Thao tác xoá?',
      content: 'Bạn có chắc chắn muốn xoá thông tin này',
      okText: 'Xoá',
      okType: 'danger',
      okButtonProps: {
        type: 'primary',
      },
      icon: <CloseCircleFilled style={{ color: 'red', fontSize: 22 }} />,
      onOk() {
        {
          deleteUserContact.run(role_id);
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
            <StarFilled style={{ color: '#FFC700', fontSize: 20 }} onClick={() => {}} />
          ) : (
            <StarOutlined style={{ fontSize: 20 }} onClick={() => {}} />
          )}
        </>
      ),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'full_name',
      key: 'full_name',
      align: 'center',
      width: '200px',
      render: (text, record) => {
        return (
          <Typography.Text
            style={{ cursor: 'pointer', color: '#45911F' }}
            onClick={() => {
              handleOpenModal();
              setIsEdit(true);
              form.setFieldsValue(record);
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
    },
    {
      title: external === 'Khách hàng' ? 'Đơn vị' : 'Team',
      dataIndex: external === 'Khách hàng' ? 'work_unit' : 'team',
      key: external === 'Khách hàng' ? 'work_unit' : 'team',
      align: 'center',
      width: '265px',
    },
    {
      title: 'Số IIP',
      dataIndex: 'ip_phone',
      key: 'ip_phone',
      align: 'center',
      width: '235px',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: '340px',
    },
    {
      title: '',
      dataIndex: 'loai',
      key: 'loai',
      align: 'center',
      width: '100px',
      render: (text, record) => {
        return (
          <Space size="middle">
            <div style={{ cursor: 'pointer' }}>
              <Image className={styles.call} width={30} src={Phone} preview={false} />
            </div>
            <DeleteOutlined
              style={{ color: '#F5222D', fontSize: '20px' }}
              onClick={() => {
                record.id && handleConfirmDelete(record.id);
              }}
            />
          </Space>
        );
      },
    },
  ];

  const handleSelectTeam = (values: any) => {
    setClickAddNewTeam(false);
    setTeamKey(values);
  };

  const fetchTeamPermissionData = async () => {
    const resTeam = await requestTeamPermissionData();
    if (resTeam.success === true) {
      console.log('get');
      setListTeamPermission(resTeam.data);
    }
  };

  const handleCreateNewTeamPermission = async (newTeamValue: string) => {
    const resNewTeam = await requestCreateNewTeam(newTeamValue);
    if (resNewTeam.success === true) {
      message.success('Tạo thành công');
      getListTeam.refresh();
    }
  };

  const handleDeleteTeamPermission = async (team_id: string) => {
    const resDelTeam = await requestDeleteTeamPermission(team_id);
    if (resDelTeam.success === true) {
      message.success('Xoá thành công');
      getListTeam.refresh();
    }
  };

  const handleClickDeleteTeam = (e: any, id: string) => {
    e.stopPropagation();
    e.preventDefault();
    handleDeleteTeamPermission(id);
    fetchTeamPermissionData();
  };

  const handleSubmitNewTeam = (values: any) => {
    handleCreateNewTeamPermission(values);
    form.resetFields();
    fetchTeamPermissionData();
  };

  return (
    <>
      <div style={{ marginTop: '20px' }}>
        <Segmented
          size="middle"
          value={external}
          onChange={(e) => {
            setExternal(e.toString());
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
        />
      </div>
      <Form layout="vertical" form={form}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 10,
            marginRight: '1rem',
          }}
        >
          <Space size="middle">
            <Form.Item label={external === 'Khách hàng' ? 'Đơn vị' : 'Team'} name="unit">
              <Select
                style={{ width: 200 }}
                placeholder="Tất cả"
                mode="multiple"
                loading={getListTeam?.loading}
                onChange={debounce(
                  () => {
                    getUserContact.run({
                      keyword: form.getFieldValue('search'),
                      unit: form.getFieldValue('unit'),
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
                type="link"
                onClick={() => {
                  if (form.getFieldValue('unit' || form.getFieldValue('search'))) {
                    getUserContact.refresh();
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
                style={{ width: '200px' }}
                prefix={<SearchOutlined />}
                placeholder="Nhập từ khoá"
                onChange={debounce(
                  () => {
                    getUserContact.run({
                      keyword: form.getFieldValue('search'),
                      unit: form.getFieldValue('unit'),
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
            <PlusSquareFilled
              style={{ fontSize: 32, color: '#478D46' }}
              onClick={() => {
                handleOpenModal();
                setIsEdit(false);
                form.resetFields();
              }}
            />
          </Space>
        </div>
      </Form>
      <Card className={styles.detailCardLayoutPhone}>
        <Table
          dataSource={external === 'Khách hàng' ? dataExternalContacts : dataInternalContacts}
          columns={columnsDanhba}
          style={{ paddingLeft: '10px', paddingTop: '10px' }}
          className={styles.tableStyle}
          pagination={{
            pageSize: 5,
            showQuickJumper: true,
            showSizeChanger: true,
            locale: {
              jump_to: 'Go to',
              page: '',
            },
          }}
          scroll={{ x: 300 }}
          loading={{
            indicator: (
              <div>
                <Spin />
              </div>
            ),
            spinning: getUserContact.loading,
          }}
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
          <Form {...formItemLayout} form={form} onFinish={handleOnFinish} layout="vertical">
            <div>
              <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
                Họ và tên <span style={{ color: 'red' }}>(*)</span>
              </Typography.Text>
              <Form.Item
                name="full_name"
                style={{ marginTop: 8 }}
                rules={[
                  { required: true, message: 'Vui lòng không để trống thông tin' },
                  {
                    max: 255,
                    message: 'Vui lòng không nhập quá 255 kí tự',
                  },
                ]}
              >
                <Input placeholder="Nhập họ và tên" />
              </Form.Item>
            </div>
            <div>
              <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
                Số điện thoại <span style={{ color: 'red' }}>(*)</span>
              </Typography.Text>
              <Form.Item
                name="phone_number"
                style={{ marginTop: 8 }}
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng không để trống thông tin',
                  },
                  {
                    pattern: new RegExp('([3|5|7|8|9]{1})+([0-9]{8})'),
                    message: 'Số điện thoại không hợp lệ',
                  },
                  {
                    max: 10,
                    message: 'Số điện thoại không hợp lệ',
                  },
                ]}
              >
                <Input
                  placeholder="Nhập số điện thoại"
                  className={styles.inputNumber}
                  type="number"
                />
              </Form.Item>
            </div>

            <div>
              <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
                IP phone <span style={{ color: 'red' }}>(*)</span>
              </Typography.Text>
              <Form.Item
                name="ip_phone"
                style={{ marginTop: 8 }}
                rules={[
                  { required: true, message: 'Vui lòng không để trống thông tin' },
                  {
                    max: 6,
                    message: 'Vui lòng không nhập quá 6 số',
                  },
                ]}
              >
                <Input
                  className={styles.inputNumber}
                  type="number"
                  placeholder="Nhập số máy nhánh"
                />
              </Form.Item>
            </div>
            <div>
              <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
                Email <span style={{ color: 'red' }}>(*)</span>
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
                <Input placeholder="Nhập email đơn vị" />
              </Form.Item>
            </div>
            <div>
              <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
                {external === 'Khách hàng' ? 'Đơn vị công tác' : 'Team'}
                <span style={{ color: 'red' }}>(*)</span>
              </Typography.Text>
              <Form.Item
                name={external === 'Khách hàng' ? 'unit' : 'team'}
                style={{ marginTop: 8 }}
                rules={[{ required: true, message: 'Vui lòng không để trống thông tin' }]}
              >
                {external === 'Khách hàng' ? (
                  <Select options={listUnitExternal} />
                ) : (
                  <Select
                    onChange={handleSelectTeam}
                    loading={getListTeam.loading}
                    placeholder={external === 'Khách hàng' ? 'Chọn đơn vị công tác' : 'Chọn nhóm'}
                    menuItemSelectedIcon={<CheckOutlined style={{ marginLeft: 10 }} />}
                    dropdownRender={(menu) => (
                      <>
                        {menu}
                        <div
                          style={{
                            paddingLeft: '14px',
                            paddingRight: '14px',
                            paddingBottom: '10px',
                          }}
                        >
                          <hr></hr>
                          {clickAddNewTeam === false ? (
                            <Button
                              style={{
                                padding: 'unset',
                                color: 'rgba(0,0,0,0.5)',
                                fontStyle: 'italic',
                              }}
                              type="text"
                              onClick={() => setClickAddNewTeam(true)}
                            >
                              Chỉnh sửa / Thêm team mới
                            </Button>
                          ) : (
                            <Form form={form}>
                              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ flex: 1 }}>
                                  <Form.Item name="newTeamValue">
                                    <Input
                                      placeholder="Nhập team mới tại đây"
                                      className={styles.addNewTeamPlaceholder}
                                      onChange={(e) => setNewTeamValue(e.target.value)}
                                    />
                                  </Form.Item>
                                </div>
                                <div>
                                  <Form.Item>
                                    <Space>
                                      <SaveOutlined
                                        style={{ marginLeft: 10, fontSize: 14 }}
                                        onClick={() => handleSubmitNewTeam(newTeamValue)}
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
                  >
                    {listTeamPermission.map((item: TeamPermission) => (
                      <Select.Option value={item.id}>
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
              >
                {isEdit ? 'Cập nhập' : 'Tạo mới'}
              </Button>
            </div>
          </Form>
        </Modal>
      </Card>
    </>
  );
};

export default PhoneBook;
