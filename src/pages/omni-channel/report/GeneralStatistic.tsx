import React from 'react';
import { Card, Form, Select, Button } from 'antd';
import styles from '../report/style.less';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
    md: {
      span: 7,
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
      span: 12,
    },
  },
};

const submitFormLayout = {
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 10,
    },
    md: {
      span: 10,
      offset: 11,
    },
  },
};

const GeneralStatistic: React.FC = () => {
  return (
    <>
      <Card className={styles.detailCardLayout}>
        <Form {...formItemLayout}>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <div style={{ flex: 1 }}>
              <Form.Item label="Loại thống kê" name="Loại thống kê">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Chi nhánh ảnh hưởng" name="Chi nhánh ảnh hưởng">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Bộ phận phát hiện" name="Bộ phận phát hiện">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Loại ticket" name="Loại ticket">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Hình thức tạo" name="Hình thức tạo">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Nhóm phần tử" name="Nhóm phần tử">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Loại dịch vụ" name="Loại dịch vụ">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Cấp độ" name="Cấp độ">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item label="Vùng miền" name="Vùng miền">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Queue" name="Queue">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Nhân viên xử lý" name="Nhân viên xử lý">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Tình trạng ticket" name="Tình trạng ticket">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Trạng thái xử lý" name="Trạng thái xử lý">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Sự cố" name="Sự cố">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Loại khách hàng" name="Loại khách hàng">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item label="Mức độ" name="Mực độ">
                <Select placeholder="Please chose">
                  <Select.Option value="1">Phần tử sự cố</Select.Option>
                  <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                </Select>
              </Form.Item>
            </div>
          </div>
          <Form.Item {...submitFormLayout} style={{ marginTop: '10px', marginBottom: 'unset' }}>
            <Button className={styles.exportBtn}>Xuất excel</Button>
            <Button type="primary">Thống kê</Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  );
};

export default GeneralStatistic;
