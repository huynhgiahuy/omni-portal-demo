import {
  Button,
  Checkbox,
  Col,
  Empty,
  Form,
  Input,
  message,
  Modal,
  Row,
  Space,
  Spin,
  Table,
  TablePaginationConfig,
  Tree,
  Typography,
} from 'antd';
import { debounce, isEqual } from 'lodash';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useRequest } from 'umi';

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
  OPTIONS_PERMISSION_TREE_DATA_CONTACT_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_KHD_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_LSCG_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_NQ_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_TKC_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_TTCT_VALUE,
  OPTIONS_PERMISSION_TREE_DATA_TTND_VALUE,
  TREE_DATA_BGCT,
  TREE_DATA_CONTACT,
  TREE_DATA_KHD,
  TREE_DATA_LSCG,
  TREE_DATA_NQ,
  TREE_DATA_TKC,
  TREE_DATA_TTCT,
  TREE_DATA_TTND,
} from '@/constants';
import NoFoundPage from '@/pages/404';
import {
  CloseCircleFilled,
  DeleteOutlined,
  EditOutlined,
  PlusSquareFilled,
  RollbackOutlined,
  SearchOutlined,
} from '@ant-design/icons';

import styles from '../setting/style.less';
import { dataPermissionTable } from './FakeData';
import {
  requestCreateRoleAndPerm,
  requestDeleteRoleAndPermission,
  requestReadRoleAndPerm,
  requestUpdateRole,
} from './services';

import type { ColumnsType, TableProps } from 'antd/es/table';
interface DataAllRolePermission {
  key: React.Key;
  code: string;
  desc: string;
  id: string;
  created_by: string;
  created_at: string;
  updated_at: string;
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
  const [isDisable, setIsDisable] = useState(true);
  const [roleCode, setRoleCode] = useState('');
  const [roleDesc, setRoleDesc] = useState('');
  const [isView, setIsView] = useState('');
  const token = window.localStorage?.getItem('access_token');

  const [search, setSearch] = useState('');
  const [sort, setSort] = useState({ created_at: 0, updated_at: 0 });

  const [listAllRolePermission, setListAllRolePermission] = useState<DataAllRolePermission[]>([]);
  const [isAddNewPermission, setAddNetPermission] = useState(false);
  const [isEditRole, setIsEditRole] = useState(false);
  const [dataRoleId, setDataRoleId] = useState<RoleIdProps>();

  const [valueCheckboxGeneralStatistic, setValueCheckboxGeneralStatistic] = useState<string[]>([]);
  const [valueCheckboxTransferShift, setValueCheckboxTransferShift] = useState<string[]>([]);
  const [valueCheckboxNightShift, setValueCheckboxNightShift] = useState<string[]>([]);
  const [valueCheckboxHistoryCall, setValueCheckboxHistoryCall] = useState<string[]>([]);
  const [valueCheckboxTTCT, setValueCheckboxTTCT] = useState<string[]>([]);
  const [valueCheckboxTTND, setValueCheckboxTTND] = useState<string[]>([]);
  const [valueCheckboxGroupsPer, setValueCheckboxGroupsPer] = useState<string[]>([]);
  const [valueCheckboxContact, setValueCheckboxContact] = useState<string[]>([]);

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
    valueCheckboxTTCT,
    valueCheckboxTTND,
    valueCheckboxGroupsPer,
    valueCheckboxContact,
    selectListDB,
    selectListIM,
    selectListEM,
    selectListCM,
    selectListRF,
  );

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;
  const handleConfirmDeleteMultiple = () => {
    Modal.confirm({
      title: 'Thao tác xóa',
      content: 'Bạn có chắc chắn muốn xóa thông tin này?',
      okText: 'Xóa',
      cancelText: 'Hủy',
      icon: <CloseCircleFilled style={{ color: 'red' }} />,
      okButtonProps: { danger: true },
      centered: true,
      onOk() {
        fetchDeleteRoleAndPermission.run(selectedRowKeys);
      },
    });
  };

  const fetchReadRoleAndPermCheckRole = useRequest(
    async (keyword?: string) => {
      const res: { success: boolean; error_code: number } = await requestReadRoleAndPerm(
        token ? token : '',
        {
          keyword,
        },
      );
      if (!res.success) {
        if (res.error_code === 4030102) {
          setIsView('403');
          return;
        }
      }
      return res;
    },
    {
      onSuccess: (res) => {
        if (res) {
          setIsView('200');
          setListAllRolePermission(res);
        }
      },
    },
  );

  const fetchReadRoleAndPerm = useRequest(
    async (keyword?: string, sort_key?: { create_at?: number; updated_at?: number }) => {
      const res: { success: boolean; error_code: number } = await requestReadRoleAndPerm(
        token ? token : '',
        {
          keyword,
          sort_key,
        },
      );
      if (!res.success) {
        if (res.error_code === 4030102) {
          setIsView('403');
          return;
        }
      }
      return res;
    },
    {
      manual: true,
      onSuccess: (res) => {
        if (res) {
          setListAllRolePermission(res);
        }
      },
    },
  );

  const fetchCreateRoleAndPermission = useRequest(
    async (permissionList: string[], role_code: string, role_desc: string) => {
      const res: { success: string; error_code: number } = await requestCreateRoleAndPerm(
        token ? token : '',
        permissionList,
        role_code,
        role_desc,
      );
      if (res.success) {
        message.success('Thêm mới thành công');
        handleCancleAddNewPermission();
        fetchReadRoleAndPerm.run();
      } else if (res.error_code === 4000104) {
        form.setFields([
          {
            name: 'role_code',
            errors: ['Tên nhóm quyền đã tồn tại'],
          },
        ]);
      } else if (res.error_code === 4030102) {
        message.error('Bạn không có quyền tạo mới');
        return;
      } else {
        message.error('Tạo mới thất bại');
        return;
      }

      return res;
    },
    {
      manual: true,
    },
  );

  const fetchUpdateRoleAndPermission = useRequest(
    async (permissionList: string[], role_code: string, role_desc: string, id: string) => {
      const res: { success: string; error_code: number } = await requestUpdateRole(
        token ? token : '',
        permissionList,
        role_code,
        role_desc,
        id,
      );
      if (!res.success) {
        if (res.error_code === 4010104) {
          form.setFields([
            {
              name: 'role_code',
              errors: ['Tên nhóm quyền đã tồn tại'],
            },
          ]);
        } else if (res.error_code === 4030102) {
          message.error('Bạn không có quyền cập nhập');
          return;
        } else {
          message.error('Cập nhập thất bại');
          return;
        }
      } else {
        handleCancleAddNewPermission();
        message.success('Cập nhập thành công');
        fetchReadRoleAndPerm.run();
      }
      return res;
    },
    {
      manual: true,
    },
  );

  const fetchDeleteRoleAndPermission = useRequest(
    async (id: React.Key[]) => {
      const res: { success: string; error_code: number } = await requestDeleteRoleAndPermission(
        token ? token : '',
        id,
      );
      if (!res.success) {
        if (res.error_code === 4030102) {
          message.error('Bạn không có quyền xoá');
          return;
        } else {
          message.error('Xoá Thất bại');
          return;
        }
      } else {
        handleCancleAddNewPermission();
        message.success('Xoá thành công');
        fetchReadRoleAndPerm.run();
        setSelectedRowKeys([]);
      }
      return res;
    },
    {
      manual: true,
    },
  );

  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '20', '30', '50'],
  });

  const handleClickDeleteRole = (role_ids: [string]) => {
    Modal.confirm({
      title: 'Thao tác xoá',
      content: 'Bạn có chắc chắn muốn xoá thông tin này?',
      okText: 'Xoá',
      okType: 'danger',
      centered: true,
      okButtonProps: {
        type: 'primary',
      },
      icon: <CloseCircleFilled style={{ color: 'red', fontSize: 22 }} />,
      onOk() {
        {
          fetchDeleteRoleAndPermission.run(role_ids);
        }
      },

      cancelText: 'Hủy',
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
    setValueCheckboxTTND([]);
    setValueCheckboxGroupsPer([]);
    setValueCheckboxContact([]);
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
    setValueCheckboxTTND([]);
    setValueCheckboxGroupsPer([]);
    setValueCheckboxContact([]);

    setDataRoleId(data);
    form.setFieldValue('role_code', data.code);
    form.setFieldValue('role_desc', data.desc);
    setAddNetPermission(true);
    setIsEditRole(true);
  };

  const handleCancleAddNewPermission = () => {
    setAddNetPermission(false);
    setIsEditRole(false);
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

  const onCheckDataTreeTTCT = (checkedKeys: any, info: any) => {
    setValueCheckboxTTCT(checkedKeys.filter((data: string) => data !== 'shift_info'));
  };
  const onCheckDataTreeTTND = (checkedKeys: any, info: any) => {
    setValueCheckboxTTND(checkedKeys.filter((data: string) => data !== 'user_profile'));
  };
  const onCheckDataTreeGroupsPer = (checkedKeys: any, info: any) => {
    setValueCheckboxGroupsPer(checkedKeys.filter((data: string) => data !== 'permission_group'));
  };

  const onCheckDataTreeContact = (checkedKeys: any, info: any) => {
    setValueCheckboxContact(checkedKeys.filter((data: string) => data !== 'contact'));
  };

  const fetchListUserRole = async (role_code: string, role_desc: string) => {
    if (permissionList.length === 0) {
      Modal.warning({
        title: 'Thông báo',
        content: `Vui lòng chọn ít nhất một chức năng!`,
        okText: 'Xác nhận',
      });
      return;
    }
    fetchCreateRoleAndPermission.run(permissionList, role_code, role_desc);
  };

  const fetchListUpdateRole = async (role_code: string, role_desc: string, id?: string) => {
    if (permissionList.length === 0) {
      Modal.warning({
        title: 'Thông báo',
        content: `Vui lòng chọn ít nhất một chức năng!`,
        okText: 'Xác nhận',
      });
      return;
    }
    fetchUpdateRoleAndPermission.run(permissionList, role_code, role_desc, id ? id : '');
  };

  const handleOnFinishPermissionAddNew = (values: { role_code: string; role_desc: string }) => {
    if (isEditRole) {
      fetchListUpdateRole(values.role_code, values.role_desc, dataRoleId?.id);
    } else {
      fetchListUserRole(values.role_code, values.role_desc);
    }
  };

  const handleCheckAllReport = () => {
    if (checkAllReport) {
      setCheckAllReport(false);
      setValueCheckboxGeneralStatistic([]);
      setValueCheckboxTransferShift([]);
      setValueCheckboxNightShift([]);
      setValueCheckboxTTCT([]);
    } else {
      setCheckAllReport(true);
      setValueCheckboxGeneralStatistic(OPTIONS_PERMISSION_TREE_DATA_TKC_VALUE);
      setValueCheckboxTransferShift(OPTIONS_PERMISSION_TREE_DATA_BGCT_VALUE);
      setValueCheckboxNightShift(OPTIONS_PERMISSION_TREE_DATA_KHD_VALUE);
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
      valueCheckboxTTCT.length > 0
    ) {
      setIndeterminateReport(true);
    }

    if (
      valueCheckboxGeneralStatistic.length == OPTIONS_PERMISSION_TREE_DATA_TKC_VALUE.length &&
      valueCheckboxTransferShift.length == OPTIONS_PERMISSION_TREE_DATA_BGCT_VALUE.length &&
      valueCheckboxNightShift.length == OPTIONS_PERMISSION_TREE_DATA_KHD_VALUE.length &&
      valueCheckboxTTCT.length == OPTIONS_PERMISSION_TREE_DATA_TTCT_VALUE.length
    ) {
      setIndeterminateReport(false);
      setCheckAllReport(true);
    }
  }, [
    valueCheckboxGeneralStatistic,
    valueCheckboxTransferShift,
    valueCheckboxNightShift,
    valueCheckboxTTCT,
  ]);

  const handleCheckAllProfile = () => {
    if (checkAllProfile) {
      setCheckAllProfile(false);
      setValueCheckboxGroupsPer([]);
      setValueCheckboxTTND([]);
      setValueCheckboxHistoryCall([]);
      setValueCheckboxContact([]);
    } else {
      setCheckAllProfile(true);
      setValueCheckboxGroupsPer(OPTIONS_PERMISSION_TREE_DATA_NQ_VALUE);
      setValueCheckboxTTND(OPTIONS_PERMISSION_TREE_DATA_TTND_VALUE);
      setValueCheckboxHistoryCall(OPTIONS_PERMISSION_TREE_DATA_LSCG_VALUE);
      setValueCheckboxContact(OPTIONS_PERMISSION_TREE_DATA_CONTACT_VALUE);
    }
  };

  useEffect(() => {
    setIndeterminateProfile(false);
    setCheckAllProfile(false);
    if (
      valueCheckboxTTND.length > 0 ||
      valueCheckboxGroupsPer.length > 0 ||
      valueCheckboxHistoryCall.length > 0 ||
      valueCheckboxContact.length > 0
    ) {
      setIndeterminateProfile(true);
    }

    if (
      valueCheckboxTTND.length == OPTIONS_PERMISSION_TREE_DATA_TTND_VALUE.length &&
      valueCheckboxGroupsPer.length == OPTIONS_PERMISSION_TREE_DATA_NQ_VALUE.length &&
      valueCheckboxHistoryCall.length == OPTIONS_PERMISSION_TREE_DATA_LSCG_VALUE.length &&
      valueCheckboxContact.length == OPTIONS_PERMISSION_TREE_DATA_CONTACT_VALUE.length
    ) {
      setIndeterminateProfile(false);
      setCheckAllProfile(true);
    }
  }, [valueCheckboxTTND, valueCheckboxGroupsPer, valueCheckboxHistoryCall, valueCheckboxContact]);

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
        .filter(({ group }) => group === 'night_shift')
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
        .filter(({ group }) => group === 'shift_info')
        .map(({ code }) => code);
      if (defaultDataTTCT?.length) {
        setValueCheckboxTTCT(defaultDataTTCT);
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

      const defaultDataContact = dataRoleId?.permission_list
        .filter(({ group }) => group === 'contact')
        .map(({ code }) => code);
      if (defaultDataContact?.length) {
        setValueCheckboxContact(defaultDataContact);
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
      dataIndex: 'create_by',
      key: 'create_by',

      render: (text, recode) => {
        return recode.created_by ? recode.created_by : '-';
      },
    },
    {
      title: 'Ngày tạo',
      dataIndex: 'created_at',
      key: 'created_at',
      sorter: true,
      render: (text) => {
        return text ? moment.unix(text).format('DD-MM-YYYY') : '-';
      },
    },
    {
      title: 'Ngày sửa gần nhất',
      dataIndex: 'updated_at',
      key: 'updated_at',
      sorter: true,
      render: (text) => {
        return text ? moment.unix(text).format('DD-MM-YYYY') : '-';
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
            style={{ fontSize: '20px' }}
            className={hasSelected ? styles.disableDelete : styles.enableDelete}
            onClick={() => {
              if (hasSelected) return;
              handleClickDeleteRole([record.id]);
            }}
          />
        </Space>
      ),
    },
  ];

  const handleTableChange: TableProps<DataAllRolePermission>['onChange'] = (
    newPagination: TablePaginationConfig,
    filters,
    sorter: any,
    extra,
  ) => {
    let created_at = 0;
    let updated_at = 0;

    if (sorter.field === 'created_at') {
      switch (sorter.order) {
        case 'ascend':
          created_at = 1;
          break;
        case 'descend':
          created_at = -1;
          break;
        default:
          break;
      }
    } else {
      switch (sorter.order) {
        case 'ascend':
          updated_at = 1;
          break;
        case 'descend':
          updated_at = -1;
          break;
        default:
          break;
      }
    }

    setSort({
      created_at,
      updated_at,
    });
    setPagination({
      ...pagination,
      current: newPagination.current!,
      pageSize: newPagination.pageSize!,
    });
  };

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
        } else if (record.module === 'Report') {
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
              <Tree
                treeData={TREE_DATA_LSCG}
                checkable
                onCheck={onCheckDataTreeHistoryCall}
                className={styles.treeDataCheckbox}
                checkedKeys={valueCheckboxHistoryCall}
              />
              <Tree
                treeData={TREE_DATA_CONTACT}
                checkable
                onCheck={onCheckDataTreeContact}
                className={styles.treeDataCheckbox}
                checkedKeys={valueCheckboxContact}
              />
            </>
          );
        }
      },
    },
  ];

  useEffect(() => {
    if (isEditRole) {
      form
        .validateFields()
        .catch(
          (error: {
            errorFields: { errors: string[]; name: string[] }[];
            values: { role_code: string; role_desc: string };
          }) => {
            setIsDisable(true);
            const codeRoleId = dataRoleId?.permission_list.map(
              (permission: { code: string }) => permission.code,
            );
            const sameArray = isEqual(codeRoleId && codeRoleId.sort(), permissionList.sort());

            if (
              error.errorFields.length === 0 &&
              (!sameArray ||
                dataRoleId?.code !== error.values.role_code ||
                dataRoleId?.desc !== error.values.role_desc)
            ) {
              setIsDisable(false);
            }
          },
        );
    } else {
      setIsDisable(false);
      if (form.getFieldError('role_code').length > 0) {
        setIsDisable(true);
      }
    }
  }, [
    roleCode,
    roleDesc,
    valueCheckboxGeneralStatistic,
    valueCheckboxTransferShift,
    valueCheckboxNightShift,
    valueCheckboxHistoryCall,
    valueCheckboxTTCT,
    valueCheckboxTTND,
    valueCheckboxGroupsPer,
    valueCheckboxContact,
    selectListDB,
    selectListIM,
    selectListEM,
    selectListCM,
    selectListRF,
  ]);

  if (isEditRole) {
    form.validateFields();
  }

  useEffect(() => {
    form.validateFields();
  }, [roleCode, roleDesc]);

  useEffect(() => {
    if (!isView) return;
    fetchReadRoleAndPerm.run(search, sort);
  }, [search, sort]);

  return isView === '403' ? (
    <NoFoundPage status="403" title="403" subTitle="Bạn không có quyền xem trang này" />
  ) : fetchReadRoleAndPermCheckRole.loading ? (
    <div />
  ) : (
    <>
      <Row style={{ marginTop: 15 }}>
        <Col span={16}></Col>
        <Col span={8} style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Space>
            <Form.Item name="search" style={{ marginBottom: 0 }}>
              <Input
                key="search"
                prefix={<SearchOutlined />}
                placeholder="Nhập từ khoá"
                allowClear
                onChange={debounce(
                  (e) => {
                    const { value } = e.target;
                    setSearch(value);
                  },
                  500,
                  {
                    trailing: true,
                    leading: false,
                  },
                )}
              />
            </Form.Item>

            <PlusSquareFilled
              style={{ fontSize: 32, color: '#478D46' }}
              onClick={handleAddNewPermission}
            />
          </Space>
        </Col>
      </Row>
      {hasSelected ? (
        <div className={styles.selectedRowLayoutRole}>
          <Typography.Text style={{ paddingRight: 32 }}>
            Đã chọn:{' '}
            <Typography.Text style={{ fontWeight: 'bold' }}>
              {selectedRowKeys.length}
            </Typography.Text>
          </Typography.Text>
          <Space>
            <Button
              icon={<RollbackOutlined />}
              onClick={() => {
                setSelectedRowKeys([]);
              }}
            >
              Hủy
            </Button>
            <Button
              icon={<DeleteOutlined style={{ color: '#F5222D' }} />}
              style={{ color: '#F5222D' }}
              onClick={handleConfirmDeleteMultiple}
            >
              Xóa
            </Button>
          </Space>
        </div>
      ) : (
        <></>
      )}
      <Table
        dataSource={listAllRolePermission}
        columns={columns}
        rowKey={(item) => item.id}
        className={styles.permissionTableRole}
        onChange={handleTableChange}
        pagination={{
          ...pagination,
          // total: listAllRolePermission?.length,
          locale: {
            page: '',
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
          spinning: fetchReadRoleAndPerm.loading,
        }}
        rowSelection={rowSelection}
        locale={{
          triggerDesc: 'Chọn sắp xếp giảm dần',
          triggerAsc: 'Chọn sắp xếp tăng dần',
          cancelSort: 'Chọn hủy sắp xếp',
          emptyText: <Empty description="Không có dữ liệu" />,
        }}
      />
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
                    whitespace: true,
                    message: 'Vui lòng không để trống thông tin',
                  },
                  {
                    required: true,
                    message: 'Không được để trống thông tin này',
                  },
                  {
                    max: 30,
                    message: 'Tên nhóm tối đa 30 ký tự',
                  },
                  {
                    pattern: new RegExp(
                      '^[a-zA-Z_ÀÁÂÃÈÉÊẾÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêếìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ01234556789 ]+$',
                    ),
                    message: 'Vui lòng không nhập ký tự đặt biệt',
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
                  onChange={debounce(
                    (e) => {
                      setRoleCode(e.target.value);
                    },
                    500,
                    {
                      trailing: true,
                      leading: false,
                    },
                  )}
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
                  onChange={debounce(
                    (e) => {
                      setRoleDesc(e.target.value);
                    },
                    500,
                    {
                      trailing: true,
                      leading: false,
                    },
                  )}
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
            <Button
              type="primary"
              htmlType="submit"
              loading={fetchCreateRoleAndPermission.loading || fetchUpdateRoleAndPermission.loading}
              disabled={isDisable}
            >
              {isEditRole ? 'Cập nhập' : 'Tạo mới'}
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
export default PermissionRole;
