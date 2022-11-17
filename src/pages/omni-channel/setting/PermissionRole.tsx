import React, { useState } from 'react';
import { Card, Table, Space, Modal, Spin, message } from 'antd';
import styles from '../setting/style.less';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PermissionEdit_Update from './PermissionEdit_Update';
import {
  requestAllUserPermission,
  requestDeleteUserPermission,
  requestReadRoleAndPerm,
} from './services';
import { useRequest } from 'umi';

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
  const [isClickUpdatePermission, setClickUpdatePermission] = useState(false);
  const [userKey, setUserKey] = useState<string | any>();
  const [listAllRolePermission, setListAllRolePermission] = useState<DataAllRolePermission[]>([]);
  const { data } = useRequest(
    () => {
      return requestReadRoleAndPerm({});
    },
    {
      onSuccess: (res) => {
        setListAllRolePermission(data);
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

  const handleClickUpdatePermission = () => {
    setClickUpdatePermission(true);
  };
  const handleGetKeyUser = (key: any) => {
    setUserKey(key);
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
    },
    {
      title: 'Tên vai trò',
      dataIndex: 'code',
      key: 'code',
      align: 'center',
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
      align: 'center',
    },
    {
      title: 'Người tạo',
      dataIndex: 'team',
      key: 'team',
      align: 'center',
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'role',
      key: 'role',
      align: 'center',
    },
    {
      title: 'Ngày sửa gần nhất',
      dataIndex: 'active',
      key: 'active',
      align: 'center',
    },

    {
      title: '',
      align: 'center',
      render: (text: string, record: DataAllRolePermission) => (
        <Space size="large">
          <EditOutlined
            style={{ color: '#1890FF', fontSize: '20px' }}
            onClick={() => {
              handleClickUpdatePermission();
              handleGetKeyUser(record.id);
            }}
          />
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
      {isClickUpdatePermission === false ? (
        <>
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
      ) : (
        <PermissionEdit_Update
          setClickUpdatePermission={setClickUpdatePermission}
          userKey={userKey}
        />
      )}
    </>
  );
};
export default PermissionRole;
