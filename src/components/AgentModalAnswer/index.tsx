import React, { useState } from 'react';
import styles from './index.less';
import { Modal, Space, Typography, Popover, Button, Radio, Collapse, Form, Input, Timeline } from 'antd';
import {
  AudioFilled,
  CaretRightOutlined,
  ExclamationCircleFilled,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PauseOutlined,
  PhoneOutlined,
  UserOutlined,
  EditOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import Arrow from '../../../public/arrow.svg';
import Share from '../../../public/share.svg';
import AvatarModal from '../../../public/avatar_modal_ring.png';

type AgentModalAnswerProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
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

const AgentModalAnswer: React.FC<AgentModalAnswerProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  isFullScreenModal,
  handleFullScreenModal,
  handleSelectForwardUser,
  handleClickIconHistory,
  handleClickIconNote,
  valueCheckboxUser,
  isVisibleHistoryCall,
  isVisibleNoteCall,
  isActiveIconHistory,
  isActiveIconNote
}) => {
  const [isPlay, setIsPlay] = useState(true);
  const [isRecord, setIsRecord] = useState(false);

  const { confirm } = Modal;

  const showConfirm = () => {
    confirm({
      title: 'Kết thúc cuộc gọi',
      icon: <ExclamationCircleFilled style={{ fill: '#FAAD14' }} />,
      content: <p style={{ marginBottom: 46 }}>Bạn có chắc chắn muốn ngắt kết nối cuộc gọi này?</p>,
      centered: true,
      width: 437,
      bodyStyle: { padding: '24px 32px' },
      okText: 'Kết thúc',
      onOk() {
        handleCancel();
      },
      cancelText: 'Huỷ',
      onCancel() { },
    });
  };
  return (
    <Modal
      mask={false}
      centered={isFullScreenModal}
      open={isModalOpen}
      onOk={handleOk}
      closable={false}
      footer={false}
      zIndex={10}
      wrapClassName={!isFullScreenModal && styles.wrapModal}
      width={isFullScreenModal ? 772 : 373}
      className={isFullScreenModal ? styles.modalAnswerFullScreen : styles.modalAnswer}
    >
      <div
        className={
          isFullScreenModal ? styles.modalAnswerContentFullScreen : styles.modalAnswerContent
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
          <Space align="start" size={[20, 0]}>
            {isFullScreenModal && (
              <>
                <Space>
                  <PhoneOutlined className={styles.modalAnswerIcon} />
                  <img style={{ position: 'absolute', left: 25, top: 8 }} src={Arrow} alt="arrow" />
                </Space>
                <Typography.Text style={{ color: 'white' }}>Cuộc gọi đi</Typography.Text>
                <Typography.Text style={{ color: 'white' }}>0908 778 291</Typography.Text>
              </>
            )}

            <Typography.Text style={{ color: 'white' }}>01:23:02</Typography.Text>
          </Space>
          {isFullScreenModal ? (
            <FullscreenExitOutlined
              className={styles.modalAnswerOutlined}
              onClick={handleFullScreenModal}
            />
          ) : (
            <FullscreenOutlined
              className={styles.modalAnswerOutlined}
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
              </div>
              <div className={isFullScreenModal ? styles.infoPhoneFullScreen : styles.infoPhone}>
                <Typography.Text style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                  Chưa có trong danh bạ
                </Typography.Text>
              </div>
            </Space>
            <Space
              size={[18, 0]}
              align="start"
              style={{ width: '100%', justifyContent: 'center', paddingBottom: 18, zIndex: 2 }}
            >
              {isPlay ? (
                <PauseOutlined
                  className={styles.phonePlay}
                  onClick={() => {
                    setIsPlay(!isPlay);
                  }}
                />
              ) : (
                <CaretRightOutlined
                  className={styles.phonePause}
                  onClick={() => {
                    setIsPlay(!isPlay);
                  }}
                />
              )}

              <AudioFilled
                className={isRecord ? styles.noRecord : styles.record}
                onClick={() => {
                  setIsRecord(!isRecord);
                }}
              />

              <Popover
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
                    <div style={{ paddingBottom: "10px" }}>
                      <Typography.Text>Nhân sự đã chọn: <Typography.Text style={{ fontWeight: 'bold' }}>{valueCheckboxUser === '' ? 'Chưa lọc' : valueCheckboxUser}</Typography.Text></Typography.Text>
                    </div>
                    <Collapse>
                      <Panel key="user" header={
                        <Typography.Text strong>Danh sách nhân sự</Typography.Text>
                      }
                      >
                        <Radio.Group onChange={handleSelectForwardUser}>
                          <Space direction="vertical">
                            <Radio value="Trần Phương Anh - 18942"><UserOutlined /> Trần Phương Anh - 18942</Radio>
                            <Radio value="Trần Phương Anh - 18943"><UserOutlined /> Trần Phương Anh - 18943</Radio>
                            <Radio value="Trần Phương Anh - 18944"><UserOutlined /> Trần Phương Anh - 18944</Radio>
                          </Space>
                        </Radio.Group>
                      </Panel>
                    </Collapse>
                    <div className={styles.forwardSelectButton}>
                      <Button style={{ marginRight: '10px' }}>Hủy</Button>
                      <Button type='primary'>Chuyển</Button>
                    </div>
                  </>
                }
              >
                <img src={Share} alt="share" className={styles.phoneShare} />
              </Popover>
              <PhoneOutlined className={styles.phoneHandUp} onClick={showConfirm} />
            </Space>
          </div>
          {isFullScreenModal && isVisibleHistoryCall ? (
            <div className={styles.infoCallHistory}>
              <div className={styles.historyFormHeaderLayout}>
                <Typography.Text className={styles.historyFormHeaderStyle}>Lịch sử</Typography.Text>
                <hr></hr>
              </div>
              <div className={styles.historyFormContentLayout}>
                <Timeline>
                  <Timeline.Item>
                    <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>22/09/2022 14:20</Typography.Paragraph>
                    <div className={styles.historyFormContentFlex1}>
                      <Typography.Paragraph style={{ marginBottom: 'unset', color: '#54FF00' }}>Cuộc gọi đến</Typography.Paragraph>
                      <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>00:12</Typography.Paragraph>
                    </div>
                    <ul style={{ listStyleType: 'disc', color: '#fff' }}>
                      <li>
                        <Typography.Paragraph className={styles.historyFormContentFlex2}>
                          Ghi chú: <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>Sự cố phát sinh ảnh hưởng nhiều KHG yêu cầu kiểm tra lại</Typography.Text>
                        </Typography.Paragraph>
                      </li>
                      <li>
                        <Typography.Paragraph className={styles.historyFormContentFlex3}>
                          Nhân sự: <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>HuyenLM2</Typography.Text>
                        </Typography.Paragraph>
                      </li>
                    </ul>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>22/09/2022 14:20</Typography.Paragraph>
                    <div className={styles.historyFormContentFlex1}>
                      <Typography.Paragraph style={{ marginBottom: 'unset', color: '#54FF00' }}>Cuộc gọi đến</Typography.Paragraph>
                      <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>00:12</Typography.Paragraph>
                    </div>
                    <ul style={{ listStyleType: 'disc', color: '#fff' }}>
                      <li>
                        <Typography.Paragraph className={styles.historyFormContentFlex2}>
                          Ghi chú: <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>Sự cố phát sinh ảnh hưởng nhiều KHG yêu cầu kiểm tra lại</Typography.Text>
                        </Typography.Paragraph>
                      </li>
                      <li>
                        <Typography.Paragraph className={styles.historyFormContentFlex3}>
                          Nhân sự: <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>HuyenLM2</Typography.Text>
                        </Typography.Paragraph>
                      </li>
                    </ul>
                  </Timeline.Item>
                  <Timeline.Item>
                    <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>22/09/2022 14:20</Typography.Paragraph>
                    <div className={styles.historyFormContentFlex1}>
                      <Typography.Paragraph style={{ marginBottom: 'unset', color: '#54FF00' }}>Cuộc gọi đến</Typography.Paragraph>
                      <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>00:12</Typography.Paragraph>
                    </div>
                    <ul style={{ listStyleType: 'disc', color: '#fff' }}>
                      <li>
                        <Typography.Paragraph className={styles.historyFormContentFlex2}>
                          Ghi chú: <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>Sự cố phát sinh ảnh hưởng nhiều KHG yêu cầu kiểm tra lại</Typography.Text>
                        </Typography.Paragraph>
                      </li>
                      <li>
                        <Typography.Paragraph className={styles.historyFormContentFlex3}>
                          Nhân sự: <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>HuyenLM2</Typography.Text>
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
                <Form layout='vertical' className={styles.noteFormPhoneCall}>
                  <Form.Item
                    label={<Typography.Text style={{ color: '#fff' }}>Họ và tên</Typography.Text>}
                  >
                    <Input className={styles.inputHistoryFormStyle} placeholder="Nhập thông tin" />
                  </Form.Item>
                  <Form.Item
                    label={<Typography.Text style={{ color: '#fff' }}>Số điện thoại</Typography.Text>}
                  >
                    <Input className={styles.inputHistoryFormStyle} placeholder="Nhập thông tin" />
                  </Form.Item>
                  <Form.Item
                    label={<Typography.Text style={{ color: '#fff' }}>Email</Typography.Text>}
                  >
                    <Input className={styles.inputHistoryFormStyle} placeholder="Nhập thông tin" />
                  </Form.Item>
                  <Form.Item
                    label={<Typography.Text style={{ color: '#fff' }}>Đơn vị công tác</Typography.Text>}
                  >
                    <Input className={styles.inputHistoryFormStyle} placeholder="Nhập thông tin" />
                  </Form.Item>
                  <Form.Item
                    label={<Typography.Text style={{ color: '#fff' }}>Ghi chú</Typography.Text>}
                  >
                    <Input className={styles.inputHistoryFormStyle} placeholder="Nhập thông tin" />
                  </Form.Item>
                </Form>
              </div>
            </div>
          ) : ''}
          {isFullScreenModal && <div className={styles.infoCallRightSide}>
            <EditOutlined className={isActiveIconNote ? `${styles.activeIconPhoneModal}` : `${styles.notActiveIconPhoneModal}`} onClick={handleClickIconNote} />
            <HistoryOutlined className={isActiveIconHistory ? `${styles.activeIconPhoneModal}` : `${styles.notActiveIconPhoneModal}`} onClick={handleClickIconHistory} />
          </div>}
        </div>
      </div>
    </Modal>
  );
};

export default AgentModalAnswer;
