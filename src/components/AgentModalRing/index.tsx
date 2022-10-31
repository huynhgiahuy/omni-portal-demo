import React, { useState } from 'react';
import styles from './index.less';
import { Modal, Space, Typography } from 'antd';
import { FullscreenExitOutlined, FullscreenOutlined, PhoneOutlined } from '@ant-design/icons';
import Arrow from '../../../public/arrow.svg';
import Share from '../../../public/share.svg';
import AvatarModal from '../../../public/avatar_modal_ring.png';

type AgentModalRingProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const AgentModalRing: React.FC<AgentModalRingProps> = ({ isModalOpen, handleOk, handleCancel }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  return (
    <Modal
      mask={false}
      centered={isFullScreen}
      // title="Basic Modal"
      open={isModalOpen}
      onOk={handleOk}
      closable={false}
      footer={false}
      width={isFullScreen ? 772 : 373}
      className={isFullScreen ? styles.modalRingFullScreen : styles.modalRing}
    >
      <div className={isFullScreen ? styles.modalRingContentFullScreen : styles.modalRingContent}>
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
          {isFullScreen ? (
            <FullscreenExitOutlined
              className={styles.modalRingOutlined}
              onClick={() => {
                setIsFullScreen(!isFullScreen);
              }}
            />
          ) : (
            <FullscreenOutlined
              className={styles.modalRingOutlined}
              onClick={() => {
                setIsFullScreen(!isFullScreen);
              }}
            />
          )}
        </div>

        <Space
          style={{ width: '100%' }}
          size={[30, 0]}
          direction={isFullScreen ? 'vertical' : 'horizontal'}
          align="center"
        >
          <div className={isFullScreen ? styles.avatarFullScreen : styles.avatar}>
            <div className={styles.phone}>
              <span className={styles.material_icons}></span>
            </div>
            <img
              src={AvatarModal}
              alt=""
              width={isFullScreen ? 105 : 58}
              height={isFullScreen ? 105 : 58}
              style={{ position: 'relative', left: -8, zIndex: 2 }}
            />
            <div className={styles.circle1} />
            <div className={styles.circle2} />
          </div>
          <div className={isFullScreen ? styles.infoPhoneFullScreen : styles.infoPhone}>
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
          <PhoneOutlined
            className={styles.phonePickUp}
            onClick={() => {
              console.log(1);
            }}
          />

          <img
            src={Share}
            alt="share"
            className={styles.phoneShare}
            onClick={() => {
              console.log(1);
            }}
          />

          <PhoneOutlined className={styles.phoneHandUp} onClick={handleCancel} />
        </Space>
      </div>
    </Modal>
  );
};

export default AgentModalRing;
