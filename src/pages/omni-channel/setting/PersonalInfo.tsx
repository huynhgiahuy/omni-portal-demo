import React from 'react';
import { Row, Col, Card, Typography, Button, Avatar, Tag, Space, Badge } from 'antd';
import { EditOutlined, WindowsFilled } from '@ant-design/icons';
import styles from '../setting/style.less';
import ImageAvatar from '../setting/avatar_test.png';

const PersonalInfo: React.FC = () => {
    return (
        <>
            <Card
                title={
                    <div>
                        <div className={styles.antAvatarImg}>
                            <Avatar src={ImageAvatar} className={styles.antImg}></Avatar>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <EditOutlined style={{ fontSize: '22px' }} />
                        </div>
                    </div>
                }
                className={styles.detailCardLayout}
            >
                <div style={{ paddingTop: '10px' }}>
                    <Row>
                        <Col md={3}></Col>
                        <Col md={9}>
                            <Typography.Text className={styles.antFieldDisplay}>Giới thiệu về bạn</Typography.Text>
                            <hr></hr>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Họ tên</Typography.Text>
                                <Typography.Text className={styles.antBold}>Lâm Mỹ Huyền</Typography.Text>
                            </div>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Địa chỉ Mail</Typography.Text>
                                <Typography.Text className={styles.antBold}>HuyenLM@fpt.com.vn</Typography.Text>
                            </div>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Chức danh</Typography.Text>
                                <Typography.Text className={styles.antBold}>Nhan vien - CB Van hanh he thong</Typography.Text>
                            </div>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Phòng ban</Typography.Text>
                                <Typography.Text className={styles.antBold}>Vận hành</Typography.Text>
                            </div>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Cấp độ</Typography.Text>
                                <Typography.Text className={styles.antBold}>Level 2</Typography.Text>
                            </div>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Tổ chức</Typography.Text>
                                <Typography.Text className={styles.antBold}>FTEL - SCC</Typography.Text>
                            </div>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Địa chỉ</Typography.Text>
                                <Typography.Text className={styles.antBold}>Quận Thủ Đức</Typography.Text>
                            </div>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Công tác</Typography.Text>
                                <Typography.Text className={styles.antBold}>FPT Tân Thuận</Typography.Text>
                            </div>
                            <Typography.Text className={styles.antFieldDisplay}>Bảo mật</Typography.Text>
                            <hr></hr>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Mật khẩu hiện tại</Typography.Text>
                                <Typography.Text className={styles.antBold}>Huyen2918***</Typography.Text>
                            </div>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Lần cập nhật cuối cùng</Typography.Text>
                                <Typography.Text className={styles.antBold}>01/09/2022</Typography.Text>
                            </div>
                        </Col>
                        <Col md={2}></Col>
                        <Col md={9}>
                            <Typography.Text className={styles.antFieldDisplay}>Liên hệ</Typography.Text>
                            <hr></hr>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>Số điện thoại cá nhân</Typography.Text>
                                <Typography.Text className={styles.antBold}>9669966996</Typography.Text>
                            </div>
                            <div className={styles.antDataDisplay}>
                                <Typography.Text className={styles.antTextStyle}>IP Phone</Typography.Text>
                                <Typography.Text className={styles.antBold}>18234</Typography.Text>
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
                </div>
            </Card>
        </>
    )
}
export default PersonalInfo