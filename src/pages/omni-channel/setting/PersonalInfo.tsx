import { FormInstance, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useModel, useRequest } from 'umi';

import api from '@/api';
import InfoUser, { FormProps } from '@/components/Organisms/InfoUser';
import { requeGetUserInfoProps } from '@/services/user_info';

import { requestCheckPhoneContact } from '../report/services';
import {
  requestCreateNewTeam,
  requestDeleteTeamPermission,
  requestEditUserInfo,
  requestTeamPermissionData,
} from './services';

interface TeamPermission {
  name: string;
  id: string;
}

const PersonalInfo: React.FC = () => {
  const { initialState, setInitialState } = useModel('@@initialState');
  const [avatar, setAvatar] = useState(initialState?.currentUser?.avatar);
  const token = window.localStorage.getItem('access_token');
  const [listTeamPermission, setListTeamPermission] = useState<TeamPermission[]>([]);

  const requestEditUserInfoSubmit = async (data: FormProps) => {
    const res = await requestEditUserInfo(data);
    return res;
  };

  const checkPhoneContact = useRequest(
    async (data, form) => {
      const result: { success: boolean; error_code: number } = await requestCheckPhoneContact(
        token ? token : '',
        data,
      );
      if (result.error_code === 4000201) {
        form.setFields([
          {
            name: 'phone_number',
            errors: ['Số điện thoại đã tồn tại'],
          },
        ]);
        return;
      }
    },
    {
      manual: true,
    },
  );

  const handleOnFinishEditUser = (values: FormProps, setIsEditForm: any, setIsDisableSave: any) => {
    const res = requestEditUserInfoSubmit(values);

    res.then(async (result: requeGetUserInfoProps) => {
      if (result.success) {
        await setInitialState((s) => ({
          ...s,
          currentUser: result.data[0],
        }));
        setIsEditForm(false);
        setIsDisableSave(true);
        message.success('Cập nhập thành công');
      } else {
        message.error('Lưu không thành công, vui lòng thử lại');
        return;
      }
    });
  };

  const arrListTeam = listTeamPermission?.map((item) => item.name);

  const fetchTeamPermissionData = async () => {
    const resTeam = await requestTeamPermissionData();
    if (resTeam.success === true) {
      setListTeamPermission(resTeam.data);
    }
  };

  useEffect(() => {
    fetchTeamPermissionData();
  }, []);

  const handleCreateNewTeamPermission = async (newTeamValue: string, form: FormInstance) => {
    const resNewTeam = await requestCreateNewTeam(newTeamValue);
    if (resNewTeam.success === true) {
      message.success('Cập nhật team mới thành công!');
      form.setFieldsValue({ newTeamValue: undefined });
    } else if (resNewTeam.error_code === 4030102) {
      message.error('Bạn không có quyền cập nhật thông tin!');
    } else {
      message.error('Cập nhật team thất bại!');
    }
  };

  const handleDeleteTeamPermission = async (team_id: string) => {
    const resDelTeam = await requestDeleteTeamPermission(team_id);
    if (resDelTeam.success === true) {
      message.success('Xóa team thành công!');
    } else if (resDelTeam.error_code === 4030102) {
      message.error('Bạn không có quyền xóa thông tin này!');
    } else {
      message.error('Xóa team thất bại!');
    }
  };

  const handleClickDeleteTeam = async (id: string) => {
    await handleDeleteTeamPermission(id);
    await fetchTeamPermissionData();
  };

  const handleSubmitNewTeam = async (value: string, form: FormInstance) => {
    if (arrListTeam.includes(value)) {
      message.error('Team đã tồn tại!');
    } else if (value === undefined || value === '') {
      message.error('Vui lòng nhập Team mới!');
    } else {
      await handleCreateNewTeamPermission(value, form);
      await fetchTeamPermissionData();
    }
  };

  return (
    <InfoUser
      editForm={false}
      avatar={`${api.UMI_API_BASE_URL}/user-service/api/user/get_user_avatar?file_name=${avatar}`}
      currentUser={initialState?.currentUser || {}}
      listTeamPermission={listTeamPermission}
      handleSaveForm={handleOnFinishEditUser}
      handleCheckPhone={(value, form) => {
        checkPhoneContact.run(value, form);
      }}
      handleNewTeam={handleSubmitNewTeam}
      handleDeleteTeam={handleClickDeleteTeam}
      handleUploadAvatar={async (e) => {
        setAvatar(e?.response?.data[0]?.url);
      }}
    />
  );
};
export default PersonalInfo;
