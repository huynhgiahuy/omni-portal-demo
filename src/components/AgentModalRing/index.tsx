import React, { useState } from 'react';
import styles from './index.less';
import { Modal, Space, Typography, Popover, Button, Form, Select } from 'antd';
import {
  ExclamationCircleFilled,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PhoneOutlined,
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
};

const AgentModalRing: React.FC<AgentModalRingProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  handleOpenAnswer,
  isFullScreenModal,
  handleFullScreenModal,
}) => {
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
            style={{ width: '100%', justifyContent: 'center', paddingBottom: 18, zIndex: 2 }}
          >
            <PhoneOutlined className={styles.phonePickUp} onClick={handleOpenAnswer} />
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
    </>
  );
};

export default AgentModalRing;
