import './index.less';

import { Button, Form, Input, Space, Typography } from 'antd';
import React, { useState } from 'react';

interface NoteCallProps {
  handleFormNote?: (note: string) => void;
}

const NoteCall: React.FC<NoteCallProps> = ({ handleFormNote }) => {
  const [form] = Form.useForm();
  const [isSendNote, setIsSendNote] = useState(false);

  const onFinish = (values: { note: string }) => {
    handleFormNote && handleFormNote(values.note);
  };

  return (
    <Form form={form} onFinish={onFinish} className="m-note-call" layout="vertical">
      <Typography.Text className="m-note-call__title">Ghi chú</Typography.Text>

      <div className="m-note-call__content">
        <Form.Item
          name="note"
          label={<Typography.Text style={{ color: '#fff' }}>Ghi chú</Typography.Text>}
        >
          <Input.TextArea
            className="m-note-call__input"
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
        <Form.Item noStyle>
          <Space>
            <Button
              onClick={() => {
                form.setFieldValue('note', '');
              }}
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" disabled={!isSendNote}>
              Lưu
            </Button>
          </Space>
        </Form.Item>
      </div>
    </Form>
  );
};

export default NoteCall;
