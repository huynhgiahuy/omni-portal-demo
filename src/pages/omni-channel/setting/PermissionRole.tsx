import React, { useState } from 'react';
import {
  Card,
  Table,
  Space,
  Modal,
  Spin,
  message,
  Input,
  Row,
  Col,
  Button,
  Form,
  Typography,
  Checkbox,
  Tree,
} from 'antd';
import styles from '../setting/style.less';
import type { ColumnsType } from 'antd/es/table';
import {
  EditOutlined,
  DeleteOutlined,
  SearchOutlined,
  PlusSquareFilled,
  CloseCircleFilled,
} from '@ant-design/icons';
import {
  requestDeleteRoleAndPermission,
  requestGroupPermissionData,
  requestListUserRole,
  requestReadRoleAndPerm,
} from './services';
import { useRequest } from 'umi';
import { debounce } from 'lodash';
import { dataPermissionTable } from './FakeData';
import {
  OPTIONS_PERMISSION_CM,
  OPTIONS_PERMISSION_CM_VALUE,
  OPTIONS_PERMISSION_DB,
  OPTIONS_PERMISSION_DB_VALUE,
  OPTIONS_PERMISSION_DESIGN,
  OPTIONS_PERMISSION_DESIGN_VALUE,
  OPTIONS_PERMISSION_EM,
  OPTIONS_PERMISSION_EM_VALUE,
  OPTIONS_PERMISSION_IM,
  OPTIONS_PERMISSION_IM_VALUE,
  OPTIONS_PERMISSION_RF,
  OPTIONS_PERMISSION_RF_VALUE,
  TREE_DATA_BGCT,
  TREE_DATA_KHD,
  TREE_DATA_LSCG,
  TREE_DATA_NQ,
  TREE_DATA_TKC,
  TREE_DATA_TTCN,
  TREE_DATA_TTCT,
} from '@/constants';

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

interface GroupPermission {
  code?: string;
  desc?: string;
  id?: string;
}

interface RoleIdProps extends GroupPermission {
  permission_list: {
    code: string;
    desc: string;
    group: string;
    id: string;
  }[];
}

interface DataTypePermissionTable {
  key: string;
  module: string;
}

interface TreeData {
  title: string;
  key: string;
}

const PermissionRole: React.FC = () => {
  const [listAllRolePermission, setListAllRolePermission] = useState<DataAllRolePermission[]>([]);
  const [isAddNewPermission, setAddNetPermission] = useState(false);
  const [isEditRole, setIsEditRole] = useState(false);

  const [valueCheckboxGeneralStatistic, setValueCheckboxGeneralStatistic] = useState<string | any>(
    [],
  );
  const [checkAllDB, setCheckAllDB] = useState(false);
  const [selectListDB, setSelectListDB] = useState<string | any>([]);
  const [indeterminateDB, setIndeterminateDB] = useState(false);
  const [listRoleCode, setListRoleCode] = useState<string | any>([]);
  const [listGroupPermission, setListGroupPermission] = useState<GroupPermission[]>([]);
  const [dataRoleId, setDataRoleId] = useState<RoleIdProps>();

  const [valueCheckboxTransferShift, setValueCheckboxTransferShift] = useState<string | any>([]);
  const [valueCheckboxNightShift, setValueCheckboxNightShift] = useState<string | any>([]);
  const [valueCheckboxHistoryCall, setValueCheckboxHistoryCall] = useState<string | any>([]);
  const [valueCheckboxTTCN, setValueCheckboxTTCN] = useState<string | any>([]);
  const [valueCheckboxTTCT, setValueCheckboxTTCT] = useState<string | any>([]);
  const [valueCheckboxGroupsPer, setValueCheckboxGroupsPer] = useState<string | any>([]);

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

  const [selectListIM, setSelectListIM] = useState<string | any>([]);
  const [indeterminateIM, setIndeterminateIM] = useState(false);
  const [checkAllIM, setCheckAllIM] = useState(false);

  const { data: dataReadRoleAndPerm, refresh: refreshReadRoleAndPerm } = useRequest(
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

  const { run: runDeleteRoleAndPermission } = useRequest(
    (id: string) => requestDeleteRoleAndPermission(id),
    {
      onSuccess: () => {
        message.success('Xoá thành công');
        refreshReadRoleAndPerm();
      },
      onError: (error) => {
        console.log(error);
      },
      manual: true,
    },
  );

  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['10', '20', '30', '50'],
  });

  const handleClickDeleteRole = (role_id: string) => {
    Modal.confirm({
      title: 'Thao tác xoá?',
      content: 'Bạn có chắc chắn muốn xoá thông tin này',
      okText: 'Xoá',
      okType: 'danger',
      okButtonProps: {
        type: 'primary',
      },
      icon: <CloseCircleFilled style={{ color: 'red', fontSize: 22 }} />,
      onOk() {
        {
          runDeleteRoleAndPermission(role_id);
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

  const handleAddNewPermission = () => {
    setAddNetPermission(true);
    setIsEditRole(false);
  };

  const handleEditRole = (data: RoleIdProps) => {
    setAddNetPermission(true);
    setIsEditRole(true);
  };

  const handleCancleAddNewPermission = () => {
    setAddNetPermission(false);
  };

  const handleCheckAllFilterDB = (e: any) => {
    setSelectListDB(e.target.checked ? OPTIONS_PERMISSION_DB_VALUE : []);
    setIndeterminateDB(false);
    setCheckAllDB(e.target.checked);
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

  const handleCheckFilterDB = (list: any) => {
    setIndeterminateDB(!!list.length && list.length < OPTIONS_PERMISSION_DB.length);
    setCheckAllDB(list.length === OPTIONS_PERMISSION_DB.length);
    setSelectListDB(list);
  };

  const handleCheckFilterIM = (list: any) => {
    setIndeterminateIM(!!list.length && list.length < OPTIONS_PERMISSION_IM.length);
    setCheckAllIM(list.length === OPTIONS_PERMISSION_IM.length);
    setSelectListIM(list);
  };

  const onCheckDataTreeGeneralStatistic = (checkedKeys: any, info: any) => {
    setValueCheckboxGeneralStatistic(info.node?.children?.map((item: TreeData) => item.key));
  };
  const onCheckDataTreeTransferShift = (checkedKeys: any, info: any) => {
    setValueCheckboxTransferShift(checkedKeys);
  };
  const onCheckDataTreeNightShift = (checkedKeys: any, info: any) => {
    setValueCheckboxNightShift(checkedKeys);
  };
  const onCheckDataTreeHistoryCall = (checkedKeys: any, info: any) => {
    setValueCheckboxHistoryCall(info.node?.children?.map((item: TreeData) => item.key));
  };
  const onCheckDataTreeTTCN = (checkedKeys: any, info: any) => {
    setValueCheckboxTTCN(info.node?.children?.map((item: TreeData) => item.key));
  };
  const onCheckDataTreeTTCT = (checkedKeys: any, info: any) => {
    setValueCheckboxTTCT(info.node?.children?.map((item: TreeData) => item.key));
  };
  const onCheckDataTreeGroupsPer = (checkedKeys: any, info: any) => {
    setValueCheckboxGroupsPer(info.node?.children?.map((item: TreeData) => item.key));
  };

  const fetchListUserRole = async (role_code: any, role_desc: any) => {
    const res = await requestListUserRole(
      valueCheckboxGeneralStatistic.concat(
        valueCheckboxTransferShift,
        valueCheckboxNightShift,
        valueCheckboxHistoryCall,
        valueCheckboxTTCN,
        valueCheckboxTTCT,
        valueCheckboxGroupsPer,
      ),
      role_code,
      role_desc,
    );
    return res;
  };

  const fetchGroupPermissionData = async () => {
    const resPer = await requestGroupPermissionData();
    if (resPer.success === true) {
      setListGroupPermission(resPer.data);
      setListRoleCode(resPer.data?.map((item: GroupPermission) => item.code));
    }
  };

  const dataNameCodeRole = dataReadRoleAndPerm?.map((role: { code: string }) => role?.code);

  const handleOnFinishPermissionAddNew = (values: any) => {
    if (dataNameCodeRole.includes(values.role_code)) {
      Modal.warning({
        title: 'Thông báo',
        content: 'Nhóm quyền vừa nhập đã có. Vui lòng nhập tên nhóm quyền khác!',
        okText: 'Xác nhận',
      });
    } else {
      handleCancleAddNewPermission();
      fetchListUserRole(values.role_code, values.role_desc);
      fetchGroupPermissionData();
    }
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
          <EditOutlined
            style={{ color: '#1890FF', fontSize: '20px' }}
            onClick={() => {
              handleEditRole(record);
            }}
          />
          <DeleteOutlined
            style={{ color: '#F5222D', fontSize: '20px' }}
            onClick={() => {
              handleClickDeleteRole(record.id);
            }}
          />
        </Space>
      ),
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
              className={styles.checkboxStyle}
            />
          );
        } else if (record.module === 'Incident Management') {
          return (
            <Checkbox
              indeterminate={indeterminateIM}
              onChange={handleCheckAllFilterIM}
              checked={checkAllIM}
              className={styles.checkboxStyle}
            />
          );
        } else if (record.module === 'Event Management') {
          return (
            <Checkbox
              indeterminate={indeterminateEM}
              onChange={handleCheckAllFilterEM}
              checked={checkAllEM}
              className={styles.checkboxStyle}
            />
          );
        } else if (record.module === 'Change Management') {
          return (
            <Checkbox
              indeterminate={indeterminateCM}
              onChange={handleCheckAllFilterCM}
              checked={checkAllCM}
              className={styles.checkboxStyle}
            />
          );
        } else if (record.module === 'Request Fulfillment') {
          return (
            <Checkbox
              indeterminate={indeterminateRF}
              onChange={handleCheckAllFilterRF}
              checked={checkAllRF}
              className={styles.checkboxStyle}
            />
          );
        } else if (record.module === 'Thiết kế') {
          return (
            <Checkbox
              indeterminate={indeterminateDesign}
              onChange={handleCheckAllFilterDesign}
              checked={checkAllDesign}
              className={styles.checkboxStyle}
            />
          );
        } else {
          return '';
        }
      },
    },
    {
      title: 'Module',
      dataIndex: 'module',
      key: 'module',
      width: '150px',
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
          );
        } else if (record.module === 'Incident Management') {
          return (
            <Checkbox.Group
              options={OPTIONS_PERMISSION_IM}
              className={styles.antCheckboxGroup}
              onChange={handleCheckFilterIM}
              value={selectListIM}
            />
          );
        } else if (record.module === 'Event Management') {
          return (
            <Checkbox.Group
              options={OPTIONS_PERMISSION_EM}
              className={styles.antCheckboxGroup}
              onChange={handleCheckFilterEM}
              value={selectListEM}
            />
          );
        } else if (record.module === 'Change Management') {
          return (
            <Checkbox.Group
              options={OPTIONS_PERMISSION_CM}
              className={styles.antCheckboxGroup}
              onChange={handleCheckFilterCM}
              value={selectListCM}
            />
          );
        } else if (record.module === 'Request Fulfillment') {
          return (
            <Checkbox.Group
              options={OPTIONS_PERMISSION_RF}
              className={styles.antCheckboxGroup}
              onChange={handleCheckFilterRF}
              value={selectListRF}
            />
          );
        } else if (record.module === 'Thiết kế') {
          return (
            <Checkbox.Group
              options={OPTIONS_PERMISSION_DESIGN}
              className={styles.antCheckboxGroup}
              onChange={handleCheckFilterDesign}
              value={selectListDesign}
            />
          );
        } else if (record.module === 'Báo cáo') {
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
          );
        } else {
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
          );
        }
      },
    },
  ];
  return (
    <>
      <Row style={{ marginTop: 15 }}>
        <Col span={16}></Col>
        <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Space>
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
            <PlusSquareFilled
              style={{ fontSize: 32, color: '#478D46' }}
              onClick={handleAddNewPermission}
            />
          </Space>
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
      <Modal
        open={isAddNewPermission}
        onCancel={handleCancleAddNewPermission}
        title={
          <Typography.Text style={{ fontWeight: 'bold' }}>
            {isEditRole ? 'Chỉnh sửa quyền' : 'Phân quyền mới'}
          </Typography.Text>
        }
        width={900}
        bodyStyle={{ height: 600 }}
        footer={false}
        centered
      >
        <Form requiredMark={false} layout="vertical" onFinish={handleOnFinishPermissionAddNew}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <Form.Item
                label={
                  <Typography.Text style={{ fontWeight: 'bold' }}>
                    Tên nhóm quyền <span style={{ color: 'red' }}>(*)</span>
                  </Typography.Text>
                }
                name="role_code"
                className={styles.addPermissionInputPlaceholder}
                rules={[
                  {
                    required: true,
                    message: 'Không được để trống thông tin này',
                  },
                  {
                    max: 30,
                    message: 'Tên nhóm tối đa 30 ký tự',
                  },
                ]}
                labelCol={{
                  xs: {
                    span: 24,
                  },
                  sm: {
                    span: 24,
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
                    span: 24,
                  },
                  md: {
                    span: 21,
                  },
                }}
              >
                <Input
                  placeholder="Nhập tên nhóm quyền mới"
                  className={styles.addPermissionInput}
                />
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
                    span: 24,
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
                    span: 24,
                  },
                  md: {
                    span: 24,
                  },
                }}
              >
                <Input
                  placeholder="Nhập mô tả cho nhóm quyền"
                  className={styles.addPermissionInput}
                />
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
            <Button style={{ marginRight: '10px' }} onClick={handleCancleAddNewPermission}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Tạo mới
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PermissionRole;
