import './index.less';

import { Modal, Space, Typography } from 'antd';
import clsx from 'clsx';
import React, { useEffect, useRef, useState } from 'react';
import Timer from 'react-compound-timer';

import api from '@/api';
import ButtonCall from '@/components/Atom/ButtonCall';
import ButtonShare, { ListTransferButtonShareProps } from '@/components/Atom/ButtonShare';
import {
  EditOutlined,
  FullscreenExitOutlined,
  FullscreenOutlined,
  HistoryOutlined,
  PhoneOutlined,
} from '@ant-design/icons';

import Arrow from '../../../../public/arrow.svg';
import CustomerInfoForm, { customerInfoProps } from '../../Molecules/CustomerInfoForm';
import HistoryCall, { notesProps } from '../../Molecules/HistoryCall';
import NoteCall from '../../Molecules/NoteCall';

export interface ModalCallProps {
  type: 'ring' | 'answer';
  callRedirect?: 'inbound' | 'outbound' | 'local';
  muteCall: boolean;
  open: boolean;
  avatar: string;
  // dataCall: {
  //   name_call?: string;
  //   phone_call?: string;
  //   name_unit?: string;
  //   work_unit?: string;
  // };
  listTransfer: ListTransferButtonShareProps[];
  customerInfo: customerInfoProps;
  notes: notesProps[];
}

const ModalCall: React.FC<ModalCallProps> = ({
  type,
  callRedirect,
  open,
  avatar,
  listTransfer,
  customerInfo,
  notes,
}) => {
  const refTimer = useRef<any>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isFullScreenModal, setIsFullScreenModal] = useState(false);
  const [isVisibleNoteCall, setIsVisibleNoteCall] = useState(false);
  const [isVisibleHistoryCall, setIsVisibleHistoryCall] = useState(false);
  const ringSound = new Audio(`assets/iphone_12.mp3`);
  const [isMuteCall, setIsMuteCall] = useState(false);

  useEffect(() => {
    if (open) {
      setTimeout(() => {
        setIsOpen(true);
      });
    } else {
      setTimeout(() => {
        setIsOpen(false);
      });
    }

    return () => {
      setIsOpen(false);
    };
  }, [open]);

  useEffect(() => {
    if (!isFullScreenModal || !isOpen) {
      setIsVisibleHistoryCall(false);
      setIsVisibleNoteCall(false);
    }
  }, [isFullScreenModal, isOpen]);

  useEffect(() => {
    let openSound: NodeJS.Timer;
    if (open && type === 'ring') {
      openSound = setInterval(() => {
        ringSound.play();
      }, 1000);
    }
    return () => {
      clearInterval(openSound);
      ringSound.currentTime = 0;
      ringSound.pause();
      setIsFullScreenModal(false);
    };
  }, [open, type]);

  const handleReveiveCall = () => {
    console.log('reveice');
  };
  const handleHangUpCall = () => {
    console.log('hang-up');
  };

  const handleMuteCall = () => {
    if (isMuteCall) {
      setIsMuteCall(false);
      console.log('un-mute-call');
    } else {
      setIsMuteCall(true);
      console.log('mute-call');
    }
  };

  return (
    <div className="o-modal-call">
      <Modal
        className={clsx(
          'o-modal-call__modal',
          type === 'ring' && !isFullScreenModal
            ? 'o-modal-call__modal--ring'
            : type === 'answer' && !isFullScreenModal
            ? 'o-modal-call__modal--answer'
            : '',
        )}
        mask={false}
        closable={false}
        footer={false}
        open={isOpen}
        centered={isFullScreenModal}
        width={isFullScreenModal ? 772 : 373}
        wrapClassName={
          !isFullScreenModal && type === 'answer' ? 'o-modal-call__wrap_modal' : undefined
        }
      >
        <div
          className={clsx(
            'o-modal-call__content',
            (isVisibleHistoryCall || isVisibleNoteCall) && 'o-modal-call__size-form',
          )}
        >
          <div className="flex justify-between">
            {type === 'ring' ? (
              <div className="flex">
                <div className="flex">
                  <PhoneOutlined className="o-modal-call__icon-call" />
                  <img
                    src={Arrow}
                    alt="arrow"
                    className={clsx(
                      'o-modal-call__arrow-call',
                      callRedirect === 'outbound' && 'o-modal-call__arrow-call--out-bound',
                    )}
                  />
                </div>
                <p style={{ color: 'white', paddingLeft: 20 }}>{`Cuộc gọi ${
                  callRedirect === 'inbound' ? 'đến' : callRedirect === 'outbound' ? 'đi' : 'nội bộ'
                }`}</p>
              </div>
            ) : (
              <Timer
                initialTime={0}
                formatValue={(value) => `${value < 10 ? `0${value}` : value}`}
                ref={refTimer}
              >
                <Typography.Text style={{ color: 'white' }}>
                  {<Timer.Hours />}:{<Timer.Minutes />}:{<Timer.Seconds />}
                </Typography.Text>
              </Timer>
            )}

            {isFullScreenModal ? (
              <FullscreenExitOutlined
                style={{ fontSize: 18, color: 'white' }}
                onClick={() => {
                  setIsFullScreenModal(false);
                }}
              />
            ) : (
              <FullscreenOutlined
                style={{ fontSize: 18, color: 'white' }}
                onClick={() => {
                  setIsFullScreenModal(true);
                }}
              />
            )}
          </div>
          <div
            className={clsx(
              'o-modal-call__info-customer',
              isFullScreenModal && 'o-modal-call__info-customer--fullscreen',
            )}
          >
            <Space
              style={{ width: '100%', flex: 1 }}
              size={[30, 10]}
              direction="vertical"
              align="center"
            >
              <Space
                size={[30, 0]}
                direction={isFullScreenModal ? 'vertical' : 'horizontal'}
                align="center"
              >
                <div
                  className={clsx(
                    'o-modal-call__avatar',
                    isFullScreenModal && 'o-modal-call__avatar--full-screen',
                  )}
                >
                  <img
                    loading="lazy"
                    src={`${api.UMI_API_BASE_URL}/user-service/api/settings/get_user_avatar_by_email?email=${avatar}`}
                    alt=""
                    width={isFullScreenModal ? 105 : 58}
                    height={isFullScreenModal ? 105 : 58}
                    style={{ position: 'relative', left: -8, zIndex: 2, borderRadius: '95%' }}
                  />
                  {type === 'ring' && (
                    <>
                      <div className={'o-modal-call__circle1'} />
                      <div className={'o-modal-call__circle2'} />
                    </>
                  )}
                </div>
                <div
                  className={clsx(
                    'o-modal-call__info-phone',
                    isFullScreenModal && 'o-modal-call__info-phone--full-screen',
                  )}
                >
                  <Typography.Text style={{ fontSize: 16, fontWeight: 700, color: 'white' }}>
                    {customerInfo?.full_name ? customerInfo?.full_name : 'Chưa có trong danh bạ'}
                  </Typography.Text>
                  <br />
                  {isFullScreenModal && customerInfo?.work_unit && (
                    <>
                      <Typography.Text style={{ fontSize: 13, fontWeight: 400, color: 'white' }}>
                        {`${customerInfo?.name_unit} - ${customerInfo?.work_unit}`}
                      </Typography.Text>
                      <br />
                    </>
                  )}
                  <Typography.Text style={{ fontSize: 13, fontWeight: 400, color: 'white' }}>
                    {customerInfo?.phone_number ? customerInfo?.phone_number : '0000 000 000'}
                  </Typography.Text>
                </div>
              </Space>
              <Space
                align="center"
                size="large"
                style={{
                  justifyContent: 'center',
                  display: 'flex',
                  marginBottom: 16,
                }}
              >
                {type === 'ring' ? (
                  <ButtonCall type="reveice" onClick={handleReveiveCall} />
                ) : (
                  <ButtonCall type={isMuteCall ? 'un-mute' : 'mute'} onClick={handleMuteCall} />
                )}

                <ButtonShare
                  open={open}
                  type={type}
                  listTransfer={listTransfer}
                  onClickChangeCall={() => {}}
                />
                <ButtonCall type="hang-up" onClick={handleHangUpCall} />
              </Space>
            </Space>
            {isVisibleNoteCall && (
              <div className="o-modal-call__info-form">
                <CustomerInfoForm
                  type={customerInfo?.full_name ? 'view' : 'edit'}
                  customerInfo={customerInfo}
                  handleSaveForm={(e) => {
                    console.log(e);
                  }}
                />
                <br />
                <NoteCall
                  handleFormNote={(value) => {
                    console.log(value.note);
                  }}
                />
              </div>
            )}

            {isVisibleHistoryCall && (
              <div className="o-modal-call__info-note">
                <HistoryCall notes={notes} />
              </div>
            )}
          </div>

          {isFullScreenModal && (
            <div className={'o-modal-call__button-right-side'}>
              <EditOutlined
                className={clsx(
                  'o-modal-call__button-note',
                  isVisibleNoteCall && 'o-modal-call__button-note--active',
                )}
                onClick={() => {
                  if (isVisibleHistoryCall) {
                    setIsVisibleHistoryCall(false);
                    setIsVisibleNoteCall(!isVisibleNoteCall);
                  } else {
                    setIsVisibleNoteCall(!isVisibleNoteCall);
                  }
                }}
              />
              <HistoryOutlined
                className={clsx(
                  'o-modal-call__button-history',
                  isVisibleHistoryCall && 'o-modal-call__button-history--active',
                )}
                onClick={() => {
                  if (isVisibleNoteCall) {
                    setIsVisibleNoteCall(false);
                    setIsVisibleHistoryCall(!isVisibleHistoryCall);
                  } else {
                    setIsVisibleHistoryCall(!isVisibleHistoryCall);
                  }
                }}
              />
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
};

export default ModalCall;
