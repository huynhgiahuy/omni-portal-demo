import React, { useEffect, useMemo, useState } from 'react';
import styles from './index.less';
import {
  Modal,
  Space,
  Typography,
  Popover,
  Button,
  Form,
  Input,
  Timeline,
  Row,
  Col,
  Divider,
  List,
  message,
} from 'antd';
import {
  ExclamationCircleFilled,
  FullscreenExitOutlined,
  FullscreenOutlined,
  PhoneOutlined,
  UserOutlined,
  EditOutlined,
  HistoryOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import Arrow from '../../../public/arrow.svg';
import Share from '../../../public/share.svg';
import AvatarModal from '../../../public/avatar_modal_ring.png';
import { dataUserContactProps, requestGetTakeCallNote } from '@/pages/omni-channel/report/services';
import { debounce } from 'lodash';
import { dataProps } from '../RightContent';
import { useRequest } from 'umi';
import moment from 'moment';

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
  handelUserTransfer: (e: string) => void;
  valueCheckboxUser: any;
  isVisibleHistoryCall: boolean;
  isVisibleNoteCall: boolean;
  isActiveIconHistory: boolean;
  isActiveIconNote: boolean;
  dataContacts: dataUserContactProps[];
  refTimer: React.MutableRefObject<any>;
  dataCall?: dataProps;
};

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
  handelUserTransfer,
  valueCheckboxUser,
  isVisibleHistoryCall,
  isVisibleNoteCall,
  isActiveIconHistory,
  isActiveIconNote,
  dataContacts,
  refTimer,
  dataCall,
}) => {
  const [form] = Form.useForm();
  const [isPopoverForward, setPopoverForward] = useState(false);
  const [userSelect, setUserSelect] = useState('');
  const [statusCall, setStateCall] = useState('Cuộc gọi');
  const [nameCall, setNameCall] = useState('Chưa có trong danh bạ');
  const [phoneCall, setPhoneCall] = useState('000 000 0000');
  const [listNote, setListNote] = useState<any>();
  const { confirm } = Modal;

  const token = window.localStorage?.getItem('access_token');

  const getTakeCallNote = useRequest(
    async (data) => {
      const res: { success: boolean; data: any } = await requestGetTakeCallNote(
        token ? token : '',
        data ? data : { phone_number: dataCall?.phone },
      );
      if (!res.success) {
        message.error('Không lấy được lịch sử note');
        return;
      } else {
        setListNote(res.data[0]);
      }
      return res;
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (isModalOpen) {
      getTakeCallNote.run({ phone_number: dataCall?.contact?.phone_number });
    }
  }, [isModalOpen]);

  const listTransfer = useMemo(
    () =>
      dataContacts?.map((user) => ({ id: user.id, label: user.full_name, value: user.ip_phone })),
    [dataContacts],
  );
  useEffect(() => {
    if (dataCall) {
      setNameCall(dataCall.contact?.full_name);
      setPhoneCall(dataCall.contact?.phone_number);
      form.setFieldsValue(dataCall?.contact);
      if (dataCall.direction === 'receive') {
        setStateCall('Cuộc gọi đến');
      } else {
        setStateCall('Cuộc gọi đi');
      }
    }
  });
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

  useEffect(() => {
    setPopoverForward(false);
  }, [dataCall]);

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
              <p style={{ color: 'white' }}>{statusCall}</p>
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
                    {nameCall ? nameCall : 'Chưa có trong danh bạ'}
                  </Typography.Text>
                  <br />
                  <Typography.Text style={{ fontSize: 13, fontWeight: 400, color: 'white' }}>
                    {phoneCall ? phoneCall : '0000 000 000'}
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
                  // onClick={() => {
                  //   setPopoverForward(false);
                  //   refTimer.current.reset();
                  //   setTimeout(() => {
                  //     handleOpenAnswer();
                  //   }, 0);
                  // }}
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
                {/* {!isFullScreenModal && (
                  <Popover
                    placement="bottom"
                    trigger="click"
                    title={
                      <Typography.Text style={{ fontWeight: 'bold', fontSize: 18 }}>
                        Ghi chú
                      </Typography.Text>
                    }
                    content={
                      <div style={{ width: 400 }}>
                        <Row>
                          <Col span={8}>08:30 18/11/2022</Col>
                          <Col span={1}></Col>
                          <Col span={15}>
                            Sự cố phát sinh và ảnh hưởng nhiều KHG, HuyenLM2 đã check với các bên
                            liên quan
                          </Col>
                        </Row>
                        <Divider />
                        <Row>
                          <Col span={8}>08:30 18/11/2022</Col>
                          <Col span={1}></Col>
                          <Col span={15}>Chưa rõ yêu cầu hỗ trợ</Col>
                        </Row>
                      </div>
                    }
                  >
                    <UnorderedListOutlined
                      className={styles.historyNote}
                      onClick={() => {
                        setPopoverForward(false);
                      }}
                    />
                  </Popover>
                )} */}

                <PhoneOutlined
                  className={styles.phoneHandUp}
                  // onClick={() => {
                  //   setPopoverForward(false);
                  //   setTimeout(() => {
                  //     showConfirm();
                  //   }, 0);
                  // }}
                />
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
                    {listNote?.note?.length ? (
                      listNote?.note?.map(
                        (note: {
                          call_date_and_time: string;
                          call_direction: string;
                          content: string;
                          personnel: string;
                        }) => {
                          return (
                            <Timeline.Item>
                              <Typography.Paragraph
                                style={{ marginBottom: 'unset', color: '#fff' }}
                              >
                                {moment(note.call_date_and_time).format('DD/MM/YYYY HH:MM')}
                              </Typography.Paragraph>
                              <div className={styles.historyFormContentFlex1}>
                                <Typography.Paragraph
                                  style={{
                                    marginBottom: 'unset',
                                    color: note.call_direction === 'string' ? '#54FF00' : '#FFAA00',
                                  }}
                                >
                                  {note.call_direction === 'string'
                                    ? ' Cuộc gọi đến'
                                    : ' Cuộc gọi đi'}
                                </Typography.Paragraph>
                                {/* <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>
                              00:12
                            </Typography.Paragraph> */}
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
                                    <Typography.Text
                                      style={{ color: '#fff', fontWeight: 'normal' }}
                                    >
                                      {note.content}
                                    </Typography.Text>
                                  </Typography.Paragraph>
                                </li>
                                <li>
                                  <Typography.Paragraph
                                    style={{
                                      marginBottom: 'unset',
                                      fontWeight: 'bold',
                                      color: '#fff',
                                    }}
                                  >
                                    Nhân sự:{' '}
                                    <Typography.Text
                                      style={{ color: '#fff', fontWeight: 'normal' }}
                                    >
                                      {note.personnel}
                                    </Typography.Text>
                                  </Typography.Paragraph>
                                </li>
                              </ul>
                            </Timeline.Item>
                          );
                        },
                      )
                    ) : (
                      <Timeline.Item>
                        <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>
                          Không có ghi chú
                        </Typography.Text>
                      </Timeline.Item>
                    )}
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
                  <Form layout="vertical" form={form} className={styles.noteFormPhoneCall}>
                    <Form.Item
                      name="full_name"
                      label={<Typography.Text style={{ color: '#fff' }}>Họ và tên</Typography.Text>}
                    >
                      <Input
                        className={styles.inputHistoryFormStyle}
                        disabled
                        placeholder="Nhập thông tin"
                      />
                    </Form.Item>
                    <Form.Item
                      name="phone_number"
                      label={
                        <Typography.Text style={{ color: '#fff' }}>Số điện thoại</Typography.Text>
                      }
                    >
                      <Input
                        disabled
                        className={styles.inputHistoryFormStyle}
                        placeholder="Nhập thông tin"
                      />
                    </Form.Item>
                    <Form.Item
                      label={<Typography.Text style={{ color: '#fff' }}>IIP</Typography.Text>}
                      name="ip_phone"
                      rules={[
                        {
                          pattern: new RegExp('^[0-9]{1,6}$'),
                          message: 'IP Phone không hợp lệ',
                        },
                      ]}
                    >
                      <Input
                        disabled
                        className={styles.inputHistoryFormStyle}
                        placeholder="Nhập thông tin"
                      />
                    </Form.Item>
                    <Form.Item
                      name="email"
                      label={<Typography.Text style={{ color: '#fff' }}>Email</Typography.Text>}
                    >
                      <Input
                        disabled
                        className={styles.inputHistoryFormStyle}
                        placeholder="Nhập thông tin"
                      />
                    </Form.Item>
                    <Form.Item
                      name="work_unit"
                      label={
                        <Typography.Text style={{ color: '#fff' }}>Đơn vị công tác</Typography.Text>
                      }
                    >
                      <Input
                        disabled
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
