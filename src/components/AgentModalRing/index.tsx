import React, { useState } from 'react';
import styles from './index.less';
import { Modal, Space, Typography, Popover, Button, Collapse, Radio } from 'antd';
import { FullscreenExitOutlined, FullscreenOutlined, PhoneOutlined, UserOutlined } from '@ant-design/icons';
import Arrow from '../../../public/arrow.svg';
import Share from '../../../public/share.svg';
import AvatarModal from '../../../public/avatar_modal_ring.png';

type AgentModalRingProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
};

const { Panel } = Collapse;

const AgentModalRing: React.FC<AgentModalRingProps> = ({ isModalOpen, handleOk, handleCancel }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [valueCheckboxUser, setValueCheckboxUser] = useState<any>([]);

  const handleSelectForwardUser = (e: any) => {
    setValueCheckboxUser(e.target.value)
  }

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
          style={{ width: '100%', justifyContent: 'center', zIndex: 2 }}
        >
          <PhoneOutlined
            className={styles.phonePickUp}
            onClick={() => {
              console.log(1);
            }}
          />
          <Popover
            trigger="click"
            placement='bottom'
            title={
              <>
                <Typography.Text>Chuyển tiếp</Typography.Text>
                <Typography.Text className={styles.forwardPhoneModal}> (Danh sách nhân sự đang online trong hệ thống)</Typography.Text>
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
                <div style={{ display: 'flex', justifyContent: 'right', paddingTop: '10px' }}>
                  <Button style={{ marginRight: '10px' }}>Hủy</Button>
                  <Button type='primary'>Chuyển</Button>
                </div>
              </>
            }
          >
            <img
              src={Share}
              alt="share"
              className={styles.phoneShare}
            />
          </Popover>
          <PhoneOutlined className={styles.phoneHandUp} onClick={handleCancel} />
        </Space>
      </div >
    </Modal >
  );
};

export default AgentModalRing;
