import React, { useState } from 'react';
import { Button, Input, Table, Card, Segmented, Space, Image, Modal, Form, Typography } from 'antd';
import {
  SearchOutlined,
  FilterOutlined,
  StarOutlined,
  PlusSquareFilled,
  StarFilled,
} from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { dataDanhba, DataTypeDanhBa } from './FakeData';
import styles from '../report/style.less';
import Phone from '../../../../public/phone.svg';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 10,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 22,
    },
  },
};

const PhoneBook: React.FC = () => {
  const [form] = Form.useForm();
  const [openModal, setOpenModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [dataModalEdit, setDataModalEdit] = useState<DataTypeDanhBa>({
    key: '',
    stt: '',
    name: '',
    phone_number: '',
    ip_phone: '',
    email: '',
    loai: ' ',
    note: '',
    work_address: '',
  });

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCancleModal = () => {
    setIsEdit(false);
    setOpenModal(false);
  };

  const handleOnFinish = (value: DataTypeDanhBa) => {
    console.log(value);
  };

  const columnsDanhba: ColumnsType<DataTypeDanhBa> = [
    {
      title: '',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      width: '10px',
      render: (text, record) => (
        <>
          {true ? (
            <StarFilled style={{ color: '#399DEE', fontSize: 20 }} onClick={() => {}} />
          ) : (
            <StarOutlined style={{ fontSize: 20 }} onClick={() => {}} />
          )}
        </>
      ),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      width: '200px',
      render: (text, record) => {
        return (
          <Typography.Text
            style={{ cursor: 'pointer' }}
            onClick={() => {
              handleOpenModal();
              setIsEdit(true);
              form.setFieldsValue(record);
            }}
          >
            {text}
          </Typography.Text>
        );
      },
    },
    {
      title: 'Số di động',
      dataIndex: 'phone_number',
      key: 'phone_number',
      align: 'center',
      width: '270px',
    },
    {
      title: 'Đơn vị',
      dataIndex: 'sodidong',
      key: 'sodidong',
      align: 'center',
      width: '265px',
    },
    {
      title: 'Số IIP',
      dataIndex: 'ip_phone',
      key: 'ip_phone',
      align: 'center',
      width: '235px',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center',
      width: '340px',
    },
    {
      title: '',
      dataIndex: 'loai',
      key: 'loai',
      align: 'center',
      width: '100px',
      render: (text, record) => {
        return (
          <div style={{ cursor: 'pointer' }}>
            <Image className={styles.call} width={30} src={Phone} preview={false} />
          </div>
        );
      },
    },
  ];

  return (
    <Card className={styles.detailCardLayout}>
      <div style={{ marginLeft: '10px' }}>
        <Segmented
          size="middle"
          options={[
            {
              label: 'Khách hàng',
              value: 'Khách hàng',
            },
            {
              label: 'Nội bộ',
              value: 'Nội bộ',
            },
          ]}
          className={styles.antSegmented}
        />
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Space>
          <div style={{ marginRight: '10px', cursor: 'pointer' }}>
            <FilterOutlined /> Bộ lọc
          </div>
          <Input style={{ width: '300px' }} prefix={<SearchOutlined />} placeholder="Tìm kiếm" />
          <PlusSquareFilled
            style={{ fontSize: 32, color: '#478D46' }}
            onClick={() => {
              handleOpenModal();
              setIsEdit(false);
              form.resetFields();
            }}
          />
        </Space>
      </div>

      <Table
        dataSource={dataDanhba}
        columns={columnsDanhba}
        style={{ paddingLeft: '10px', paddingTop: '10px' }}
        className={styles.tableStyle}
        pagination={{
          pageSize: 5,
          showQuickJumper: true,
          showSizeChanger: true,
          locale: {
            jump_to: 'Go to',
            page: '',
          },
        }}
        scroll={{ x: 300 }}
      />

      <Modal
        open={openModal}
        className={styles.modal}
        onCancel={handleCancleModal}
        title={isEdit ? 'Thêm khách hàng' : 'Thông tin khách hàng'}
        footer={false}
        width={620}
        centered
      >
        <Form {...formItemLayout} form={form} onFinish={handleOnFinish} layout="vertical">
          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              Họ và tên <span style={{ color: 'red' }}>(*)</span>
            </Typography.Text>
            <Form.Item
              name="name"
              style={{ marginTop: 8 }}
              rules={[
                { required: true, message: 'Vui lòng không để trống thông tin' },
                {
                  max: 255,
                  message: 'Vui lòng không nhập quá 255 kí tự',
                },
              ]}
            >
              <Input placeholder="Nhập họ và tên" />
            </Form.Item>
          </div>
          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              Số điện thoại <span style={{ color: 'red' }}>(*)</span>
            </Typography.Text>
            <Form.Item
              name="phone_number"
              style={{ marginTop: 8 }}
              rules={[
                {
                  required: true,
                  message: 'Vui lòng không để trống thông tin',
                },
                {
                  pattern: new RegExp('(0[3|5|7|8|9])+([0-9]{8})'),
                  message: 'Số điện thoại không hợp lệ',
                },
                {
                  max: 10,
                  message: 'Số điện thoại không hợp lệ',
                },
              ]}
            >
              <Input
                placeholder="Nhập số điện thoại"
                className={styles.inputNumber}
                type="number"
              />
            </Form.Item>
          </div>

          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              IP phone <span style={{ color: 'red' }}>(*)</span>
            </Typography.Text>
            <Form.Item
              name="ip_phone"
              style={{ marginTop: 8 }}
              rules={[
                { required: true, message: 'Vui lòng không để trống thông tin' },
                {
                  max: 6,
                  message: 'Vui lòng không nhập quá 6 số',
                },
              ]}
            >
              <Input className={styles.inputNumber} type="number" placeholder="Nhập số máy nhánh" />
            </Form.Item>
          </div>
          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              Email <span style={{ color: 'red' }}>(*)</span>
            </Typography.Text>
            <Form.Item
              name="email"
              style={{ marginTop: 8 }}
              rules={[
                { required: true, message: 'Vui lòng không để trống thông tin' },
                { type: 'email', message: 'Vui lòng nhập email hợp lệ' },
                {
                  max: 255,
                  message: 'Vui lòng không nhập quá 255 kí tự',
                },
              ]}
            >
              <Input placeholder="Nhập email đơn vị" />
            </Form.Item>
          </div>
          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              Đơn vị công tác <span style={{ color: 'red' }}>(*)</span>
            </Typography.Text>
            <Form.Item
              name="work_address"
              style={{ marginTop: 8 }}
              rules={[
                { required: true, message: 'Vui lòng không để trống thông tin' },
                {
                  max: 255,
                  message: 'Vui lòng không nhập quá 255 kí tự',
                },
              ]}
            >
              <Input placeholder="Nhập đơn vị" />
            </Form.Item>
          </div>
          <div>
            <Typography.Text className={styles.antTextStyle} style={{ marginBottom: 8 }}>
              Ghi chú
            </Typography.Text>
            <Form.Item name="note" style={{ marginTop: 8 }}>
              <Input.TextArea />
            </Form.Item>
          </div>
          <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
            <Button style={{ marginRight: '10px' }} onClick={handleCancleModal}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              {isEdit ? 'Cập nhập' : 'Tạo mới'}
            </Button>
          </div>
        </Form>
      </Modal>
    </Card>
  );
};

export default PhoneBook;
