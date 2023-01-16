import {
    Button, Form, Input, List, message, Modal, Popover, Select, Space, Timeline, Typography
} from 'antd';
import moment from 'moment';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Timer from 'react-compound-timer';
import { useModel, useRequest } from 'umi';

import api from '@/api';
import {
    requestAddUserContact, requestGetTakeCallNote, requestSaveCallNote
} from '@/pages/omni-channel/report/services';
import {
    AudioFilled, CaretRightOutlined, EditOutlined, FullscreenExitOutlined, FullscreenOutlined,
    HistoryOutlined, PauseOutlined, PhoneOutlined, UserOutlined
} from '@ant-design/icons';

import Arrow from '../../../public/arrow.svg';
import Share from '../../../public/share.svg';
import { dataProps } from '../RightContent';
import styles from './index.less';

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

const listUnitExternal = [
  {
    label: 'NOC',
    value: 'NOC',
  },
  {
    label: 'IDC',
    value: 'IDC',
  },
  {
    label: 'PMB',
    value: 'PMB',
  },
  {
    label: 'FPL',
    value: 'FPL',
  },
  {
    label: 'CSOC',
    value: 'CSOC',
  },
  {
    label: 'ISC',
    value: 'ISC',
  },
  {
    label: 'CADS',
    value: 'CADS',
  },
  {
    label: 'FSS',
    value: 'FSS',
  },
  {
    label: 'CS',
    value: 'CS',
  },
  {
    label: 'CC',
    value: 'CC',
  },
  {
    label: 'TIN/PNC',
    value: 'TIN/PNC',
  },
  {
    label: 'FOXPAY',
    value: 'FOXPAY',
  },
  {
    label: 'INF',
    value: 'INF',
  },
  {
    label: 'HiFPT',
    value: 'HiFPT',
  },
  {
    label: 'FTI',
    value: 'FTI',
  },
  {
    label: 'FTQ',
    value: 'FTQ',
  },
];

const AgentModalAnswer: React.FC<AgentModalAnswerProps> = ({
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
  const refTimer = useRef<any>(null);
  const [form] = Form.useForm();
  const { initialState } = useModel('@@initialState');
  const [isPlay, _setIsPlay] = useState(true);
  const [isRecord, _setIsRecord] = useState(false);
  const [isPopoverForward, setPopoverForward] = useState(false);
  const [userSelect, setUserSelect] = useState('');
  const [isSave, setIsSave] = useState(true);
  const [listNote, setListNote] = useState<listNotesProps[]>([]);
  const [nameCall, setNameCall] = useState('Chưa có trong danh bạ');
  const [phoneCall, setPhoneCall] = useState('0000 000 000');
  const [statusCall, setStateCall] = useState('Cuộc gọi');
  const [isSendNote, setIsSendNote] = useState(false);

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
        data,
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

  const sendSaveCallNote = useRequest(
    async (data) => {
      const res: { success: boolean; data: any } = await requestSaveCallNote(
        token ? token : '',
        data,
      );
      if (!res.success) {
        message.error('Lưu thất bại');
        return;
      } else {
        message.success('Lưu thành công');
        form.setFieldValue('note', '');
        getTakeCallNote.run({ phone_number: dataCall?.phone, call_direction: dataCall?.direction });
      }
      return res;
    },
    {
      manual: true,
    },
  );

  const addUserContact = useRequest(
    async (data) => {
      const result: { success: boolean; error: string } = await requestAddUserContact(
        token ? token : '',
        data,
      );
      if (!result.success) {
        message.error('Lưu thất bại');
        return;
      } else {
        message.success('Lưu thành công');
        setIsSave(false);
      }
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    if (isVisibleHistoryCall) {
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
    } else {
      setListNote([]);
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
    refTimer.current.start();
    if (!isModalOpen) {
      refTimer.current.reset();
      setTimeout(() => {
        refTimer.current.stop();
      });
    }
  }, [isModalOpen]);

  useEffect(() => {
    setPopoverForward(false);
  }, [dataCall]);

  useEffect(() => {
    if (dataCall?.call_type === 'receive') {
      setStateCall('Cuộc gọi đến');
    } else {
      setStateCall('Cuộc gọi đi');
    }

    if (dataCall?.contact) {
      setNameCall(dataCall.contact?.full_name);
      //setPhoneCall(dataCall.contact?.phone_number);
      form.setFieldsValue(dataCall?.contact);
      setIsSave(false);
    } else {
      if (dataCall?.is_ip_phone) {
        form.setFieldValue('ip_phone', dataCall?.phone);
      } else {
        form.setFieldValue('phone_number', dataCall?.phone);
      }
    }
    setPhoneCall(dataCall?.phone ? dataCall?.phone : '');
  });

  //  const { confirm } = Modal;
  // const showConfirm = () => {
  //   confirm({
  //     title: 'Kết thúc cuộc gọi',
  //     icon: <ExclamationCircleFilled style={{ fill: '#FAAD14' }} />,
  //     content: <p style={{ marginBottom: 46 }}>Bạn có chắc chắn muốn ngắt kết nối cuộc gọi này?</p>,
  //     centered: true,
  //     width: 437,
  //     bodyStyle: { padding: '24px 32px' },
  //     okText: 'Kết thúc',
  //     onOk() {
  //       refTimer.current.reset();
  //       handleCancel();
  //     },
  //     cancelText: 'Huỷ',
  //     onCancel() {},
  //   });
  // };

  const handleOnFinish = (values: any) => {
    values.external_customers = true;
    addUserContact.run(values);
  };

  return (
    <Timer
      initialTime={0}
      formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
      ref={refTimer}
    >
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
                    <img
                      style={{ position: 'absolute', left: 25, top: 8 }}
                      src={Arrow}
                      alt="arrow"
                    />
                  </Space>
                  <Typography.Text style={{ color: 'white' }}>
                    {statusCall ? statusCall : 'Cuộc gọi'}
                  </Typography.Text>
                </>
              )}

              <Typography.Text style={{ color: 'white' }}>
                {<Timer.Hours />}:{<Timer.Minutes />}:{<Timer.Seconds />}
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
                    loading="lazy"
                    src={`${api.UMI_API_BASE_URL}/user-service/api/settings/get_user_avatar_by_email?email=${dataCall?.contact_email}`}
                    alt=""
                    width={isFullScreenModal ? 105 : 58}
                    height={isFullScreenModal ? 105 : 58}
                    style={{ position: 'relative', left: -8, zIndex: 2, borderRadius: '95%' }}
                  />
                </div>
                <Space
                  className={isFullScreenModal ? styles.infoPhoneFullScreen : styles.infoPhone}
                  direction="vertical"
                >
                  <Typography.Text style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                    {nameCall ? nameCall : 'Chưa có trong danh bạ'}
                    {!isFullScreenModal
                      ? dataCall?.contact?.work_unit
                        ? ` - ${dataCall?.contact?.work_unit}`
                        : ''
                      : ''}
                  </Typography.Text>
                  {isFullScreenModal && dataCall?.contact?.work_unit && (
                    <>
                      <Typography.Text style={{ fontSize: 13, fontWeight: 400, color: 'white' }}>
                        {dataCall?.contact?.work_unit}
                      </Typography.Text>
                    </>
                  )}
                  <Typography.Text style={{ color: 'white' }}>
                    {phoneCall ? phoneCall : dataCall?.phone ? dataCall?.phone : '0000 000 000'}
                  </Typography.Text>
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
                    // onClick={() => {
                    //   setIsPlay(!isPlay);
                    //   setPopoverForward(false);
                    // }}
                  />
                ) : (
                  <CaretRightOutlined
                    className={styles.phonePause}
                    // onClick={() => {
                    //   setIsPlay(!isPlay);
                    //   setPopoverForward(false);
                    // }}
                  />
                )}

                <AudioFilled
                  className={isRecord ? styles.noRecord : styles.record}
                  // onClick={() => {
                  //   setIsRecord(!isRecord);
                  //   setPopoverForward(false);
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
                <PhoneOutlined
                  className={styles.phoneHandUp}
                  // onClick={() => {
                  //   setPopoverForward(false);

                  //   setTimeout(() => {
                  //     showConfirm();
                  //   });
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
                    {notes.length ? (
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
                                      : note.call_direction === 'inbound'
                                      ? '#FFAA00'
                                      : '#19C6EE',
                                }}
                              >
                                {note.call_direction === 'inbound'
                                  ? ' Cuộc gọi đến'
                                  : note.call_direction === 'inbound'
                                  ? ' Cuộc gọi đi'
                                  : 'Cuộc gọi nội bộ'}
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
              <Form
                form={form}
                layout="vertical"
                requiredMark={false}
                onFinish={handleOnFinish}
                className={styles.noteFormPhoneCall}
              >
                {' '}
                <div>
                  <div className={styles.infoCallNote} style={{ height: 280 }}>
                    <div className={styles.noteFormHeaderLayout}>
                      <Typography.Text className={styles.noteFormHeaderStyle}>
                        Danh bạ
                      </Typography.Text>
                    </div>
                    <div className={styles.noteFormContentLayout}>
                      <Form.Item
                        name="full_name"
                        label={
                          <Typography.Text style={{ color: '#fff' }}>
                            Họ và tên {isSave && <span style={{ color: 'red' }}>(*)</span>}
                          </Typography.Text>
                        }
                        rules={[
                          { required: true, message: 'Vui lòng không để trống thông tin' },
                          {
                            max: 255,
                            message: 'Vui lòng không nhập quá 255 kí tự',
                          },
                          {
                            pattern: new RegExp(
                              '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ01234556789 ]+$',
                            ),
                            message: 'Vui lòng không nhập ký tự đặt biệt',
                          },
                        ]}
                      >
                        <Input
                          className={styles.inputHistoryFormStyle}
                          placeholder="Nhập thông tin"
                          disabled={!isSave}
                        />
                      </Form.Item>
                      <Form.Item
                        label={
                          <Typography.Text style={{ color: '#fff' }}>Số điện thoại</Typography.Text>
                        }
                        name="phone_number"
                        rules={[
                          {
                            validator: (_, value: any) => {
                              const phoneReg = /((0[3|5|7|8|9])+([0-9]{8,9})\b)/;
                              if (value === undefined || !value || value.length === 0) {
                                return Promise.reject('Vui lòng nhập số di động');
                              } else if (value.length > 11) {
                                return Promise.reject('Số điện thoại không hợp lệ');
                              } else if (!phoneReg.test(value)) {
                                return Promise.reject('Số điện thoại không hợp lệ');
                              }
                              return Promise.resolve();
                            },
                          },
                        ]}
                      >
                        <Input
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
                          className={styles.inputHistoryFormStyle}
                          placeholder="Nhập thông tin"
                          disabled={!isSave}
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        label={
                          <Typography.Text style={{ color: '#fff' }}>
                            Email {isSave && <span style={{ color: 'red' }}>(*)</span>}
                          </Typography.Text>
                        }
                        rules={[
                          { required: true, message: 'Vui lòng không để trống thông tin' },
                          { type: 'email', message: 'Vui lòng nhập email hợp lệ' },
                          {
                            max: 255,
                            message: 'Vui lòng không nhập quá 255 kí tự',
                          },
                        ]}
                      >
                        <Input
                          className={styles.inputHistoryFormStyle}
                          placeholder="Nhập thông tin"
                          disabled={!isSave}
                        />
                      </Form.Item>
                      <Form.Item
                        name="work_unit"
                        label={
                          <Typography.Text style={{ color: '#fff' }}>
                            Đơn vị công tác {isSave && <span style={{ color: 'red' }}>(*)</span>}
                          </Typography.Text>
                        }
                        rules={[{ required: true, message: 'Vui lòng không để trống thông tin' }]}
                      >
                        <Select
                          style={{ textAlign: 'left' }}
                          disabled={!isSave}
                          className={styles.inputHistoryFormStyle}
                          options={listUnitExternal}
                          placeholder="Chọn đơn vị"
                        />
                      </Form.Item>
                      {isSave && (
                        <Form.Item>
                          <Space>
                            <Button>Hủy</Button>
                            <Button type="primary" htmlType="submit">
                              Lưu
                            </Button>
                          </Space>
                        </Form.Item>
                      )}
                    </div>
                  </div>
                  <div className={styles.infoCallNote} style={{ marginTop: 10 }}>
                    <div className={styles.noteFormHeaderLayout}>
                      <Typography.Text className={styles.noteFormHeaderStyle}>
                        Ghi chú
                      </Typography.Text>
                    </div>
                    <div className={styles.noteFormContentLayout}>
                      <Form.Item
                        name="note"
                        label={<Typography.Text style={{ color: '#fff' }}>Ghi chú</Typography.Text>}
                      >
                        <Input.TextArea
                          className={styles.inputHistoryFormStyle}
                          placeholder="Nhập thông tin"
                          onChange={() => {
                            setIsSendNote(true);
                            if (!form.getFieldValue('note').trim()) {
                              setIsSendNote(false);
                            }
                          }}
                          style={{ height: 77, resize: 'none' }}
                        />
                      </Form.Item>
                      <Form.Item>
                        <Space>
                          <Button
                            onClick={() => {
                              form.setFieldValue('note', '');
                            }}
                          >
                            Hủy
                          </Button>
                          <Button
                            type="primary"
                            htmlType="button"
                            disabled={!isSendNote}
                            onClick={() => {
                              const data = {
                                call_id: dataCall?.call_id,
                                phone_number: phoneCall,
                                call_direction: dataCall?.direction,
                                personnel: initialState?.currentUser?.name
                                  ? initialState?.currentUser?.name
                                  : 'Chưa có tên',
                                content: form.getFieldValue('note'),
                              };

                              sendSaveCallNote.run(data);
                            }}
                          >
                            Lưu
                          </Button>
                        </Space>
                      </Form.Item>
                    </div>
                  </div>
                </div>
              </Form>
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
    </Timer>
  );
};

export default AgentModalAnswer;
