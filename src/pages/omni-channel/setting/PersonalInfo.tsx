import {
  Avatar,
  Button,
  Card,
  Col,
  Form,
  Input,
  message,
  Row,
  Select,
  Space,
  Spin,
  Tag,
  Typography,
  Upload,
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel, useRequest } from 'umi';

import api from '@/api';
import { endpoint } from '@/services/auth';
import { requeGetUserInfoProps } from '@/services/user_info';
import {
  AppleFilled,
  CameraFilled,
  CloseOutlined,
  DeleteOutlined,
  EditOutlined,
  SaveOutlined,
  UserOutlined,
  WindowsFilled,
} from '@ant-design/icons';

import { requestCheckPhoneContact } from '../report/services';
import styles from '../setting/style.less';
import {
  requestCreateNewTeam,
  requestDeleteTeamPermission,
  requestEditUserInfo,
  requestTeamPermissionData,
} from './services';

import type { RcFile, UploadProps } from 'antd/es/upload/interface';
export type FormProps = {
  name: string;
  title: string;
  department: string;
  level: string;
  organization: string;
  home_address: string;
  work_address: string;
  phone_number: string;
  ip_phone: string;
  team: string;
};

interface TeamPermission {
  name: string;
  id: string;
}

type validateFieldsProps = {
  errorFields: { errors: string[]; name: string[] }[];
  values: FormProps;
};

const PersonalInfo: React.FC = () => {
  const [isEditUser, setEditUser] = useState(false);
  const [isDisable, setIsDisable] = useState(true);
  const { initialState, setInitialState } = useModel('@@initialState');
  const token = window.localStorage.getItem('access_token');
  const [loading, setLoading] = useState(false);
  const [clickAddNewTeam, setClickAddNewTeam] = useState(false);
  const [newTeamValue, setNewTeamValue] = useState<string | any>();
  const [listTeamPermission, setListTeamPermission] = useState<TeamPermission[]>([]);
  const [form] = Form.useForm();
  const [formTeam] = Form.useForm();

  const requestEditUserInfoSubmit = async (data: FormProps) => {
    const res = await requestEditUserInfo(data);
    return res;
  };

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

  const handleEditUser = () => {
    setIsDisable(true);
    setEditUser(!isEditUser);
    form.setFieldsValue(initialState?.currentUser);
  };

  const handleOnFinishEditUser = (values: FormProps) => {
    const res = requestEditUserInfoSubmit(values);

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
    setIsDisable(true);
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
    const isLt2M = file.size / 1024 < 2000;
    if (!isLt2M) {
      message.error('Ảnh cần nhỏ hơn 2MB!');
    }

    return isJpgOrPng && isLt2M;
  };

  const labelPosition = (key: string): string => {
    switch (key) {
      case 'cbgs':
        return 'Cán bộ Giám sát';
      case 'cbhtkt':
        return 'Cán bộ HTKT';
      case 'l2':
        return 'L2';
      case 'tc':
        return 'Trưởng ca';
      case 'cbqlp':
        return 'CBQLP';
      case 'da':
        return 'Dự án';

      default:
        return '';
    }
  };

  const arrListTeam = listTeamPermission?.map((item) => item.name);

  const handleSelectTeam = () => {
    setClickAddNewTeam(false);
  };

  const fetchTeamPermissionData = async () => {
    const resTeam = await requestTeamPermissionData();
    if (resTeam.success === true) {
      setListTeamPermission(resTeam.data);
    }
  };

  useEffect(() => {
    fetchTeamPermissionData();
  }, []);

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

  const handleClickDeleteTeam = async (e: any, id: string) => {
    await e.stopPropagation();
    await e.preventDefault();
    await handleDeleteTeamPermission(id);
    await fetchTeamPermissionData();
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

  return (
    <>
      <Card
        title={
          <div>
            <div className={styles.antAvatarImg}>
              {initialState?.currentUser?.avatar ? (
                <Avatar
                  src={
                    loading ? (
                      <Spin />
                    ) : (
                      <img
                        loading="lazy"
                        src={`${api.UMI_API_BASE_URL}/user-service/api/user/get_user_avatar?file_name=${initialState?.currentUser?.avatar}`}
                      />
                    )
                  }
                  className={styles.antImg}
                />
              ) : (
                <Avatar
                  className={styles.antImg}
                  icon={<UserOutlined style={{ fontSize: 100 }} />}
                />
              )}

              <Upload
                {...props}
                beforeUpload={beforeUpload}
                onChange={async ({ file }) => {
                  if (file.status === 'uploading') {
                    setLoading(true);
                  } else {
                    setLoading(false);
                  }

                  if (file?.response?.success) {
                    await setInitialState((s) => ({
                      ...s,
                      currentUser: {
                        ...initialState?.currentUser,
                        avatar: file?.response?.data[0]?.url,
                      },
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
          <Form
            form={form}
            onFinish={handleOnFinishEditUser}
            onValuesChange={() => {
              form.validateFields().catch((error: validateFieldsProps) => {
                setIsDisable(true);
                if (
                  error.errorFields.length === 0 &&
                  (error.values.work_address !== initialState?.currentUser?.work_address ||
                    error.values.title !== initialState?.currentUser?.title ||
                    error.values.level !== initialState?.currentUser?.level ||
                    error.values.home_address !== initialState?.currentUser?.home_address ||
                    error.values.phone_number !== initialState?.currentUser?.phone_number ||
                    error.values.ip_phone !== initialState?.currentUser?.ip_phone ||
                    error.values.team !== initialState?.currentUser?.team)
                ) {
                  setIsDisable(false);
                }
              });
            }}
          >
            <Row>
              <Col xs={2} md={3}></Col>
              <Col xs={22} md={9}>
                <Typography.Text className={styles.antFieldDisplay}>
                  Giới thiệu về bạn
                </Typography.Text>
                <hr></hr>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Họ tên</Typography.Text>

                  {isEditUser === true ? (
                    <Form.Item name="name" className={styles.antFormItemMargin}>
                      <Input
                        disabled
                        style={{ width: '300px' }}
                        className={styles.formDisableInput}
                      />
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
                    <Form.Item name="email" className={styles.antFormItemMargin}>
                      <Input
                        disabled
                        style={{ width: '300px' }}
                        className={styles.formDisableInput}
                      />
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
                    <Form.Item name="department" className={styles.antFormItemMargin}>
                      <Input
                        disabled
                        style={{ width: '300px' }}
                        className={styles.formDisableInput}
                      />
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
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không để trống thông tin',
                        },
                      ]}
                    >
                      <Select
                        className={styles.formInput}
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
                    Team {isEditUser === true && <span style={{ color: 'red' }}>(*)</span>}
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="team"
                      className={styles.antFormItemMargin}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng nhập Team',
                        },
                      ]}
                    >
                      <Select
                        className={styles.formInput}
                        style={{ width: '300px' }}
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
                                      <Form.Item
                                        name="newTeamValue"
                                        style={{ marginBottom: 'unset' }}
                                      >
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
                                  <DeleteOutlined
                                    onClick={(e) => handleClickDeleteTeam(e, item.id)}
                                  />
                                ) : (
                                  ''
                                )}
                              </div>
                            </Select.Option>
                          ))}
                      </Select>
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {
                        listTeamPermission.filter(
                          (team) => team.id === initialState?.currentUser?.team,
                        )[0]?.name
                      }
                    </Typography.Text>
                  )}
                </div>

                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>
                    Chức danh {isEditUser === true && <span style={{ color: 'red' }}>(*)</span>}
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="title"
                      className={styles.antFormItemMargin}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không để trống thông tin',
                        },
                      ]}
                    >
                      <Select
                        className={styles.formInput}
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
                      {initialState?.currentUser?.title &&
                        labelPosition(initialState?.currentUser?.title)}
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
                      rules={[
                        {
                          whitespace: true,
                          message: 'Vui lòng không để trống thông tin',
                        },
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
                      <Input style={{ width: '300px' }} className={styles.formInput} />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.level}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Địa chỉ</Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="home_address"
                      className={styles.antFormItemMargin}
                      rules={[
                        {
                          whitespace: true,
                          message: 'Vui lòng không để trống thông tin',
                        },

                        {
                          max: 255,
                          message: 'Vui lòng không nhập quá 255 kí tự',
                        },
                      ]}
                    >
                      <Input style={{ width: '300px' }} className={styles.formInput} />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.home_address}
                    </Typography.Text>
                  )}
                </div>
              </Col>
              <Col xs={2} md={3}></Col>
              <Col xs={22} md={9}>
                <Typography.Text className={styles.antFieldDisplay}>Liên hệ</Typography.Text>
                <hr></hr>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>
                    Số điện thoại cá nhân
                    {isEditUser === true && <span style={{ color: 'red' }}> (*)</span>}
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="phone_number"
                      className={styles.antFormItemMargin}
                      rules={[
                        {
                          validator: (_, value: any) => {
                            const phoneReg = /((0[3|5|7|8|9])+([0-9]{8,9})\b)/;
                            if (value === undefined || !value || value.length === 0) {
                              return Promise.reject('Vui lòng nhập số di động');
                            } else if (value.length > 11) {
                              return Promise.reject('Số điện thoại không hợp lệ');
                            } else if (!phoneReg.test(value)) {
                              return Promise.reject('Số điện thoại không hợp lệ');
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <Input
                        style={{ width: '300px' }}
                        className={styles.inputNumber}
                        onBlur={() => {
                          if (
                            initialState?.currentUser?.phone_number !==
                            form.getFieldValue('phone_number')
                          ) {
                            checkPhoneContact.run(form.getFieldValue('phone_number'));
                          }
                        }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {initialState?.currentUser?.phone_number}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>
                    IP Phone {isEditUser === true && <span style={{ color: 'red' }}> (*)</span>}
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item
                      name="ip_phone"
                      className={styles.antFormItemMargin}
                      rules={[
                        {
                          required: true,
                          message: 'Vui lòng không để trống thông tin',
                        },
                        {
                          pattern: new RegExp('^[0-9]{4,7}$'),
                          message: 'IP Phone không hợp lệ',
                        },
                      ]}
                    >
                      <Input
                        style={{ width: '300px' }}
                        className={styles.inputNumber}
                        value={initialState?.currentUser?.ip_phone}
                      />
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
                <Button type="primary" htmlType="submit" disabled={isDisable}>
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
