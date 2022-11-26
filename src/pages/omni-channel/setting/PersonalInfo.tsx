import React, { useEffect, useState } from 'react';
import {
  Row,
  Col,
  Card,
  Typography,
  Button,
  Avatar,
  Tag,
  Space,
  Input,
  Form,
  message,
  Upload,
  Select,
} from 'antd';
import {
  AppleFilled,
  CameraFilled,
  EditOutlined,
  UserOutlined,
  WindowsFilled,
} from '@ant-design/icons';
import styles from '../setting/style.less';
import { requeGetUserInfoProps } from '@/services/user_info';
import { requestEditUserInfo } from './services';
import { useModel, useRequest } from 'umi';
import type { RcFile, UploadProps } from 'antd/es/upload/interface';
import { endpoint, requestGetInfoUser } from '@/services/auth';

const PersonalInfo: React.FC = () => {
  const [isEditUser, setEditUser] = useState(false);
  const { initialState, setInitialState } = useModel('@@initialState');
  const token = window.localStorage.getItem('access_token');
  const [form] = Form.useForm();

  useRequest(async () => {
    const res: { success: boolean; data: any } = await requestGetInfoUser(token ? token : '');
    if (res.success) {
      await setInitialState((s) => ({
        ...s,
        currentUser: res.data[0],
      }));
    }
    return res;
  });

  const requestEditUserInfoSubmit = async (
    name: string,
    position: string,
    department: string,
    level: string,
    organization: string,
    home_address: string,
    work_address: string,
    phone_number: string,
    ip_phone: string,
  ) => {
    const res = await requestEditUserInfo(
      name,
      position,
      department,
      level,
      organization,
      home_address,
      work_address,
      phone_number,
      ip_phone,
    );
    return res;
  };

  const handleEditUser = () => {
    setEditUser(!isEditUser);
  };

  const handleOnFinishEditUser = (values: any) => {
    const res = requestEditUserInfoSubmit(
      values.name ? values.name : initialState?.currentUser?.name,
      values.position ? values.position : initialState?.currentUser?.position,
      values.department ? values.department : initialState?.currentUser?.department,
      values.level ? values.level : initialState?.currentUser?.level,
      values.organization ? values.organization : initialState?.currentUser?.organization,
      values.home_address ? values.home_address : initialState?.currentUser?.home_address,
      values.work_address ? values.work_address : initialState?.currentUser?.work_address,
      values.phone_number ? values.phone_number : initialState?.currentUser?.phone_number,
      values.ip_phone ? values.ip_phone : initialState?.currentUser?.ip_phone,
    );

    res.then(async (result: requeGetUserInfoProps) => {
      if (result.success) {
        await setInitialState((s) => ({
          ...s,
          currentUser: result.data[0],
        }));
        message.success('Cập nhập thành công');
        setEditUser(false);
      } else {
        message.error('Lưu không thành công, vui lòng thử lại');
        return;
      }
    });
  };

  const handleOnCancleEditUser = () => {
    setEditUser(false);
    form.resetFields();
  };

  const props: UploadProps = {
    name: 'file',
    action: `${endpoint}/user-service/api/settings/user/upload_user_image`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    accept: '.jpeg,.jpg,.png',
  };

  const beforeUpload = (file: RcFile) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
      message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const dataImage = initialState?.currentUser?.image;

  const labelPosition = (key: string): string => {
    switch (key) {
      case 'cbgs':
        return 'Cán bộ Giám sát';
      case 'cbhtkt':
        return 'Cán bộ HTKT';
      case 'l2':
        return 'L2';
      case 'tc':
        return 'Trường ca';
      case 'cbqlp':
        return 'CBQLP';
      case 'da':
        return 'Dự án';

      default:
        return '';
    }
  };

  return (
    <>
      <Card
        title={
          <div>
            <div className={styles.antAvatarImg}>
              <Avatar
                src={dataImage && `data:image/jpeg;base64,${dataImage}`}
                className={styles.antImg}
                icon={!dataImage && <UserOutlined style={{ fontSize: 100 }} />}
              />
              <Upload
                {...props}
                beforeUpload={beforeUpload}
                onChange={async ({ file }) => {
                  if (file?.response?.success) {
                    await setInitialState((s) => ({
                      ...s,
                      currentUser: file?.response?.data[0],
                    }));
                  }
                }}
                className={styles.antAvatarImgHover}
                showUploadList={false}
              >
                <CameraFilled style={{ fontSize: 40, color: 'white' }} />
              </Upload>
            </div>
            <div style={{ textAlign: 'right' }}>
              <EditOutlined style={{ fontSize: '22px' }} onClick={handleEditUser} />
            </div>
          </div>
        }
        className={styles.detailCardLayout}
      >
        <div style={{ paddingTop: '10px' }}>
          <Form form={form} onFinish={handleOnFinishEditUser}>
            <Row>
              <Col md={3}></Col>
              <Col md={9}>
                <Typography.Text className={styles.antFieldDisplay}>
                  Giới thiệu về bạn
                </Typography.Text>
                <hr></hr>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Họ tên</Typography.Text>

                  {isEditUser === true ? (
                    <Form.Item
                      name="name"
                      className={styles.antFormItemMargin}
                      initialValue={initialState?.currentUser?.name}
                    >
                      <Input disabled style={{ width: '300px' }} />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.name}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Địa chỉ Mail</Typography.Text>

                  {isEditUser === true ? (
                    <Form.Item
                      name="email_test"
                      className={styles.antFormItemMargin}
                      initialValue={initialState?.currentUser?.email}
                    >
                      <Input disabled style={{ width: '300px' }} />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.email}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Phòng ban</Typography.Text>

                  {isEditUser === true ? (
                    <Form.Item
                      name="department"
                      className={styles.antFormItemMargin}
                      initialValue={initialState?.currentUser?.department}
                    >
                      <Input disabled style={{ width: '300px' }} />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.department}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>
                    Nơi làm việc {isEditUser === true && <span style={{ color: 'red' }}>(*)</span>}
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="work_address"
                      className={styles.antFormItemMargin}
                      initialValue={initialState?.currentUser?.work_address}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không để trống thông tin',
                        },
                      ]}
                    >
                      <Select
                        style={{ width: '300px' }}
                        options={[
                          { value: 'mb', label: 'Miền Bắc' },
                          { value: 'mn', label: 'Miền Nam' },
                        ]}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.work_address === 'mb' ? 'Miền Bắc' : 'Miền Nam'}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>
                    Chức danh {isEditUser === true && <span style={{ color: 'red' }}>(*)</span>}
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="position"
                      className={styles.antFormItemMargin}
                      initialValue={initialState?.currentUser?.position}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không để trống thông tin',
                        },
                      ]}
                    >
                      <Select
                        style={{ width: '300px' }}
                        options={[
                          { value: 'cbgs', label: 'Cán bộ Giám sát' },
                          { value: 'cbhtkt', label: 'Cán bộ HTKT' },
                          { value: 'l2', label: 'L2' },
                          { value: 'tc', label: 'Trưởng ca' },
                          { value: 'cbqlp', label: 'CBQLP' },
                          { value: 'da', label: 'Dự án' },
                        ]}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.position &&
                        labelPosition(initialState?.currentUser?.position)}
                    </Typography.Text>
                  )}
                </div>

                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>
                    Cấp độ {isEditUser === true && <span style={{ color: 'red' }}>(*)</span>}
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="level"
                      className={styles.antFormItemMargin}
                      initialValue={initialState?.currentUser?.level}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không để trống thông tin',
                        },
                        {
                          max: 255,
                          message: 'Vui lòng không nhập quá 255 kí tự',
                        },
                      ]}
                    >
                      <Input style={{ width: '300px' }} />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.level}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>
                    Địa chỉ {isEditUser === true && <span style={{ color: 'red' }}>(*)</span>}
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="home_address"
                      className={styles.antFormItemMargin}
                      initialValue={initialState?.currentUser?.home_address}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không để trống thông tin',
                        },
                        {
                          max: 255,
                          message: 'Vui lòng không nhập quá 255 kí tự',
                        },
                      ]}
                    >
                      <Input style={{ width: '300px' }} />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.home_address}
                    </Typography.Text>
                  )}
                </div>
              </Col>
              <Col md={2}></Col>
              <Col md={9}>
                <Typography.Text className={styles.antFieldDisplay}>Liên hệ</Typography.Text>
                <hr></hr>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>
                    Số điện thoại cá nhân
                    {isEditUser === true && <span style={{ color: 'red' }}>(*)</span>}
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="phone_number"
                      className={styles.antFormItemMargin}
                      initialValue={initialState?.currentUser?.phone_number}
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
                      <Input style={{ width: '300px' }} className={styles.inputNumber} />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.phone_number}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>
                    IP Phone {isEditUser === true && <span style={{ color: 'red' }}>(*)</span>}
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="ip_phone"
                      className={styles.antFormItemMargin}
                      initialValue={initialState?.currentUser?.ip_phone}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không để trống thông tin',
                        },
                        {
                          max: 6,
                          message: 'Vui lòng không nhập quá 6 số',
                        },
                        {
                          pattern: new RegExp('^[0-9]+$'),
                          message: 'Vui lòng chỉ nhập số',
                        },
                      ]}
                    >
                      <Input style={{ width: '300px' }} className={styles.inputNumber} />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.ip_phone}
                    </Typography.Text>
                  )}
                </div>
                {initialState?.currentUser?.equipment?.length && (
                  <>
                    <Typography.Text className={styles.antFieldDisplay}>Thiết bị</Typography.Text>
                    <hr></hr>
                    <div style={{ marginBottom: '10px' }}>
                      <div style={{ marginBottom: '10px' }}>
                        <Typography.Text
                          className={styles.antTextStyle}
                          style={{ fontStyle: 'italic' }}
                        >
                          Thiết bị này
                        </Typography.Text>
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {initialState.currentUser?.equipment[0]?.device.includes('Windows') ? (
                          <WindowsFilled style={{ fontSize: '34px' }} />
                        ) : (
                          <AppleFilled style={{ fontSize: '34px' }} />
                        )}
                        <Space direction="vertical" size={[0, 0]}>
                          <Space>
                            <Space direction="vertical">
                              <Typography.Text className={styles.osDeviceStyle}>
                                {initialState.currentUser.equipment[0].device}
                              </Typography.Text>
                              <Typography.Text className={styles.locationDeviceStyle}>
                                {initialState.currentUser?.equipment[0]?.location}
                              </Typography.Text>
                            </Space>
                            <Space direction="vertical">
                              <Tag
                                color={
                                  initialState.currentUser?.equipment[0]?.status
                                    ? '#689B4F'
                                    : initialState.currentUser?.screen_mode?.dark_mode
                                    ? '#9B9B9B'
                                    : '#4A4A4A'
                                }
                                style={{ borderRadius: '4px' }}
                              >
                                {initialState.currentUser.equipment[0].status
                                  ? 'Đang đăng nhập'
                                  : 'Đã đăng xuất'}
                              </Tag>
                              <Typography.Text className={styles.locationDeviceStyle}>
                                <Space>
                                  <div className={styles.locationDot}></div>
                                  {initialState.currentUser?.equipment[0]?.active_time}
                                </Space>
                              </Typography.Text>
                            </Space>
                          </Space>
                        </Space>
                      </div>
                    </div>
                    <div>
                      <div style={{ marginBottom: '10px' }}>
                        <Typography.Text
                          className={styles.antTextStyle}
                          style={{ fontStyle: 'italic' }}
                        >
                          Thiết bị đã đăng nhập gần đây
                        </Typography.Text>
                      </div>
                      <div style={{ display: 'flex', gap: 10 }}>
                        {initialState.currentUser?.equipment[0]?.device.includes('Windows') ? (
                          <WindowsFilled style={{ fontSize: '34px' }} />
                        ) : (
                          <AppleFilled style={{ fontSize: '34px' }} />
                        )}

                        <Space>
                          <Space direction="vertical">
                            <Typography.Text className={styles.osDeviceStyle}>
                              {initialState.currentUser.equipment[1].device}
                            </Typography.Text>
                            <Typography.Text className={styles.locationDeviceStyle}>
                              {initialState.currentUser?.equipment[0]?.location}
                            </Typography.Text>
                          </Space>
                          <Space direction="vertical">
                            <Tag
                              color={
                                initialState.currentUser?.equipment[1]?.status
                                  ? '#689B4F'
                                  : initialState.currentUser?.screen_mode?.dark_mode
                                  ? '#9B9B9B'
                                  : '#4A4A4A'
                              }
                              style={{ borderRadius: '4px' }}
                            >
                              {initialState.currentUser?.equipment[1]?.status
                                ? 'Đang đăng nhập'
                                : 'Đã đăng xuất'}
                            </Tag>
                            <Typography.Text className={styles.locationDeviceStyle}>
                              <Space>
                                <div className={styles.locationDot}></div>
                                {initialState.currentUser?.equipment[1]?.active_time}
                              </Space>
                            </Typography.Text>
                          </Space>
                        </Space>
                      </div>
                    </div>
                  </>
                )}
              </Col>
            </Row>
            {isEditUser === true ? (
              <Form.Item
                style={{ textAlign: 'center', marginTop: '20px' }}
                className={styles.antFormItemMargin}
              >
                <Button style={{ marginRight: '10px' }} onClick={handleOnCancleEditUser}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit">
                  Lưu thay đổi
                </Button>
              </Form.Item>
            ) : (
              ''
            )}
          </Form>
        </div>
      </Card>
    </>
  );
};
export default PersonalInfo;
