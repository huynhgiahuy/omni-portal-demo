export const OPTIONS_PERMISSION_DB = [
  {
    label: 'Tạo mới',
    value: 'Tạo mới',
  },
  {
    label: 'Chỉnh sửa',
    value: 'Chỉnh sửa',
  },
  {
    label: 'Xóa',
    value: 'Xóa',
  },
  {
    label: 'Xuất bản',
    value: 'Xuất bản',
  },
];

export const OPTIONS_PERMISSION_DB_VALUE = ['Tạo mới', 'Chỉnh sửa', 'Xóa', 'Xuất bản'];

export const OPTIONS_PERMISSION_IM = [
  {
    label: 'Tạo mới',
    value: 'Tạo mới',
  },
  {
    label: 'Cập nhật',
    value: 'Cập nhật',
  },
  {
    label: 'Xóa',
    value: 'Xóa',
  },
  {
    label: 'Xuất báo cáo',
    value: 'Xuất báo cáo',
  },
  {
    label: 'Design',
    value: 'Design',
  },
];

export const OPTIONS_PERMISSION_IM_VALUE = ['Tạo mới', 'Cập nhật', 'Xóa', 'Xuất báo cáo', 'Design'];

export const OPTIONS_PERMISSION_EM = [
  {
    label: 'Tạo mới',
    value: 'Tạo mới',
  },
  {
    label: 'Cập nhật',
    value: 'Cập nhật',
  },
  {
    label: 'Xóa',
    value: 'Xóa',
  },
  {
    label: 'Xuất báo cáo',
    value: 'Xuất báo cáo',
  },
];

export const OPTIONS_PERMISSION_EM_VALUE = ['Tạo mới', 'Cập nhật', 'Xóa', 'Xuất báo cáo'];

export const OPTIONS_PERMISSION_CM = [
  {
    label: 'Tạo mới',
    value: 'Tạo mới',
  },
  {
    label: 'Cập nhật',
    value: 'Cập nhật',
  },
  {
    label: 'Xóa',
    value: 'Xóa',
  },
  {
    label: 'Xuất báo cáo',
    value: 'Xuất báo cáo',
  },
];

export const OPTIONS_PERMISSION_CM_VALUE = ['Tạo mới', 'Cập nhật', 'Xóa', 'Xuất báo cáo'];

export const OPTIONS_PERMISSION_RF = [
  {
    label: 'Tạo mới',
    value: 'Tạo mới',
  },
  {
    label: 'Cập nhật',
    value: 'Cập nhật',
  },
  {
    label: 'Xóa',
    value: 'Xóa',
  },
  {
    label: 'Xuất báo cáo',
    value: 'Xuất báo cáo',
  },
  {
    label: 'Design',
    value: 'Design',
  },
];

export const OPTIONS_PERMISSION_RF_VALUE = ['Tạo mới', 'Cập nhật', 'Xóa', 'Xuất báo cáo', 'Design'];

export const OPTIONS_PERMISSION_DESIGN = [
  {
    label: 'BPMN',
    value: 'BPMN',
  },
  {
    label: 'Action Flow',
    value: 'Action Flow',
  },
  {
    label: 'Action Commend',
    value: 'Action Commend',
  },
];

export const OPTIONS_PERMISSION_DESIGN_VALUE = ['BPMN', 'Action Flow', 'Action Commend'];

export const OPTIONS_PERMISSION_REPORT = [
  {
    label: 'Thống kê chung',
    value: 'Thống kê chung',
  },
  {
    label: 'Bàn giao ca trực',
    value: 'Bàn giao ca trực',
  },
  {
    label: 'Kế hoạch đêm',
    value: 'Kế hoạch đêm',
  },
  {
    label: 'Lịch sử cuộc gọi',
    value: 'Lịch sử cuộc gọi',
  },
  {
    label: 'Truy vấn',
    value: 'Truy vấn',
  },
  {
    label: 'Xuất báo cáo',
    value: 'Xuất báo cáo',
  },
  {
    label: 'Nghe ghi âm',
    value: 'Nghe ghi âm',
  },
  {
    label: 'Xóa lịch sử',
    value: 'Xóa lịch sử',
  },
  {
    label: 'Phân tích',
    value: 'Phân tích',
  },
];

export const OPTIONS_PERMISSION_SETTING = [
  {
    label: 'Thông tin cá nhân',
    value: 'Thông tin cá nhân',
  },
  {
    label: 'Thông tin ca trực',
    value: 'Thông tin ca trực',
  },
  {
    label: 'Nhóm quyền',
    value: 'Nhóm quyền',
  },
];
///
export const TREE_DATA_TKC = [
  {
    title: 'Thống kê chung',
    key: 'general_statistic',
    children: [
      {
        title: 'Truy vấn',
        key: 'general_statistic_query',
      },
      {
        title: 'Xuất báo cáo',
        key: 'general_statistic_export',
      },
    ],
  },
];

export const TREE_DATA_BGCT = [
  {
    title: 'Bàn giao ca trực',
    key: 'shift_transfer',
  },
];

export const TREE_DATA_KHD = [
  {
    title: 'Kế hoạch đêm',
    key: 'shift_night',
  },
];

export const TREE_DATA_LSCG = [
  {
    title: 'Lịch sử cuộc gọi',
    key: 'history_call',
    children: [
      {
        title: 'Nghe ghi âm',
        key: 'history_call_record',
      },
      {
        title: 'Xóa lịch sử',
        key: 'history_call_delete',
      },
      {
        title: 'Xuất báo cáo',
        key: 'history_call_export',
      },
      {
        title: 'Phân tích',
        key: 'history_call_analytic',
      },
    ],
  },
];

export const TREE_DATA_TTCN = [
  {
    title: 'Thông tin cá nhân',
    key: 'user_info',
    children: [
      {
        title: 'Chỉnh sửa',
        key: 'user_info_edit',
      },
    ],
  },
];

export const TREE_DATA_TTCT = [
  {
    title: 'Thông tin ca trực',
    key: 'shift_info',
    children: [
      {
        title: 'Tạo mới',
        key: 'shift_info_create',
      },
      {
        title: 'Chỉnh sửa',
        key: 'shift_info_edit',
      },
    ],
  },
];

export const TREE_DATA_NQ = [
  {
    title: 'Nhóm quyền',
    key: 'Nhóm quyền',
    children: [
      {
        title: 'Tạo mới',
        key: 'group_permission_add',
      },
      {
        title: 'Chỉnh sửa',
        key: 'group_permission_edit',
      },
      {
        title: 'Xóa',
        key: 'group_permission_delete',
      },
    ],
  },
];

////
export const OPTIONS_PERMISSION_TKC = [
  {
    label: 'Truy vấn',
    value: 'Truy vấn',
  },
  {
    label: 'Xuất báo cáo',
    value: 'Xuất báo cáo',
  },
];

export const OPTIONS_PERMISSION_TKC_VALUE = ['Truy vấn', 'Xuất báo cáo'];

export const OPTIONS_PERMISSION_BGCT = [
  {
    label: 'Bàn giao ca trực',
    value: 'Bàn giao ca trực',
  },
];

export const OPTIONS_PERMISSION_BGCT_VALUE = ['Bàn giao ca trực'];

export const OPTIONS_PERMISSION_KHD = [
  {
    label: 'Kế hoạch đêm',
    value: 'Kế hoạch đêm',
  },
];

export const OPTIONS_PERMISSION_KHD_VALUE = ['Kế hoạch đêm'];

export const OPTIONS_PERMISSION_LSCG = [
  {
    label: 'Nghe ghi âm',
    value: 'Nghe ghi âm',
  },
  {
    label: 'Xóa lịch sử',
    value: 'Xóa lịch sử',
  },
  {
    label: 'Xuất báo cáo',
    value: 'Xuất báo cáo',
  },
  {
    label: 'Phân tích',
    value: 'Phân tích',
  },
];

export const OPTIONS_PERMISSION_LSCG_VALUE = [
  'Nghe ghi âm',
  'Xóa lịch sử',
  'Xuất báo cáo',
  'Phân tích',
];

export const OPTIONS_PERMISSION_TEST = [
  {
    label: 'Thống kê chung',
    value: 'Thống kê chung',
  },
  {
    label: 'Truy vấn',
    value: 'Truy vấn',
  },
  {
    label: 'Xuất báo cáo',
    value: 'Xuất báo cáo',
  },
  {
    label: 'Bàn giao ca trực',
    value: 'Bàn giao ca trực',
  },
  {
    label: 'Kế hoạch đêm',
    value: 'Kế hoạch đêm',
  },
  {
    label: 'Nghe ghi âm',
    value: 'Nghe ghi âm',
  },
  {
    label: 'Xóa lịch sử',
    value: 'Xóa lịch sử',
  },
  {
    label: 'Xuất báo cáo',
    value: 'Xuất báo cáo',
  },
  {
    label: 'Phân tích',
    value: 'Phân tích',
  },
  {
    label: 'Lịch sử cuộc gọi',
    value: 'Lịch sử cuộc gọi',
  },
];

export const OPTIONS_PERMISSION_TEST_VALUE = [
  'Thống kê chung',
  'Truy vấn',
  'Xuất báo cáo',
  'Bàn giao ca trực',
  'Kế hoạch đêm',
  'Lịch sử cuộc gọi',
  'Nghe ghi âm',
  'Xóa lịch sử',
  'Xuất báo cáo',
  'Phân tích',
];

/// User Role URL
export const USER_ROLE_URL = 'http://172.27.228.201:9001';