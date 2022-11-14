import React, { useState, useEffect } from 'react';
import {
    Card,
    Typography,
    Table,
    Space,
    Button,
    Avatar,
    Form,
    Input,
    Select,
    Modal,
    Checkbox,
    Tree
} from 'antd';
import {
    OPTIONS_PERMISSION_DB,
    OPTIONS_PERMISSION_IM,
    OPTIONS_PERMISSION_EM,
    OPTIONS_PERMISSION_CM,
    OPTIONS_PERMISSION_RF,
    OPTIONS_PERMISSION_DESIGN,
    OPTIONS_PERMISSION_DB_VALUE,
    OPTIONS_PERMISSION_IM_VALUE,
    OPTIONS_PERMISSION_EM_VALUE,
    OPTIONS_PERMISSION_CM_VALUE,
    OPTIONS_PERMISSION_RF_VALUE,
    OPTIONS_PERMISSION_DESIGN_VALUE,
    OPTIONS_PERMISSION_TKC,
    OPTIONS_PERMISSION_BGCT,
    OPTIONS_PERMISSION_KHD,
    OPTIONS_PERMISSION_LSCG,
    OPTIONS_PERMISSION_TEST,
    OPTIONS_PERMISSION_TKC_VALUE,
    OPTIONS_PERMISSION_BGCT_VALUE,
    OPTIONS_PERMISSION_KHD_VALUE,
    OPTIONS_PERMISSION_LSCG_VALUE,
    OPTIONS_PERMISSION_TEST_VALUE,
    TREE_DATA_TKC,
    TREE_DATA_BGCT,
    TREE_DATA_KHD,
    TREE_DATA_LSCG,
    TREE_DATA_TTCN,
    TREE_DATA_TTCT,
    TREE_DATA_NQ
} from '@/constants';
import styles from '../setting/style.less';
import type { ColumnsType } from 'antd/es/table';
import { EditOutlined, DeleteOutlined, PlusSquareFilled } from '@ant-design/icons';
import { dataPermission, dataPermissionTable } from './FakeData';
//import CustomizeBread from '@/components/CustomizeBread/CustomizeBread';
import ImageAvatar from '../setting/avatar_test.png';
import { requestListUserRole, requestListUserInfo } from './services';

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

interface DataTypePermissionTable {
    key: string;
    module: string;
}
interface TreeData {
    title: string;
    key: string;
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
            span: 7,
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
            span: 18,
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

const PermissionEdit: React.FC = () => {
    const [isClickAddPermission, setClickAddPermission] = useState(false);
    const [isAddNewPermission, setAddNetPermission] = useState(false);

    const [selectListDB, setSelectListDB] = useState<string | any>([]);
    const [indeterminateDB, setIndeterminateDB] = useState(false);
    const [checkAllDB, setCheckAllDB] = useState(false);

    const [selectListIM, setSelectListIM] = useState<string | any>([]);
    const [indeterminateIM, setIndeterminateIM] = useState(false);
    const [checkAllIM, setCheckAllIM] = useState(false);

    const [selectListEM, setSelectListEM] = useState<string | any>([]);
    const [indeterminateEM, setIndeterminateEM] = useState(false);
    const [checkAllEM, setCheckAllEM] = useState(false);

    const [selectListCM, setSelectListCM] = useState<string | any>([]);
    const [indeterminateCM, setIndeterminateCM] = useState(false);
    const [checkAllCM, setCheckAllCM] = useState(false);

    const [selectListRF, setSelectListRF] = useState<string | any>([]);
    const [indeterminateRF, setIndeterminateRF] = useState(false);
    const [checkAllRF, setCheckAllRF] = useState(false);

    const [selectListDesign, setSelectListDesign] = useState<string | any>([]);
    const [indeterminateDesign, setIndeterminateDesign] = useState(false);
    const [checkAllDesign, setCheckAllDesign] = useState(false);

    const [valueCheckboxGeneralStatistic, setValueCheckboxGeneralStatistic] = useState<string | any>([]);
    const [valueCheckboxTransferShift, setValueCheckboxTransferShift] = useState<string | any>([]);
    const [valueCheckboxNightShift, setValueCheckboxNightShift] = useState<string | any>([]);
    const [valueCheckboxHistoryCall, setValueCheckboxHistoryCall] = useState<string | any>([]);
    const [valueCheckboxTTCN, setValueCheckboxTTCN] = useState<string | any>([]);
    const [valueCheckboxTTCT, setValueCheckboxTTCT] = useState<string | any>([]);
    const [valueCheckboxGroupsPer, setValueCheckboxGroupsPer] = useState<string | any>([]);

    const fetchListUserRole = async (role_code: any, role_desc: any) => {
        const res = await requestListUserRole(
            valueCheckboxGeneralStatistic.concat(
                valueCheckboxTransferShift,
                valueCheckboxNightShift,
                valueCheckboxHistoryCall,
                valueCheckboxTTCN,
                valueCheckboxTTCT,
                valueCheckboxGroupsPer
            ),
            role_code,
            role_desc
        );
        return res;
    }

    // const fetchListUserInfo = async () => {
    //     const response_1 = await requestListUserInfo();
    //     if (response_1.success === true) {
    //         return response_1.data
    //     }
    // }
    // useEffect(() => {
    //     fetchListUserInfo();
    // }, [])

    const handleCheckFilterDB = (list: any) => {
        setIndeterminateDB(!!list.length && list.length < OPTIONS_PERMISSION_DB.length);
        setCheckAllDB(list.length === OPTIONS_PERMISSION_DB.length);
        setSelectListDB(list);
    };

    const handleCheckAllFilterDB = (e: any) => {
        setSelectListDB(e.target.checked ? OPTIONS_PERMISSION_DB_VALUE : []);
        setIndeterminateDB(false);
        setCheckAllDB(e.target.checked);
    };

    const handleCheckFilterIM = (list: any) => {
        setIndeterminateIM(!!list.length && list.length < OPTIONS_PERMISSION_IM.length);
        setCheckAllIM(list.length === OPTIONS_PERMISSION_IM.length);
        setSelectListIM(list);
    };

    const handleCheckAllFilterIM = (e: any) => {
        setSelectListIM(e.target.checked ? OPTIONS_PERMISSION_IM_VALUE : []);
        setIndeterminateIM(false);
        setCheckAllIM(e.target.checked);
    };

    const handleCheckFilterEM = (list: any) => {
        setIndeterminateEM(!!list.length && list.length < OPTIONS_PERMISSION_EM.length);
        setCheckAllEM(list.length === OPTIONS_PERMISSION_EM.length);
        setSelectListEM(list);
    };

    const handleCheckAllFilterEM = (e: any) => {
        setSelectListEM(e.target.checked ? OPTIONS_PERMISSION_EM_VALUE : []);
        setIndeterminateEM(false);
        setCheckAllEM(e.target.checked);
    };

    const handleCheckFilterCM = (list: any) => {
        setIndeterminateCM(!!list.length && list.length < OPTIONS_PERMISSION_CM.length);
        setCheckAllCM(list.length === OPTIONS_PERMISSION_CM.length);
        setSelectListCM(list);
    };

    const handleCheckAllFilterCM = (e: any) => {
        setSelectListCM(e.target.checked ? OPTIONS_PERMISSION_CM_VALUE : []);
        setIndeterminateCM(false);
        setCheckAllCM(e.target.checked);
    };

    const handleCheckFilterRF = (list: any) => {
        setIndeterminateRF(!!list.length && list.length < OPTIONS_PERMISSION_RF.length);
        setCheckAllRF(list.length === OPTIONS_PERMISSION_RF.length);
        setSelectListRF(list);
    };

    const handleCheckAllFilterRF = (e: any) => {
        setSelectListRF(e.target.checked ? OPTIONS_PERMISSION_RF_VALUE : []);
        setIndeterminateRF(false);
        setCheckAllRF(e.target.checked);
    };

    const handleCheckFilterDesign = (list: any) => {
        setIndeterminateDesign(!!list.length && list.length < OPTIONS_PERMISSION_DESIGN.length);
        setCheckAllDesign(list.length === OPTIONS_PERMISSION_DESIGN.length);
        setSelectListDesign(list);
    };

    const handleCheckAllFilterDesign = (e: any) => {
        setSelectListDesign(e.target.checked ? OPTIONS_PERMISSION_DESIGN_VALUE : []);
        setIndeterminateDesign(false);
        setCheckAllDesign(e.target.checked);
    };
    ///
    const onCheckDataTreeGeneralStatistic = (checkedKeys: any, info: any) => {
        setValueCheckboxGeneralStatistic(info.node?.children?.map((item: TreeData) => item.key))
    };
    const onCheckDataTreeTransferShift = (checkedKeys: any, info: any) => {
        setValueCheckboxTransferShift(checkedKeys)
    };
    const onCheckDataTreeNightShift = (checkedKeys: any, info: any) => {
        setValueCheckboxNightShift(checkedKeys)
    };
    const onCheckDataTreeHistoryCall = (checkedKeys: any, info: any) => {
        setValueCheckboxHistoryCall(info.node?.children?.map((item: TreeData) => item.key))
    };
    const onCheckDataTreeTTCN = (checkedKeys: any, info: any) => {
        setValueCheckboxTTCN(info.node?.children?.map((item: TreeData) => item.key))
    };
    const onCheckDataTreeTTCT = (checkedKeys: any, info: any) => {
        setValueCheckboxTTCT(info.node?.children?.map((item: TreeData) => item.key))
    };
    const onCheckDataTreeGroupsPer = (checkedKeys: any, info: any) => {
        setValueCheckboxGroupsPer(info.node?.children?.map((item: TreeData) => item.key))
    };

    const handleClickAddPermission = () => {
        setClickAddPermission(true);
    }
    const handleCancleAddPermission = () => {
        setClickAddPermission(false)
    }
    const handleAddNewPermission = () => {
        setAddNetPermission(true);
    }
    const handleCancleAddNewPermission = () => {
        setAddNetPermission(false);
    }
    const handleOnFinishPermissionEdit = (values: any) => {
        console.log(values)
        setClickAddPermission(false);
    }
    const handleOnFinishPermissionAddNew = (values: any) => {
        console.log(values)
        handleCancleAddNewPermission();
        fetchListUserRole(values.role_code, values.role_desc);
    }
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
                    <EditOutlined style={{ color: '#1890FF', fontSize: '20px' }} />
                    <DeleteOutlined style={{ color: '#F5222D', fontSize: '20px' }} />
                </Space>
            )
        },
    ];

    const columnsPermissionTable: ColumnsType<DataTypePermissionTable> = [
        {
            title: '#',
            width: '30px',
            align: 'center',
            render: (record) => {
                if (record.module === 'Dashboard') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateDB}
                            onChange={handleCheckAllFilterDB}
                            checked={checkAllDB}
                        />
                    )
                }
                else if (record.module === 'Incident Management') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateIM}
                            onChange={handleCheckAllFilterIM}
                            checked={checkAllIM}
                        />
                    )
                }
                else if (record.module === 'Event Management') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateEM}
                            onChange={handleCheckAllFilterEM}
                            checked={checkAllEM}
                        />
                    )
                }
                else if (record.module === 'Change Management') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateCM}
                            onChange={handleCheckAllFilterCM}
                            checked={checkAllCM}
                        />
                    )
                }
                else if (record.module === 'Request Fulfillment') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateRF}
                            onChange={handleCheckAllFilterRF}
                            checked={checkAllRF}
                        />
                    )
                }
                else if (record.module === 'Thiết kế') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateDesign}
                            onChange={handleCheckAllFilterDesign}
                            checked={checkAllDesign}
                        />
                    )
                }
                else {
                    return ''
                }
            }
        },
        {
            title: 'Module',
            dataIndex: 'module',
            key: 'module',
            width: '150px'
        },
        {
            title: 'Chức năng',
            width: '450px',
            render: (record) => {
                if (record.module === 'Dashboard') {
                    return <Checkbox.Group options={OPTIONS_PERMISSION_DB} className={styles.antCheckboxGroup} onChange={handleCheckFilterDB} value={selectListDB} />
                }
                else if (record.module === 'Incident Management') {
                    return <Checkbox.Group options={OPTIONS_PERMISSION_IM} className={styles.antCheckboxGroup} onChange={handleCheckFilterIM} value={selectListIM} />
                }
                else if (record.module === 'Event Management') {
                    return <Checkbox.Group options={OPTIONS_PERMISSION_EM} className={styles.antCheckboxGroup} onChange={handleCheckFilterEM} value={selectListEM} />
                }
                else if (record.module === 'Change Management') {
                    return <Checkbox.Group options={OPTIONS_PERMISSION_CM} className={styles.antCheckboxGroup} onChange={handleCheckFilterCM} value={selectListCM} />
                }
                else if (record.module === 'Request Fulfillment') {
                    return <Checkbox.Group options={OPTIONS_PERMISSION_RF} className={styles.antCheckboxGroup} onChange={handleCheckFilterRF} value={selectListRF} />
                }
                else if (record.module === 'Thiết kế') {
                    return <Checkbox.Group options={OPTIONS_PERMISSION_DESIGN} className={styles.antCheckboxGroup} onChange={handleCheckFilterDesign} value={selectListDesign} />
                }
                else if (record.module === 'Báo cáo') {
                    return (
                        <>
                            <Tree treeData={TREE_DATA_TKC} checkable onCheck={onCheckDataTreeGeneralStatistic} />
                            <Tree treeData={TREE_DATA_BGCT} checkable onCheck={onCheckDataTreeTransferShift} />
                            <Tree treeData={TREE_DATA_KHD} checkable onCheck={onCheckDataTreeNightShift} />
                            <Tree treeData={TREE_DATA_LSCG} checkable onCheck={onCheckDataTreeHistoryCall} />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Tree treeData={TREE_DATA_TTCN} checkable onCheck={onCheckDataTreeTTCN} />
                            <Tree treeData={TREE_DATA_TTCT} checkable onCheck={onCheckDataTreeTTCT} />
                            <Tree treeData={TREE_DATA_NQ} checkable onCheck={onCheckDataTreeGroupsPer} />
                        </>
                    )
                }
            }
        },
    ];
    return (
        <>
            {isClickAddPermission === false ? (
                <>
                    <div style={{ marginTop: '10px', textAlign: 'right' }}>
                        <PlusSquareFilled className={styles.addPermissionIcon} onClick={handleClickAddPermission} />
                    </div>
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
                <>
                    <Card
                        className={styles.detailCardLayoutNoMar}
                    >
                        <Form {...formItemLayout} layout="vertical" onFinish={handleOnFinishPermissionEdit}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', paddingLeft: '10%' }}>
                                <div style={{ flex: 1 }}>
                                    <Form.Item
                                        label={<Typography.Text style={{ fontWeight: 'bold' }}>Họ và tên đệm</Typography.Text>}
                                        name="hovatendem"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập họ tên'
                                            },
                                            {
                                                min: 5,
                                                message: 'Họ tên tối thiểu 5 ký tự'
                                            },
                                            {
                                                max: 50,
                                                message: 'Họ tên tối đa 50 ký tự'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={<Typography.Text style={{ fontWeight: 'bold' }}>Số điện thoại</Typography.Text>}
                                        name="sodienthoai"
                                        required={true}
                                        rules={[
                                            {
                                                validator(_, value) {
                                                    if (value === undefined || value === '') {
                                                        return Promise.reject('Vui lòng nhập số điện thoại')
                                                    }
                                                    if (value.length === 9) {
                                                        return Promise.resolve();
                                                    }
                                                    if (!value.match(/^[0-9]+$/)) {
                                                        return Promise.reject('Vui lòng nhập số điện thoại hợp lệ')
                                                    }
                                                    return Promise.reject('Số điện thoại phải 9 số')
                                                }
                                            }
                                        ]}
                                    >
                                        <Input addonBefore="+84" className={styles.inputPhonePrefix} />
                                    </Form.Item>
                                    <Form.Item
                                        label={<Typography.Text style={{ fontWeight: 'bold' }}>Nhóm quyền</Typography.Text>}
                                        name="nhomquyen"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập nhóm quyền'
                                            }
                                        ]}
                                    >
                                        <Select
                                            dropdownRender={(menu) => (
                                                <>
                                                    {menu}
                                                    <div style={{ paddingLeft: '14px', paddingRight: '14px', paddingBottom: '10px' }}>
                                                        <hr></hr>
                                                        <Button style={{ padding: 'unset', color: 'rgba(0,0,0,0.4)' }} type='text' onClick={handleAddNewPermission}>Thêm quyền mới</Button>
                                                    </div>
                                                </>
                                            )}
                                        >
                                            <Select.Option value="member">Memeber</Select.Option>
                                            <Select.Option value="admin">Admin</Select.Option>
                                            <Select.Option value="manager">Manager</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Form.Item
                                        label={<Typography.Text style={{ fontWeight: 'bold' }}>Email</Typography.Text>}
                                        name="email"
                                        rules={[
                                            {
                                                type: 'email',
                                                message: 'Vui lòng nhập email hợp lệ'
                                            },
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập email'
                                            }
                                        ]}
                                    >
                                        <Input />
                                    </Form.Item>
                                    <Form.Item
                                        label={<Typography.Text style={{ fontWeight: 'bold' }}>Team</Typography.Text>}
                                        name="team"
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập team'
                                            }
                                        ]}
                                    >
                                        <Select >
                                            <Select.Option value="Team 1">Team 1</Select.Option>
                                            <Select.Option value="Team 2">Team 2</Select.Option>
                                            <Select.Option value="Team 3">Team 3</Select.Option>
                                            <Select.Option value="Team 4">Team 4</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item {...submitFormLayout} style={{ marginTop: '10px', marginBottom: 'unset' }}>
                                <Button className={styles.cancleBtn} onClick={handleCancleAddPermission}>Hủy</Button>
                                <Button type='primary' htmlType="submit">Tạo mới</Button>
                            </Form.Item>
                        </Form>
                    </Card>

                    <Modal
                        open={isAddNewPermission}
                        onCancel={handleCancleAddNewPermission}
                        title={<Typography.Text style={{ fontWeight: 'bold' }}>Phân quyền mới</Typography.Text>}
                        width={900}
                        bodyStyle={{ height: 600 }}
                        footer={false}
                        centered
                    >
                        <Form layout="vertical" onFinish={handleOnFinishPermissionAddNew}>
                            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                <div style={{ flex: 1 }}>
                                    <Form.Item
                                        label={<Typography.Text style={{ fontWeight: 'bold' }}>Tên nhóm</Typography.Text>}
                                        name="role_code"
                                        className={styles.addPermissionInputPlaceholder}
                                        rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên nhóm'
                                            },
                                            {
                                                max: 30,
                                                message: 'Tên nhóm tối đa 30 ký tự'
                                            }
                                        ]}
                                        labelCol={{
                                            xs: {
                                                span: 24,
                                            },
                                            sm: {
                                                span: 24
                                            },
                                            md: {
                                                span: 7,
                                            },
                                        }}
                                        wrapperCol={{
                                            xs: {
                                                span: 24,
                                            },
                                            sm: {
                                                span: 24
                                            },
                                            md: {
                                                span: 21,
                                            },
                                        }}
                                    >
                                        <Input placeholder='Nhập tên nhóm của bạn' className={styles.addPermissionInput} />
                                    </Form.Item>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Form.Item
                                        label={<Typography.Text style={{ fontWeight: 'bold' }}>Mô tả</Typography.Text>}
                                        name="role_desc"
                                        className={styles.addPermissionInputPlaceholder}
                                        labelCol={{
                                            xs: {
                                                span: 24,
                                            },
                                            sm: {
                                                span: 24
                                            },
                                            md: {
                                                span: 7,
                                            },
                                        }}
                                        wrapperCol={{
                                            xs: {
                                                span: 24,
                                            },
                                            sm: {
                                                span: 24
                                            },
                                            md: {
                                                span: 24,
                                            },
                                        }}
                                    >
                                        <Input placeholder='Nhập mô tả cho nhóm quyền' className={styles.addPermissionInput} />
                                    </Form.Item>
                                </div>
                            </div>
                            <Table
                                dataSource={dataPermissionTable}
                                columns={columnsPermissionTable}
                                pagination={false}
                                style={{ marginTop: '10px' }}
                                className={styles.addPermissionTable}
                                scroll={{ y: 350, x: 800 }}
                            />
                            <Form.Item style={{ marginTop: '30px', display: 'flex', justifyContent: 'center' }}>
                                <Button style={{ marginRight: '10px' }} onClick={handleCancleAddNewPermission}>Hủy</Button>
                                <Button type='primary' htmlType='submit'>Tạo mới</Button>
                            </Form.Item>
                        </Form>
                    </Modal>
                </>
            )
            }
        </>
    )
}
export default PermissionEdit;