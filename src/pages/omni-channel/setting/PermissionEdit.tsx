import React, { useState } from 'react';
import { Card, Typography, Table, Space, Avatar, Modal, Button } from 'antd';
import styles from '../setting/style.less';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { dataPermission } from './FakeData';
//import CustomizeBread from '@/components/CustomizeBread/CustomizeBread';
import ImageAvatar from '../setting/avatar_test.png';
import PermissionEdit_Update from './PermissionEdit_Update';

interface DataType {
    key: string;
    stt: string;
    thanhvien: string;
    sdt: string;
    team: string;
    permission: string;
    activity: string;
    lastEdit: string;
}

const PermissionEdit: React.FC = () => {
    const [isClickUpdatePermission, setClickUpdatePermission] = useState(false);
    const [userKey, setUserKey] = useState<string | any>();

    // const fetchListUserInfo = async () => {
    //     const response_1 = await requestListUserInfo();
    //     if (response_1.success === true) {
    //         return response_1.data
    //     }
    // }
    // useEffect(() => {
    //     fetchListUserInfo();
    // }, [])


    const handleClickUpdatePermission = () => {
        setClickUpdatePermission(true);
    }
    const handleGetKeyUser = (key: any) => {
        setUserKey(key);
    }
    const handleClickDeleteUser = () => {
        Modal.confirm({
            title: 'Bạn có muốn xóa user này?',
            content: 'Vui lòng xác nhận hoặc hủy',
            okText: 'Xác nhận',
            cancelText: 'Hủy',
        });
    };
    const columns: ColumnsType<DataType> = [
        {
            title: '#',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            width: '20px'
        },
        {
            title: 'Thành viên',
            dataIndex: 'thanhvien',
            key: 'thanhvien',
            align: 'center',
            width: '200px',
            render: (text, record) => (
                <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
                    <div>
                        <Avatar src={ImageAvatar} size="large" />
                    </div>
                    <div>
                        <Typography.Text>{record.thanhvien}</Typography.Text>
                        <br></br>
                        <Typography.Text style={{ paddingLeft: '10px', fontSize: '10px', color: 'rgba(0, 0, 0, 0.45)', fontWeight: 400 }}>HuyenLM2@fpt.com.vn</Typography.Text>
                    </div>
                </div>
            )
        },
        {
            title: 'SĐT',
            dataIndex: 'sdt',
            key: 'sdt',
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
            dataIndex: 'permission',
            key: 'permission',
            align: 'center'
        },
        {
            title: 'Hoạt động lúc',
            dataIndex: 'activity',
            key: 'activity',
            align: 'center'
        },
        {
            title: 'Cập nhật lần cuối',
            dataIndex: 'lastEdit',
            key: 'lastEdit',
            align: 'center'
        },
        {
            title: '',
            align: 'center',
            render: (record) => (
                <Space size="large">
                    <EditOutlined style={{ color: '#1890FF', fontSize: '20px' }} onClick={() => { handleClickUpdatePermission(); handleGetKeyUser(record.key) }} />
                    <DeleteOutlined style={{ color: '#F5222D', fontSize: '20px' }} onClick={handleClickDeleteUser} />
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
                            dataSource={dataPermission}
                            columns={columns}
                            style={{ paddingLeft: '20px' }}
                            className={styles.permissionTable}
                            pagination={{
                                pageSize: 5,
                                showQuickJumper: true,
                                showSizeChanger: true,
                                locale: {
                                    jump_to: 'Go to',
                                    page: ''
                                }
                            }}
                            scroll={{ x: 300 }}
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