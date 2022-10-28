import React from 'react';
import { Row, Col, Card, Typography, Button, Avatar } from 'antd';
import styles from '../setting/style.less';
import ImageAvatar from '../setting/avatar_test.png';

const PersonalInfo: React.FC = () => {
    return (
        <>
            <Card
                title={
                    <div className={styles.antAvatarImg}>
                        <Avatar src={ImageAvatar} className={styles.antImg}></Avatar>
                    </div>
                }
                className={styles.detailCardLayout}
            >
                <div style={{ paddingTop: '30px' }}>
                    <Row>
                        <Col md={2} style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            <Button
                                className={styles.antSettingBtn}
                                style={{ backgroundColor: "#064b8b", color: '#fff' }}
                            >
                                Thông tin cá nhân
                            </Button>
                            <Button
                                className={styles.antSettingBtn}
                                style={{ color: "#064b8b" }}
                            >
                                Mật khẩu
                            </Button>
                            <Button
                                className={styles.antSettingBtn}
                                style={{ color: "#064b8b" }}
                            >
                                Thiết bị
                            </Button>
                        </Col>
                        <Col md={1}></Col>
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
                        </Col>
                    </Row>
                </div>
            </Card>
        </>
    )
}
export default PersonalInfo