import React, { useEffect, useState } from 'react';
import { Card, Typography, Table, Space, Avatar, Modal, Button, Spin } from 'antd';
import styles from '../setting/style.less';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import PermissionEdit_Update from './PermissionEdit_Update';
import { requestAllUserPermission, requestDeleteUserPermission } from './services';

interface DataAllUserPermission {
    data: any[];
    error?: string;
    error_code?: string;
    length: number;
    success: boolean;
}

interface PaginationProps {
    current: number;
    pageSize: number;
    showSizeChanger: boolean;
    showQuickJumper: boolean;
    pageSizeOptions: string[];
}

const PermissionEdit: React.FC = () => {
    const [isClickUpdatePermission, setClickUpdatePermission] = useState(false);
    const [userKey, setUserKey] = useState<string | any>();
    const [listAllUserPermission, setListAllUserPermission] = useState<DataAllUserPermission>();

    const [pagination, setPagination] = useState<PaginationProps>({
        current: 1,
        pageSize: 10,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['10', '20', '30', '50']
    })

    const fetchListAllUserPermission = async (params: any) => {
        const response_all = await requestAllUserPermission(params.pagination.pageSize, params.pagination.current);
        if (response_all.success === true) {
            setListAllUserPermission(response_all)
        }
    }

    const handleDeleteUserPermission = async (user_id: string) => {
        const response_delete = await requestDeleteUserPermission(user_id);
        if (response_delete.success === true) {
            return response_delete.data;
        }
    }

    useEffect(() => {
        fetchListAllUserPermission({ pagination })
    }, [pagination])

    const handleClickUpdatePermission = () => {
        setClickUpdatePermission(true);
    }
    const handleGetKeyUser = (key: any) => {
        setUserKey(key);
    }
    const handleClickDeleteUser = (user_id: string) => {
        Modal.confirm({
            title: 'Bạn có muốn xóa user này?',
            content: 'Vui lòng xác nhận hoặc hủy',
            okText: 'Xác nhận',
            onOk() {
                {
                    handleDeleteUserPermission(user_id);
                    fetchListAllUserPermission({ pagination })
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
    const columns: ColumnsType<DataAllUserPermission> = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            width: '20px'
        },
        {
            title: 'Thành viên',
            dataIndex: 'full_name',
            key: 'full_name',
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
            title: 'SĐT',
            dataIndex: 'phone_number',
            key: 'phone_number',
            align: 'center'
        },
        {
            title: 'Team',
            dataIndex: 'team',
            key: 'team',
            align: 'center'
        },
        {
            title: 'Nhóm quyền',
            dataIndex: 'role',
            key: 'role',
            align: 'center'
        },
        {
            title: 'Hoạt động lúc',
            dataIndex: 'active',
            key: 'active',
            align: 'center'
        },
        {
            title: 'Cập nhật lần cuối',
            dataIndex: 'updated',
            key: 'updated',
            align: 'center'
        },
        {
            title: '',
            align: 'center',
            render: (record) => (
                <Space size="large">
                    <EditOutlined style={{ color: '#1890FF', fontSize: '20px' }} onClick={() => { handleClickUpdatePermission(); handleGetKeyUser(record.user_id) }} />
                    <DeleteOutlined style={{ color: '#F5222D', fontSize: '20px' }} onClick={() => { handleClickDeleteUser(record.user_id) }} />
                </Space>
            )
        },
    ];
    return (
        <>
            {isClickUpdatePermission === false ? (
                <>
                    <Card
                        className={styles.detailCardLayoutNoMar}
                    >
                        <Table
                            dataSource={listAllUserPermission?.data[0]}
                            columns={columns}
                            style={{ paddingLeft: '20px' }}
                            className={styles.permissionTable}
                            onChange={handleTableChange}
                            pagination={{
                                ...pagination,
                                total: listAllUserPermission?.length,
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
                            loading={{ indicator: <div><Spin /></div>, spinning: !listAllUserPermission }}
                        />
                    </Card>
                </>
            ) : (
                <PermissionEdit_Update setClickUpdatePermission={setClickUpdatePermission} userKey={userKey} />
            )
            }
        </>
    )
}
export default PermissionEdit;