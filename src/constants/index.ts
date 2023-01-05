export const OPTIONS_PERMISSION_DB = [
  {
    label: 'Xem',
    value: 'dsbo__get',
  },
  {
    label: 'Tạo mới',
    value: 'dsbo__cre',
  },
  {
    label: 'Chỉnh sửa',
    value: 'dsbo__upd',
  },
  {
    label: 'Xóa',
    value: 'dsbo__del',
  },
  {
    label: 'Xuất bản',
    value: 'dsbo__exp',
  },
];

export const OPTIONS_PERMISSION_DB_VALUE = [
  'dsbo__get',
  'dsbo__cre',
  'dsbo__upd',
  'dsbo__del',
  'dsbo__exp',
];

export const OPTIONS_PERMISSION_IM = [
  {
    label: 'Xem',
    value: 'inma__get',
  },
  {
    label: 'Tạo mới',
    value: 'inma__cre',
  },
  {
    label: 'Xử lý',
    value: 'inma__upd',
  },
  {
    label: 'Xóa',
    value: 'inma__del',
  },
  {
    label: 'Xuất báo cáo',
    value: 'inma__exp',
  },
  {
    label: 'Thiết kế',
    value: 'inma__des',
  },
];

export const OPTIONS_PERMISSION_IM_VALUE = [
  'inma__get',
  'inma__cre',
  'inma__upd',
  'inma__del',
  'inma__exp',
  'inma__des',
];

export const OPTIONS_PERMISSION_EM = [
  {
    label: 'Xem',
    value: 'evma__get',
  },
  {
    label: 'Tạo mới',
    value: 'evma___cre',
  },
  {
    label: 'Xử lý',
    value: 'evma___upd',
  },
  {
    label: 'Xóa',
    value: 'evma___del',
  },
  {
    label: 'Xuất báo cáo',
    value: 'evma___exp',
  },
];

export const OPTIONS_PERMISSION_EM_VALUE = [
  'evma__get',
  'evma___cre',
  'evma___upd',
  'evma___del',
  'evma___exp',
];

export const OPTIONS_PERMISSION_CM = [
  {
    label: 'Xem',
    value: 'chma__get',
  },
  {
    label: 'Tạo mới',
    value: 'chma__cre',
  },
  {
    label: 'Xử lý',
    value: 'chma__upd',
  },
  {
    label: 'Xóa',
    value: 'chma__del',
  },
  {
    label: 'Xuất báo cáo',
    value: 'chma__exp',
  },
];

export const OPTIONS_PERMISSION_CM_VALUE = [
  'chma__get',
  'chma__cre',
  'chma__upd',
  'chma__del',
  'chma__exp',
];

export const OPTIONS_PERMISSION_RF = [
  {
    label: 'Xem',
    value: 'reff__get',
  },
  {
    label: 'Tạo mới',
    value: 'reff__cre',
  },
  {
    label: 'Xử lý',
    value: 'reff__upd',
  },
  {
    label: 'Xóa',
    value: 'reff__del',
  },
  {
    label: 'Xuất báo cáo',
    value: 'reff__exp',
  },
  {
    label: 'Thiết kế',
    value: 'reff__des',
  },
];

export const OPTIONS_PERMISSION_RF_VALUE = [
  'reff__get',
  'reff__cre',
  'reff__upd',
  'reff__del',
  'reff__exp',
  'reff__des',
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
        key: 'gest__get',
      },
      {
        title: 'Truy vấn',
        key: 'gest__qur',
      },
      {
        title: 'Xuất báo cáo',
        key: 'gest__exp',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_TKC_VALUE = ['gest__get', 'gest__qur', 'gest__exp'];

export const TREE_DATA_BGCT = [
  {
    title: 'Bàn giao ca trực',
    key: 'transfer_shift',
    children: [
      {
        title: 'Xem',
        key: 'trsf__get',
      },
      {
        title: 'Tạo mới',
        key: 'trsf__cre',
      },
      {
        title: 'Xử lý',
        key: 'trsf__upd',
      },
      {
        title: 'Xuất báo cáo',
        key: 'trsf__exp',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_BGCT_VALUE = [
  'trsf__get',
  'trsf__cre',
  'trsf__upd',
  'trsf__exp',
];

export const TREE_DATA_KHD = [
  {
    title: 'Kế hoạch đêm',
    key: 'night_shift',
    children: [
      {
        title: 'Xem',
        key: 'nisf__get',
      },
      {
        title: 'Tạo mới',
        key: 'nisf__cre',
      },
      {
        title: 'Xử lý',
        key: 'nisf__upd',
      },
      {
        title: 'Xuất báo cáo',
        key: 'nisf__exp',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_KHD_VALUE = [
  'nisf__get',
  'nisf__cre',
  'nisf__upd',
  'nisf__exp',
];

export const TREE_DATA_LSCG = [
  {
    title: 'Lịch sử cuộc gọi',
    key: 'call_history',
    children: [
      {
        title: 'Xem',
        key: 'cahi__get',
      },
      {
        title: 'Nghe ghi âm',
        key: 'cahi__reg',
      },
      {
        title: 'Tải ghi âm',
        key: 'cahi__red',
      },
      {
        title: 'Xuất báo cáo',
        key: 'cahi__exp',
      },
    ],
  },
];
export const OPTIONS_PERMISSION_TREE_DATA_LSCG_VALUE = [
  'cahi__get',
  'cahi__reg',
  'cahi__red',
  'cahi__exp',
];

export const TREE_DATA_CONTACT = [
  {
    title: 'Danh bạ',
    key: 'contact',
    children: [
      {
        title: 'Xem',
        key: 'cnta__get',
      },
      {
        title: 'Tạo mới',
        key: 'cnta__cre',
      },
      {
        title: 'Chỉnh sửa',
        key: 'cnta__upd',
      },
      {
        title: 'Xóa lịch sử',
        key: 'cnta__del',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_CONTACT_VALUE = [
  'cnta__get',
  'cnta__cre',
  'cnta__upd',
  'cnta__del',
];

export const TREE_DATA_TTCT = [
  {
    title: 'Thông tin ca trực',
    key: 'shift_info',
    children: [
      {
        title: 'Xem',
        key: 'sfif__get',
      },
      {
        title: 'Tạo mới',
        key: 'sfif__cre',
      },
      {
        title: 'Chỉnh sửa',
        key: 'sfif__upd',
      },
      {
        title: 'Xoá',
        key: 'sfif__del',
      },
      {
        title: 'Xuất báo cáo',
        key: 'sfif__exp',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_TTCT_VALUE = [
  'sfif__get',
  'sfif__cre',
  'sfif__upd',
  'sfif__del',
  'sfif__exp',
];

export const TREE_DATA_TTND = [
  {
    title: 'Thông tin người dùng',
    key: 'user_profile',
    children: [
      {
        title: 'Xem',
        key: 'uspf__get',
      },
      {
        title: 'Chỉnh sửa',
        key: 'uspf__upd',
      },
      {
        title: 'Xoá',
        key: 'uspf__del',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_TTND_VALUE = ['uspf__get', 'uspf__upd', 'uspf__del'];

export const TREE_DATA_NQ = [
  {
    title: 'Nhóm quyền',
    key: 'permission_group',
    children: [
      {
        title: 'Xem',
        key: 'pegr__get',
      },
      {
        title: 'Tạo mới',
        key: 'pegr__cre',
      },
      {
        title: 'Chỉnh sửa',
        key: 'pegr__upd',
      },
      {
        title: 'Xóa',
        key: 'pegr__del',
      },
    ],
  },
];

export const OPTIONS_PERMISSION_TREE_DATA_NQ_VALUE = [
  'pegr__get',
  'pegr__cre',
  'pegr__upd',
  'pegr__del',
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
    label: 'Miền Nam',
    value: 'mn',
  },
  {
    label: 'Miền Bắc',
    value: 'mb',
  },
];

export const OPTIONS_FILTER_NLV = [
  {
    label: 'Miền Nam',
    value: 'Miền Nam',
  },
  {
    label: 'Miền Bắc',
    value: 'Miền Bắc',
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
    label: 'Nội bộ',
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
  {
    label: 'Nhỡ trong hàng chờ',
    value: 7,
  },
  {
    label: 'Thất bại khác',
    value: 8,
  },
];
