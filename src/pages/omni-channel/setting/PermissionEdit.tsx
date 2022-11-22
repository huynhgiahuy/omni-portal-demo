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
    Select,
    DatePicker,
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    CloseCircleFilled,
    SaveOutlined,
    CloseOutlined,
    FilterOutlined
} from '@ant-design/icons';
import {
    requestAllUserPermission,
    requestDetailUserPermission,
    requestDeleteUserPermission,
    requestGroupPermissionData,
    requestTeamPermissionData,
    requestDeleteTeamPermission,
    requestAllUserInfo,
    requestAllUserInfoFinal,
    requestDetailUserInfoFinal,
    requestCreateNewTeam,
    requestUpdateUserInfoFinal
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

interface DataAllUserInfoFinal {
    name?: string;
    email?: string;
    id?: string;
    team_name?: string;
    team_id?: string;
    role_id?: string;
    role_code?: string;
    ip_phone?: string;
    home_address?: string;
    work_address?: string;
    level?: string;
    position?: string;
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
    const [listAllUserInfoFinal, setListAllUserInfoFinal] = useState<DataAllUserInfoFinal[]>([]);
    const [listAllUserInfoLengthFinal, setListAllUserInfoLengthFinal] = useState<string | any>();
    const [listEditUserInfoFinal, setListEditUserInfoFinal] = useState<DataAllUserInfoFinal[]>([]);
    const [listEditUserPermission, setListEditUserPermission] = useState<EditDetailUser>();
    const [newTeamValue, setNewTeamValue] = useState<string | any>();
    const [listGroupPermission, setListGroupPermission] = useState<GroupPermission[]>([]);
    const [listTeamPermission, setListTeamPermission] = useState<TeamPermission[]>([]);

    const [clickAddNewTeam, setClickAddNewTeam] = useState(false);

    const [isClickFilterBtn, setClickFilterBtn] = useState(false);
    const [isActiveFilterBtn, setActiveFilterBtn] = useState(false);
    const [listValueTND, setListValueTND] = useState<string | any>('');
    const [listValueTeam, setListValueTeam] = useState<string | any>('');
    const [listValueNLV, setListValueNLV] = useState<string | any>('');
    const [listValueNQ, setListValueNQ] = useState<string | any>('');

    const [form] = Form.useForm();

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

    ///
    const fetchListAllUserInfoFinal = async (params: any) => {
        const resAllFinal = await requestAllUserInfoFinal(params.pagination.pageSize, params.pagination.current);
        if (resAllFinal.success === true) {
            setListAllUserInfoFinal(resAllFinal.data);
            setListAllUserInfoLengthFinal(resAllFinal.length);
        }
    }

    const fetchDetaiUserInfoFinal = async (user_id: any) => {
        const resDetail = await requestDetailUserInfoFinal(user_id);
        if (resDetail.success === true) {
            setListEditUserInfoFinal(resDetail);
        }
    }

    ///

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

    const handleCreateNewTeamPermission = async (newTeamValue: string) => {
        const resNewTeam = await requestCreateNewTeam(newTeamValue);
        if (resNewTeam.success === true) {
            return resNewTeam.data
        }
    }

    const handleSubmitNewTeam = (values: any) => {
        handleCreateNewTeamPermission(values);
        form.resetFields();
        fetchTeamPermissionData();
    }

    const handleSubmitUpdateUserInfoFinal = async (values: any) => {
        // const resSubmitUpdate = await requestUpdateUserInfoFinal(values.name, values.email, values.home_address);
        // if (resSubmitUpdate.success === true) {
        //     return resSubmitUpdate.data
        // }
        console.log(values)
    }

    const handleClickDeleteTeam = (e: any, id: string) => {
        e.stopPropagation();
        e.preventDefault();
        handleDeleteTeamPermission(id);
        fetchTeamPermissionData();
    }

    const handleSelectTeam = (values: any) => {
        setClickAddNewTeam(false);
    }

    useEffect(() => {
        //fetchListAllUserPermission({ pagination })
        //fetchListAllUserInfo({ pagination })
        fetchListAllUserInfoFinal({ pagination })
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
                fetchListAllUserInfoFinal({ pagination })
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
    const columns: ColumnsType<DataAllUserInfoFinal> = [
        {
            title: '#',
            align: 'center',
            width: '20px',
            render: (text, record) => (
                <>
                    {(pagination.current - 1) * pagination.pageSize + listAllUserInfoFinal.indexOf(record) + 1}
                </>
            )
        },
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
            width: '300px',
            render: (text, record) => (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div style={{ flex: 1 }}>
                        <Avatar src={ImagaAvatar} size="large" />
                    </div>
                    <div style={{ flex: 3, textAlign: 'left' }}>
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
            dataIndex: 'team_name',
            key: 'team_name',
            align: 'center'
        },
        {
            title: 'Nơi làm việc',
            dataIndex: 'work_address',
            key: 'work_address',
            align: 'center'
        },
        {
            title: 'Nhóm quyền',
            dataIndex: 'role_code',
            key: 'role_code',
            align: 'center'
        },
        {
            title: 'Cập nhật lần cuối',
            align: 'center'
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: '',
            key: '',
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
                                fetchDetaiUserInfoFinal(record.id);
                                fetchGroupPermissionData();
                                fetchTeamPermissionData();
                            }
                        }
                    />
                    <DeleteOutlined
                        style={{ color: '#F5222D', fontSize: '20px' }}
                        onClick={() => { handleClickDeleteUser(record.id) }}
                    />
                </Space>
            )
        },
    ];
    const onReset = () => {
        form.resetFields();
        setActiveFilterBtn(false);
    };

    const handleSelectValueTND = (values: any) => {
        if (values !== undefined || values !== '') {
            setListValueTND(values);
            setActiveFilterBtn(true);
        }
        else {
            setActiveFilterBtn(false);
        }
    }

    const handleSelectValueTeam = (values: any) => {
        if (values !== undefined || values !== '') {
            setListValueTeam(values);
            setActiveFilterBtn(true);
        }
        else {
            setActiveFilterBtn(false);
        }
    }

    const handleSelectValueNLV = (values: any) => {
        if (values !== undefined || values !== '') {
            setListValueNLV(values);
            setActiveFilterBtn(true);
        }
        else {
            setActiveFilterBtn(false);
        }
    }

    const handleSelectValueNQ = (values: any) => {
        if (values !== undefined || values !== '') {
            setListValueNQ(values);
            setActiveFilterBtn(true);
        }
        else {
            setActiveFilterBtn(false);
        }
    }

    return (
        <>
            <div style={{ marginTop: '10px', textAlign: 'right' }}>
                <Button onClick={() => setClickFilterBtn(!isClickFilterBtn)}
                    className={isActiveFilterBtn ? `${styles.activeBtnFilter}` : `${styles.notActiveBtnFilter}`}
                >
                    <FilterOutlined className={isActiveFilterBtn ? `${styles.activeIconFilter}` : `${styles.notActiveIconFilter}`} />Bộ lọc
                </Button>
            </div>
            {isClickFilterBtn === true ? (
                <div style={{ padding: '20px', backgroundColor: '#E8E8E8', marginLeft: '50%', marginTop: '10px' }}>
                    <Form layout='vertical' form={form}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                            <div style={{ flex: 1 }}>
                                <Form.Item label="Tên người dùng" name="Tên người dùng">
                                    <Select onChange={handleSelectValueTND} value={listValueTND}>
                                        <Select.Option value="Test 1">Test 1</Select.Option>
                                        <Select.Option value="Test 2">Test 2</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Form.Item label="Team" name="Team">
                                    <Select onChange={handleSelectValueTeam} value={listValueTeam}>
                                        <Select.Option value="Test 1">Test 1</Select.Option>
                                        <Select.Option value="Test 2">Test 2</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Form.Item label="Nơi làm việc" name="Nơi làm việc">
                                    <Select onChange={handleSelectValueNLV} value={listValueNLV}>
                                        <Select.Option value="Test 1">Test 1</Select.Option>
                                        <Select.Option value="Test 2">Test 2</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Form.Item label="Nhóm quyền" name="Nhóm quyền">
                                    <Select onChange={handleSelectValueNQ} value={listValueNQ}>
                                        <Select.Option value="Test 1">Test 1</Select.Option>
                                        <Select.Option value="Test 2">Test 2</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item style={{ marginBottom: 'unset' }}>
                            <Button type='text' style={{ color: 'blue' }} onClick={onReset}>Reset</Button>
                        </Form.Item>
                    </Form>
                </div>
            ) : ('')}
            <Card
                className={styles.detailCardLayoutNoMar}
            >
                <Table
                    //dataSource={listAllUserPermission?.data[0]}
                    //dataSource={listAllUserInfo}
                    dataSource={listAllUserInfoFinal}
                    columns={columns}
                    style={{ paddingLeft: '20px' }}
                    className={styles.permissionTable}
                    onChange={handleTableChange}
                    pagination={{
                        ...pagination,
                        total: listAllUserInfoLengthFinal,
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
                    loading={{ indicator: <div><Spin /></div>, spinning: !listAllUserInfoFinal }}
                />
                <Modal
                    open={isClickUpdatePermission}
                    onCancel={handleCancleUpdatePermission}
                    title="Lâm Mỹ Huyền"
                    footer={false}
                    width={900}
                    centered
                >
                    <Form
                        {...formItemLayout}
                        layout="vertical"
                        onFinish={handleSubmitUpdateUserInfoFinal}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                                <Form.Item
                                    label="Tên người dùng"
                                    name="name"
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
                                                        <Form form={form}>
                                                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                                                <div style={{ flex: 1 }}>
                                                                    <Form.Item name="newTeamValue">
                                                                        <Input
                                                                            placeholder="Nhập team mới tại đây"
                                                                            className={styles.addNewTeamPlaceholder}
                                                                            onChange={(e) => setNewTeamValue(e.target.value)}
                                                                        />
                                                                    </Form.Item>
                                                                </div>
                                                                <div >
                                                                    <Form.Item>
                                                                        <Space>
                                                                            <SaveOutlined
                                                                                style={{ marginLeft: 10, fontSize: 14 }}
                                                                                onClick={() => handleSubmitNewTeam(newTeamValue)}

                                                                            />
                                                                            <CloseOutlined
                                                                                style={{ fontSize: 14 }}
                                                                                onClick={() => setClickAddNewTeam(false)}
                                                                            />
                                                                        </Space>
                                                                    </Form.Item>
                                                                </div>
                                                            </div>
                                                        </Form>
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
                                    name="department"
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
                                    name="level"
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
                                                value={item.id}
                                            >
                                                {item.code}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    label="Chức danh"
                                    name="position"
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