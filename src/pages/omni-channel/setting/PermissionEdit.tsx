import React, { useEffect, useState } from 'react';
import {
    Card,
    Table,
    Space,
    Modal,
    Spin,
    Avatar,
    Typography,
    Form,
    Input,
    Button,
    Select
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    CloseCircleFilled,
    SaveOutlined,
    CloseOutlined,
    SearchOutlined
} from '@ant-design/icons';
import {
    requestAllUserPermission,
    requestDetailUserPermission,
    requestDeleteUserPermission,
    requestGroupPermissionData,
    requestTeamPermissionData,
    requestDeleteTeamPermission,
    requestAllUserInfo
} from './services';
import styles from '../setting/style.less';
import type { ColumnsType } from 'antd/es/table';
import ImagaAvatar from './avatar_test.png';

interface DataAllUserPermission {
    data: any[];
    error?: string;
    error_code?: string;
    length?: number;
    success?: boolean;
    full_name?: string;
    email?: string;
    name?: string;
}

interface EditDetailUser {
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

interface GroupPermission {
    code?: string;
    desc?: string;
    id?: string;
}

interface TeamPermission {
    name: string;
    id: string;
}

interface DataAllUserInfo {
    image?: string;
    name?: string;
    email?: string;
    position?: string;
    department?: string;
    level?: string;
    organization?: string;
    home_address?: string;
    work_address?: string;
    phone_number?: string;
    ip_phone?: string;
    equipment?: any[];
    status?: string;
    team?: string;
    notification?: any;
    screen_mode?: any;
    last_active?: string;
    last_update?: string;
    id?: string;
    role?: string;
}

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24
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
            span: 24
        },
        md: {
            span: 22,
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
            offset: 10,
        },
    },
};

const PermissionEdit: React.FC = () => {
    const [isClickUpdatePermission, setClickUpdatePermission] = useState(false);
    //const [userKey, setUserKey] = useState<string | any>();

    const [listAllUserPermission, setListAllUserPermission] = useState<DataAllUserPermission>();
    const [listAllUserInfo, setListAllUserInfo] = useState<DataAllUserInfo[]>([]);
    const [listAllUserInfoLength, setListAllUserInfoLength] = useState<string | any>();
    const [listEditUserPermission, setListEditUserPermission] = useState<EditDetailUser>();
    const [listGroupPermission, setListGroupPermission] = useState<GroupPermission[]>([]);
    const [listTeamPermission, setListTeamPermission] = useState<TeamPermission[]>([]);

    const [clickAddNewTeam, setClickAddNewTeam] = useState(false);

    const [pagination, setPagination] = useState<PaginationProps>({
        current: 1,
        pageSize: 3,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['3', '10', '30', '50']
    })

    const fetchListAllUserPermission = async (params: any) => {
        const response_all = await requestAllUserPermission(params.pagination.pageSize, params.pagination.current);
        if (response_all.success === true) {
            setListAllUserPermission(response_all)
        }
    }

    const fetchListAllUserInfo = async (params: any) => {
        const resAll = await requestAllUserInfo(params.pagination.pageSize, params.pagination.current);
        if (resAll.success === true) {
            setListAllUserInfo(resAll.data);
            setListAllUserInfoLength(resAll.length);
        }
    }

    const fetchDetaiUserPermission = async (userKey: any) => {
        const resDetail = await requestDetailUserPermission(3, 1, userKey);
        if (resDetail.success === true) {
            setListEditUserPermission(resDetail);
        }
    }

    const handleDeleteUserPermission = async (user_id: string) => {
        const response_delete = await requestDeleteUserPermission(user_id);
        if (response_delete.success === true) {
            return response_delete.data;
        }
    }

    const fetchGroupPermissionData = async () => {
        const resPer = await requestGroupPermissionData();
        if (resPer.success === true) {
            setListGroupPermission(resPer.data)
        }
    }

    const fetchTeamPermissionData = async () => {
        const resTeam = await requestTeamPermissionData();
        if (resTeam.success === true) {
            setListTeamPermission(resTeam.data)
        }
    }

    const handleDeleteTeamPermission = async (team_id: string) => {
        const resDelTeam = await requestDeleteTeamPermission(team_id);
        if (resDelTeam.success === true) {
            return resDelTeam.data
        }
    }

    const handleClickDeleteTeam = (e: any, id: string) => {
        e.stopPropagation();
        e.preventDefault();
        handleDeleteTeamPermission(id);
        fetchTeamPermissionData();
        // const updated = [...listTeamPermission];
        // updated.splice(id, 1);
        // setListTeamPermission(updated);
    }

    const handleSelectTeam = (values: any) => {
        setClickAddNewTeam(false);
    }

    useEffect(() => {
        //fetchListAllUserPermission({ pagination })
        fetchListAllUserInfo({ pagination })
    }, [pagination])

    const handleClickUpdatePermission = () => {
        setClickUpdatePermission(true);
    }
    const handleCancleUpdatePermission = () => {
        setClickUpdatePermission(false);
    }
    const handleClickDeleteUser = (user_id: string) => {
        Modal.confirm({
            title: 'Thao tác xóa?',
            content: 'Bạn chắc chắn muốn xóa thông tin này',
            okText: 'Xóa',
            onOk() {
                handleDeleteUserPermission(user_id);
                fetchListAllUserPermission({ pagination })
            },
            cancelText: 'Hủy',
            icon: <CloseCircleFilled style={{ color: 'red' }} />,
            okButtonProps: { danger: true }
        });
    };
    const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
        setPagination({
            ...pagination,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        });
    };
    const columns: ColumnsType<DataAllUserInfo> = [
        {
            title: '',
            align: 'center',
            width: '20px',
            render: (text, record) => (
                <>
                    {(pagination.current - 1) * pagination.pageSize + listAllUserInfo.indexOf(record) + 1}
                </>
            )
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '200px',
            render: (text, record) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                        <Avatar src={ImagaAvatar} size="large" />
                    </div>
                    <div style={{ flex: 2, textAlign: 'left' }}>
                        <Typography.Text >{record.name}</Typography.Text>
                        <br></br>
                        <Typography.Text className={styles.emailPermissionTable} style={{ textAlign: 'center', alignItems: 'center' }}>{record.email}</Typography.Text>
                    </div>
                </div>
            )
        },
        {
            title: 'Số IPP',
            dataIndex: 'ip_phone',
            key: 'ip_phone',
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
            dataIndex: 'last_active',
            key: 'last_active',
            align: 'center'
        },
        {
            title: 'Cập nhật lần cuối',
            dataIndex: 'last_update',
            key: 'last_update',
            align: 'center'
        },
        {
            title: '',
            align: 'center',
            render: (record) => (
                <Space size="large">
                    <EditOutlined
                        style={{ color: '#1890FF', fontSize: '20px' }}
                        onClick={
                            () => {
                                handleClickUpdatePermission();
                                fetchDetaiUserPermission(record.user_id);
                                fetchGroupPermissionData();
                                fetchTeamPermissionData();
                            }
                        }
                    />
                    <DeleteOutlined
                        style={{ color: '#F5222D', fontSize: '20px' }}
                        onClick={() => { handleClickDeleteUser(record.user_id) }}
                    />
                </Space>
            )
        },
    ];
    return (
        <>
            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                <Input
                    style={{ width: '300px' }}
                    prefix={<SearchOutlined />}
                    placeholder="Tìm kiếm"
                    allowClear
                />
            </div>
            <Card
                className={styles.detailCardLayoutNoMar}
            >
                <Table
                    //dataSource={listAllUserPermission?.data[0]}
                    dataSource={listAllUserInfo}
                    columns={columns}
                    style={{ paddingLeft: '20px' }}
                    className={styles.permissionTable}
                    onChange={handleTableChange}
                    pagination={{
                        ...pagination,
                        total: listAllUserInfoLength,
                        locale: {
                            items_per_page: '/ Trang',
                            jump_to: 'Đến trang',
                            page: '',
                            next_page: 'Trang sau',
                            prev_page: 'Trang trước',
                            next_3: '3 trang sau',
                            next_5: '5 trang sau',
                            prev_3: '3 trang trước',
                            prev_5: '5 trang trước',
                        },
                    }}
                    scroll={{ x: 300 }}
                    loading={{ indicator: <div><Spin /></div>, spinning: !listAllUserInfo }}
                />
                <Modal
                    open={isClickUpdatePermission}
                    onCancel={handleCancleUpdatePermission}
                    title="Lâm Mỹ Huyền"
                    footer={false}
                    width={900}
                    centered
                >
                    <Form {...formItemLayout} layout="vertical">
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                                <Form.Item
                                    label="Tên người dùng"
                                    name="Tên người dùng"
                                >
                                    <Input disabled />
                                </Form.Item>
                                <Form.Item
                                    label="Team"
                                    name="team"
                                >
                                    <Select
                                        onChange={handleSelectTeam}
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <div style={{ paddingLeft: '14px', paddingRight: '14px', paddingBottom: '10px' }}>
                                                    <hr></hr>
                                                    {clickAddNewTeam === false ? (
                                                        <Button
                                                            style={{ padding: 'unset', color: 'rgba(0,0,0,0.5)', fontStyle: 'italic' }}
                                                            type='text'
                                                            onClick={() => setClickAddNewTeam(true)}
                                                        >
                                                            Chỉnh sửa / Thêm team mới
                                                        </Button>
                                                    ) : (
                                                        <div className={styles.flexLayout}>
                                                            <Input
                                                                placeholder="Nhập team mới tại đây"
                                                                className={styles.addNewTeamPlaceholder}
                                                            />
                                                            <Space>
                                                                <SaveOutlined
                                                                    style={{ marginLeft: 10, fontSize: 14 }}
                                                                />
                                                                <CloseOutlined
                                                                    style={{ fontSize: 14 }}
                                                                    onClick={() => setClickAddNewTeam(false)}
                                                                />
                                                            </Space>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    >
                                        {listTeamPermission && listTeamPermission.map((item: TeamPermission) => (
                                            <Select.Option value={item.id}>
                                                <div className={styles.flexLayout}>
                                                    <div>
                                                        {item.name}
                                                    </div>
                                                    {clickAddNewTeam === true ? (
                                                        <DeleteOutlined onClick={(e) => handleClickDeleteTeam(e, item.id)} />
                                                    ) : ('')}
                                                </div>
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Phòng ban"
                                    name="Phòng ban"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Số di động"
                                    name="phone_number"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Cấp độ"
                                    name="Cấp độ"
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Form.Item
                                    label="Email"
                                    name="email"
                                >
                                    <Input disabled />
                                </Form.Item>
                                <Form.Item
                                    label="Nhóm quyền"
                                    name="role"
                                >
                                    <Select>
                                        {listGroupPermission && listGroupPermission.map((item: GroupPermission) => (
                                            <Select.Option
                                                value={item.code}
                                            >
                                                {item.code}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Chức danh"
                                    name="Chức danh"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="IP Phone"
                                    name="ip_phone"
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Địa chỉ nhà"
                                    name="home_address"
                                >
                                    <Input />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item {...submitFormLayout} style={{ marginBottom: 'unset' }}>
                            <Button style={{ marginRight: '10px' }} onClick={handleCancleUpdatePermission}>Hủy</Button>
                            <Button type='primary' htmlType='submit'>Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </>
    )
}
export default PermissionEdit;