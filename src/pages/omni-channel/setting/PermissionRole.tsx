import React, { useEffect, useState } from 'react';
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
  requestListUserRole,
  requestReadRoleAndPerm,
  requestUpdateRole,
} from './services';
import { useRequest } from 'umi';
import { debounce } from 'lodash';
import { dataPermissionTable } from './FakeData';
import {
  OPTIONS_PERMISSION_CM,
  OPTIONS_PERMISSION_CM_VALUE,
  OPTIONS_PERMISSION_DB,
  OPTIONS_PERMISSION_DB_VALUE,
  OPTIONS_PERMISSION_EM,
  OPTIONS_PERMISSION_EM_VALUE,
  OPTIONS_PERMISSION_IM,
  OPTIONS_PERMISSION_IM_VALUE,
  OPTIONS_PERMISSION_RF,
  OPTIONS_PERMISSION_RF_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_BGCT_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_KHD_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_LSCG_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_NQ_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_TKC_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_TTCN_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_TTCT_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_TTND_VALUE,
  TREE_DATA_BGCT,
  TREE_DATA_KHD,
  TREE_DATA_LSCG,
  TREE_DATA_NQ,
  TREE_DATA_TKC,
  TREE_DATA_TTCN,
  TREE_DATA_TTCT,
  TREE_DATA_TTND,
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

const PermissionRole: React.FC = () => {
  const [form] = Form.useForm();
  const [listAllRolePermission, setListAllRolePermission] = useState<DataAllRolePermission[]>([]);
  const [isAddNewPermission, setAddNetPermission] = useState(false);
  const [isEditRole, setIsEditRole] = useState(false);
  const [dataRoleId, setDataRoleId] = useState<RoleIdProps>();

  const [valueCheckboxGeneralStatistic, setValueCheckboxGeneralStatistic] = useState<string[]>([]);
  const [valueCheckboxTransferShift, setValueCheckboxTransferShift] = useState<string[]>([]);
  const [valueCheckboxNightShift, setValueCheckboxNightShift] = useState<string[]>([]);
  const [valueCheckboxHistoryCall, setValueCheckboxHistoryCall] = useState<string[]>([]);
  const [valueCheckboxTTCN, setValueCheckboxTTCN] = useState<string[]>([]);
  const [valueCheckboxTTCT, setValueCheckboxTTCT] = useState<string[]>([]);
  const [valueCheckboxTTND, setValueCheckboxTTND] = useState<string[]>([]);
  const [valueCheckboxGroupsPer, setValueCheckboxGroupsPer] = useState<string[]>([]);

  const [checkAllDB, setCheckAllDB] = useState(false);
  const [selectListDB, setSelectListDB] = useState<string[]>([]);
  const [indeterminateDB, setIndeterminateDB] = useState(false);

  const [selectListEM, setSelectListEM] = useState<string[]>([]);
  const [indeterminateEM, setIndeterminateEM] = useState(false);
  const [checkAllEM, setCheckAllEM] = useState(false);

  const [selectListCM, setSelectListCM] = useState<string[]>([]);
  const [indeterminateCM, setIndeterminateCM] = useState(false);
  const [checkAllCM, setCheckAllCM] = useState(false);

  const [selectListRF, setSelectListRF] = useState<string | any>([]);
  const [indeterminateRF, setIndeterminateRF] = useState(false);
  const [checkAllRF, setCheckAllRF] = useState(false);

  const [indeterminateReport, setIndeterminateReport] = useState(false);
  const [indeterminateProfile, setIndeterminateProfile] = useState(false);
  const [checkAllReport, setCheckAllReport] = useState(false);
  const [checkAllProfile, setCheckAllProfile] = useState(false);

  const [selectListIM, setSelectListIM] = useState<string | any>([]);
  const [indeterminateIM, setIndeterminateIM] = useState(false);
  const [checkAllIM, setCheckAllIM] = useState(false);

  const permissionList = valueCheckboxGeneralStatistic.concat(
    valueCheckboxTransferShift,
    valueCheckboxNightShift,
    valueCheckboxHistoryCall,
    valueCheckboxTTCN,
    valueCheckboxTTCT,
    valueCheckboxTTND,
    valueCheckboxGroupsPer,
    selectListDB,
    selectListIM,
    selectListEM,
    selectListCM,
    selectListRF,
  );

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

  const handleAddNewPermission = async () => {
    form.resetFields();
    setSelectListDB([]);
    setSelectListIM([]);
    setSelectListCM([]);
    setSelectListEM([]);
    setSelectListRF([]);
    setValueCheckboxGeneralStatistic([]);
    setValueCheckboxTransferShift([]);
    setValueCheckboxNightShift([]);
    setValueCheckboxHistoryCall([]);
    setValueCheckboxTTCT([]);
    setValueCheckboxTTCN([]);
    setValueCheckboxTTND([]);
    setValueCheckboxGroupsPer([]);
    setAddNetPermission(true);
    setIsEditRole(false);
  };

  const handleEditRole = (data: RoleIdProps) => {
    setSelectListDB([]);
    setSelectListIM([]);
    setSelectListCM([]);
    setSelectListEM([]);
    setSelectListRF([]);
    setValueCheckboxGeneralStatistic([]);
    setValueCheckboxTransferShift([]);
    setValueCheckboxNightShift([]);
    setValueCheckboxHistoryCall([]);
    setValueCheckboxTTCT([]);
    setValueCheckboxTTCN([]);
    setValueCheckboxTTND([]);
    setValueCheckboxGroupsPer([]);

    setDataRoleId(data);
    form.setFieldValue('role_code', data.code);
    form.setFieldValue('role_desc', data.desc);
    setAddNetPermission(true);
    setIsEditRole(true);
  };

  const handleCancleAddNewPermission = () => {
    setIsEditRole(false);
    setAddNetPermission(false);
  };

  const handleCheckAllFilterDB = (e: any) => {
    setSelectListDB(e.target.checked ? OPTIONS_PERMISSION_DB_VALUE : []);
  };

  const handleCheckAllFilterIM = (e: any) => {
    setSelectListIM(e.target.checked ? OPTIONS_PERMISSION_IM_VALUE : []);
  };

  const handleCheckFilterEM = (list: any) => {
    setSelectListEM(list);
  };

  useEffect(() => {
    setIndeterminateEM(false);
    setCheckAllEM(false);
    if (!!selectListEM.length && selectListEM.length < OPTIONS_PERMISSION_EM.length) {
      setIndeterminateEM(true);
    } else if (selectListEM.length === OPTIONS_PERMISSION_EM.length) {
      setCheckAllEM(true);
    }
  }, [selectListEM]);

  const handleCheckAllFilterEM = (e: any) => {
    setSelectListEM(e.target.checked ? OPTIONS_PERMISSION_EM_VALUE : []);
  };

  const handleCheckFilterCM = (list: any) => {
    setSelectListCM(list);
  };

  useEffect(() => {
    setIndeterminateCM(false);
    setCheckAllCM(false);
    if (!!selectListCM.length && selectListCM.length < OPTIONS_PERMISSION_CM.length) {
      setIndeterminateCM(true);
    } else if (selectListCM.length === OPTIONS_PERMISSION_CM.length) {
      setCheckAllCM(true);
    }
  }, [selectListCM]);

  const handleCheckAllFilterCM = (e: any) => {
    setSelectListCM(e.target.checked ? OPTIONS_PERMISSION_CM_VALUE : []);
  };

  const handleCheckFilterRF = (list: any) => {
    setSelectListRF(list);
  };

  useEffect(() => {
    setIndeterminateRF(false);
    setCheckAllRF(false);
    if (!!selectListRF.length && selectListRF.length < OPTIONS_PERMISSION_RF.length) {
      setIndeterminateRF(true);
    } else if (selectListRF.length === OPTIONS_PERMISSION_RF.length) {
      setCheckAllRF(true);
    }
  }, [selectListRF]);

  const handleCheckAllFilterRF = (e: any) => {
    setSelectListRF(e.target.checked ? OPTIONS_PERMISSION_RF_VALUE : []);
  };

  const handleCheckFilterDB = (list: any) => {
    setSelectListDB(list);
  };

  useEffect(() => {
    setIndeterminateDB(false);
    setCheckAllDB(false);
    if (!!selectListDB.length && selectListDB.length < OPTIONS_PERMISSION_DB.length) {
      setIndeterminateDB(true);
    } else if (selectListDB.length === OPTIONS_PERMISSION_DB.length) {
      setCheckAllDB(true);
    }
  }, [selectListDB]);

  const handleCheckFilterIM = (list: any) => {
    setSelectListIM(list);
  };

  useEffect(() => {
    setIndeterminateIM(false);
    setCheckAllIM(false);
    if (!!selectListIM.length && selectListIM.length < OPTIONS_PERMISSION_IM.length) {
      setIndeterminateIM(true);
    } else if (selectListIM.length === OPTIONS_PERMISSION_IM.length) {
      setCheckAllIM(true);
    }
  }, [selectListIM]);

  const onCheckDataTreeGeneralStatistic = (checkedKeys: any, info: any) => {
    setValueCheckboxGeneralStatistic(
      checkedKeys.filter((data: string) => data !== 'general_statistic'),
    );
  };

  const onCheckDataTreeTransferShift = (checkedKeys: any, info: any) => {
    setValueCheckboxTransferShift(checkedKeys.filter((data: string) => data !== 'transfer_shift'));
  };
  const onCheckDataTreeNightShift = (checkedKeys: any, info: any) => {
    setValueCheckboxNightShift(checkedKeys.filter((data: string) => data !== 'night_shift'));
  };
  const onCheckDataTreeHistoryCall = (checkedKeys: any, info: any) => {
    setValueCheckboxHistoryCall(checkedKeys.filter((data: string) => data !== 'call_history'));
  };
  const onCheckDataTreeTTCN = (checkedKeys: any, info: any) => {
    setValueCheckboxTTCN(checkedKeys.filter((data: string) => data !== 'personal_info'));
  };
  const onCheckDataTreeTTCT = (checkedKeys: any, info: any) => {
    setValueCheckboxTTCT(checkedKeys.filter((data: string) => data !== 'shift_info'));
  };
  const onCheckDataTreeTTND = (checkedKeys: any, info: any) => {
    setValueCheckboxTTND(checkedKeys.filter((data: string) => data !== 'user_profile'));
  };
  const onCheckDataTreeGroupsPer = (checkedKeys: any, info: any) => {
    setValueCheckboxGroupsPer(checkedKeys.filter((data: string) => data !== 'permission_group'));
  };

  // const permissionList = valueCheckboxGeneralStatistic.concat(
  //   valueCheckboxTransferShift,
  //   valueCheckboxNightShift,
  //   valueCheckboxHistoryCall,
  //   valueCheckboxTTCN,
  //   valueCheckboxTTCT,
  //   valueCheckboxTTND,
  //   valueCheckboxGroupsPer,
  //   selectListDB,
  //   selectListIM,
  //   selectListEM,
  //   selectListCM,
  //   selectListRF,
  // );

  const fetchListUserRole = async (role_code: string, role_desc: string) => {
    if (permissionList.length === 0) {
      Modal.warning({
        title: 'Thông báo',
        content: `Vui lòng chọn ít nhất một chức năng!`,
        okText: 'Xác nhận',
      });
      return;
    }
    const res = await requestListUserRole(permissionList, role_code, role_desc);

    if (res?.success) {
      message.success('Tạo nhóm quyền thành công');
      handleCancleAddNewPermission();
      refreshReadRoleAndPerm();
    }
    return res;
  };

  const fetchListUpdateRole = async (role_code: string, role_desc: string) => {
    if (permissionList.length === 0) {
      Modal.warning({
        title: 'Thông báo',
        content: `Vui lòng chọn ít nhất một chức năng!`,
        okText: 'Xác nhận',
      });
      return;
    }
    const res = await requestUpdateRole(permissionList, role_code, role_desc);

    if (res?.success) {
      message.success('Cập nhập nhóm quyền thành công');
      handleCancleAddNewPermission();
      refreshReadRoleAndPerm();
    } else {
      message.error('Cập nhập nhóm quyền thất bại');
    }
    return res;
  };

  const handleOnFinishPermissionAddNew = (values: any) => {
    if (isEditRole) {
      fetchListUpdateRole(values.role_code, values.role_desc);
    } else {
      const res = fetchListUserRole(values.role_code, values.role_desc);
      res.then((result: { error_code: number }) => {
        if (result?.error_code === 4000104 && permissionList.length) {
          Modal.warning({
            title: 'Thông báo',
            content: `Đã tồn tại ${values.role_code}. không thể tạo mới!`,
            okText: 'Xác nhận',
          });
        }
      });
    }
  };

  const handleCheckAllReport = () => {
    if (checkAllReport) {
      setCheckAllReport(false);
      setValueCheckboxGeneralStatistic([]);
      setValueCheckboxTransferShift([]);
      setValueCheckboxNightShift([]);
      setValueCheckboxHistoryCall([]);
      setValueCheckboxTTCT([]);
    } else {
      setCheckAllReport(true);
      setValueCheckboxGeneralStatistic(OPTIONS_PERMISSION_TREE_DATA_TKC_VALUE);
      setValueCheckboxTransferShift(OPTIONS_PERMISSION_TREE_DATA_BGCT_VALUE);
      setValueCheckboxNightShift(OPTIONS_PERMISSION_TREE_DATA_KHD_VALUE);
      setValueCheckboxHistoryCall(OPTIONS_PERMISSION_TREE_DATA_LSCG_VALUE);
      setValueCheckboxTTCT(OPTIONS_PERMISSION_TREE_DATA_TTCT_VALUE);
    }
  };

  useEffect(() => {
    setIndeterminateReport(false);
    setCheckAllReport(false);
    if (
      valueCheckboxGeneralStatistic.length > 0 ||
      valueCheckboxTransferShift.length > 0 ||
      valueCheckboxNightShift.length > 0 ||
      valueCheckboxHistoryCall.length > 0 ||
      valueCheckboxTTCT.length > 0
    ) {
      setIndeterminateReport(true);
    }

    if (
      valueCheckboxGeneralStatistic.length == OPTIONS_PERMISSION_TREE_DATA_TKC_VALUE.length &&
      valueCheckboxTransferShift.length == OPTIONS_PERMISSION_TREE_DATA_BGCT_VALUE.length &&
      valueCheckboxNightShift.length == OPTIONS_PERMISSION_TREE_DATA_KHD_VALUE.length &&
      valueCheckboxHistoryCall.length == OPTIONS_PERMISSION_TREE_DATA_LSCG_VALUE.length &&
      valueCheckboxTTCT.length == OPTIONS_PERMISSION_TREE_DATA_TTCT_VALUE.length
    ) {
      setIndeterminateReport(false);
      setCheckAllReport(true);
    }
  }, [
    valueCheckboxGeneralStatistic,
    valueCheckboxTransferShift,
    valueCheckboxNightShift,
    valueCheckboxHistoryCall,
    valueCheckboxTTCT,
  ]);

  const handleCheckAllProfile = () => {
    if (checkAllProfile) {
      setCheckAllProfile(false);
      setValueCheckboxGroupsPer([]);
      setValueCheckboxTTCN([]);
      setValueCheckboxTTND([]);
    } else {
      setCheckAllProfile(true);
      setValueCheckboxGroupsPer(OPTIONS_PERMISSION_TREE_DATA_NQ_VALUE);
      setValueCheckboxTTCN(OPTIONS_PERMISSION_TREE_DATA_TTCN_VALUE);
      setValueCheckboxTTND(OPTIONS_PERMISSION_TREE_DATA_TTND_VALUE);
    }
  };

  useEffect(() => {
    setIndeterminateProfile(false);
    setCheckAllProfile(false);
    if (
      valueCheckboxTTCN.length > 0 ||
      valueCheckboxTTND.length > 0 ||
      valueCheckboxGroupsPer.length > 0
    ) {
      setIndeterminateProfile(true);
    }

    if (
      valueCheckboxTTCN.length == OPTIONS_PERMISSION_TREE_DATA_TTCN_VALUE.length &&
      valueCheckboxTTND.length == OPTIONS_PERMISSION_TREE_DATA_TTND_VALUE.length &&
      valueCheckboxGroupsPer.length == OPTIONS_PERMISSION_TREE_DATA_NQ_VALUE.length
    ) {
      setIndeterminateProfile(false);
      setCheckAllProfile(true);
    }
  }, [valueCheckboxTTCN, valueCheckboxTTND, valueCheckboxGroupsPer]);

  useEffect(() => {
    if (isEditRole) {
      const defaultDataDB = dataRoleId?.permission_list
        .filter(({ group }) => group === 'dashboard')
        .map(({ code }) => code);
      if (defaultDataDB?.length) {
        setSelectListDB(defaultDataDB);
      }

      const defaultDataIM = dataRoleId?.permission_list
        .filter(({ group }) => group === 'incident_management')
        .map(({ code }) => code);
      if (defaultDataIM?.length) {
        setSelectListIM(defaultDataIM);
      }

      const defaultDataEM = dataRoleId?.permission_list
        .filter(({ group }) => group === 'event_management')
        .map(({ code }) => code);
      if (defaultDataEM?.length) {
        setSelectListEM(defaultDataEM);
      }

      const defaultDataCM = dataRoleId?.permission_list
        .filter(({ group }) => group === 'change_management')
        .map(({ code }) => code);
      if (defaultDataCM?.length) {
        setSelectListCM(defaultDataCM);
      }

      const defaultDataRF = dataRoleId?.permission_list
        .filter(({ group }) => group === 'request_fufillment')
        .map(({ code }) => code);
      if (defaultDataRF?.length) {
        setSelectListRF(defaultDataRF);
      }

      const defaultDataTTC = dataRoleId?.permission_list
        .filter(({ group }) => group === 'general_statistic')
        .map(({ code }) => code);
      if (defaultDataTTC?.length) {
        setValueCheckboxGeneralStatistic(defaultDataTTC);
      }

      const defaultDataBGCT = dataRoleId?.permission_list
        .filter(({ group }) => group === 'transfer_shift')
        .map(({ code }) => code);
      if (defaultDataBGCT?.length) {
        setValueCheckboxTransferShift(defaultDataBGCT);
      }

      const defaultDataKHD = dataRoleId?.permission_list
        .filter(({ group }) => group === 'night_transfer')
        .map(({ code }) => code);
      if (defaultDataKHD?.length) {
        setValueCheckboxNightShift(defaultDataKHD);
      }

      const defaultDataLSCG = dataRoleId?.permission_list
        .filter(({ group }) => group === 'call_history')
        .map(({ code }) => code);
      if (defaultDataLSCG?.length) {
        setValueCheckboxHistoryCall(defaultDataLSCG);
      }

      const defaultDataTTCT = dataRoleId?.permission_list
        .filter(({ group }) => group === 'call_history')
        .map(({ code }) => code);
      if (defaultDataTTCT?.length) {
        setValueCheckboxTTCT(defaultDataTTCT);
      }

      const defaultDataTTCN = dataRoleId?.permission_list
        .filter(({ group }) => group === 'personal_info')
        .map(({ code }) => code);
      if (defaultDataTTCN?.length) {
        setValueCheckboxTTCN(defaultDataTTCN);
      }

      const defaultDataTTND = dataRoleId?.permission_list
        .filter(({ group }) => group === 'user_profile')
        .map(({ code }) => code);
      if (defaultDataTTND?.length) {
        setValueCheckboxTTND(defaultDataTTND);
      }

      const defaultDataGroupsPer = dataRoleId?.permission_list
        .filter(({ group }) => group === 'permission_group')
        .map(({ code }) => code);
      if (defaultDataGroupsPer?.length) {
        setValueCheckboxGroupsPer(defaultDataGroupsPer);
      }
    }
  }, [dataRoleId, isEditRole]);

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
        } else if (record.module === 'Report') {
          return (
            <Checkbox
              indeterminate={indeterminateReport}
              onChange={handleCheckAllReport}
              checked={checkAllReport}
              className={styles.checkboxStyle}
            />
          );
        } else if (record.module === 'Profile') {
          return (
            <Checkbox
              indeterminate={indeterminateProfile}
              onChange={handleCheckAllProfile}
              checked={checkAllProfile}
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
        }
        // else if (record.module === 'Thiết kế') {
        //   return (
        //     <Checkbox.Group
        //       options={OPTIONS_PERMISSION_DESIGN}
        //       className={styles.antCheckboxGroup}
        //       onChange={handleCheckFilterDesign}
        //       value={selectListDesign}
        //     />
        //   );
        // }
        else if (record.module === 'Report') {
          return (
            <>
              <Tree
                treeData={TREE_DATA_TKC}
                checkable
                onCheck={onCheckDataTreeGeneralStatistic}
                className={styles.treeDataCheckbox}
                checkedKeys={valueCheckboxGeneralStatistic}
              />
              <Tree
                treeData={TREE_DATA_BGCT}
                checkable
                onCheck={onCheckDataTreeTransferShift}
                className={styles.treeDataCheckbox}
                checkedKeys={valueCheckboxTransferShift}
              />
              <Tree
                treeData={TREE_DATA_KHD}
                checkable
                onCheck={onCheckDataTreeNightShift}
                className={styles.treeDataCheckbox}
                checkedKeys={valueCheckboxNightShift}
              />
              <Tree
                treeData={TREE_DATA_LSCG}
                checkable
                onCheck={onCheckDataTreeHistoryCall}
                className={styles.treeDataCheckbox}
                checkedKeys={valueCheckboxHistoryCall}
              />
              <Tree
                treeData={TREE_DATA_TTCT}
                checkable
                onCheck={onCheckDataTreeTTCT}
                className={styles.treeDataCheckbox}
                checkedKeys={valueCheckboxTTCT}
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
                checkedKeys={valueCheckboxTTCN}
              />
              <Tree
                treeData={TREE_DATA_TTND}
                checkable
                onCheck={onCheckDataTreeTTND}
                className={styles.treeDataCheckbox}
                checkedKeys={valueCheckboxTTND}
              />
              <Tree
                treeData={TREE_DATA_NQ}
                checkable
                onCheck={onCheckDataTreeGroupsPer}
                className={styles.treeDataCheckbox}
                checkedKeys={valueCheckboxGroupsPer}
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
        <Form
          form={form}
          requiredMark={false}
          layout="vertical"
          onFinish={handleOnFinishPermissionAddNew}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div style={{ flex: 1 }}>
              <Form.Item
                label={
                  <Typography.Text style={{ fontWeight: 'bold' }}>
                    Tên nhóm quyền <span style={{ color: 'red' }}>(*)</span>
                  </Typography.Text>
                }
                name="role_code"
                initialValue=""
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
                  value={isEditRole ? dataRoleId?.code : ''}
                />
              </Form.Item>
            </div>
            <div style={{ flex: 1 }}>
              <Form.Item
                label={<Typography.Text style={{ fontWeight: 'bold' }}>Mô tả</Typography.Text>}
                name="role_desc"
                className={styles.addPermissionInputPlaceholder}
                initialValue=""
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
              {isEditRole ? 'Cập nhập' : 'Tạo mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PermissionRole;
