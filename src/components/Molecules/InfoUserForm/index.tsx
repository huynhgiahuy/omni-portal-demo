import './index.less';

import { Button, Col, Form, FormInstance, Input, Row, Select } from 'antd';
import React, { useEffect, useState } from 'react';

import SelectItem, { TeamPermission } from '@/components/Atom/SelectItem';

import { FormProps } from '../../Organisms/InfoUser';

interface ValidateFieldsProps {
  errorFields: { errors: string[]; name: string[] }[];
  values: FormProps;
}

interface InfoUserFromProps {
  currentUser: FormProps | API.CurrentUser;
  listTeamPermission: TeamPermission[];
  handleSaveInfoForm: (
    values: FormProps,
    setIsDisableSave: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
  setIsEditForm?: React.Dispatch<React.SetStateAction<boolean>>;
  handleNewTeam: (value: string, form: FormInstance) => void;
  handleDeleteTeam: (value: string) => void;
  handleCheckPhone?: (value: string, form: FormInstance) => void;
  onClickCancel?: (form: FormInstance) => void;
}
const InfoUserFrom: React.FC<InfoUserFromProps> = ({
  currentUser,
  listTeamPermission = [],
  handleSaveInfoForm,
  handleNewTeam,
  handleDeleteTeam,
  handleCheckPhone,
  onClickCancel,
}) => {
  const [form] = Form.useForm();
  const [isDisableSave, setIsDisableSave] = useState(true);
  const onFinishForm = async (values: FormProps) => {
    handleSaveInfoForm(values, setIsDisableSave);
  };

  useEffect(() => {
    form.setFieldsValue(currentUser);
  }, [currentUser]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinishForm}
      requiredMark={false}
      onValuesChange={() => {
        form.validateFields().catch((error: ValidateFieldsProps) => {
          setIsDisableSave(true);
          if (
            error.errorFields.length === 0 &&
            (error.values.work_address !== currentUser?.work_address ||
              error.values.title !== currentUser?.title ||
              error.values.level !== currentUser?.level ||
              error.values.home_address !== currentUser?.home_address ||
              error.values.phone_number !== currentUser?.phone_number ||
              error.values.ip_phone !== currentUser?.ip_phone ||
              error.values.team !== currentUser?.team)
          ) {
            setIsDisableSave(false);
          }
        });
      }}
    >
      <Row gutter={[32, 0]}>
        <Col span={12}>
          <Form.Item name="name" label="Họ và tên">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="email" label="Email">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item name="department" label="Phòng ban">
            <Input disabled />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="work_address"
            rules={[
              {
                required: true,
                message: 'Vui lòng không để trống thông tin',
              },
            ]}
            label={
              <div>
                Nơi làm việc <span style={{ color: 'red' }}>(*)</span>
              </div>
            }
          >
            <Select
              options={[
                { value: 'mb', label: 'Miền Bắc' },
                { value: 'mn', label: 'Miền Nam' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="team"
            label={
              <div>
                Team <span style={{ color: 'red' }}>(*)</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: 'Vui lòng không để trống thông tin',
              },
            ]}
          >
            <SelectItem
              listTeamPermission={listTeamPermission}
              handleNewTeam={handleNewTeam}
              handleDeleteTeam={handleDeleteTeam}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="title"
            label={
              <div>
                Chức danh <span style={{ color: 'red' }}>(*)</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: 'Vui lòng không để trống thông tin',
              },
            ]}
          >
            <Select
              options={[
                { value: 'cbgs', label: 'Cán bộ Giám sát' },
                { value: 'cbhtkt', label: 'Cán bộ HTKT' },
                { value: 'l2', label: 'L2' },
                { value: 'tc', label: 'Trưởng ca' },
                { value: 'cbqlp', label: 'CBQLP' },
                { value: 'da', label: 'Dự án' },
              ]}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="level"
            label={
              <div>
                Cấp độ <span style={{ color: 'red' }}>(*)</span>
              </div>
            }
            rules={[
              {
                whitespace: true,
                message: 'Vui lòng không để trống thông tin',
              },
              {
                required: true,
                message: 'Vui lòng không để trống thông tin',
              },
              {
                max: 255,
                message: 'Vui lòng không nhập quá 255 kí tự',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="home_address"
            label={
              <div>
                Địa chỉ <span style={{ color: 'red' }}>(*)</span>
              </div>
            }
            rules={[
              {
                whitespace: true,
                message: 'Vui lòng không để trống thông tin',
              },

              {
                max: 255,
                message: 'Vui lòng không nhập quá 255 kí tự',
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="phone_number"
            label={
              <div>
                Số điện thoại <span style={{ color: 'red' }}>(*)</span>
              </div>
            }
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
              className="o-info-user__input-number"
              onBlur={() => {
                if (currentUser?.phone_number !== form.getFieldValue('phone_number')) {
                  handleCheckPhone && handleCheckPhone(form.getFieldValue('phone_number'), form);
                }
              }}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="ip_phone"
            label={
              <div>
                IP Phone <span style={{ color: 'red' }}>(*)</span>
              </div>
            }
            rules={[
              {
                required: true,
                message: 'Vui lòng không để trống thông tin',
              },
              {
                pattern: new RegExp('^[0-9]{4,7}$'),
                message: 'IP Phone không hợp lệ',
              },
            ]}
          >
            <Input className="o-info-user__input-number" value={currentUser?.ip_phone} />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item shouldUpdate className="o-info-user__form-item o-info-user__button-submit">
        {() => (
          <>
            <Button
              style={{ marginRight: '10px' }}
              onClick={() => {
                onClickCancel && onClickCancel(form);
              }}
            >
              Hủy
            </Button>
            <Button type="primary" htmlType="submit" disabled={isDisableSave}>
              Lưu thay đổi
            </Button>
          </>
        )}
      </Form.Item>
    </Form>
  );
};

export default InfoUserFrom;
