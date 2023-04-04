import './index.less';

import { Col, Form, FormInstance, Modal, Row, Space, Switch, Typography, UploadFile } from 'antd';
import React, { useEffect, useState } from 'react';

import { TeamPermission } from '@/components/Atom/SelectItem';
import InfoUserFrom from '@/components/Molecules/InfoUserForm';
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

export interface FormProps {
  name: string;
  title: string;
  department: string;
  level: string;
  home_address: string;
  work_address: string;
  phone_number: string;
  ip_phone: string;
  team: string;
  email: string;
}

export interface NotificationProps {
  missed_call?: boolean;
  incoming_call?: boolean;
  critic_issue?: boolean;
  night_plan?: boolean;
  shift?: boolean;
  overdue_message?: boolean;
}

export interface SettingsProps {
  dark_mode?: boolean;
  action_call?: boolean;
}

interface InfoUserProps {
  currentUser: FormProps | API.CurrentUser;
  notifications: NotificationProps;
  settings: SettingsProps;
  listTeamPermission: TeamPermission[];
  avatar?: string;
  handleUploadAvatar: (info: UploadFile) => void;
  handleChangeNotifications?: (values: NotificationProps) => void;
  handleChangeSettings?: (values: SettingsProps) => void;
  handleSaveInfoForm: (
    values: FormProps,
    setIsDisableSave: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  handleNewTeam: (value: string, form: FormInstance) => void;
  handleDeleteTeam: (value: string) => void;
  handleCheckPhone?: (value: string, form: FormInstance) => void;
}
const InfoUser: React.FC<InfoUserProps> = ({
  currentUser,
  notifications,
  settings,
  listTeamPermission,
  avatar,
  handleUploadAvatar,
  handleChangeNotifications,
  handleChangeSettings,
  handleSaveInfoForm,
  handleNewTeam,
  handleDeleteTeam,
  handleCheckPhone,
}) => {
  const [isEditForm, setIsEditForm] = useState(false);
  const [formNotifications] = Form.useForm();
  const [formSettings] = Form.useForm();

  const onClickEditForm = () => {
    setIsEditForm(true);
  };

  useEffect(() => {
    formNotifications.setFieldsValue(notifications);
  }, [notifications]);

  useEffect(() => {
    formSettings.setFieldsValue(settings);
  }, [settings]);

  const onValueChangeNotifications = (_: any, values: NotificationProps) => {
    handleChangeNotifications && handleChangeNotifications(values);
  };

  const onValueChangeSettings = (_: any, values: SettingsProps) => {
    handleChangeSettings && handleChangeSettings(values);
  };

  return (
    <div className="o-info-user">
      <div className="o-info-user__edit">
        <EditOutlined style={{ fontSize: '22px' }} onClick={onClickEditForm} />
      </div>

      <Row align="middle" justify="center">
        <Col lg={{ span: 6 }} xl={{ span: 5 }}>
          <div className="o-info-user__avatar">
            <UploadAvatar avatar={avatar} handleUploadAvatar={handleUploadAvatar} />
            <Typography.Title level={4} style={{ textAlign: 'center' }}>
              {currentUser?.name}
            </Typography.Title>
            <div className="flex justify-between" style={{ padding: ' 0 20px' }}>
              <Space direction="vertical">
                <div className="o-info-user__avatar-title">Ngày sinh</div>
                <div className="o-info-user__avatar-title">Giới tính</div>
              </Space>
              <Space direction="vertical">
                <div className="o-info-user__avatar-content">00/00/20XX</div>
                <div className="o-info-user__avatar-content">Nữ</div>
              </Space>
            </div>
          </div>
        </Col>
        <Col lg={{ span: 18 }} xl={{ span: 19 }} className="o-info-user__info">
          <Row>
            <Col span={24} className="o-info-user__info-col">
              <Typography.Title
                level={5}
                style={{ fontSize: 16 }}
                className="o-info-user__info-title"
              >
                Giới thiệu về bạn
              </Typography.Title>
              <Row gutter={[{ xs: 16, md: 30, xl: 80 }, 8]}>
                <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="flex">
                    <Space direction="vertical" style={{ width: 100 }}>
                      <div className="o-info-user__avatar-title">Họ và tên</div>
                      <div className="o-info-user__avatar-title">Địa chỉ email</div>
                      <div className="o-info-user__avatar-title">Chức danh</div>
                    </Space>
                    <Space direction="vertical">
                      <div className="o-info-user__avatar-content">
                        {currentUser.name ? currentUser.name : '...'}
                      </div>
                      <div className="o-info-user__avatar-content">
                        {currentUser.email ? currentUser.email : '...'}
                      </div>
                      <div className="o-info-user__avatar-content">
                        {currentUser.title ? labelPosition(currentUser.title) : '...'}
                      </div>
                    </Space>
                  </div>
                </Col>
                <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="flex">
                    <Space direction="vertical" style={{ width: 100 }}>
                      <div className="o-info-user__avatar-title">Nơi làm việc</div>
                      <div className="o-info-user__avatar-title">Phòng ban</div>
                      <div className="o-info-user__avatar-title">Cấp độ</div>
                    </Space>
                    <Space direction="vertical">
                      <div className="o-info-user__avatar-content">
                        {currentUser.work_address === 'mb' ? 'Miền bắc' : 'Miền Nam'}
                      </div>
                      <div className="o-info-user__avatar-content">
                        {currentUser.department ? currentUser.department : '...'}
                      </div>
                      <div className="o-info-user__avatar-content">
                        {currentUser.level ? currentUser.level : '...'}
                      </div>
                    </Space>
                  </div>
                </Col>
                <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                  <div className="flex">
                    <Space direction="vertical" style={{ width: 100 }}>
                      <div className="o-info-user__avatar-title">Số điện thoại</div>
                      <div className="o-info-user__avatar-title">IP Phone</div>
                      <div className="o-info-user__avatar-title">Địa chỉ</div>
                    </Space>
                    <Space direction="vertical">
                      <div className="o-info-user__avatar-content">
                        {currentUser.phone_number ? currentUser.phone_number : '...'}
                      </div>
                      <div className="o-info-user__avatar-content">
                        {currentUser.ip_phone ? currentUser.ip_phone : '...'}
                      </div>
                      <div className="o-info-user__avatar-content">
                        {currentUser.home_address ? currentUser.home_address : '...'}
                      </div>
                    </Space>
                  </div>
                </Col>
              </Row>
            </Col>
            <Col span={24} className="o-info-user__info-col">
              <Form form={formNotifications} onValuesChange={onValueChangeNotifications}>
                <Typography.Title
                  level={5}
                  style={{ fontSize: 16 }}
                  className="o-info-user__info-title"
                >
                  Cài đặt thông báo
                </Typography.Title>
                <Row gutter={[{ xs: 16, md: 30, xl: 80 }, 8]}>
                  <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <div className="flex">
                      <Space direction="vertical" style={{ width: 200 }}>
                        <div className="o-info-user__notifica-title">
                          Thông báo quá hạn tin nhắn
                        </div>
                        <div className="o-info-user__notifica-title">Thông báo sự cố lớn</div>
                      </Space>
                      <Space direction="vertical">
                        <div className="o-info-user__notifica-content">
                          <Form.Item noStyle name="overdue_message" valuePropName="checked">
                            <Switch size="small" />
                          </Form.Item>
                        </div>
                        <div className="o-info-user__notifica-content">
                          <Form.Item noStyle name="critic_issue" valuePropName="checked">
                            <Switch size="small" />
                          </Form.Item>
                        </div>
                      </Space>
                    </div>
                  </Col>
                  <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <div className="flex">
                      <Space direction="vertical" style={{ width: 200 }}>
                        <div className="o-info-user__notifica-title">Thông báo cuộc gọi nhỡ</div>
                        <div className="o-info-user__notifica-title">
                          Thông báo gửi kế hoạch đêm
                        </div>
                      </Space>
                      <Space direction="vertical">
                        <div className="o-info-user__notifica-content">
                          <Form.Item noStyle name="missed_call" valuePropName="checked">
                            <Switch size="small" />
                          </Form.Item>
                        </div>
                        <div className="o-info-user__notifica-content">
                          <Form.Item noStyle name="night_plan" valuePropName="checked">
                            <Switch size="small" />
                          </Form.Item>
                        </div>
                      </Space>
                    </div>
                  </Col>
                  <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <div className="flex">
                      <Space direction="vertical" style={{ width: 200 }}>
                        <div className="o-info-user__notifica-title">Thông báo cuộc gọi đến</div>
                        <div className="o-info-user__notifica-title">
                          Thông báo bàn giao ca trực
                        </div>
                      </Space>
                      <Space direction="vertical">
                        <div className="o-info-user__notifica-content">
                          <Form.Item noStyle name="incoming_call" valuePropName="checked">
                            <Switch size="small" />
                          </Form.Item>
                        </div>
                        <div className="o-info-user__notifica-content">
                          <Form.Item noStyle name="shift" valuePropName="checked">
                            <Switch size="small" />
                          </Form.Item>
                        </div>
                      </Space>
                    </div>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col span={24} className="o-info-user__info-col-final">
              <Form form={formSettings} onValuesChange={onValueChangeSettings}>
                <Typography.Title
                  level={5}
                  style={{ fontSize: 16 }}
                  className="o-info-user__info-title"
                >
                  Cài đặt giao diện
                </Typography.Title>
                <Row gutter={[{ xs: 16, md: 30, xl: 80 }, 8]}>
                  <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    <div className="flex">
                      <Space direction="vertical" style={{ width: 200 }}>
                        <div className="o-info-user__notifica-title">Chế độ tối</div>
                      </Space>
                      <Space direction="vertical">
                        <div className="o-info-user__setting-content">
                          <Form.Item noStyle name="dark_mode" valuePropName="checked">
                            <Switch size="small" />
                          </Form.Item>
                        </div>
                      </Space>
                    </div>
                  </Col>
                  <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }}>
                    {/* <div className="flex ">
                      <Space direction="vertical" style={{ width: 200 }}>
                        <div className="o-info-user__notifica-title">
                          Thao tác khi có cuộc gọi đến
                        </div>
                      </Space>
                      <Space direction="vertical">
                        <div className="o-info-user__setting-content">
                          <Form.Item noStyle name="action_call" valuePropName="checked">
                            <Switch size="small" />
                          </Form.Item>
                        </div>
                      </Space>
                    </div> */}
                  </Col>

                  <Col sm={{ span: 24 }} md={{ span: 12 }} lg={{ span: 8 }} />
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>

      <Modal
        open={isEditForm}
        className="modal-info-form"
        maskStyle={{
          background: settings?.dark_mode ? 'rgba(255, 255, 255, 0)' : 'rgba(255, 255, 255, 0.8)',
        }}
        closable={false}
        footer={false}
        title="Chỉnh sửa thông tin"
      >
        <InfoUserFrom
          currentUser={currentUser}
          onClickCancel={(form) => {
            form.setFieldsValue(currentUser);
            setIsEditForm(false);
          }}
          listTeamPermission={listTeamPermission}
          handleSaveInfoForm={handleSaveInfoForm}
          handleNewTeam={handleNewTeam}
          handleDeleteTeam={handleDeleteTeam}
          handleCheckPhone={handleCheckPhone}
        />
      </Modal>
    </div>
  );
};

export default InfoUser;
