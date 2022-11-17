import React, { useState } from 'react';
import { Card, Table, Space, Modal, Spin, message, Input, Row, Col, Button } from 'antd';
import styles from '../setting/style.less';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, SearchOutlined } from '@ant-design/icons';
import PermissionEdit_Update from './PermissionEdit_Update';
import {
  requestAllUserPermission,
  requestDeleteUserPermission,
  requestReadRoleAndPerm,
} from './services';
import { useRequest } from 'umi';
import { debounce } from 'lodash';

interface DataAllRolePermission {
  code: string;
  desc: string;
  id: string;
  permission_list: {
    code: string;
    desc: string;
    group: string;
    id: string;
  }[];
}

interface PaginationProps {
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  pageSizeOptions: string[];
}

const PermissionRole: React.FC = () => {
  const [listAllRolePermission, setListAllRolePermission] = useState<DataAllRolePermission[]>([]);
  const { data: dataReadRoleAndPerm, refresh: mutateReadRoleAndPerm } = useRequest(
    () => {
      return requestReadRoleAndPerm({});
    },
    {
      onSuccess: (res) => {
        setListAllRolePermission(dataReadRoleAndPerm);
      },
      onError: (error) => {
        message.error('Error');
        console.log(error);
      },
    },
  );

  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '30', '50'],
  });

  const fetchListAllUserPermission = async (params: { pagination: PaginationProps }) => {
    const response_all = await requestAllUserPermission(
      params.pagination.pageSize,
      params.pagination.current,
    );
    if (response_all.success === true) {
      setListAllRolePermission(response_all);
    }
  };

  const handleDeleteUserPermission = async (user_id: string) => {
    const response_delete = await requestDeleteUserPermission(user_id);
    if (response_delete.success === true) {
      return response_delete.data;
    }
  };

  const handleClickDeleteUser = (user_id: string) => {
    Modal.confirm({
      title: 'Bạn có muốn xóa user này?',
      content: 'Vui lòng xác nhận hoặc hủy',
      okText: 'Xác nhận',
      onOk() {
        {
          handleDeleteUserPermission(user_id);
          fetchListAllUserPermission({ pagination });
        }
      },
      cancelText: 'Hủy',
    });
  };
  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };
  const columns: ColumnsType<DataAllRolePermission> = [
    {
      title: '#',
      dataIndex: 'stt',
      key: 'stt',
      align: 'center',
      width: '20px',
      render: (text, record, idx) => {
        return idx + 1;
      },
    },
    {
      title: 'Tên vai trò',
      dataIndex: 'code',
      key: 'code',
      width: '200px',
      // render: (text, record) => (
      //     <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
      //         <div>
      //             <Avatar src={ImageAvatar} size="large" />
      //         </div>
      //         <div>
      //             <Typography.Text>{record.thanhvien}</Typography.Text>
      //             <br></br>
      //             <Typography.Text style={{ paddingLeft: '10px', fontSize: '10px', color: 'rgba(0, 0, 0, 0.45)', fontWeight: 400 }}>HuyenLM2@fpt.com.vn</Typography.Text>
      //         </div>
      //     </div>
      // )
    },
    {
      title: 'Mô tả vai trò',
      dataIndex: 'desc',
      key: 'desc',
      render: (text) => {
        return text ? text : '-';
      },
    },
    {
      title: 'Người tạo',
      dataIndex: 'team',
      key: 'team',
      render: (text) => {
        return text ? text : '-';
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'role',
      key: 'role',
      render: (text) => {
        return text ? text : '-';
      },
    },
    {
      title: 'Ngày sửa gần nhất',
      dataIndex: 'active',
      key: 'active',
      render: (text) => {
        return text ? text : '-';
      },
    },

    {
      title: '',
      render: (text: string, record: DataAllRolePermission) => (
        <Space size="large">
          <EditOutlined style={{ color: '#1890FF', fontSize: '20px' }} onClick={() => {}} />
          <DeleteOutlined
            style={{ color: '#F5222D', fontSize: '20px' }}
            onClick={() => {
              handleClickDeleteUser(record.id);
            }}
          />
        </Space>
      ),
    },
  ];
  return (
    <>
      <Row>
        <Col span={16}></Col>
        <Col span={4}>
          <Input
            key="search"
            prefix={<SearchOutlined />}
            placeholder="Nhập từ khoá"
            allowClear
            onChange={debounce(
              (e) => {
                const { value } = e.target;
                console.log(value);
              },
              500,
              {
                trailing: true,
                leading: false,
              },
            )}
          />
        </Col>

        <Col span={4}>
          <Button
            onClick={() => {
              mutateReadRoleAndPerm();
            }}
          >
            122444
          </Button>
        </Col>
      </Row>

      <Card className={styles.detailCardLayoutNoMar}>
        <Table
          dataSource={listAllRolePermission}
          columns={columns}
          style={{ paddingLeft: '20px' }}
          className={styles.permissionTable}
          onChange={handleTableChange}
          pagination={{
            ...pagination,
            total: listAllRolePermission?.length,
            locale: {
              items_per_page: '/ Trang',
              jump_to: 'Đến trang',
              next_page: 'Trang sau',
              prev_page: 'Trang trước',
              next_3: '3 trang sau',
              next_5: '5 trang sau',
              prev_3: '3 trang trước',
              prev_5: '5 trang trước',
            },
          }}
          scroll={{ x: 300 }}
          loading={{
            indicator: (
              <div>
                <Spin />
              </div>
            ),
            spinning: !listAllRolePermission,
          }}
        />
      </Card>
    </>
  );
};
export default PermissionRole;
