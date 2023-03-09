import './index.less';

import {
  Button,
  Card,
  Col,
  Form,
  FormInstance,
  Input,
  Row,
  Select,
  Typography,
  UploadFile,
} from 'antd';
import React, { useEffect, useState } from 'react';

import SelectItem, { TeamPermission } from '@/components/Atom/SelectItem';
import UploadAvatar from '@/components/Molecules/UploadAvatar';
import { EditOutlined } from '@ant-design/icons';

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

interface ValidateFieldsProps {
  errorFields: { errors: string[]; name: string[] }[];
  values: FormProps;
}

export interface FormProps {
  name?: string;
  title?: string;
  department?: string;
  level?: string;
  organization?: string;
  home_address?: string;
  work_address?: string;
  phone_number?: string;
  ip_phone?: string;
  team?: string;
  email?: string;
}

interface InfoUserProps {
  editForm: boolean;
  currentUser: FormProps;
  listTeamPermission: TeamPermission[];
  handleNewTeam: (value: string, form: FormInstance) => void;
  handleDeleteTeam: (value: string) => void;
  handleSaveForm: (
    values: FormProps,
    setIsEditForm: React.Dispatch<React.SetStateAction<boolean>>,
    setIsDisableSave: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  avatar?: string;
  handleUploadAvatar: (info: UploadFile) => void;
  handleCheckPhone?: (value: string, form: FormInstance) => void;
}
const InfoUser: React.FC<InfoUserProps> = ({
  editForm,
  currentUser,
  listTeamPermission = [],
  handleNewTeam,
  handleDeleteTeam,
  handleSaveForm,
  handleCheckPhone,
  avatar,
  handleUploadAvatar,
}) => {
  const [isEditForm, setIsEditForm] = useState(editForm);
  const [isDisableSave, setIsDisableSave] = useState(true);
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue(currentUser);
  }, [isEditForm]);

  const onFinishForm = async (values: FormProps) => {
    handleSaveForm(values, setIsEditForm, setIsDisableSave);
  };

  const onClickCancle = () => {
    setIsEditForm(false);
    form.resetFields();
  };

  const onClickEditForm = () => {
    setIsEditForm(!isEditForm);
  };

  return (
    <Card
      className="o-info-user"
      title={
        <div className="o-info-user__avatar">
          <UploadAvatar avatar={avatar} handleUploadAvatar={handleUploadAvatar} />
        </div>
      }
    >
      {!isEditForm && (
        <div style={{ textAlign: 'right' }}>
          <EditOutlined style={{ fontSize: '22px' }} onClick={onClickEditForm} />
        </div>
      )}

      <Form
        form={form}
        layout="horizontal"
        onFinish={onFinishForm}
        onValuesChange={() => {
          form.validateFields().catch((error: ValidateFieldsProps) => {
            setIsDisableSave(true);
            if (
              error.errorFields.length === 0 &&
              (error.values.work_address !== currentUser?.work_address ||
                error.values.title !== currentUser?.title ||
                error.values.level !== currentUser?.level ||
                error.values.home_address !== currentUser?.home_address ||
                error.values.phone_number !== currentUser?.phone_number ||
                error.values.ip_phone !== currentUser?.ip_phone ||
                error.values.team !== currentUser?.team)
            ) {
              setIsDisableSave(false);
            }
          });
        }}
      >
        <Row>
          <Col xs={2} md={3}></Col>
          <Col xs={22} md={9}>
            <Typography.Text className="o-info-user__field-display">
              Giới thiệu về bạn
            </Typography.Text>
            <hr></hr>

            <div className="o-info-user__data-display">
              <Typography.Text className="o-info-user__text-style">Họ tên</Typography.Text>

              {isEditForm === true ? (
                <Form.Item name="name" className="o-info-user__form-item">
                  <Input disabled style={{ width: '300px' }} />
                </Form.Item>
              ) : (
                <Typography.Text className="o-info-user--bold">{currentUser?.name}</Typography.Text>
              )}
            </div>
            <div className="o-info-user__data-display">
              <Typography.Text className="o-info-user__text-style">Địa chỉ Mail</Typography.Text>

              {isEditForm === true ? (
                <Form.Item name="email" className="o-info-user__form-item">
                  <Input disabled style={{ width: '300px' }} />
                </Form.Item>
              ) : (
                <Typography.Text className="o-info-user--bold">
                  {currentUser?.email}
                </Typography.Text>
              )}
            </div>
            <div className="o-info-user__data-display">
              <Typography.Text className="o-info-user__text-style">Phòng ban</Typography.Text>

              {isEditForm === true ? (
                <Form.Item name="department" className="o-info-user__form-item">
                  <Input disabled style={{ width: '300px' }} />
                </Form.Item>
              ) : (
                <Typography.Text className="o-info-user--bold">
                  {currentUser?.department}
                </Typography.Text>
              )}
            </div>
            <div className="o-info-user__data-display">
              <Typography.Text className="o-info-user__text-style">
                Nơi làm việc {isEditForm === true && <span style={{ color: 'red' }}>(*)</span>}
              </Typography.Text>
              {isEditForm === true ? (
                <Form.Item
                  name="work_address"
                  className="o-info-user__form-item"
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
                <Typography.Text className="o-info-user--bold">
                  {currentUser?.work_address === 'mb' ? 'Miền Bắc' : 'Miền Nam'}
                </Typography.Text>
              )}
            </div>

            <div className="o-info-user__data-display">
              <Typography.Text className="o-info-user__text-style">
                Team {isEditForm === true && <span style={{ color: 'red' }}>(*)</span>}
              </Typography.Text>
              {isEditForm === true ? (
                <Form.Item
                  name="team"
                  className="o-info-user__form-item"
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng không để trống thông tin',
                    },
                  ]}
                >
                  <SelectItem
                    style={{ width: '300px' }}
                    listTeamPermission={listTeamPermission}
                    handleNewTeam={handleNewTeam}
                    handleDeleteTeam={handleDeleteTeam}
                  />
                </Form.Item>
              ) : (
                <Typography.Text className="o-info-user--bold">
                  {listTeamPermission.filter((team) => team.id === currentUser?.team)[0]?.name}
                </Typography.Text>
              )}
            </div>

            <div className="o-info-user__data-display">
              <Typography.Text className="o-info-user__text-style">
                Chức danh {isEditForm === true && <span style={{ color: 'red' }}>(*)</span>}
              </Typography.Text>
              {isEditForm === true ? (
                <Form.Item
                  name="title"
                  className="o-info-user__form-item"
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
                <Typography.Text className="o-info-user--bold">
                  {currentUser?.title && labelPosition(currentUser?.title)}
                </Typography.Text>
              )}
            </div>

            <div className="o-info-user__data-display">
              <Typography.Text className="o-info-user__text-style">
                Cấp độ {isEditForm === true && <span style={{ color: 'red' }}>(*)</span>}
              </Typography.Text>
              {isEditForm === true ? (
                <Form.Item
                  name="level"
                  className="o-info-user__form-item"
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
                  <Input style={{ width: '300px' }} />
                </Form.Item>
              ) : (
                <Typography.Text className="o-info-user--bold">
                  {currentUser?.level}
                </Typography.Text>
              )}
            </div>
            <div className="o-info-user__data-display">
              <Typography.Text className="o-info-user__text-style">Địa chỉ</Typography.Text>
              {isEditForm === true ? (
                <Form.Item
                  name="home_address"
                  className="o-info-user__form-item"
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
                  <Input style={{ width: '300px' }} />
                </Form.Item>
              ) : (
                <Typography.Text className="o-info-user--bold">
                  {currentUser?.home_address}
                </Typography.Text>
              )}
            </div>
          </Col>
          <Col xs={2} md={3}></Col>
          <Col xs={22} md={9}>
            <Typography.Text className="o-info-user__field-display">Liên hệ</Typography.Text>
            <hr></hr>
            <div className="o-info-user__data-display">
              <Typography.Text className="o-info-user__text-style">
                Số điện thoại cá nhân
                {isEditForm === true && <span style={{ color: 'red' }}> (*)</span>}
              </Typography.Text>
              {isEditForm === true ? (
                <Form.Item
                  name="phone_number"
                  className="o-info-user__form-item"
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
                    className="o-info-user__input-number"
                    onBlur={() => {
                      if (currentUser?.phone_number !== form.getFieldValue('phone_number')) {
                        handleCheckPhone &&
                          handleCheckPhone(form.getFieldValue('phone_number'), form);
                      }
                    }}
                  />
                </Form.Item>
              ) : (
                <Typography.Text className="o-info-user--bold">
                  {currentUser?.phone_number}
                </Typography.Text>
              )}
            </div>
            <div className="o-info-user__data-display">
              <Typography.Text className="o-info-user__text-style">
                IP Phone {isEditForm === true && <span style={{ color: 'red' }}> (*)</span>}
              </Typography.Text>
              {isEditForm === true ? (
                <Form.Item
                  name="ip_phone"
                  className="o-info-user__form-item"
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
                    className="o-info-user__input-number"
                    value={currentUser?.ip_phone}
                  />
                </Form.Item>
              ) : (
                <Typography.Text className="o-info-user--bold">
                  {currentUser?.ip_phone}
                </Typography.Text>
              )}
            </div>
            {/* {currentUser?.equipment?.length && (
              <>
                <Typography.Text className="o-info-user__data-display">Thiết bị</Typography.Text>
                <hr></hr>
                <div style={{ marginBottom: '10px' }}>
                  <div style={{ marginBottom: '10px' }}>
                    <Typography.Text
                      className="o-info-user__text-style"
                      style={{ fontStyle: 'italic' }}
                    >
                      Thiết bị này
                    </Typography.Text>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    {currentUser?.equipment[0]?.device.includes('Windows') ? (
                      <WindowsFilled style={{ fontSize: '34px' }} />
                    ) : (
                      <AppleFilled style={{ fontSize: '34px' }} />
                    )}
                    <Space direction="vertical" size={[0, 0]}>
                      <Space>
                        <Space direction="vertical">
                          <Typography.Text className="o-info-user__os-device">
                            {currentUser.equipment[0].device}
                          </Typography.Text>
                          <Typography.Text className="o-info-user__location-device">
                            {currentUser?.equipment[0]?.location}
                          </Typography.Text>
                        </Space>
                        <Space direction="vertical">
                          <Tag
                            color={
                              currentUser?.equipment[0]?.status
                                ? '#689B4F'
                                : currentUser?.screen_mode?.dark_mode
                                ? '#9B9B9B'
                                : '#4A4A4A'
                            }
                            style={{ borderRadius: '4px' }}
                          >
                            {currentUser.equipment[0].status ? 'Đang đăng nhập' : 'Đã đăng xuất'}
                          </Tag>
                          <Typography.Text className="o-info-user__location-device">
                            <Space>
                              <div className="o-info-user__location-dot"></div>
                              {currentUser?.equipment[0]?.active_time}
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
                      className="o-info-user__text-style"
                      style={{ fontStyle: 'italic' }}
                    >
                      Thiết bị đã đăng nhập gần đây
                    </Typography.Text>
                  </div>
                  <div style={{ display: 'flex', gap: 10 }}>
                    { currentUser?.equipment[0]?.device.includes('Windows') ? (
                      <WindowsFilled style={{ fontSize: '34px' }} />
                    ) : (
                      <AppleFilled style={{ fontSize: '34px' }} />
                    )}

                    <Space>
                      <Space direction="vertical">
                        <Typography.Text className="o-info-user__os-device">
                          {currentUser.equipment[1].device}
                        </Typography.Text>
                        <Typography.Text className="o-info-user__location-device">
                          {currentUser?.equipment[0]?.location}
                        </Typography.Text>
                      </Space>
                      <Space direction="vertical">
                        <Tag
                          color={
                            currentUser?.equipment[1]?.status
                              ? '#689B4F'
                              : currentUser?.screen_mode?.dark_mode
                              ? '#9B9B9B'
                              : '#4A4A4A'
                          }
                          style={{ borderRadius: '4px' }}
                        >
                          {currentUser?.equipment[1]?.status ? 'Đang đăng nhập' : 'Đã đăng xuất'}
                        </Tag>
                        <Typography.Text className="o-info-user__location-device">
                          <Space>
                            <div className="o-info-user__location-dot"></div>
                            {currentUser?.equipment[1]?.active_time}
                          </Space>
                        </Typography.Text>
                      </Space>
                    </Space>
                  </div>
                </div>
              </>
            )} */}
          </Col>
        </Row>

        {isEditForm ? (
          <Form.Item shouldUpdate className="o-info-user__form-item o-info-user__button-submit">
            {() => (
              <>
                <Button style={{ marginRight: '10px' }} onClick={onClickCancle}>
                  Hủy
                </Button>
                <Button type="primary" htmlType="submit" disabled={isDisableSave}>
                  Lưu thay đổi
                </Button>
              </>
            )}
          </Form.Item>
        ) : (
          ''
        )}
      </Form>
    </Card>
  );
};

export default InfoUser;
