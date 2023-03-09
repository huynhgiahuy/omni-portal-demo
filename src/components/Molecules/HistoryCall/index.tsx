import './index.less';

import { Timeline, Typography } from 'antd';
import classNames from 'classnames';
import moment from 'moment';
import React from 'react';

export interface notesProps {
  call_direction: 'inbound' | 'outbound' | 'local';
  content: string;
  create_at: number;
  personnel: string;
}

interface HistoryCallProps {
  notes?: notesProps[];
}

const HistoryCall: React.FC<HistoryCallProps> = ({ notes }) => {
  return (
    <div className={classNames('m-history-call', !notes?.length && 'm-history-call--full-height')}>
      <div className="m-history-call__header">
        <Typography.Text className="m-history-call__title">Lịch sử</Typography.Text>
      </div>
      <div className="m-history-call__content">
        <Timeline>
          {notes?.length ? (
            notes?.map((note) => {
              return (
                <Timeline.Item>
                  <Typography.Paragraph style={{ marginBottom: 'unset', color: '#fff' }}>
                    {moment(note.create_at * 1000).format('DD/MM/YYYY HH:mm')}
                  </Typography.Paragraph>
                  <div className="m-history-call__content-item">
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
  );
};

export default HistoryCall;
