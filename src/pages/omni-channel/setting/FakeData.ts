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

export const dataPermission: DataType[] = [
  {
    key: '1',
    stt: '1',
    thanhvien: 'Lâm Mỹ Huyền',
    sdt: '6996699669',
    team: 'Team 1',
    permission: 'Member',
    activity: '5 phút trước',
    lastEdit: '10/09/2022',
  },
  {
    key: '2',
    stt: '2',
    thanhvien: 'Lâm Mỹ Huyền',
    sdt: '6996699669',
    team: 'Team 1',
    permission: 'Member',
    activity: '5 phút trước',
    lastEdit: '10/09/2022',
  },
  {
    key: '3',
    stt: '3',
    thanhvien: 'Lâm Mỹ Huyền',
    sdt: '6996699669',
    team: 'Team 1',
    permission: 'Member',
    activity: '5 phút trước',
    lastEdit: '10/09/2022',
  },
  {
    key: '4',
    stt: '4',
    thanhvien: 'Lâm Mỹ Huyền',
    sdt: '6996699669',
    team: 'Team 1',
    permission: 'Member',
    activity: '5 phút trước',
    lastEdit: '10/09/2022',
  },
  {
    key: '5',
    stt: '5',
    thanhvien: 'Lâm Mỹ Huyền',
    sdt: '6996699669',
    team: 'Team 1',
    permission: 'Member',
    activity: '5 phút trước',
    lastEdit: '10/09/2022',
  },
  {
    key: '6',
    stt: '6',
    thanhvien: 'Lâm Mỹ Huyền',
    sdt: '6996699669',
    team: 'Team 1',
    permission: 'Member',
    activity: '5 phút trước',
    lastEdit: '10/09/2022',
  },
  {
    key: '7',
    stt: '7',
    thanhvien: 'Lâm Mỹ Huyền',
    sdt: '6996699669',
    team: 'Team 1',
    permission: 'Member',
    activity: '5 phút trước',
    lastEdit: '10/09/2022',
  },
];

export const dataPermissionTable: DataTypePermissionTable[] = [
  {
    key: '1',
    module: 'Dashboard',
  },
  {
    key: '2',
    module: 'Incident Management',
  },
  {
    key: '3',
    module: 'Event Management',
  },
  {
    key: '4',
    module: 'Change Management',
  },
  {
    key: '5',
    module: 'Request Fulfillment',
  },
  {
    key: '6',
    module: 'Thiết kế',
  },
  {
    key: '7',
    module: 'Báo cáo',
  },
  {
    key: '8',
    module: 'Cài đặt',
  },
];
