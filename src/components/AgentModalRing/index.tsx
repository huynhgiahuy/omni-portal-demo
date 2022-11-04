import React, { useState } from 'react';
import styles from './index.less';
import {
  Modal,
  Space,
  Typography,
  Popover,
  Button,
  Collapse,
  Radio,
  Form,
  Input,
  Timeline,
} from 'antd';
import {
  ExclamationCircleFilled,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PhoneOutlined,
  UserOutlined,
  EditOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import Arrow from '../../../public/arrow.svg';
import Share from '../../../public/share.svg';
import AvatarModal from '../../../public/avatar_modal_ring.png';

type AgentModalRingProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleOpenAnswer: () => void;
  isFullScreenModal: boolean;
  handleFullScreenModal: () => void;
  handleSelectForwardUser: (e: any) => void;
  handleClickIconHistory: () => void;
  handleClickIconNote: () => void;
  valueCheckboxUser: any;
  isVisibleHistoryCall: boolean;
  isVisibleNoteCall: boolean;
  isActiveIconHistory: boolean;
  isActiveIconNote: boolean;
};

const { Panel } = Collapse;

const AgentModalRing: React.FC<AgentModalRingProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  handleOpenAnswer,
  isFullScreenModal,
  handleFullScreenModal,
  handleSelectForwardUser,
  handleClickIconHistory,
  handleClickIconNote,
  valueCheckboxUser,
  isVisibleHistoryCall,
  isVisibleNoteCall,
  isActiveIconHistory,
  isActiveIconNote,
}) => {
  const [isPopoverForward, setPopoverForward] = useState(false);
  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: 'Kết thúc cuộc gọi',
      icon: <ExclamationCircleFilled style={{ fill: '#FAAD14' }} />,
      content: <p style={{ marginBottom: 46 }}>Bạn có chắc chắn muốn ngắt kết nối cuộc gọi này?</p>,
      bodyStyle: { padding: '24px 32px' },
      width: 437,
      centered: true,
      okText: 'Kết thúc',
      onOk() {
        handleCancel();
      },
      cancelText: 'Huỷ',
      onCancel() {},
    });
  };

  return (
    <>
      <Modal
        mask={false}
        centered={isFullScreenModal}
        open={isModalOpen}
        onOk={handleOk}
        closable={false}
        footer={false}
        width={isFullScreenModal ? 772 : 373}
        className={isFullScreenModal ? styles.modalRingFullScreen : styles.modalRing}
      >
        <div
          className={
            isFullScreenModal ? styles.modalRingContentFullScreen : styles.modalRingContent
          }
        >
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'start',
            }}
          >
            <Space align="start">
              <Space>
                <PhoneOutlined className={styles.modalRingIcon} />
                <img style={{ position: 'absolute', left: 25, top: 8 }} src={Arrow} alt="arrow" />
              </Space>
              <p style={{ color: 'white' }}>Cuộc gọi đến</p>
            </Space>
            {isFullScreenModal ? (
              <FullscreenExitOutlined
                className={styles.modalRingOutlined}
                onClick={handleFullScreenModal}
              />
            ) : (
              <FullscreenOutlined
                className={styles.modalRingOutlined}
                onClick={handleFullScreenModal}
              />
            )}
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <Space
                style={{ width: '100%' }}
                size={[30, 0]}
                direction={isFullScreenModal ? 'vertical' : 'horizontal'}
                align="center"
              >
                <div className={isFullScreenModal ? styles.avatarFullScreen : styles.avatar}>
                  <div className={styles.phone}>
                    <span className={styles.material_icons}></span>
                  </div>
                  <img
                    src={AvatarModal}
                    alt=""
                    width={isFullScreenModal ? 105 : 58}
                    height={isFullScreenModal ? 105 : 58}
                    style={{ position: 'relative', left: -8, zIndex: 2 }}
                  />
                  <div className={styles.circle1} />
                  <div className={styles.circle2} />
                </div>
                <div className={isFullScreenModal ? styles.infoPhoneFullScreen : styles.infoPhone}>
                  <Typography.Text style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                    Chưa có trong danh bạ
                  </Typography.Text>
                  <br />
                  <Typography.Text style={{ fontSize: 13, fontWeight: 400, color: 'white' }}>
                    0921 197 398
                  </Typography.Text>
                </div>
              </Space>
              <Space
                size={[18, 0]}
                align="start"
                style={{ width: '100%', justifyContent: 'center', zIndex: 2 }}
              >
                <PhoneOutlined className={styles.phonePickUp} onClick={handleOpenAnswer} />
                <Popover
                  open={isPopoverForward}
                  trigger="click"
                  placement="bottom"
                  title={
                    <>
                      <Typography.Text>Chuyển tiếp</Typography.Text>
                      <Typography.Text className={styles.forwardPhoneModal}>
                        {' '}
                        (Danh sách nhân sự đang online trong hệ thống)
                      </Typography.Text>
                    </>
                  }
                  content={
                    <>
                      <div style={{ paddingBottom: '10px' }}>
                        <Typography.Text>
                          Nhân sự đã chọn:{' '}
                          <Typography.Text style={{ fontWeight: 'bold' }}>
                            {valueCheckboxUser === '' ? 'Chưa lọc' : valueCheckboxUser}
                          </Typography.Text>
                        </Typography.Text>
                      </div>
                      <Collapse>
                        <Panel
                          key="user"
                          header={<Typography.Text strong>Danh sách nhân sự</Typography.Text>}
                        >
                          <Radio.Group onChange={handleSelectForwardUser}>
                            <Space direction="vertical">
                              <Radio value="Trần Phương Anh - 18942">
                                <UserOutlined /> Trần Phương Anh - 18942
                              </Radio>
                              <Radio value="Trần Phương Anh - 18943">
                                <UserOutlined /> Trần Phương Anh - 18943
                              </Radio>
                              <Radio value="Trần Phương Anh - 18944">
                                <UserOutlined /> Trần Phương Anh - 18944
                              </Radio>
                            </Space>
                          </Radio.Group>
                        </Panel>
                      </Collapse>
                      <div className={styles.forwardSelectButton}>
                        <Button
                          style={{ marginRight: '10px' }}
                          onClick={() => setPopoverForward(!isPopoverForward)}
                        >
                          Hủy
                        </Button>
                        <Button
                          type="primary"
                          onClick={() => {
                            setPopoverForward(false);
                            setTimeout(() => {
                              handleCancel();
                            }, 0);
                          }}
                        >
                          Chuyển
                        </Button>
                      </div>
                    </>
                  }
                >
                  <img
                    src={Share}
                    alt="share"
                    className={styles.phoneShare}
                    onClick={() => setPopoverForward(!isPopoverForward)}
                  />
                </Popover>
                <PhoneOutlined className={styles.phoneHandUp} onClick={showConfirm} />
              </Space>
            </div>
            {isFullScreenModal && isVisibleHistoryCall ? (
              <div className={styles.infoCallHistory}>
                <div className={styles.historyFormHeaderLayout}>
                  <Typography.Text className={styles.historyFormHeaderStyle}>
                    Lịch sử
                  </Typography.Text>
                  <hr></hr>
                </div>
                <div className={styles.historyFormContentLayout}>
                  <Timeline>
                    <Timeline.Item>
                      <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>
                        22/09/2022 14:20
                      </Typography.Paragraph>
                      <div className={styles.historyFormContentFlex1}>
                        <Typography.Paragraph style={{ marginBottom: 'unset', color: '#54FF00' }}>
                          Cuộc gọi đến
                        </Typography.Paragraph>
                        <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>
                          00:12
                        </Typography.Paragraph>
                      </div>
                      <ul style={{ listStyleType: 'disc', color: '#fff' }}>
                        <li>
                          <Typography.Paragraph
                            style={{
                              marginBottom: 'unset',
                              paddingRight: '50px',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}
                          >
                            Ghi chú:{' '}
                            <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>
                              Sự cố phát sinh ảnh hưởng nhiều KHG yêu cầu kiểm tra lại
                            </Typography.Text>
                          </Typography.Paragraph>
                        </li>
                        <li>
                          <Typography.Paragraph
                            style={{ marginBottom: 'unset', fontWeight: 'bold', color: '#fff' }}
                          >
                            Nhân sự:{' '}
                            <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>
                              HuyenLM2
                            </Typography.Text>
                          </Typography.Paragraph>
                        </li>
                      </ul>
                    </Timeline.Item>
                    <Timeline.Item>
                      <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>
                        22/09/2022 14:20
                      </Typography.Paragraph>
                      <div className={styles.historyFormContentFlex1}>
                        <Typography.Paragraph style={{ marginBottom: 'unset', color: '#54FF00' }}>
                          Cuộc gọi đến
                        </Typography.Paragraph>
                        <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>
                          00:12
                        </Typography.Paragraph>
                      </div>
                      <ul style={{ listStyleType: 'disc', color: '#fff' }}>
                        <li>
                          <Typography.Paragraph
                            style={{
                              marginBottom: 'unset',
                              paddingRight: '50px',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}
                          >
                            Ghi chú:{' '}
                            <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>
                              Sự cố phát sinh ảnh hưởng nhiều KHG yêu cầu kiểm tra lại
                            </Typography.Text>
                          </Typography.Paragraph>
                        </li>
                        <li>
                          <Typography.Paragraph
                            style={{ marginBottom: 'unset', fontWeight: 'bold', color: '#fff' }}
                          >
                            Nhân sự:{' '}
                            <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>
                              HuyenLM2
                            </Typography.Text>
                          </Typography.Paragraph>
                        </li>
                      </ul>
                    </Timeline.Item>
                    <Timeline.Item>
                      <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>
                        22/09/2022 14:20
                      </Typography.Paragraph>
                      <div className={styles.historyFormContentFlex1}>
                        <Typography.Paragraph style={{ marginBottom: 'unset', color: '#54FF00' }}>
                          Cuộc gọi đến
                        </Typography.Paragraph>
                        <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>
                          00:12
                        </Typography.Paragraph>
                      </div>
                      <ul style={{ listStyleType: 'disc', color: '#fff' }}>
                        <li>
                          <Typography.Paragraph
                            style={{
                              marginBottom: 'unset',
                              paddingRight: '50px',
                              fontWeight: 'bold',
                              color: '#fff',
                            }}
                          >
                            Ghi chú:{' '}
                            <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>
                              Sự cố phát sinh ảnh hưởng nhiều KHG yêu cầu kiểm tra lại
                            </Typography.Text>
                          </Typography.Paragraph>
                        </li>
                        <li>
                          <Typography.Paragraph
                            style={{ marginBottom: 'unset', fontWeight: 'bold', color: '#fff' }}
                          >
                            Nhân sự:{' '}
                            <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>
                              HuyenLM2
                            </Typography.Text>
                          </Typography.Paragraph>
                        </li>
                      </ul>
                    </Timeline.Item>
                  </Timeline>
                </div>
              </div>
            ) : isFullScreenModal && isVisibleNoteCall ? (
              <div className={styles.infoCallNote}>
                <div className={styles.noteFormHeaderLayout}>
                  <Typography.Text className={styles.noteFormHeaderStyle}>Ghi chú</Typography.Text>
                  <hr></hr>
                </div>
                <div className={styles.noteFormContentLayout}>
                  <Form layout="vertical" className={styles.noteFormPhoneCall}>
                    <Form.Item
                      label={<Typography.Text style={{ color: '#fff' }}>Họ và tên</Typography.Text>}
                    >
                      <Input
                        className={styles.inputHistoryFormStyle}
                        placeholder="Nhập thông tin"
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <Typography.Text style={{ color: '#fff' }}>Số điện thoại</Typography.Text>
                      }
                    >
                      <Input
                        className={styles.inputHistoryFormStyle}
                        placeholder="Nhập thông tin"
                      />
                    </Form.Item>
                    <Form.Item
                      label={<Typography.Text style={{ color: '#fff' }}>Email</Typography.Text>}
                    >
                      <Input
                        className={styles.inputHistoryFormStyle}
                        placeholder="Nhập thông tin"
                      />
                    </Form.Item>
                    <Form.Item
                      label={
                        <Typography.Text style={{ color: '#fff' }}>Đơn vị công tác</Typography.Text>
                      }
                    >
                      <Input
                        className={styles.inputHistoryFormStyle}
                        placeholder="Nhập thông tin"
                      />
                    </Form.Item>
                    <Form.Item
                      label={<Typography.Text style={{ color: '#fff' }}>Ghi chú</Typography.Text>}
                    >
                      <Input
                        className={styles.inputHistoryFormStyle}
                        placeholder="Nhập thông tin"
                      />
                    </Form.Item>
                  </Form>
                </div>
              </div>
            ) : (
              ''
            )}
            {isFullScreenModal && (
              <div className={styles.infoCallRightSide}>
                <EditOutlined
                  className={
                    isActiveIconNote
                      ? `${styles.activeIconPhoneModal}`
                      : `${styles.notActiveIconPhoneModal}`
                  }
                  onClick={handleClickIconNote}
                />
                <HistoryOutlined
                  className={
                    isActiveIconHistory
                      ? `${styles.activeIconPhoneModal}`
                      : `${styles.notActiveIconPhoneModal}`
                  }
                  onClick={handleClickIconHistory}
                />
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AgentModalRing;
