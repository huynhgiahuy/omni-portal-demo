import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Typography, Button, Avatar, Tag, Space, Badge, Input, Form } from 'antd';
import { EditOutlined, WindowsFilled } from '@ant-design/icons';
import styles from '../setting/style.less';
import ImageAvatar from '../setting/avatar_test.png';
import { requestGetInfoUser, UserInfoProps } from '@/services/user_info';
import { requestEditUserInfo } from './services'

const PersonalInfo: React.FC = () => {
  const [isEditUser, setEditUser] = useState(false);
  const [infoUser, setInfoUser] = useState<UserInfoProps>();

  const token = window.localStorage.getItem("access_token")

  const requestEditUserInfoSubmit = async (name: string,
    role: string,
    department: string,
    level: string,
    organization: string,
    home_address: string,
    work_address: string,
    phone_number: string,
    ip_phone: string,
  ) => {
    const res = await requestEditUserInfo(name, role, department, level, organization, home_address, work_address, phone_number, ip_phone);
    return res;
  }

  const requestUserInfo = async () => {
    const res = await requestGetInfoUser(token);

    if (res.success) {
      setInfoUser(res.data[0]);
    }
  };

  useEffect(() => {

    requestUserInfo();
  }, []);

  const handleEditUser = () => {
    setEditUser(!isEditUser);
  };

  const handleOnFinishEditUser = (values: any) => {
    console.log(values);
    setEditUser(false);
    const res = requestEditUserInfoSubmit(
      values.name ? values.name : infoUser?.name,
      values.role ? values.role : infoUser?.role,
      values.department ? values.department : infoUser?.department,
      values.level ? values.level : infoUser?.level,
      values.organization ? values.organization : infoUser?.organization,
      values.home_address ? values.home_address : infoUser?.home_address,
      values.work_address ? values.work_address : infoUser?.work_address,
      values.phone_number ? values.phone_number : infoUser?.phone_number,
      values.ip_phone ? values.ip_phone : infoUser?.ip_phone,
    )

    res.then((result) => { setInfoUser(result.data[0]) })
  };

  const handleOnCancleEditUser = () => {
    setEditUser(false);
  };

  return (
    <>
      <Card
        title={
          <div>
            <div className={styles.antAvatarImg}>
              <Avatar src={ImageAvatar} className={styles.antImg}></Avatar>
            </div>
            <div style={{ textAlign: 'right' }}>
              <EditOutlined style={{ fontSize: '22px' }} onClick={handleEditUser} />
            </div>
          </div>
        }
        className={styles.detailCardLayout}
      >
        <div style={{ paddingTop: '10px' }}>
          <Form onFinish={handleOnFinishEditUser}>
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
                    <Form.Item name="name" className={styles.antFormItemMargin}>
                      <Input
                        defaultValue={infoUser?.name}
                        style={{ width: '300px', textAlign: 'right' }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>{infoUser?.name}</Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Địa chỉ Mail</Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item name="email_test" className={styles.antFormItemMargin}>
                      <Input
                        defaultValue={infoUser?.email}
                        style={{ width: '300px', textAlign: 'right' }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>{infoUser?.email}</Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Chức danh</Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item name="role" className={styles.antFormItemMargin}>
                      <Input
                        defaultValue={infoUser?.role}
                        style={{ width: '300px', textAlign: 'right' }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>{infoUser?.role}</Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Phòng ban</Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item name="department" className={styles.antFormItemMargin}>
                      <Input
                        defaultValue={infoUser?.department}
                        style={{ width: '300px', textAlign: 'right' }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {infoUser?.department}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Cấp độ</Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item name="level" className={styles.antFormItemMargin}>
                      <Input
                        defaultValue={infoUser?.level}
                        style={{ width: '300px', textAlign: 'right' }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>{infoUser?.level}</Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Tổ chức</Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item name="organization" className={styles.antFormItemMargin}>
                      <Input
                        defaultValue={infoUser?.organization}
                        style={{ width: '300px', textAlign: 'right' }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {infoUser?.organization}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Địa chỉ</Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item name="home_address" className={styles.antFormItemMargin}>
                      <Input
                        defaultValue={infoUser?.home_address}
                        style={{ width: '300px', textAlign: 'right' }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {infoUser?.home_address}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>Công tác</Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item name="work_address" className={styles.antFormItemMargin}>
                      <Input
                        defaultValue={infoUser?.work_address}
                        style={{ width: '300px', textAlign: 'right' }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {infoUser?.organization}
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
                  </Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item name="phone_number" className={styles.antFormItemMargin}>
                      <Input
                        defaultValue={infoUser?.phone_number}
                        style={{ width: '300px', textAlign: 'right' }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {infoUser?.phone_number}
                    </Typography.Text>
                  )}
                </div>
                <div className={styles.antDataDisplay}>
                  <Typography.Text className={styles.antTextStyle}>IP Phone</Typography.Text>
                  {isEditUser === true ? (
                    <Form.Item name="ip_phone" className={styles.antFormItemMargin}>
                      <Input
                        defaultValue={infoUser?.ip_phone}
                        style={{ width: '300px', textAlign: 'right' }}
                      />
                    </Form.Item>
                  ) : (
                    <Typography.Text className={styles.antBold}>
                      {infoUser?.ip_phone}
                    </Typography.Text>
                  )}
                </div>
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
                    <WindowsFilled style={{ fontSize: '34px' }} />
                    <Space direction="vertical" size={[0, 0]}>
                      <Space>
                        <Typography.Text className={styles.osDeviceStyle}>
                          Chrome - Windows
                        </Typography.Text>
                        <Tag color="#689B4F" style={{ borderRadius: '4px' }}>
                          Đang đăng nhập
                        </Tag>
                      </Space>
                      <Space>
                        <Typography.Text className={styles.locationDeviceStyle}>
                          Hồ Chí Minh, Việt Nam
                        </Typography.Text>
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
                    <WindowsFilled style={{ fontSize: '34px' }} />
                    <Space direction="vertical" size={[0, 0]}>
                      <Space>
                        <Typography.Text className={styles.osDeviceStyle}>
                          Firefox - Windows
                        </Typography.Text>
                        <Tag color="#689B4F" style={{ borderRadius: '4px' }}>
                          Đang đăng nhập
                        </Tag>
                      </Space>
                      <Space>
                        <Typography.Text className={styles.locationDeviceStyle}>
                          Hồ Chí Minh, Việt Nam
                        </Typography.Text>
                        <Badge status="default" style={{ marginLeft: '20px' }}></Badge>
                        <Typography.Text className={styles.locationDeviceStyle}>
                          16 giờ trước
                        </Typography.Text>
                      </Space>
                    </Space>
                  </div>
                </div>
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
