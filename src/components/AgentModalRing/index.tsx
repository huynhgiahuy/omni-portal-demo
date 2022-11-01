import React, { useState } from 'react';
import styles from './index.less';
import { Modal, Space, Typography, Popover, Button, Collapse, Radio } from 'antd';
import { ExclamationCircleFilled, FullscreenExitOutlined, FullscreenOutlined, PhoneOutlined, UserOutlined, EditOutlined, HistoryOutlined } from '@ant-design/icons';
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

const { Panel } = Collapse;

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
      onCancel() { },
    });
  };

  const [valueCheckboxUser, setValueCheckboxUser] = useState<any>([]);
  const [isVisibleHistoryCall, setVisibleHistoryCall] = useState(false);
  const [isActiveIconHistory, setActiveIconHistory] = useState(false);
  const [isActiveIconNote, setActiveIconNote] = useState(false);

  const handleSelectForwardUser = (e: any) => {
    setValueCheckboxUser(e.target.value)
  }

  const handleClickIconHistory = () => {
    setVisibleHistoryCall(!isVisibleHistoryCall);
    setActiveIconHistory(!isActiveIconHistory)
  }

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
                      <div className={styles.forwardSelectButton}>
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
                <PhoneOutlined className={styles.phoneHandUp} onClick={showConfirm} />
              </Space>
            </div>
            {isVisibleHistoryCall ? (
              <div className={styles.infoCallHistory}>
                <div style={{ color: '#fff', paddingTop: '5px' }}>
                  <Typography.Text style={{ color: '#fff' }}>Lịch sử</Typography.Text>
                </div>
                <br></br>
                <div style={{ color: '#fff', paddingTop: '100px' }}>
                  <Typography.Text style={{ color: '#fff' }}>Người dùng chưa có lịch sử liên lạc</Typography.Text>
                </div>
              </div>
            ) : ''}
            {isFullScreenModal && <div className={styles.infoCallRightSide}>
              <EditOutlined className={isActiveIconNote ? `${styles.activeIconPhoneModal}` : `${styles.notActiveIconPhoneModal}`} />
              <HistoryOutlined className={isActiveIconHistory ? `${styles.activeIconPhoneModal}` : `${styles.notActiveIconPhoneModal}`} onClick={handleClickIconHistory} />
            </div>}
          </div>
        </div>
      </Modal>
    </>
  );
};

export default AgentModalRing;
