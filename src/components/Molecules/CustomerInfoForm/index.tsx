import './index.less';

import { Button, Form, Input, Select, Space, Typography } from 'antd';
import React, { useEffect } from 'react';

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
  {
    label: 'Khác',
    value: 'OTHER',
  },
];

export interface customerInfoProps {
  email?: string;
  full_name?: string;
  name_unit?: string;
  ip_phone?: string;
  phone_number?: string;
  work_unit?: string;
}

export interface CustomerInfoFormProps {
  type: 'edit' | 'view';
  customerInfo: customerInfoProps;
  handleSaveForm?: (e: customerInfoProps) => void;
}

const CustomerInfoForm: React.FC<CustomerInfoFormProps> = ({
  type,
  handleSaveForm,
  customerInfo,
}) => {
  const [form] = Form.useForm();

  const handleOnFinish = (values: customerInfoProps) => {
    handleSaveForm && handleSaveForm(values);
  };

  useEffect(() => {
    form.setFieldsValue(customerInfo);
  }, [type]);

  return (
    <div className="m-customer-info-form">
      <Typography.Text className="m-customer-info-form__header">Danh bạ</Typography.Text>

      <div style={{ paddingTop: 5 }}>
        <Form layout="vertical" form={form} requiredMark={false} onFinish={handleOnFinish}>
          <Form.Item
            name="full_name"
            label={
              <Typography.Text style={{ color: '#fff' }}>
                Họ và tên {type === 'edit' && <span style={{ color: 'red' }}>(*)</span>}
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
              className={'m-customer-info-form__input'}
              placeholder="Nhập thông tin"
              disabled={type === 'view'}
            />
          </Form.Item>
          <Form.Item
            label={<Typography.Text style={{ color: '#fff' }}>Số điện thoại</Typography.Text>}
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
              className={'m-customer-info-form__input'}
              placeholder="Nhập thông tin"
              disabled={type === 'view'}
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
              className={'m-customer-info-form__input'}
              placeholder="Nhập thông tin"
              disabled={type === 'view'}
            />
          </Form.Item>
          <Form.Item
            name="email"
            label={
              <Typography.Text style={{ color: '#fff' }}>
                Email {type === 'edit' && <span style={{ color: 'red' }}>(*)</span>}
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
              className={'m-customer-info-form__input'}
              placeholder="Nhập thông tin"
              disabled={type === 'view'}
            />
          </Form.Item>
          <Form.Item
            name="work_unit"
            label={
              <Typography.Text style={{ color: '#fff' }}>
                Đơn vị công tác {type === 'edit' && <span style={{ color: 'red' }}>(*)</span>}
              </Typography.Text>
            }
            rules={[{ required: true, message: 'Vui lòng không để trống thông tin' }]}
          >
            <Select
              style={{ textAlign: 'left' }}
              disabled={type === 'view'}
              className={'m-customer-info-form__input'}
              options={listUnitExternal}
              placeholder="Chọn đơn vị"
            />
          </Form.Item>
          {type === 'edit' && (
            <Form.Item shouldUpdate noStyle>
              {() => (
                <Space style={{ marginTop: 10 }}>
                  <Button
                    onClick={() => {
                      form.resetFields();
                    }}
                  >
                    Hủy
                  </Button>
                  <Button
                    type="primary"
                    htmlType="submit"
                    disabled={
                      !form.isFieldsTouched(true) ||
                      !!form.getFieldsError().filter(({ errors }) => errors.length).length
                    }
                  >
                    Lưu
                  </Button>
                </Space>
              )}
            </Form.Item>
          )}
        </Form>
      </div>
    </div>
  );
};

export default CustomerInfoForm;
