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
    message,
    Tooltip
} from 'antd';
import {
    EditOutlined,
    DeleteOutlined,
    CloseCircleFilled,
    SaveOutlined,
    CloseOutlined,
    CheckOutlined,
    UserOutlined,
    SearchOutlined,
    CheckCircleFilled,
    ClockCircleFilled,
    MinusCircleFilled
} from '@ant-design/icons';
import {
    requestDeleteUserPermission,
    requestGroupPermissionData,
    requestTeamPermissionData,
    requestDeleteTeamPermission,
    requestAllUserInfoFinal,
    requestDetailUserInfoFinal,
    requestCreateNewTeam,
    requestUpdateUserInfoFinal
} from './services';
import styles from '../setting/style.less';
import type { ColumnsType } from 'antd/es/table';
import { OPTIONS_POSITION, OPTIONS_WORK_ADDRESS } from '@/constants';
import { useRequest, useModel } from 'umi';
import { debounce } from 'lodash';
import Ellipse from '../../../assets/Ellipse.svg';
import moment from 'moment';

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

interface DataAllUserInfoFinal {
    name: string;
    email: string;
    id: string;
    team_name: string;
    team_id: string;
    role_id: string;
    role_code: string;
    ip_phone: string;
    home_address: string;
    work_address: string;
    level: string;
    position: string;
    phone_number: string;
    image: string;
    status?: string;
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
    //const { initialState, setInitialState } = useModel('@@initialState');
    const [isClickUpdatePermission, setClickUpdatePermission] = useState(false);
    const [userKey, setUserKey] = useState<string | any>();
    const [teamKey, setTeamKey] = useState<string | any>();
    const [roleKey, setRoleKey] = useState<string | any>();

    const [listAllUserInfoFinal, setListAllUserInfoFinal] = useState<DataAllUserInfoFinal[]>([]);
    const [listAllUserInfoLengthFinal, setListAllUserInfoLengthFinal] = useState<string | any>();
    const [listEditUserInfoFinal, setListEditUserInfoFinal] = useState<DataAllUserInfoFinal[]>([]);
    const [newTeamValue, setNewTeamValue] = useState<string | any>();
    const [listGroupPermission, setListGroupPermission] = useState<GroupPermission[]>([]);
    const [listTeamPermission, setListTeamPermission] = useState<TeamPermission[]>([]);

    const [clickAddNewTeam, setClickAddNewTeam] = useState(false);

    const [listValueTeam, setListValueTeam] = useState<string[] | any>();
    const [listValueNLV, setListValueNLV] = useState<string[] | any>();
    const [listValueNQ, setListValueNQ] = useState<string[] | any>();
    const [valueKeyWord, setValueKeyWord] = useState<string | any>();

    const [form] = Form.useForm();

    const [pagination, setPagination] = useState<PaginationProps>({
        current: 1,
        pageSize: 3,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['3', '10', '30', '50']
    })

    const fetchListAllUserInfoFinal = useRequest(
        async () => {
            const res: { success: boolean, length: number } = await requestAllUserInfoFinal(
                pagination.pageSize,
                pagination.current,
                valueKeyWord,
                listValueTeam,
                listValueNLV,
                listValueNQ
            );
            if (!res.success) {
                message.error('Lấy dữ liệu thất bại!');
                return;
            } else {
                setListAllUserInfoLengthFinal(res.length);
            }
            return res;
        },
        {
            onSuccess: (res: any) => {
                if (res) {
                    setListAllUserInfoFinal(res);
                }
            },
        },
    );

    const fetchDetaiUserInfoFinal = async (user_id: any) => {
        const resDetail = await requestDetailUserInfoFinal(user_id);
        if (resDetail.success === true) {
            setListEditUserInfoFinal(resDetail.data);
        }
    }

    const handleDeleteUserPermission = async (user_id: string) => {
        const response_delete = await requestDeleteUserPermission(user_id);
        if (response_delete.success !== true) {
            message.error('Xóa người dùng thất bại!')
        }
        else {
            message.success('Xóa người dùng thành công!')
            fetchListAllUserInfoFinal.refresh();
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
            message.success('Xóa team thành công!');
        }
        else {
            message.error('Xóa team thất bại!');
        }
    }

    const handleCreateNewTeamPermission = async (newTeamValue: string) => {
        const resNewTeam = await requestCreateNewTeam(newTeamValue);
        if (resNewTeam.success === true) {
            message.success('Cập nhật team mới thành công!');
        }
        else {
            message.error('Cập nhật team thất bại!');
        }
    }

    const handleSubmitNewTeam = async (values: any) => {
        if (arrListTeam.includes(values)) {
            message.error('Team đã tồn tại!')
        }
        else {
            await handleCreateNewTeamPermission(values);
            await fetchTeamPermissionData();
            form.setFieldsValue({ newTeamValue: undefined })
            setClickAddNewTeam(false);
        }
    }

    const handleCallApiUpdateUserInfo = useRequest(async (values: any) => {
        const resSubmitUpdate = await requestUpdateUserInfoFinal(
            userKey,
            teamKey,
            roleKey,
            values.department,
            values.position,
            values.phone_number,
            values.ip_phone,
            values.level,
            values.work_address
        );
        if (resSubmitUpdate.success !== true) {
            message.error('Cập nhật thông tin thất bại!');
        }
        else {
            message.success('Cập nhật thông tin thành công!');
            fetchListAllUserInfoFinal.refresh();
            handleCancleUpdatePermission();
        }
    })

    const handleSubmitUpdateUserInfoFinal = (values: any) => {
        handleCallApiUpdateUserInfo.run(values);
    }

    const handleClickDeleteTeam = async (e: any, id: string) => {
        await e.stopPropagation();
        await e.preventDefault();
        await handleDeleteTeamPermission(id);
        await fetchTeamPermissionData();
    }

    const handleSelectTeam = (values: any) => {
        setClickAddNewTeam(false);
        setTeamKey(values);
    }

    const handleSelectRole = (values: any) => {
        setRoleKey(values);
    }

    useEffect(() => {
        fetchListAllUserInfoFinal.refresh()
    }, [pagination])

    useEffect(() => {
        fetchTeamPermissionData();
        fetchGroupPermissionData();
    }, [])

    const arrListTeam = listTeamPermission?.map(item => item.name);

    const handleClickUpdatePermission = () => {
        setClickUpdatePermission(true);
    }
    const handleCancleUpdatePermission = () => {
        setClickUpdatePermission(false);
        form.resetFields();
    }
    const handleClickDeleteUser = (user_id: string) => {
        Modal.confirm({
            title: 'Thao tác xóa?',
            content: 'Bạn chắc chắn muốn xóa thông tin này',
            okText: 'Xóa',
            onOk() {
                handleDeleteUserPermission(user_id);
            },
            cancelText: 'Hủy',
            icon: <CloseCircleFilled style={{ color: 'red' }} />,
            okButtonProps: { danger: true },
        });
    };
    const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
        setPagination({
            ...pagination,
            current: newPagination.current,
            pageSize: newPagination.pageSize,
        });

    };

    const handleRenderStatusActivity = (status: any) => {
        if (status === '1') {
            return (
                <div style={{ padding: 10, border: '1px solid #1eaf61', borderRadius: 4, width: '60%', marginLeft: '20%' }}>
                    <CheckCircleFilled style={{ color: ' #1eaf61' }} />
                    <span style={{ color: '#1eaf61', marginLeft: 9, fontWeight: 400, fontSize: '13px' }}>
                        Sẵn sàng
                    </span>
                </div>
            )
        }
        else if (status === '2') {
            return (
                <div style={{ padding: 10, border: '1px solid #FAAD14', borderRadius: 4, width: '60%', marginLeft: '20%' }}>
                    <ClockCircleFilled style={{ color: ' #FAAD14' }} />
                    <span style={{ color: '#FAAD14', marginLeft: 9, fontWeight: 400, fontSize: '13px' }}>
                        Vắng mặt
                    </span>
                </div>
            )
        }
        else if (status === '3') {
            return (
                <div style={{ padding: 10, border: '1px solid #F5222D', borderRadius: 4, width: '60%', marginLeft: '20%' }}>
                    <MinusCircleFilled style={{ color: '#F5222D' }} />
                    <span style={{ color: '#F5222D', marginLeft: 9, fontWeight: 400, fontSize: '13px' }}>
                        Không làm phiền
                    </span>
                </div>
            )
        }
        else if (status === '4') {
            return (
                <div style={{ display: 'flex', alignItems: 'center', padding: 10, border: '1px solid #818181', borderRadius: 4, width: '60%', marginLeft: '20%' }}>
                    <img src={Ellipse} alt="..." width={14} height={14} />
                    <div style={{ color: '#818181', marginLeft: 5, fontWeight: 400, fontSize: '13px' }} >
                        Không hoạt động
                    </div>
                </div>
            )
        }
        return;
    }

    const columns: ColumnsType<DataAllUserInfoFinal> = [
        {
            title: '#',
            align: 'center',
            width: '60px',
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
            render: (text, record) => {
                if (record.image !== null) {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                                <Avatar
                                    src={record.image && `data:image/jpeg;base64,${record.image}`}
                                    size="large"
                                    className={styles.avatarImg}
                                />
                            </div>
                            <div style={{ flex: 3, textAlign: 'left' }}>
                                <Typography.Text >{record.name}</Typography.Text>
                                <br></br>
                                <Typography.Text className={styles.emailPermissionTable} style={{ textAlign: 'center', alignItems: 'center' }}>{record.email}</Typography.Text>
                            </div>
                        </div>
                    )
                }
                else {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ flex: 1 }}>
                                <Avatar
                                    size="large"
                                    icon={<UserOutlined />}
                                    className={styles.avatarImg}
                                />
                            </div>
                            <div style={{ flex: 3, textAlign: 'left' }}>
                                <Typography.Text >{record.name}</Typography.Text>
                                <br></br>
                                <Typography.Text className={styles.emailPermissionTable} style={{ textAlign: 'center', alignItems: 'center' }}>{record.email}</Typography.Text>
                            </div>
                        </div>
                    )
                }
            }
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
            align: 'center',
            render: (text, record) => {
                return text === "mn" ? "Miền Nam" : text === "mb" ? "Miền Bắc" : ''
            }
        },
        {
            title: 'Nhóm quyền',
            dataIndex: 'role_code',
            key: 'role_code',
            align: 'center'
        },
        {
            title: 'Cập nhật lần cuối',
            dataIndex: 'last_update',
            key: 'last_update',
            align: 'center',
            render: (text, record) => {
                return text === null ? '-' : moment(text).format('DD/MM/YYYY');
            }
        },
        {
            title: 'Trạng thái hoạt động',
            dataIndex: 'status',
            key: 'status',
            align: 'center',
            render: (text, record) => {
                return handleRenderStatusActivity(record.status)
            }
        },
        // {
        //     title: 'Trạng thái IIP',
        //     dataIndex: '',
        //     key: '',
        //     align: 'center'
        // },
        {
            title: '',
            align: 'center',
            render: (record) => (
                <Space size="large">
                    <Tooltip title="Cập nhật">
                        <EditOutlined
                            style={{ color: '#1890FF', fontSize: '20px' }}
                            onClick={
                                () => {
                                    form.setFieldsValue(record)
                                    handleClickUpdatePermission();
                                    fetchDetaiUserInfoFinal(record.id);
                                    setUserKey(record.id);
                                }
                            }
                        />
                    </Tooltip>
                    <Tooltip title="Xóa">
                        <DeleteOutlined
                            style={{ color: '#F5222D', fontSize: '20px' }}
                            onClick={() => { handleClickDeleteUser(record.id) }}
                        />
                    </Tooltip>
                </Space>
            )
        },
    ];
    const onReset = () => {
        form.resetFields();
        setListValueTeam(undefined);
        setListValueNLV(undefined);
        setListValueNQ(undefined);
        setValueKeyWord(undefined)
        setPagination({
            ...pagination,
            current: 1,
        });
    };

    const handleSelectValueTeam = (values: any) => {
        setListValueTeam(values);
        setPagination({
            ...pagination,
            current: 1,
        });
    }

    const handleSelectValueNLV = (values: any) => {
        setListValueNLV(values);
        setPagination({
            ...pagination,
            current: 1,
        });
    }

    const handleSelectValueNQ = (values: any) => {
        setListValueNQ(values);
        setPagination({
            ...pagination,
            current: 1,
        });
    }

    return (
        <>
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    paddingTop: '30px',
                    flexWrap: 'wrap'
                }}
            >
                <div>
                    <Form layout='vertical' form={form}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                            <div style={{ width: '300px' }}>
                                <Form.Item label="Team" name="Team" style={{ marginBottom: 'unset' }}>
                                    <Select
                                        onChange={handleSelectValueTeam}
                                        mode="multiple"
                                    // filterOption={(input: any, option: any) =>
                                    //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    //     || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    // }
                                    >
                                        {listTeamPermission && listTeamPermission.map((item: TeamPermission) => (
                                            <Select.Option value={item.name}>
                                                {item.name}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div style={{ width: '300px' }}>
                                <Form.Item label="Nơi làm việc" name="Nơi làm việc" style={{ marginBottom: 'unset' }}>
                                    <Select
                                        onChange={handleSelectValueNLV}
                                        mode="multiple"
                                    // filterOption={(input: any, option: any) =>
                                    //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    //     || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    // }
                                    >
                                        <Select.Option value="Miền Bắc">Miền Bắc</Select.Option>
                                        <Select.Option value="Miền Nam">Miền Nam</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                            <div style={{ width: '300px' }}>
                                <Form.Item label="Nhóm quyền" name="Nhóm quyền" style={{ marginBottom: 'unset' }}>
                                    <Select
                                        onChange={handleSelectValueNQ}
                                        mode="multiple"
                                    // filterOption={(input: any, option: any) =>
                                    //     option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    //     || option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                    // }
                                    >
                                        {listGroupPermission && listGroupPermission.map((item: GroupPermission) => (
                                            <Select.Option
                                                value={item.code}
                                            >
                                                {item.code}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div style={{ paddingTop: '29px' }}>
                                <Form.Item style={{ marginBottom: 'unset' }} label="">
                                    <Button type='text' style={{ color: 'blue' }} onClick={onReset}>Reset</Button>
                                </Form.Item>
                            </div>
                        </div>
                    </Form>
                </div>
                <div style={{ paddingTop: '29px' }}>
                    <Input
                        style={{ width: '300px' }}
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm tên người dùng"
                        allowClear
                        onChange={debounce(
                            (e) => {
                                const { value } = e.target;
                                if (value === "") {
                                    setValueKeyWord(undefined)
                                    fetchListAllUserInfoFinal.run();
                                }
                                else {
                                    setValueKeyWord(value);
                                    fetchListAllUserInfoFinal.run();
                                }
                            },
                            500,
                            {
                                trailing: true,
                                leading: false,
                            },
                        )}
                    />
                </div>
            </div>
            <Card
                className={styles.detailCardLayoutNoMar}
            >
                <Table
                    dataSource={listAllUserInfoFinal}
                    columns={columns}
                    style={{ paddingLeft: '20px' }}
                    rowKey={item => item.id}
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
                    scroll={{
                        y: pagination.pageSize >= 10 ? 400 : undefined,
                        x: window.innerWidth < 1900 ? 100 : undefined,
                    }}
                    loading={{ indicator: <div><Spin /></div>, spinning: fetchListAllUserInfoFinal.loading }}
                />
                <Modal
                    open={isClickUpdatePermission}
                    onCancel={handleCancleUpdatePermission}
                    title={listEditUserInfoFinal[0]?.name}
                    footer={false}
                    width={900}
                    centered
                >
                    <Form
                        {...formItemLayout}
                        form={form}
                        layout="vertical"
                        onFinish={handleSubmitUpdateUserInfoFinal}
                        requiredMark={false}
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
                                    name="team_id"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Team'
                                        }
                                    ]}
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
                                                                    <Form.Item name="newTeamValue" style={{ marginBottom: 'unset' }}>
                                                                        <Input
                                                                            allowClear
                                                                            placeholder="Nhập team mới tại đây"
                                                                            className={styles.addNewTeamPlaceholder}
                                                                            onChange={(e) => setNewTeamValue(e.target.value)}
                                                                        />
                                                                    </Form.Item>
                                                                </div>
                                                                <div>
                                                                    <Form.Item style={{ marginBottom: 'unset' }}>
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
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập phòng ban'
                                        },
                                        {
                                            pattern: new RegExp('[a-zA-Z]'),
                                            message: 'Vui lòng nhập ký tự chữ'
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Số di động"
                                    name="phone_number"
                                    rules={[
                                        {
                                            validator: (_, value: any) => {
                                                if (value === undefined || !value || value.length === 0) {
                                                    return Promise.reject('Vui lòng nhập số di động')
                                                }
                                                if (value.length !== 10) {
                                                    return Promise.reject('Số điện thoại không hợp lệ')
                                                }
                                                else if (!value.match('([3|5|7|8|9]{1})+([0-9]{8})')) {
                                                    return Promise.reject('Số điện thoại không hợp lệ')
                                                }
                                                else {
                                                    return Promise.resolve();
                                                }
                                            }
                                        },
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Cấp độ"
                                    name="level"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập cấp độ'
                                        }
                                    ]}
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
                                    name="role_id"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập nhóm quyền'
                                        }
                                    ]}
                                >
                                    <Select
                                        onChange={handleSelectRole}
                                    >
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
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập chức danh'
                                        }
                                    ]}
                                >
                                    <Select
                                        options={OPTIONS_POSITION}
                                        menuItemSelectedIcon={<CheckOutlined />}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="IP Phone"
                                    name="ip_phone"
                                    rules={[
                                        {
                                            validator: (_, value: any) => {
                                                if (value === undefined || !value || value.length === 0) {
                                                    return Promise.reject('Vui lòng nhập IP Phone')
                                                }
                                                if (value.length > 6 || value.length < 6) {
                                                    return Promise.reject('IP Phone không hợp lệ')
                                                }
                                                else if (!value.match('[0-9]')) {
                                                    return Promise.reject('IP Phone không hợp lệ')
                                                }
                                                return Promise.resolve();
                                            }
                                        }
                                    ]}
                                >
                                    <Input />
                                </Form.Item>
                                <Form.Item
                                    label="Nơi công tác"
                                    name="work_address"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập nơi công tác'
                                        }
                                    ]}
                                >
                                    <Select
                                        options={OPTIONS_WORK_ADDRESS}
                                        menuItemSelectedIcon={<CheckOutlined />}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item {...submitFormLayout} style={{ marginBottom: 'unset' }}>
                            <Button style={{ marginRight: '10px' }} onClick={handleCancleUpdatePermission} disabled={handleCallApiUpdateUserInfo.loading}>Hủy</Button>
                            <Button type='primary' htmlType='submit' loading={handleCallApiUpdateUserInfo.loading}>Cập nhật</Button>
                        </Form.Item>
                    </Form>
                </Modal>
            </Card>
        </>
    )
}
export default React.memo(PermissionEdit);