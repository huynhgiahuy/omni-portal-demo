export const OPTIONS_PERMISSION_DB = [
  {
    label: 'Xem',
    value: 'dashboard_read',
  },
  {
    label: 'Tạo mới',
    value: 'dashboard_create',
  },
  {
    label: 'Chỉnh sửa',
    value: 'dashboard_update',
  },
  {
    label: 'Xóa',
    value: 'dashboard_delete',
  },
  {
    label: 'Xuất bản',
    value: 'dashboard_export',
  },
];

export const OPTIONS_PERMISSION_DB_VALUE = [
  'dashboard_read',
  'dashboard_create',
  'dashboard_update',
  'dashboard_delete',
  'dashboard_export',
];

export const OPTIONS_PERMISSION_IM = [
  {
    label: 'Xem',
    value: 'incident_management_read',
  },
  {
    label: 'Tạo mới',
    value: 'incident_management_create',
  },
  {
    label: 'Xử lý',
    value: 'incident_management_process',
  },
  {
    label: 'Xóa',
    value: 'incident_management_delete',
  },
  {
    label: 'Xuất báo cáo',
    value: 'incident_management_export',
  },
  {
    label: 'Thiết kế',
    value: 'incident_management_design',
  },
];

export const OPTIONS_PERMISSION_IM_VALUE = [
  'incident_management_read',
  'incident_management_create',
  'incident_management_process',
  'incident_management_delete',
  'incident_management_export',
  'incident_management_design',
];

export const OPTIONS_PERMISSION_EM = [
  {
    label: 'Xem',
    value: 'event_management_read',
  },
  {
    label: 'Tạo mới',
    value: 'event_management_create',
  },
  {
    label: 'Xử lý',
    value: 'event_management_process',
  },
  {
    label: 'Xóa',
    value: 'event_management_delete',
  },
  {
    label: 'Xuất báo cáo',
    value: 'event_management_export',
  },
];

export const OPTIONS_PERMISSION_EM_VALUE = [
  'event_management_read',
  'event_management_create',
  'event_management_process',
  'event_management_delete',
  'event_management_export',
];

export const OPTIONS_PERMISSION_CM = [
  {
    label: 'Xem',
    value: 'change_management_read',
  },
  {
    label: 'Tạo mới',
    value: 'change_management_create',
  },
  {
    label: 'Xử lý',
    value: 'change_management_process',
  },
  {
    label: 'Xóa',
    value: 'change_management_delete',
  },
  {
    label: 'Xuất báo cáo',
    value: 'change_management_export',
  },
];

export const OPTIONS_PERMISSION_CM_VALUE = [
  'change_management_read',
  'change_management_create',
  'change_management_process',
  'change_management_delete',
  'change_management_export',
];

export const OPTIONS_PERMISSION_RF = [
  {
    label: 'Xem',
    value: 'request_fufillment_read',
  },
  {
    label: 'Tạo mới',
    value: 'request_fufillment_create',
  },
  {
    label: 'Xử lý',
    value: 'request_fufillment_process',
  },
  {
    label: 'Xóa',
    value: 'request_fufillment_delete',
  },
  {
    label: 'Xuất báo cáo',
    value: 'request_fufillment_export',
  },
  {
    label: 'Thiết kế',
    value: 'request_fufillment_design',
  },
];

export const OPTIONS_PERMISSION_RF_VALUE = [
  'request_fufillment_read',
  'request_fufillment_create',
  'request_fufillment_process',
  'request_fufillment_delete',
  'request_fufillment_export',
  'request_fufillment_design',
];

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
        title: 'Xem',
        key: 'general_statistic_read',
      },
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

export const OPTIONS_PERMISSION_TREE_DATA_TKC_VALUE = [
  'general_statistic_read',
  'general_statistic_query',
  'general_statistic_export',
];

export const TREE_DATA_BGCT = [
  {
    title: 'Bàn giao ca trực',
    key: 'transfer_shift',
    children: [
      {
        title: 'Xem',
        key: 'transfer_shift_read',
      },
      {
        title: 'Tạo mới',
        key: 'transfer_shift_create',
      },
      {
        title: 'Xử lý',
        key: 'transfer_shift_process',
      },
      {
        title: 'Xuất báo cáo',
        key: 'transfer_shift_export',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_BGCT_VALUE = [
  'transfer_shift_read',
  'transfer_shift_create',
  'transfer_shift_process',
  'transfer_shift_export',
];

export const TREE_DATA_KHD = [
  {
    title: 'Kế hoạch đêm',
    key: 'night_shift',
    children: [
      {
        title: 'Xem',
        key: 'night_shift_read',
      },
      {
        title: 'Tạo mới',
        key: 'night_shift_create',
      },
      {
        title: 'Xử lý',
        key: 'night_shift_process',
      },
      {
        title: 'Xuất báo cáo',
        key: 'night_shift_export',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_KHD_VALUE = [
  'night_shift_read',
  'night_shift_create',
  'night_shift_process',
  'night_shift_export',
];

export const TREE_DATA_LSCG = [
  {
    title: 'Lịch sử cuộc gọi',
    key: 'call_history',
    children: [
      {
        title: 'Xem',
        key: 'call_history_read',
      },
      {
        title: 'Nghe ghi âm',
        key: 'call_history_record',
      },
      {
        title: 'Xóa lịch sử',
        key: 'call_history_delete',
      },
      {
        title: 'Xuất báo cáo',
        key: 'call_history_export',
      },
      {
        title: 'Phân tích',
        key: 'call_history_anlyze',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_LSCG_VALUE = [
  'call_history_read',
  'call_history_record',
  'call_history_delete',
  'call_history_export',
  'call_history_anlyze',
];

export const TREE_DATA_TTCT = [
  {
    title: 'Thông tin ca trực',
    key: 'shift_info',
    children: [
      {
        title: 'Xem',
        key: 'shift_info_read',
      },
      {
        title: 'Tạo mới',
        key: 'shift_info_create',
      },
      {
        title: 'Chỉnh sửa',
        key: 'shift_info_update',
      },
      {
        title: 'Xoá',
        key: 'shift_info_delete',
      },
      {
        title: 'Xuất báo cáo',
        key: 'shift_info_export',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_TTCT_VALUE = [
  'shift_info_read',
  'shift_info_create',
  'shift_info_update',
  'shift_info_delete',
  'shift_info_export',
];

export const TREE_DATA_TTCN = [
  {
    title: 'Thông tin cá nhân',
    key: 'personal_info',
    children: [
      {
        title: 'Xem',
        key: 'personal_info_read',
      },
      {
        title: 'Chỉnh sửa',
        key: 'personal_info_update',
      },
      {
        title: 'Xoá',
        key: 'personal_info_delete',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_TTCN_VALUE = [
  'personal_info_read',
  'personal_info_update',
  'personal_info_delete',
];

export const TREE_DATA_TTND = [
  {
    title: 'Thông tin người dùng',
    key: 'user_profile',
    children: [
      {
        title: 'Xem',
        key: 'user_profile_read',
      },
      {
        title: 'Chỉnh sửa',
        key: 'user_profile_update',
      },
      {
        title: 'Xoá',
        key: 'user_profile_delete',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_TTND_VALUE = [
  'user_profile_read',
  'user_profile_update',
  'user_profile_delete',
];

export const TREE_DATA_NQ = [
  {
    title: 'Nhóm quyền',
    key: 'permission_group',
    children: [
      {
        title: 'Xem',
        key: 'permission_group_read',
      },
      {
        title: 'Tạo mới',
        key: 'permission_group_create',
      },
      {
        title: 'Chỉnh sửa',
        key: 'permission_group_update',
      },
      {
        title: 'Xóa',
        key: 'permission_group_delete',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_NQ_VALUE = [
  'permission_group_read',
  'permission_group_create',
  'permission_group_update',
  'permission_group_delete',
];

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

export const OPTIONS_POSITION = [
  {
    label: 'Cán bộ Giám sát',
    value: 'cbgs',
  },
  {
    label: 'Cán bộ HTKT',
    value: 'cbhtkt',
  },
  {
    label: 'L2',
    value: 'l2'
  },
  {
    label: 'Trưởng ca',
    value: 'tc'
  },
  {
    label: 'CBQLP',
    value: 'cbqlp'
  },
  {
    label: 'Dự án',
    value: 'da'
  },
];
