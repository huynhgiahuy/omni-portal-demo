export const OPTIONS_PERMISSION_DB = [
  {
    label: 'Xem',
    value: 'db__view_dashboard',
  },
  {
    label: 'Tạo mới',
    value: 'db__add_dashboard',
  },
  {
    label: 'Chỉnh sửa',
    value: 'db__change_dashboard',
  },
  {
    label: 'Xóa',
    value: 'db__delete_dashboard',
  },
  {
    label: 'Xuất bản',
    value: 'db__export_dashboard',
  },
];

export const OPTIONS_PERMISSION_DB_VALUE = [
  'db__view_dashboard',
  'db__add_dashboard',
  'db__change_dashboard',
  'db__delete_dashboard',
  'db__export_dashboard',
];

export const OPTIONS_PERMISSION_IM = [
  {
    label: 'Xem',
    value: 'im__view_incident',
  },
  {
    label: 'Tạo mới',
    value: 'im__add_incident',
  },
  {
    label: 'Xử lý',
    value: 'im__change_incident',
  },
  {
    label: 'Xóa',
    value: 'im__delete_incident',
  },
  {
    label: 'Xuất báo cáo',
    value: 'im__export_incident',
  },
  {
    label: 'Thiết kế',
    value: 'im__design_incident',
  },
];

export const OPTIONS_PERMISSION_IM_VALUE = [
  'im__view_incident',
  'im__add_incident',
  'im__change_incident',
  'im__delete_incident',
  'im__export_incident',
  'im__design_incident',
];

export const OPTIONS_PERMISSION_EM = [
  {
    label: 'Xem',
    value: 'em__view_event',
  },
  {
    label: 'Tạo mới',
    value: 'em__add_event',
  },
  {
    label: 'Xử lý',
    value: 'em___change_event',
  },
  {
    label: 'Xóa',
    value: 'em___delete_event',
  },
  {
    label: 'Xuất báo cáo',
    value: 'em___export_event',
  },
];

export const OPTIONS_PERMISSION_EM_VALUE = [
  'em__view_event',
  'em__add_event',
  'em___change_event',
  'em___delete_event',
  'em___export_event',
];

export const OPTIONS_PERMISSION_CM = [
  {
    label: 'Xem',
    value: 'cm__view_change',
  },
  {
    label: 'Tạo mới',
    value: 'cm__add_change',
  },
  {
    label: 'Xử lý',
    value: 'cm__change_change',
  },
  {
    label: 'Xóa',
    value: 'cm__delete_change',
  },
  {
    label: 'Xuất báo cáo',
    value: 'cm__export_change',
  },
];

export const OPTIONS_PERMISSION_CM_VALUE = [
  'cm__view_change',
  'cm__add_change',
  'cm__change_change',
  'cm__delete_change',
  'cm__export_change',
];

export const OPTIONS_PERMISSION_RF = [
  {
    label: 'Xem',
    value: 'rf__view_request',
  },
  {
    label: 'Tạo mới',
    value: 'rf__add_request',
  },
  {
    label: 'Xử lý',
    value: 'rf__change_request',
  },
  {
    label: 'Xóa',
    value: 'rf__delete_request',
  },
  {
    label: 'Xuất báo cáo',
    value: 'rf__export_request',
  },
  {
    label: 'Thiết kế',
    value: 'rf_design_request',
  },
];

export const OPTIONS_PERMISSION_RF_VALUE = [
  'rf__view_request',
  'rf__add_request',
  'rf__change_request',
  'rf__delete_request',
  'rf__export_request',
  'rf_design_request',
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

export const TREE_DATA_TKC = [
  {
    title: 'Thống kê chung',
    key: 'general_statistic',
    children: [
      {
        title: 'Xem',
        key: 'gs__view_statistic',
      },
      {
        title: 'Truy vấn',
        key: 'gs__query_statistic',
      },
      {
        title: 'Xuất báo cáo',
        key: 'gs__export_statistic',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_TKC_VALUE = [
  'gs__view_statistic',
  'gs__query_statistic',
  'gs__export_statistic',
];

export const TREE_DATA_BGCT = [
  {
    title: 'Bàn giao ca trực',
    key: 'transfer_shift',
    children: [
      {
        title: 'Xem',
        key: 'ts__view_shift',
      },
      {
        title: 'Tạo mới',
        key: 'ts__add_shift',
      },
      {
        title: 'Xử lý',
        key: 'ts__change_shift',
      },
      {
        title: 'Xuất báo cáo',
        key: 'ts__export_shift',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_BGCT_VALUE = [
  'ts__view_shift',
  'ts__add_shift',
  'ts__change_shift',
  'ts__export_shift',
];

export const TREE_DATA_KHD = [
  {
    title: 'Kế hoạch đêm',
    key: 'night_shift',
    children: [
      {
        title: 'Xem',
        key: 'ns__view_shift',
      },
      {
        title: 'Tạo mới',
        key: 'ns__add_shift',
      },
      {
        title: 'Xử lý',
        key: 'ns__handle_shift',
      },
      {
        title: 'Xuất báo cáo',
        key: 'ns__export_shift',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_KHD_VALUE = [
  'ns__view_shift',
  'ns__add_shift',
  'ns__handle_shift',
  'ns__export_shift',
];

export const TREE_DATA_LSCG = [
  {
    title: 'Lịch sử cuộc gọi',
    key: 'call_history',
    children: [
      {
        title: 'Xem',
        key: 'ch__view_history',
      },
      {
        title: 'Nghe ghi âm',
        key: 'ch__listen_record',
      },
      {
        title: 'Tải ghi âm',
        key: 'ch__download_record',
      },
      {
        title: 'Xuất báo cáo',
        key: 'ch__export_history',
      },
    ],
  },
];
export const OPTIONS_PERMISSION_TREE_DATA_LSCG_VALUE = [
  'ch__view_history',
  'ch__listen_record',
  'ch__download_record',
  'ch__export_history',
];

export const TREE_DATA_CONTACT = [
  {
    title: 'Danh bạ',
    key: 'contact',
    children: [
      {
        title: 'Xem',
        key: 'ct__view_contact',
      },
      {
        title: 'Tạo mới',
        key: 'ct__add_contact',
      },
      {
        title: 'Chỉnh sửa',
        key: 'ct__change_contact',
      },
      {
        title: 'Xóa lịch sử',
        key: 'ct__delete_contact',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_CONTACT_VALUE = [
  'ct__view_contact',
  'ct__add_contact',
  'ct__change_contact',
  'ct__delete_contact',
];

export const TREE_DATA_TTCT = [
  {
    title: 'Thông tin ca trực',
    key: 'shift_info',
    children: [
      {
        title: 'Xem',
        key: 'si__view_shift',
      },
      {
        title: 'Tạo mới',
        key: 'si__add_shift',
      },
      {
        title: 'Chỉnh sửa',
        key: 'si__change_shift',
      },
      {
        title: 'Xoá',
        key: 'si__delete_shift',
      },
      {
        title: 'Xuất báo cáo',
        key: 'si__export_shift',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_TTCT_VALUE = [
  'si__view_shift',
  'si__add_shift',
  'si__change_shift',
  'si__delete_shift',
  'si__export_shift',
];

export const TREE_DATA_TTND = [
  {
    title: 'Thông tin người dùng',
    key: 'user_profile',
    children: [
      {
        title: 'Xem',
        key: 'up__view_profile',
      },
      {
        title: 'Chỉnh sửa',
        key: 'up__change_profile',
      },
      {
        title: 'Xoá',
        key: 'up__delete_profile',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_TTND_VALUE = [
  'up__view_profile',
  'up__change_profile',
  'up__delete_profile',
];

export const TREE_DATA_NQ = [
  {
    title: 'Nhóm quyền',
    key: 'permission_group',
    children: [
      {
        title: 'Xem',
        key: 'pg__view_permission',
      },
      {
        title: 'Tạo mới',
        key: 'pg__add_permission',
      },
      {
        title: 'Chỉnh sửa',
        key: 'pg__change_permission',
      },
      {
        title: 'Xóa',
        key: 'pg__delete_permission',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_NQ_VALUE = [
  'pg__view_permission',
  'pg__add_permission',
  'pg__change_permission',
  'pg__delete_permission',
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
    value: 'l2',
  },
  {
    label: 'Trưởng ca',
    value: 'tc',
  },
  {
    label: 'CBQLP',
    value: 'cbqlp',
  },
  {
    label: 'Dự án',
    value: 'da',
  },
];

export const OPTIONS_WORK_ADDRESS = [
  {
    label: 'Miền Bắc',
    value: 'mb',
  },
  {
    label: 'Miền Nam',
    value: 'mn',
  },
];

export const OPTIONS_FILTER_NLV = [
  {
    label: 'Miền Bắc',
    value: 'Miền Bắc',
  },
  {
    label: 'Miền Nam',
    value: 'Miền Nam',
  },
];

export const OPTIONS_FILTER_NLV_VALUE = ['Miền Nam', 'Miền Bắc'];

export const OPTIONS_FILTER_STATUS = [
  {
    label: 'Sẵn sàng',
    value: 1,
  },
  {
    label: 'Vắng mặt',
    value: 2,
  },
  {
    label: 'Không làm phiền',
    value: 3,
  },
  {
    label: 'Không hoạt động',
    value: 4,
  },
  {
    label: 'Đang offline',
    value: 5,
  },
];

export const OPTIONS_FILTER_STATUS_VALUE = [1, 2, 3, 4, 5];

export const OPTIONS_FILTER_CALL_DIRECTION = [
  {
    label: 'Gọi vào',
    value: 'inbound',
  },
  {
    label: 'Gọi ra',
    value: 'outbound',
  },
  {
    label: 'Gọi nội bộ',
    value: 'local',
  },
];

export const OPTIONS_FILTER_CALL_DIRECTION_VALUE = ['inbound', 'outbound', 'local'];

export const OPTIONS_FILTER_CALL_RESULT = [
  {
    label: 'Thành công',
    value: 1,
  },
  {
    label: 'Thất bại',
    value: 2,
  },
  {
    label: 'Bận',
    value: 3,
  },
  {
    label: 'Hủy bỏ',
    value: 4,
  },
  {
    label: 'Không trả lời',
    value: 5,
  },
  {
    label: 'Từ chối',
    value: 6,
  },
  {
    label: 'Nhỡ trong hàng chờ',
    value: 7,
  },
  {
    label: 'Thất bại khác',
    value: 8,
  },
];

export const OPTIONS_FILTER_CALL_RESULT_VALUE = [1, 2, 3, 4, 5, 6, 7, 8];

export const OPTIONS_FILTER_HISTORY_CALL_DIRECTION = [
  {
    label: 'Gọi vào',
    value: 'inbound',
  },
  {
    label: 'Gọi ra',
    value: 'outbound',
  },
  {
    label: 'Gọi nội bộ',
    value: 'local',
  },
];

export const OPTIONS_FILTER_HISTORY_CALL_RESULT = [
  {
    label: 'Thành công',
    value: 1,
  },
  {
    label: 'Thất bại',
    value: 2,
  },
  {
    label: 'Bận',
    value: 3,
  },
  {
    label: 'Hủy bỏ',
    value: 4,
  },
  {
    label: 'Không trả lời',
    value: 5,
  },
  {
    label: 'Từ chối',
    value: 6,
  },
];
