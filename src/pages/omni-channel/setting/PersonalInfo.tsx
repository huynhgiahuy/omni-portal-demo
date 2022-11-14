import React, { useState } from 'react';
import { Row, Col, Card, Typography, Button, Avatar, Tag, Space, Badge, Input, Form } from 'antd';
import { EditOutlined, WindowsFilled } from '@ant-design/icons';
import styles from '../setting/style.less';
import ImageAvatar from '../setting/avatar_test.png';

const PersonalInfo: React.FC = () => {
    const [isEditUser, setEditUser] = useState(false);
    const handleEditUser = () => {
        setEditUser(!isEditUser);
    }
    const handleOnFinishEditUser = (values: any) => {
        console.log(values)
        setEditUser(false);
    }
    const handleOnCancleEditUser = () => {
        setEditUser(false);
    }
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
                                <Typography.Text className={styles.antFieldDisplay}>Giới thiệu về bạn</Typography.Text>
                                <hr></hr>
                                <div className={styles.antDataDisplay}>
                                    <Typography.Text className={styles.antTextStyle}>Họ tên</Typography.Text>
                                    {isEditUser === true ? (
                                        <Form.Item name="username" className={styles.antFormItemMargin}>
                                            <Input defaultValue="Lâm Mỹ Huyền" style={{ width: '300px', textAlign: 'right' }} />
                                        </Form.Item>
                                    ) : (
                                        <Typography.Text className={styles.antBold}>Lâm Mỹ Huyền</Typography.Text>
                                    )}
                                </div>
                                <div className={styles.antDataDisplay}>
                                    <Typography.Text className={styles.antTextStyle}>Địa chỉ Mail</Typography.Text>
                                    {isEditUser === true ? (
                                        <Form.Item name="email" className={styles.antFormItemMargin}>
                                            <Input defaultValue="HuyenLM2@fpt.com.vn" style={{ width: '300px', textAlign: 'right' }} />
                                        </Form.Item>
                                    ) : (
                                        <Typography.Text className={styles.antBold}>HuyenLM2@fpt.com.vn</Typography.Text>
                                    )}
                                </div>
                                <div className={styles.antDataDisplay}>
                                    <Typography.Text className={styles.antTextStyle}>Chức danh</Typography.Text>
                                    {isEditUser === true ? (
                                        <Form.Item name="chucdanh" className={styles.antFormItemMargin}>
                                            <Input defaultValue="Nhan vien - CB Van hanh he thong" style={{ width: '300px', textAlign: 'right' }} />
                                        </Form.Item>
                                    ) : (
                                        <Typography.Text className={styles.antBold}>Nhan vien - CB Van hanh he thong</Typography.Text>
                                    )}
                                </div>
                                <div className={styles.antDataDisplay}>
                                    <Typography.Text className={styles.antTextStyle}>Phòng ban</Typography.Text>
                                    {isEditUser === true ? (
                                        <Form.Item name="phongban" className={styles.antFormItemMargin}>
                                            <Input defaultValue="Vận hành" style={{ width: '300px', textAlign: 'right' }} />
                                        </Form.Item>
                                    ) : (
                                        <Typography.Text className={styles.antBold}>Vận hành</Typography.Text>
                                    )}
                                </div>
                                <div className={styles.antDataDisplay}>
                                    <Typography.Text className={styles.antTextStyle}>Cấp độ</Typography.Text>
                                    {isEditUser === true ? (
                                        <Form.Item name="capdo" className={styles.antFormItemMargin}>
                                            <Input defaultValue="Level 2" style={{ width: '300px', textAlign: 'right' }} />
                                        </Form.Item>
                                    ) : (
                                        <Typography.Text className={styles.antBold}>Level 2</Typography.Text>
                                    )}
                                </div>
                                <div className={styles.antDataDisplay}>
                                    <Typography.Text className={styles.antTextStyle}>Tổ chức</Typography.Text>
                                    {isEditUser === true ? (
                                        <Form.Item name="tochuc" className={styles.antFormItemMargin}>
                                            <Input defaultValue="FTEL - SCC" style={{ width: '300px', textAlign: 'right' }} />
                                        </Form.Item>
                                    ) : (
                                        <Typography.Text className={styles.antBold}>FTEL - SCC</Typography.Text>
                                    )}
                                </div>
                                <div className={styles.antDataDisplay}>
                                    <Typography.Text className={styles.antTextStyle}>Địa chỉ</Typography.Text>
                                    {isEditUser === true ? (
                                        <Form.Item name="diachi" className={styles.antFormItemMargin}>
                                            <Input defaultValue="Quận Thủ Đức" style={{ width: '300px', textAlign: 'right' }} />
                                        </Form.Item>
                                    ) : (
                                        <Typography.Text className={styles.antBold}>Quận Thủ Đức</Typography.Text>
                                    )}
                                </div>
                                <div className={styles.antDataDisplay}>
                                    <Typography.Text className={styles.antTextStyle}>Công tác</Typography.Text>
                                    {isEditUser === true ? (
                                        <Form.Item name="congtac" className={styles.antFormItemMargin}>
                                            <Input defaultValue="FPT Tân Thuận" style={{ width: '300px', textAlign: 'right' }} />
                                        </Form.Item>
                                    ) : (
                                        <Typography.Text className={styles.antBold}>FPT Tân Thuận</Typography.Text>
                                    )}
                                </div>
                            </Col>
                            <Col md={2}></Col>
                            <Col md={9}>
                                <Typography.Text className={styles.antFieldDisplay}>Liên hệ</Typography.Text>
                                <hr></hr>
                                <div className={styles.antDataDisplay}>
                                    <Typography.Text className={styles.antTextStyle}>Số điện thoại cá nhân</Typography.Text>
                                    {isEditUser === true ? (
                                        <Form.Item name="sodienthoai" className={styles.antFormItemMargin}>
                                            <Input defaultValue="6996699669" style={{ width: '300px', textAlign: 'right' }} />
                                        </Form.Item>
                                    ) : (
                                        <Typography.Text className={styles.antBold}>6996699669</Typography.Text>
                                    )}
                                </div>
                                <div className={styles.antDataDisplay}>
                                    <Typography.Text className={styles.antTextStyle}>IP Phone</Typography.Text>
                                    {isEditUser === true ? (
                                        <Form.Item name="ipphone" className={styles.antFormItemMargin}>
                                            <Input defaultValue="18234" style={{ width: '300px', textAlign: 'right' }} />
                                        </Form.Item>
                                    ) : (
                                        <Typography.Text className={styles.antBold}>18234</Typography.Text>
                                    )}
                                </div>
                                <Typography.Text className={styles.antFieldDisplay}>Thiết bị</Typography.Text>
                                <hr></hr>
                                <div style={{ marginBottom: '10px' }}>
                                    <div style={{ marginBottom: '10px' }}>
                                        <Typography.Text className={styles.antTextStyle} style={{ fontStyle: 'italic' }}>Thiết bị này</Typography.Text>
                                    </div>
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <WindowsFilled style={{ fontSize: '34px' }} />
                                        <Space direction='vertical' size={[0, 0]}>
                                            <Space>
                                                <Typography.Text className={styles.osDeviceStyle}>Chrome - Windows</Typography.Text>
                                                <Tag color="#689B4F" style={{ borderRadius: '4px' }}>Đang đăng nhập</Tag>
                                            </Space>
                                            <Space>
                                                <Typography.Text className={styles.locationDeviceStyle}>Hồ Chí Minh, Việt Nam</Typography.Text>
                                            </Space>
                                        </Space>
                                    </div>
                                </div>
                                <div>
                                    <div style={{ marginBottom: '10px' }}>
                                        <Typography.Text className={styles.antTextStyle} style={{ fontStyle: 'italic' }}>Thiết bị đã đăng nhập gần đây</Typography.Text>
                                    </div>
                                    <div style={{ display: 'flex', gap: 10 }}>
                                        <WindowsFilled style={{ fontSize: '34px' }} />
                                        <Space direction='vertical' size={[0, 0]}>
                                            <Space>
                                                <Typography.Text className={styles.osDeviceStyle}>Firefox - Windows</Typography.Text>
                                                <Tag color="#689B4F" style={{ borderRadius: '4px' }}>Đang đăng nhập</Tag>
                                            </Space>
                                            <Space>
                                                <Typography.Text className={styles.locationDeviceStyle}>Hồ Chí Minh, Việt Nam</Typography.Text>
                                                <Badge status='default' style={{ marginLeft: '20px' }}></Badge><Typography.Text className={styles.locationDeviceStyle}>16 giờ trước</Typography.Text>
                                            </Space>
                                        </Space>
                                    </div>
                                </div>
                            </Col>
                        </Row>
                        {isEditUser === true ? (
                            <Form.Item style={{ textAlign: 'center', marginTop: '20px' }} className={styles.antFormItemMargin}>
                                <Button style={{ marginRight: '10px' }} onClick={handleOnCancleEditUser}>Hủy</Button>
                                <Button type='primary' htmlType='submit'>Lưu thay đổi</Button>
                            </Form.Item>
                        ) : ('')}
                    </Form>
                </div>
            </Card>
        </>
    )
}
export default PersonalInfo