import {
  Button,
  Form,
  Input,
  List,
  message,
  Modal,
  Popover,
  Space,
  Timeline,
  Typography,
} from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { useRequest } from 'umi';

import api from '@/apiEndpoint';
import { requestGetTakeCallNote } from '@/pages/omni-channel/report/services';
import {
  EditOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  HistoryOutlined,
  PhoneOutlined,
  UserOutlined,
} from '@ant-design/icons';

import Arrow from '../../../public/arrow.svg';
import Share from '../../../public/share.svg';
import audio from '../../assets/iphone_12.mp3';
import { dataProps } from '../RightContent';
import styles from './index.less';

type AgentModalRingProps = {
  isModalOpen: boolean;
  handleOk: () => void;
  handleCancel: () => void;
  handleOpenAnswer: () => void;
  isFullScreenModal: boolean;
  handleFullScreenModal: () => void;
  handleClickIconHistory: () => void;
  handleClickIconNote: () => void;
  handelUserTransfer: (e: string) => void;
  isVisibleHistoryCall: boolean;
  isVisibleNoteCall: boolean;
  isActiveIconHistory: boolean;
  isActiveIconNote: boolean;
  dataContacts: { id: string; name: string; ip_phone: string }[];
  dataCall?: dataProps;
};

type notesProps = {
  call_direction: string;
  content: string;
  create_at: number;
  personnel: string;
};

type listNotesProps = {
  call_id: string;
  id: string;
  note: notesProps[];
  phone_number: string;
};

const AgentModalRing: React.FC<AgentModalRingProps> = ({
  isModalOpen,
  handleOk,
  handleCancel,
  isFullScreenModal,
  handleFullScreenModal,
  handleClickIconHistory,
  handleClickIconNote,
  handelUserTransfer,
  isVisibleHistoryCall,
  isVisibleNoteCall,
  isActiveIconHistory,
  isActiveIconNote,
  dataContacts,
  dataCall,
}) => {
  const [form] = Form.useForm();
  const [isPopoverForward, setPopoverForward] = useState(false);
  const [userSelect, setUserSelect] = useState('');
  const [statusCall, setStateCall] = useState('Cuộc gọi');
  const [nameCall, setNameCall] = useState('Chưa có trong danh bạ');
  const [phoneCall, setPhoneCall] = useState('000 000 0000');
  const [iconCall, setIconCall] = useState(false);
  const [listNote, setListNote] = useState<listNotesProps[]>([]);
  const ringSound = new Audio(audio);

  useEffect(() => {
    let openSound: NodeJS.Timer;
    if (isModalOpen) {
      openSound = setInterval(() => {
        ringSound.play();
      }, 1000);
    }
    return () => {
      clearInterval(openSound);
      ringSound.currentTime = 0;
      ringSound.pause();
    };
  }, [isModalOpen]);

  const token = window.localStorage?.getItem('access_token');
  let notes: notesProps[] = [];
  listNote?.map((notesItem) => {
    return notesItem.note.map((item) => {
      return (notes = [...notes, item]);
    });
  });
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
        setListNote(res.data);
      }
      return res;
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (isVisibleHistoryCall && isModalOpen) {
      if (dataCall?.direction === 'local') {
        getTakeCallNote.run({
          phone_number: dataCall?.contact?.ip_phone,
          call_direction: dataCall?.direction,
          call_id: dataCall?.call_id,
        });
      } else {
        getTakeCallNote.run({
          call_id: dataCall?.call_id,
          phone_number: dataCall?.contact?.phone_number,
          call_direction: dataCall?.direction,
        });
      }
    }
  }, [isVisibleHistoryCall]);

  const listTransfer = useMemo(
    () =>
      dataContacts?.map((user, index) => ({
        id: user.id ? user.id : index,
        label: user.name,
        value: user.ip_phone,
      })),
    [dataContacts],
  );
  useEffect(() => {
    if (dataCall?.call_type === 'receive') {
      setStateCall('Cuộc gọi đến');
      setIconCall(true);
    } else {
      setStateCall('Cuộc gọi đi');
      setIconCall(false);
    }
    if (dataCall?.contact) {
      setNameCall(dataCall.contact?.full_name);
      setPhoneCall(dataCall.contact?.phone_number);
      form.setFieldsValue(dataCall?.contact);
    } else {
      if (dataCall?.is_ip_phone) {
        form.setFieldValue('ip_phone', dataCall?.phone);
      } else {
        form.setFieldValue('phone_number', dataCall?.phone);
      }
      setNameCall('Chưa có trong danh bạ');
      dataCall?.phone && setPhoneCall(dataCall?.phone);
      form.resetFields();
    }
    setPhoneCall(dataCall?.phone ? dataCall?.phone : '');
  });

  //  const { confirm } = Modal;
  // const showConfirm = () => {
  //   confirm({
  //     title: 'Kết thúc cuộc gọi',
  //     icon: <ExclamationCircleFilled style={{ fill: '#FAAD14' }} />,
  //     content: <p style={{ marginBottom: 46 }}>Bạn có chắc chắn muốn ngắt kết nối cuộc gọi này?</p>,
  //     bodyStyle: { padding: '24px 32px' },
  //     width: 437,
  //     centered: true,
  //     okText: 'Kết thúc',
  //     onOk() {
  //       handleCancel();
  //     },
  //     cancelText: 'Huỷ',
  //     onCancel() {},
  //   });
  // };

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
                    loading="lazy"
                    src={`${api.UMI_API_BASE_URL}/user-service/api/settings/get_user_avatar_by_email?email=${dataCall?.contact_email}`}
                    alt=""
                    width={isFullScreenModal ? 105 : 58}
                    height={isFullScreenModal ? 105 : 58}
                    style={{ position: 'relative', left: -8, zIndex: 2, borderRadius: '95%' }}
                  />
                  <div className={styles.circle1} />
                  <div className={styles.circle2} />
                </div>
                <div className={isFullScreenModal ? styles.infoPhoneFullScreen : styles.infoPhone}>
                  <Typography.Text style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                    {nameCall}
                    {!isFullScreenModal
                      ? dataCall?.contact?.work_unit
                        ? ` - ${dataCall?.contact?.work_unit}`
                        : ''
                      : ''}
                  </Typography.Text>
                  <br />
                  {isFullScreenModal && dataCall?.contact?.work_unit && (
                    <>
                      <Typography.Text style={{ fontSize: 13, fontWeight: 400, color: 'white' }}>
                        {dataCall?.contact?.work_unit}
                      </Typography.Text>
                      <br />
                    </>
                  )}
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
                {iconCall ? <PhoneOutlined className={styles.phonePickUp}></PhoneOutlined> : ''}
                {/* <PhoneOutlined
                  className={styles.phonePickUp}
                  // onClick={() => {
                  //   setPopoverForward(false);
                  //   refTimer.current.reset();
                  //   setTimeout(() => {
                  //     handleOpenAnswer();
                  //   }, 0);
                  // }}
                /> */}
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
                    {notes?.length ? (
                      notes?.map((note) => {
                        return (
                          <Timeline.Item>
                            <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>
                              {moment(note.create_at * 1000).format('DD/MM/YYYY HH:mm')}
                            </Typography.Paragraph>
                            <div className={styles.historyFormContentFlex1}>
                              <Typography.Paragraph
                                style={{
                                  marginBottom: 'unset',
                                  color:
                                    note.call_direction === 'inbound'
                                      ? '#54FF00'
                                      : note.call_direction === 'outbound'
                                        ? '#FFAA00'
                                        : '#19C6EE',
                                }}
                              >
                                {note.call_direction === 'inbound'
                                  ? ' Cuộc gọi đến'
                                  : note.call_direction === 'outbound'
                                    ? ' Cuộc gọi đi'
                                    : 'Cuộc gọi nội bộ'}
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
                                  <Typography.Text style={{ color: '#fff', fontWeight: 'normal' }}>
                                    {note.personnel}
                                  </Typography.Text>
                                </Typography.Paragraph>
                              </li>
                            </ul>
                          </Timeline.Item>
                        );
                      })
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
                      label={<Typography.Text style={{ color: '#fff' }}>IPP</Typography.Text>}
                      name="ip_phone"
                      rules={[
                        {
                          pattern: new RegExp('^[0-9]{4,7}$'),
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
