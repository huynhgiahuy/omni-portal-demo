import React, { useMemo, useState } from 'react';
import styles from './index.less';
import { Modal, Space, Typography, Popover, Button, Form, Input, Timeline, List } from 'antd';
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
import { dataUserContactProps } from '@/pages/omni-channel/report/services';

type AgentModalAnswerProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  isFullScreenModal: boolean;
  handleFullScreenModal: () => void;
  handleSelectForwardUser: (e: any) => void;
  handleClickIconHistory: () => void;
  handleClickIconNote: () => void;
  handelUserTransfer: (e: string) => void;
  valueCheckboxUser: any;
  isVisibleHistoryCall: boolean;
  isVisibleNoteCall: boolean;
  isActiveIconHistory: boolean;
  isActiveIconNote: boolean;
  hours: React.ReactNode;
  minutes: React.ReactNode;
  seconds: React.ReactNode;
  dataContacts: dataUserContactProps[];
  refTimer: React.MutableRefObject<any>;
};

const AgentModalAnswer: React.FC<AgentModalAnswerProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  isFullScreenModal,
  handleFullScreenModal,
  handleSelectForwardUser,
  handleClickIconHistory,
  handleClickIconNote,
  handelUserTransfer,
  valueCheckboxUser,
  isVisibleHistoryCall,
  isVisibleNoteCall,
  isActiveIconHistory,
  isActiveIconNote,
  dataContacts,
  hours,
  minutes,
  seconds,
  refTimer,
}) => {
  const [isPlay, setIsPlay] = useState(true);
  const [isRecord, setIsRecord] = useState(false);
  const [isPopoverForward, setPopoverForward] = useState(false);
  const [userSelect, setUserSelect] = useState('');

  const { confirm } = Modal;

  const listTransfer = useMemo(
    () =>
      dataContacts?.map((user) => ({ id: user.id, label: user.full_name, value: user.ip_phone })),
    [dataContacts],
  );

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
        refTimer.current.reset();
        handleCancel();
      },
      cancelText: 'Huỷ',
      onCancel() {},
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
              </>
            )}

            <Typography.Text style={{ color: 'white' }}>
              {hours}:{minutes}:{seconds}
            </Typography.Text>
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

        <div style={{ display: 'flex', height: '90%' }}>
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
              <Space
                className={isFullScreenModal ? styles.infoPhoneFullScreen : styles.infoPhone}
                direction="vertical"
              >
                <Typography.Text style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                  Chưa có trong danh bạ
                </Typography.Text>
                <Typography.Text style={{ color: 'white' }}>0908 778 291</Typography.Text>
              </Space>
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
                    setPopoverForward(false);
                  }}
                />
              ) : (
                <CaretRightOutlined
                  className={styles.phonePause}
                  onClick={() => {
                    setIsPlay(!isPlay);
                    setPopoverForward(false);
                  }}
                />
              )}

              <AudioFilled
                className={isRecord ? styles.noRecord : styles.record}
                onClick={() => {
                  setIsRecord(!isRecord);
                  setPopoverForward(false);
                }}
              />

              <Popover
                open={isPopoverForward}
                trigger="click"
                placement="bottom"
                content={
                  <>
                    <div style={{ marginTop: 20 }}>
                      <Typography.Text>Chuyển tiếp</Typography.Text>
                      <Typography.Text className={styles.forwardPhoneModal}>
                        {` {Danh sách nhân sự đang online trong hệ thống}`}
                      </Typography.Text>
                    </div>
                    <Input
                      size="large"
                      placeholder="Chọn nhân sự"
                      style={{ margin: '10px 0' }}
                      value={userSelect}
                      onChange={(e) => {
                        setUserSelect(e.target.value);
                        handelUserTransfer(e.target.value);
                      }}
                    />
                    <List
                      bordered
                      className={styles.listTransfer}
                      size="small"
                      dataSource={listTransfer}
                      renderItem={(item: { label: string; value: string }, index) => (
                        <List.Item
                          key={`${item.label}-${index}`}
                          style={{ cursor: 'pointer' }}
                          onClick={() => {
                            setUserSelect(item.label);
                          }}
                        >
                          <List.Item.Meta
                            avatar={<UserOutlined />}
                            title={`${item.label} - ${item.value}`}
                          />
                        </List.Item>
                      )}
                    />
                    <div className={styles.forwardSelectButton}>
                      <Button
                        style={{ marginRight: '10px' }}
                        onClick={() => setPopoverForward(!isPopoverForward)}
                      >
                        Hủy
                      </Button>
                      <Button
                        type="primary"
                        disabled
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
              <PhoneOutlined
                className={styles.phoneHandUp}
                onClick={() => {
                  setPopoverForward(false);

                  setTimeout(() => {
                    showConfirm();
                  });
                }}
              />
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
                          Ghi chú:
                          <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>
                            Sự cố phát sinh ảnh hưởng nhiều KHG yêu cầu kiểm tra lại
                          </Typography.Text>
                        </Typography.Paragraph>
                      </li>
                      <li>
                        <Typography.Paragraph
                          style={{ marginBottom: 'unset', fontWeight: 'bold', color: '#fff' }}
                        >
                          Nhân sự:
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
                    <Input className={styles.inputHistoryFormStyle} placeholder="Nhập thông tin" />
                  </Form.Item>
                  <Form.Item
                    label={
                      <Typography.Text style={{ color: '#fff' }}>Số điện thoại</Typography.Text>
                    }
                  >
                    <Input
                      className={styles.inputHistoryFormStyle}
                      placeholder="Nhập thông tin"
                      disabled
                    />
                  </Form.Item>
                  <Form.Item
                    label={<Typography.Text style={{ color: '#fff' }}>Email</Typography.Text>}
                  >
                    <Input className={styles.inputHistoryFormStyle} placeholder="Nhập thông tin" />
                  </Form.Item>
                  <Form.Item
                    label={
                      <Typography.Text style={{ color: '#fff' }}>Đơn vị công tác</Typography.Text>
                    }
                  >
                    <Input className={styles.inputHistoryFormStyle} placeholder="Nhập thông tin" />
                  </Form.Item>
                  <Form.Item
                    label={<Typography.Text style={{ color: '#fff' }}>Ghi chú</Typography.Text>}
                  >
                    <Input className={styles.inputHistoryFormStyle} placeholder="Nhập thông tin" />
                  </Form.Item>
                  <Form.Item>
                    <Space>
                      <Button>Hủy</Button>
                      <Button type="primary">Lưu</Button>
                    </Space>
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
  );
};

export default AgentModalAnswer;
