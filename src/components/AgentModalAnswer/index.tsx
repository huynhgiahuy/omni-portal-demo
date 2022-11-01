import React, { useState } from 'react';
import styles from './index.less';
import { Modal, Space, Typography, Popover, Button, Form, Select } from 'antd';
import {
  AudioFilled,
  CaretRightOutlined,
  ExclamationCircleFilled,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PauseOutlined,
  PhoneOutlined,
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
};

const AgentModalAnswer: React.FC<AgentModalAnswerProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  isFullScreenModal,
  handleFullScreenModal,
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
              <Form>
                <Form.Item>
                  <Select placeholder="Chọn nhân sự">
                    <Select.Option value="data1">Trần Phương Anh Đào - 18032</Select.Option>
                    <Select.Option value="data2">Trần Phương Anh Đào - 18032</Select.Option>
                    <Select.Option value="data3">Trần Phương Anh Đào - 18032</Select.Option>
                  </Select>
                </Form.Item>
                <Button>Hủy</Button>
                <Button>Chuyển</Button>
              </Form>
            }
          >
            <img src={Share} alt="share" className={styles.phoneShare} />
          </Popover>
          <PhoneOutlined className={styles.phoneHandUp} onClick={showConfirm} />
        </Space>
      </div>
    </Modal>
  );
};

export default AgentModalAnswer;
