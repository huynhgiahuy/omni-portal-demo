import React, { useState, useEffect } from "react";
import { Card, Table, Typography, Form, Button, Input, Select, Modal, Tree, Checkbox, Space } from 'antd';
import { SaveOutlined, CloseOutlined } from '@ant-design/icons';
import styles from '../setting/style.less';
import type { ColumnsType } from 'antd/es/table';
import { requestGroupPermissionData, requestListUserRole, requestDetailUserPermission, requestEditUser } from './services';
import { dataPermissionTable } from './FakeData';
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
    TREE_DATA_TKC,
    TREE_DATA_BGCT,
    TREE_DATA_KHD,
    TREE_DATA_LSCG,
    TREE_DATA_TTCN,
    TREE_DATA_TTCT,
    TREE_DATA_NQ
} from '@/constants';

interface PermissionEdit_Update {
    setClickUpdatePermission: (state: boolean) => void;
    userKey: string;
}
interface DataTypePermissionTable {
    key: string;
    module: string;
}

interface GroupPermission {
    code?: string;
    desc?: string;
    id?: string;
}

interface TreeData {
    title: string;
    key: string;
}

interface EditDetailUser {
    data: any[];
    error?: string;
    error_code?: string;
    length: number;
    success: boolean;
}

interface EditDetailUserData {
    user_id?: string;
    email?: string;
    full_name: string;
    phone_number: string;
    team: string;
    role: string;
    active: string;
    updated: string;
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

const PermissionEdit_Add: React.FC<PermissionEdit_Update> = ({ setClickUpdatePermission, userKey }) => {
    const [listGroupPermission, setListGroupPermission] = useState<GroupPermission[]>([]);
    const [isAddNewPermission, setAddNetPermission] = useState(false);
    const [listRoleCode, setListRoleCode] = useState<string | any>([]);

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

    const [listEditUserPermission, setListEditUserPermission] = useState<EditDetailUser>();

    const [clickAddNewTeam, setClickAddNewTeam] = useState(false);

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

    const fetchGroupPermissionData = async () => {
        const resPer = await requestGroupPermissionData();
        if (resPer.success === true) {
            setListGroupPermission(resPer.data)
            setListRoleCode(resPer.data?.map((item: GroupPermission) => item.code))
        }
    }

    const fetchDetaiUserPermission = async () => {
        const resDetail = await requestDetailUserPermission(3, 1, userKey);
        if (resDetail.success === true) {
            setListEditUserPermission(resDetail);
        }
    }

    const handleSubmitForm = async (full_name: string, email: string, team: string, role: string) => {
        const resSubmit = await requestEditUser(full_name, email, team, role);
        return resSubmit;
    }


    useEffect(() => {
        fetchGroupPermissionData();
        fetchDetaiUserPermission();
    }, [])


    const handleAddNewPermission = () => {
        setAddNetPermission(true);
    }

    const handleOnFinishPermissionEdit = (values: any) => {
        setClickUpdatePermission(false);
        handleSubmitForm(values.full_name, values.email, values.team, values.role);
    }

    const handleCancleUpdatePermission = () => {
        setClickUpdatePermission(false)
    }

    const handleCancleAddNewPermission = () => {
        setAddNetPermission(false);
    }

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

    const handleOnFinishPermissionAddNew = (values: any) => {
        if (listRoleCode.includes(values.role_code)) {
            Modal.warning({
                title: 'Thông báo',
                content: 'Nhóm quyền vừa nhập đã có. Vui lòng nhập tên nhóm quyền khác!',
                okText: 'Xác nhận',
            });
        }
        else {
            handleCancleAddNewPermission();
            fetchListUserRole(values.role_code, values.role_desc);
            fetchGroupPermissionData();
        }
    }

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
                            className={styles.checkboxStyle}
                        />
                    )
                }
                else if (record.module === 'Incident Management') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateIM}
                            onChange={handleCheckAllFilterIM}
                            checked={checkAllIM}
                            className={styles.checkboxStyle}
                        />
                    )
                }
                else if (record.module === 'Event Management') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateEM}
                            onChange={handleCheckAllFilterEM}
                            checked={checkAllEM}
                            className={styles.checkboxStyle}
                        />
                    )
                }
                else if (record.module === 'Change Management') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateCM}
                            onChange={handleCheckAllFilterCM}
                            checked={checkAllCM}
                            className={styles.checkboxStyle}
                        />
                    )
                }
                else if (record.module === 'Request Fulfillment') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateRF}
                            onChange={handleCheckAllFilterRF}
                            checked={checkAllRF}
                            className={styles.checkboxStyle}
                        />
                    )
                }
                else if (record.module === 'Thiết kế') {
                    return (
                        <Checkbox
                            indeterminate={indeterminateDesign}
                            onChange={handleCheckAllFilterDesign}
                            checked={checkAllDesign}
                            className={styles.checkboxStyle}
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
                    return (
                        <Checkbox.Group
                            options={OPTIONS_PERMISSION_DB}
                            className={styles.antCheckboxGroup}
                            onChange={handleCheckFilterDB}
                            value={selectListDB}
                        />
                    )
                }
                else if (record.module === 'Incident Management') {
                    return (
                        <Checkbox.Group
                            options={OPTIONS_PERMISSION_IM}
                            className={styles.antCheckboxGroup}
                            onChange={handleCheckFilterIM}
                            value={selectListIM}
                        />
                    )
                }
                else if (record.module === 'Event Management') {
                    return (
                        <Checkbox.Group
                            options={OPTIONS_PERMISSION_EM}
                            className={styles.antCheckboxGroup}
                            onChange={handleCheckFilterEM}
                            value={selectListEM}
                        />
                    )
                }
                else if (record.module === 'Change Management') {
                    return (
                        <Checkbox.Group
                            options={OPTIONS_PERMISSION_CM}
                            className={styles.antCheckboxGroup}
                            onChange={handleCheckFilterCM}
                            value={selectListCM}
                        />
                    )
                }
                else if (record.module === 'Request Fulfillment') {
                    return (
                        <Checkbox.Group
                            options={OPTIONS_PERMISSION_RF}
                            className={styles.antCheckboxGroup}
                            onChange={handleCheckFilterRF}
                            value={selectListRF}
                        />
                    )
                }
                else if (record.module === 'Thiết kế') {
                    return (
                        <Checkbox.Group
                            options={OPTIONS_PERMISSION_DESIGN}
                            className={styles.antCheckboxGroup}
                            onChange={handleCheckFilterDesign}
                            value={selectListDesign}
                        />
                    )
                }
                else if (record.module === 'Báo cáo') {
                    return (
                        <>
                            <Tree
                                treeData={TREE_DATA_TKC}
                                checkable
                                onCheck={onCheckDataTreeGeneralStatistic}
                                className={styles.treeDataCheckbox}
                            />
                            <Tree
                                treeData={TREE_DATA_BGCT}
                                checkable
                                onCheck={onCheckDataTreeTransferShift}
                                className={styles.treeDataCheckbox}
                            />
                            <Tree
                                treeData={TREE_DATA_KHD}
                                checkable
                                onCheck={onCheckDataTreeNightShift}
                                className={styles.treeDataCheckbox}
                            />
                            <Tree
                                treeData={TREE_DATA_LSCG}
                                checkable
                                onCheck={onCheckDataTreeHistoryCall}
                                className={styles.treeDataCheckbox}
                            />
                        </>
                    )
                }
                else {
                    return (
                        <>
                            <Tree
                                treeData={TREE_DATA_TTCN}
                                checkable
                                onCheck={onCheckDataTreeTTCN}
                                className={styles.treeDataCheckbox}
                            />
                            <Tree
                                treeData={TREE_DATA_TTCT}
                                checkable
                                onCheck={onCheckDataTreeTTCT}
                                className={styles.treeDataCheckbox}
                            />
                            <Tree
                                treeData={TREE_DATA_NQ}
                                checkable
                                onCheck={onCheckDataTreeGroupsPer}
                                className={styles.treeDataCheckbox}
                            />
                        </>
                    )
                }
            }
        },
    ];

    return (
        <>
            <Card
                className={styles.detailCardLayoutNoMar}
            >
                {listEditUserPermission && listEditUserPermission.data[0]?.map((item: EditDetailUserData) => (
                    <Form
                        {...formItemLayout}
                        layout="vertical"
                        onFinish={handleOnFinishPermissionEdit}
                        requiredMark={false}
                        initialValues={{
                            full_name: item.full_name,
                            email: item.email,
                            phone_number: item.phone_number,
                            team: item.team,
                            role: item.role
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                flexWrap: 'wrap',
                                paddingLeft: '10%'
                            }}
                        >
                            <div style={{ flex: 1 }}>
                                <Form.Item
                                    label={<Typography.Text style={{ fontWeight: 'bold' }}>Họ và tên đệm <span style={{ color: 'red' }}>(*)</span></Typography.Text>}
                                    name="full_name"
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
                                    <Input disabled={true} style={{ fontWeight: 'bold' }} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Text style={{ fontWeight: 'bold' }}>Nhóm quyền <span style={{ color: 'red' }}>(*)</span></Typography.Text>}
                                    name="role"
                                    initialValue={{ name: item.role }}
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
                                        {listGroupPermission && listGroupPermission.map((item: GroupPermission) => (
                                            <Select.Option value={item.code}>{item.code}</Select.Option>
                                        ))}
                                    </Select>
                                </Form.Item>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Form.Item
                                    label={<Typography.Text style={{ fontWeight: 'bold' }}>Email <span style={{ color: 'red' }}>(*)</span></Typography.Text>}
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
                                    <Input disabled={true} style={{ fontWeight: 'bold' }} />
                                </Form.Item>
                                <Form.Item
                                    label={<Typography.Text style={{ fontWeight: 'bold' }}>Team <span style={{ color: 'red' }}>(*)</span></Typography.Text>}
                                    name="team"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập team'
                                        }
                                    ]}
                                >
                                    <Select
                                        dropdownRender={(menu) => (
                                            <>
                                                {menu}
                                                <div style={{ paddingLeft: '14px', paddingRight: '14px', paddingBottom: '10px' }}>
                                                    <hr></hr>
                                                    {clickAddNewTeam === false ? (
                                                        <Button
                                                            style={{ padding: 'unset', color: 'rgba(0,0,0,0.4)' }}
                                                            type='text'
                                                            onClick={() => setClickAddNewTeam(true)}
                                                        >
                                                            Thêm team mới
                                                        </Button>
                                                    ) : (
                                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                                            <Input placeholder="Nhập team mới tại đây" />
                                                            <Space>
                                                                <SaveOutlined style={{ marginLeft: 10, fontSize: 14 }} />
                                                                <CloseOutlined style={{ fontSize: 14 }} onClick={() => setClickAddNewTeam(false)} />
                                                            </Space>
                                                        </div>
                                                    )}
                                                </div>
                                            </>
                                        )}
                                    >
                                        <Select.Option value="Team 1">Team 1</Select.Option>
                                        <Select.Option value="Team 2">Team 2</Select.Option>
                                        <Select.Option value="Team 3">Team 3</Select.Option>
                                        <Select.Option value="Team 4">Team 4</Select.Option>
                                    </Select>
                                </Form.Item>
                            </div>
                        </div>
                        <Form.Item {...submitFormLayout} style={{ marginTop: '10px', marginBottom: 'unset' }}>
                            <Button className={styles.cancleBtn} onClick={handleCancleUpdatePermission}>Hủy</Button>
                            <Button type='primary' htmlType="submit">Cập nhật</Button>
                        </Form.Item>
                    </Form>
                ))}
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
                <Form layout="vertical" onFinish={handleOnFinishPermissionAddNew} requiredMark={false}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div style={{ flex: 1 }}>
                            <Form.Item
                                label={<Typography.Text style={{ fontWeight: 'bold' }}>Tên nhóm quyền <span style={{ color: 'red' }}>(*)</span></Typography.Text>}
                                name="role_code"
                                className={styles.addPermissionInputPlaceholder}
                                rules={[
                                    {
                                        required: true,
                                        message: 'Không được để trống thông tin này'
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
                                        span: 10,
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
                                <Input placeholder='Nhập tên nhóm quyền mới' className={styles.addPermissionInput} />
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
                                        span: 10,
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
                                <Input placeholder='Nhập mô tả ngắn gọn' className={styles.addPermissionInput} />
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

export default PermissionEdit_Add;