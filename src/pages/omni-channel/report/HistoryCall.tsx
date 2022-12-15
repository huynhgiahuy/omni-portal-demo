import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Button,
  Typography,
  Input,
  Tag,
  Form,
  Select,
  DatePicker,
  message,
  Spin,
  Modal,
  Timeline,
  Tooltip,
  Checkbox,
  Popover,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlayCircleFilled,
  SearchOutlined,
  FormOutlined,
  FilterFilled,
  FilterOutlined,
} from '@ant-design/icons';
import DownloadIcon from '../../../../public/cloud_download.svg';
import ExportIcon from '@/components/ExportIcon/ExportIcon';
import styles from '../report/style.less';
import { requestHistoryCallData, requestGetDetailCallNote } from './services';
import { useRequest } from 'umi';
import { debounce } from 'lodash';
import CallInboundIcon from '@/components/PhoneCallType/CallInboundIcon';
import CallInterval from '@/components/PhoneCallType/CallInterval';
import CallOutboundIcon from '@/components/PhoneCallType/CallOutboundIcon';
import moment from 'moment';
import fileDownload from 'js-file-download';
import axios from 'axios';
import api from '@/api';
import NoFoundPage from '@/pages/404';
import {
  OPTIONS_FILTER_CALL_DIRECTION,
  OPTIONS_FILTER_CALL_DIRECTION_VALUE,
  OPTIONS_FILTER_CALL_RESULT,
  OPTIONS_FILTER_CALL_RESULT_VALUE,
} from '@/constants';

const { RangePicker } = DatePicker;

interface PaginationProps {
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  pageSizeOptions: string[];
}
interface DataLSCGType {
  _id: string;
  call_direction?: string;
  sip_from_user?: string;
  caller_destination?: string;
  start_epoch?: string;
  billsec?: number;
  hangup_cause?: string;
  record_path?: string;
  record_name?: string;
  note?: any[];
  caller_name?: string;
  receiver_name?: string;
  result?: string;
}

interface notesProps {
  call_direction: string;
  content: string;
  create_at: number;
  personnel: string;
}

interface listNotesProps {
  call_id: string;
  id: string;
  note: notesProps[];
  phone_number: string;
}

const HistoryCall: React.FC = () => {
  const [isView, setIsView] = useState<string>();
  const [listNote, setListNote] = useState<listNotesProps[]>([]);

  const [valueFromDateTime, setValueFromDateTime] = useState<string | any>();
  const [valueToDateTime, setValueToDateTime] = useState<string | any>();
  const [valueKeyWord, setValueKeyWord] = useState<string | any>();

  const [isHCGFilter, setHCGFilter] = useState(false);
  const [isKQFilter, setKQFilter] = useState(false);
  const [isTimeFilter, setTimeFilter] = useState(false);

  const [listDataLSCG, setListDataLSCG] = useState<DataLSCGType[] | any>();
  const [listDataLSCGLength, setListDataLSCGLength] = useState<string | any>();

  const audioRef = useRef<any>();

  const [isVisibleModalAudio, setVisibleModalAudio] = useState(false);
  const [isVisibleModalNote, setVisibleModalNote] = useState(false);
  const [isDownloadFile, setDownloadFile] = useState(false);

  const [testAudioURL, setTestAudioURL] = useState<any>();
  const [recordId, setRecordId] = useState<string>();

  const [listValueHCG, setListValueHCG] = useState<string[] | any>();
  const [indeterminateHCG, setIndeterminateHCG] = useState(false);
  const [checkAllHCG, setCheckAllHCG] = useState(false);
  const [isFilterActiveButtonHCG, setIsFilterActiveButtonHCG] = useState(false);

  const [listValueResult, setListValueResult] = useState<string[] | any>();
  const [indeterminateResult, setIndeterminateResult] = useState(false);
  const [checkAllResult, setCheckAllResult] = useState(false);
  const [isFilterActiveButtonResult, setIsFilterActiveButtonResult] = useState(false);

  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '20', '30', '50'],
  });

  const [form] = Form.useForm();

  const token = window.localStorage?.getItem('access_token');

  const fetchListLSCGData = useRequest(
    async (from_datetime: any | undefined, to_datetime: any | undefined) => {
      const res: {
        success: boolean;
        length: number;
        length_data?: number;
        error_code: number;
      } = await requestHistoryCallData(
        token ? token : '',
        pagination.pageSize,
        pagination.current,
        from_datetime,
        to_datetime,
        listValueHCG,
        listValueResult,
        valueKeyWord,
      );
      if (!res.success) {
        if (res.error_code === 4030102) {
          setIsView('403');
          setListDataLSCG([]);
          setListDataLSCGLength(0);
          return;
        } else if (res.error_code === 4010106) {
          message.error('Không tìm thấy dữ liệu');
          setListDataLSCG([]);
          setListDataLSCGLength(0);
          return;
        } else {
          message.error('Không tìm thấy dữ liệu');
          setListDataLSCG([]);
          setListDataLSCGLength(0);
          return;
        }
      } else {
        setListDataLSCGLength(res.length);
      }
      return res;
    },
    {
      manual: true,
      onSuccess: (res: any) => {
        if (res) {
          setListDataLSCG(res);
        }
      },
    },
  );

  const fetchListDetailCallNote = useRequest(
    async (callId: any, phoneNumber: any, callDirection: any) => {
      const res: { success: boolean; data: any } = await requestGetDetailCallNote(
        token ? token : '',
        callId,
        phoneNumber,
        callDirection,
      );
      if (!res.success) {
        message.error('Không lấy được lịch sử note');
        return;
      } else {
        setListNote(res.data);
      }
      return res;
    },
    {
      manual: true,
    },
  );

  useEffect(() => {
    fetchListLSCGData.run(valueFromDateTime, valueToDateTime);
  }, [pagination]);

  const handleCheckFilterHCG = (list: any) => {
    setIndeterminateHCG(!!list.length && list.length < OPTIONS_FILTER_CALL_DIRECTION.length);
    setCheckAllHCG(list.length === OPTIONS_FILTER_CALL_DIRECTION.length);
    setListValueHCG(list);
    setPagination({
      ...pagination,
      current: 1,
    });
    if (list.length > 0) {
      setIsFilterActiveButtonHCG(true);
    } else {
      setIsFilterActiveButtonHCG(false);
      setListValueHCG(undefined);
    }
  };

  const handleCheckAllFilterHCG = (e: any) => {
    setListValueHCG(e.target.checked ? OPTIONS_FILTER_CALL_DIRECTION_VALUE : undefined);
    setIndeterminateHCG(false);
    setCheckAllHCG(e.target.checked);
    setPagination({
      ...pagination,
      current: 1,
    });
    if (e.target.checked) {
      setIsFilterActiveButtonHCG(true);
    } else {
      setIsFilterActiveButtonHCG(false);
    }
  };

  const handleCheckFilterResult = (list: any) => {
    setIndeterminateResult(!!list.length && list.length < OPTIONS_FILTER_CALL_RESULT.length);
    setCheckAllResult(list.length === OPTIONS_FILTER_CALL_RESULT.length);
    setListValueResult(list);
    setPagination({
      ...pagination,
      current: 1,
    });
    if (list.length > 0) {
      setIsFilterActiveButtonResult(true);
    } else {
      setIsFilterActiveButtonResult(false);
      setListValueResult(undefined);
    }
  };

  const handleCheckAllFilterResult = (e: any) => {
    setListValueResult(e.target.checked ? OPTIONS_FILTER_CALL_RESULT_VALUE : undefined);
    setIndeterminateResult(false);
    setCheckAllResult(e.target.checked);
    setPagination({
      ...pagination,
      current: 1,
    });
    if (e.target.checked) {
      setIsFilterActiveButtonResult(true);
    } else {
      setIsFilterActiveButtonResult(false);
    }
  };

  const handleViewResult = (result: any) => {
    let color, newResult;
    if (result === 1) {
      color = '#87d068';
      newResult = 'Thành công';
    } else if (result === 2) {
      color = '#ff0000';
      newResult = 'Thất bại';
    } else if (result === 3) {
      color = '#660000';
      newResult = 'Bận';
    } else if (result === 4) {
      color = '#e50000';
      newResult = 'Hủy bỏ';
    } else if (result === 5) {
      color = '#b1b1b1';
      newResult = 'Không trả lời';
    } else if (result === 6) {
      color = '#ff0000';
      newResult = 'Từ chối';
    } else if (result === 7) {
      color = '#9B26B6';
      newResult = 'Nhỡ trong hàng chờ';
    } else if (result === 8) {
      color = '#FFAC1C';
      newResult = 'Thất bại khác';
    }
    return (
      <Tag color={color} style={{ fontWeight: 'bold' }}>
        {newResult}
      </Tag>
    );
  };

  const handleViewCallDirection = (call_direction: any) => {
    let newCallDirection;
    if (call_direction === 'inbound') {
      newCallDirection = 'Gọi vào';
      return (
        <>
          <CallInboundIcon /> {newCallDirection}
        </>
      );
    } else if (call_direction === 'outbound') {
      newCallDirection = 'Gọi ra';
      return (
        <>
          <CallOutboundIcon /> {newCallDirection}
        </>
      );
    } else if (call_direction === 'local') {
      newCallDirection = 'Gọi nội bộ';
      return (
        <>
          <CallInterval /> {newCallDirection}
        </>
      );
    }
    return;
  };

  const handleChangeBillSec = (val: any) => {
    var sec_num: any = parseInt(val, 10);
    var hours: any = Math.floor(sec_num / 3600);
    var minutes: any = Math.floor((sec_num - hours * 3600) / 60);
    var seconds: any = sec_num - hours * 3600 - minutes * 60;

    if (hours < 10) {
      hours = '0' + hours;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    return hours + ':' + minutes + ':' + seconds;
  };

  const playAudio = async (fileId?: any, recordName?: any) => {
    try {
      const response = await axios({
        url: `${api.UMI_API_BASE_URL}/voip-service/api/call/get_record_url`,
        method: 'POST',
        data: {
          call_id: fileId,
          record_name: recordName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.error_code === 4030102) {
        message.error('Bạn không có quyền nghe file ghi âm!');
      } else {
        setTestAudioURL(response.data.data[0]);
      }
    } catch (e) {
      message.error('Không thể nghe file ghi âm!');
    }
  };

  const downloadAudio = async (fileId?: any, recordName?: any) => {
    try {
      setDownloadFile(true);
      const response = await axios({
        url: `${api.UMI_API_BASE_URL}/voip-service/api/call/get_record_file`,
        method: 'POST',
        data: {
          call_id: fileId,
          record_name: recordName,
        },
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.error_code === 4030102) {
        message.error('Bạn không có quyền tải file ghi âm!');
        setDownloadFile(false);
      } else {
        const audioFormatBlob = new Blob([response.data], { type: 'audio/*' });
        fileDownload(audioFormatBlob, recordName);
        setDownloadFile(false);
      }
    } catch (e) {
      message.error('Không thể tải file ghi âm!');
    }
  };

  const handleOpenModalPlaying = async (fieldId?: any, recordName?: any) => {
    setVisibleModalAudio(true);
    await playAudio(fieldId, recordName);
  };

  const handleGetDetailCallNote = (callId: any, phoneNumber: any, callDirection: any) => {
    fetchListDetailCallNote.run(callId, phoneNumber, callDirection);
    setVisibleModalNote(true);
  };

  const columns: ColumnsType<DataLSCGType> = [
    {
      title: 'Hướng cuộc gọi',
      dataIndex: 'call_direction',
      key: 'call_direction',
      align: 'center',
      width: '130px',
      render: (text, record) => {
        return handleViewCallDirection(record.call_direction);
      },
    },
    {
      title: 'Số máy gọi',
      dataIndex: 'sip_from_user',
      key: 'sip_from_user',
      align: 'center',
      width: '110px',
      render: (text, record) => {
        return text === null || text === undefined ? '-' : text;
      },
    },
    {
      title: 'Tên người gọi',
      dataIndex: 'caller_name',
      key: 'caller_name',
      align: 'center',
      width: '150px',
      render: (text, record) => {
        return text === null || text === undefined ? '-' : text;
      },
    },
    {
      title: 'Số máy nhận',
      dataIndex: 'caller_destination',
      key: 'caller_destination',
      align: 'center',
      width: '110px',
      render: (text, record) => {
        return text === null || text === undefined ? '-' : text;
      },
    },
    {
      title: 'Tên người nhận',
      dataIndex: 'receiver_name',
      key: 'receiver_name',
      align: 'center',
      width: '150px',
      render: (text, record) => {
        return text === null || text === undefined ? '-' : text;
      },
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'start_epoch',
      key: 'start_epoch',
      align: 'center',
      width: '150px',
      render: (text, record) => {
        return text === null || text === undefined ? '-' : moment.unix(text).format('DD-MM-YYYY');
      },
    },
    {
      title: 'Thời lượng',
      dataIndex: 'billsec',
      key: 'billsec',
      align: 'center',
      width: '100px',
      render: (text, record) => {
        return text === null || text === undefined ? '-' : handleChangeBillSec(text.toString());
      },
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
      align: 'center',
      width: '150px',
      render: (text, record) => {
        return text === null || text === undefined ? '-' : handleViewResult(record.result);
      },
    },
    {
      title: 'Ghi âm',
      width: '120px',
      align: 'center',
      render: (text, record) => {
        return (
          <>
            {record.billsec === 0 ? (
              ''
            ) : (
              <PlayCircleFilled
                style={{ color: '#1890ff', marginRight: '5px', fontSize: '25px' }}
                onClick={() => handleOpenModalPlaying(record._id, record.record_name)}
              />
            )}
            {isDownloadFile === true && record.billsec !== 0 && record._id === recordId ? (
              <Spin />
            ) : (isDownloadFile === false && record.billsec === 0) ||
              (isDownloadFile === true && record.billsec === 0) ? (
              ''
            ) : (
              <img
                src={DownloadIcon}
                className={styles.fileDownloadIcon}
                onClick={() => {
                  downloadAudio(record._id, record.record_name);
                  setRecordId(record._id);
                }}
              />
            )}
          </>
        );
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      width: '150px',
      render: (text, record) => {
        return (
          <Tooltip title="Xem ghi chú">
            <FormOutlined
              style={{ fontSize: 20 }}
              onClick={() => handleGetDetailCallNote(record._id, record.sip_from_user, 'local')}
            />
          </Tooltip>
        );
      },
    },
  ];

  const handleTableChange = (newPagination: any) => {
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const handleChangeValueRangePicker = (value: any, dateString: any) => {
    if (dateString[0] === '' && dateString[1] === '') {
      setTimeFilter(false);
      setValueFromDateTime(undefined);
      setValueToDateTime(undefined);
      fetchListLSCGData.run(undefined, undefined);
    } else {
      setTimeFilter(true);
      setValueFromDateTime(moment(dateString[0], 'DD-MM-YYYY').startOf('day'));
      setValueToDateTime(moment(dateString[1], 'DD-MM-YYYY').endOf('day'));
      fetchListLSCGData.run(
        moment(dateString[0], 'DD-MM-YYYY').startOf('day'),
        moment(dateString[1], 'DD-MM-YYYY').endOf('day'),
      );
    }
  };

  const onResetFilter = (e: any) => {
    if (
      listValueHCG === undefined &&
      listValueResult === undefined &&
      listValueResult === undefined &&
      valueKeyWord === undefined &&
      valueFromDateTime === undefined &&
      valueToDateTime === undefined
    ) {
      e.stopPropagation();
      e.preventDefault();
    } else {
      form.resetFields();
      setTimeFilter(false);
      setListValueHCG(undefined);
      setListValueResult(undefined);
      setValueKeyWord(undefined);
      setValueFromDateTime(undefined);
      setValueToDateTime(undefined);
      setIsFilterActiveButtonHCG(false);
      setIsFilterActiveButtonResult(false);
      setIndeterminateHCG(false);
      setIndeterminateResult(false);
      setCheckAllHCG(false);
      setCheckAllResult(false);
      setPagination({
        ...pagination,
        current: 1,
      });
    }
  };

  const handleExportFile = async () => {
    try {
      const res = await axios({
        url: `${api.UMI_API_BASE_URL}/voip-service/api/call/export_call_history_excel`,
        method: 'POST',
        data: {
          direction: listValueHCG,
          result: listValueResult,
          from_datetime: valueFromDateTime,
          to_datetime: valueToDateTime,
          search_name: valueKeyWord,
        },
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.error_code === 4030102) {
        message.error('Bạn không có quyền xuất báo cáo!');
      } else {
        fileDownload(res.data, 'history_call_report.xlsx');
      }
    } catch (e) {
      message.error('Không thể xuất báo cáo!');
    }
  };

  return isView === '403' ? (
    <NoFoundPage status="403" title="403" subTitle="Bạn không có quyền xem trang này" />
  ) : fetchListLSCGData.data === undefined && listDataLSCG === undefined ? (
    <></>
  ) : (
    <>
      <Form className={styles.filterFormHistoryCall} layout="vertical" form={form}>
        <div>
          <div className={styles.filterFormHistoryCallDisplay}>
            <div>
              <Form.Item name="Hướng cuộc gọi" style={{ marginBottom: 'unset' }}>
                <Popover
                  trigger="click"
                  placement="bottom"
                  overlayClassName={styles.popoverPlacement}
                  content={
                    <div style={{ maxHeight: 200, overflowY: 'scroll' }}>
                      <div>
                        <Checkbox
                          indeterminate={indeterminateHCG}
                          onChange={handleCheckAllFilterHCG}
                          checked={checkAllHCG}
                          className={styles.checkboxPopoverAll}
                        >
                          Chọn tất cả
                        </Checkbox>
                      </div>
                      <div>
                        <Checkbox.Group
                          value={listValueHCG}
                          onChange={handleCheckFilterHCG}
                          options={OPTIONS_FILTER_CALL_DIRECTION}
                          className={styles.checkboxPopover}
                        />
                      </div>
                    </div>
                  }
                >
                  <Button
                    className={
                      isFilterActiveButtonHCG === false
                        ? `${styles.buttonFilter}`
                        : `${styles.buttonFilterActive}`
                    }
                  >
                    Hướng cuộc gọi
                    {isFilterActiveButtonHCG ? (
                      <FilterFilled className={styles.filterIconActive} />
                    ) : (
                      <FilterOutlined className={styles.filterIcon} />
                    )}
                  </Button>
                </Popover>
              </Form.Item>
            </div>
            <div>
              <Form.Item name="Kết quả" style={{ marginBottom: 'unset' }}>
                <Popover
                  trigger="click"
                  placement="bottom"
                  overlayClassName={styles.popoverPlacement}
                  content={
                    <div style={{ maxHeight: 200, overflowY: 'scroll' }}>
                      <div>
                        <Checkbox
                          indeterminate={indeterminateResult}
                          onChange={handleCheckAllFilterResult}
                          checked={checkAllResult}
                          className={styles.checkboxPopoverAll}
                        >
                          Chọn tất cả
                        </Checkbox>
                      </div>
                      <div>
                        <Checkbox.Group
                          value={listValueResult}
                          onChange={handleCheckFilterResult}
                          options={OPTIONS_FILTER_CALL_RESULT}
                          className={styles.checkboxPopover}
                        />
                      </div>
                    </div>
                  }
                >
                  <Button
                    className={
                      isFilterActiveButtonResult === false
                        ? `${styles.buttonFilter}`
                        : `${styles.buttonFilterActive}`
                    }
                  >
                    Kết quả
                    {isFilterActiveButtonResult ? (
                      <FilterFilled className={styles.filterIconActive} />
                    ) : (
                      <FilterOutlined className={styles.filterIcon} />
                    )}
                  </Button>
                </Popover>
              </Form.Item>
            </div>
            <div>
              <Form.Item name="Thời gian" style={{ marginBottom: 'unset' }}>
                <RangePicker
                  onChange={handleChangeValueRangePicker}
                  className={styles.antRangePicker}
                  placeholder={['Từ ngày', 'Đến ngày']}
                  format="DD-MM-YYYY"
                  ranges={{
                    'Hôm nay': [moment(), moment()],
                    'Hôm qua': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                    '7 ngày qua': [moment().subtract(6, 'days'), moment()],
                    '30 ngày qua    ': [moment().subtract(29, 'days'), moment()],
                    'Tháng này': [moment().startOf('month'), moment().endOf('month')],
                    'Tháng trước': [
                      moment().subtract(1, 'month').startOf('month'),
                      moment().subtract(1, 'month').endOf('month'),
                    ],
                    'Năm này': [moment().startOf('year'), moment().endOf('year')],
                    'Năm trước': [
                      moment().subtract(1, 'year').startOf('year'),
                      moment().subtract(1, 'year').endOf('year'),
                    ],
                  }}
                  popupClassName={styles.antRangePicker}
                />
              </Form.Item>
            </div>
            <div>
              <Form.Item style={{ marginBottom: 'unset' }}>
                <Button type="text" style={{ color: 'blue' }} onClick={(e) => onResetFilter(e)}>
                  Reset
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item name="search_name">
            <Input
              style={{ flex: 2, width: 280 }}
              prefix={<SearchOutlined />}
              placeholder="Tìm kiếm tên người gọi, người nhận"
              allowClear
              onChange={debounce(
                (e) => {
                  const { value } = e.target;
                  if (value === '') {
                    setValueKeyWord(undefined);
                    fetchListLSCGData.run(valueFromDateTime, valueToDateTime);
                  } else {
                    setValueKeyWord(value);
                    fetchListLSCGData.run(valueFromDateTime, valueToDateTime);
                  }
                },
                500,
                {
                  trailing: true,
                  leading: false,
                },
              )}
            />
          </Form.Item>
          <Button
            style={{ backgroundColor: '#7fb77e', color: '#fff', marginLeft: '10px' }}
            onClick={handleExportFile}
          >
            <ExportIcon /> Export
          </Button>
        </div>
      </Form>
      <Table
        dataSource={listDataLSCG}
        rowKey={(item) => item._id}
        columns={columns}
        className={styles.tableStyle}
        onChange={handleTableChange}
        pagination={{
          ...pagination,
          total: listDataLSCGLength,
          locale: {
            items_per_page: '/ Trang',
            jump_to: 'Đến trang',
            page: '',
            next_page: 'Trang sau',
            prev_page: 'Trang trước',
            next_3: '3 trang sau',
            next_5: '5 trang sau',
            prev_3: '3 trang trước',
            prev_5: '5 trang trước',
          },
        }}
        scroll={{
          x: window.innerWidth < 1900 ? 100 : undefined,
        }}
        loading={{
          indicator: (
            <div>
              <Spin />
            </div>
          ),
          spinning: fetchListLSCGData.loading,
        }}
      />
      <Modal
        open={isVisibleModalAudio}
        onCancel={() => {
          setVisibleModalAudio(false);
          audioRef.current.pause();
        }}
        footer={false}
        title="Nghe file ghi âm"
      >
        <div style={{ textAlign: 'center' }}>
          <figure>
            <audio ref={audioRef} controls src={testAudioURL}></audio>
          </figure>
        </div>
      </Modal>
      <Modal
        open={isVisibleModalNote}
        onCancel={() => setVisibleModalNote(false)}
        footer={false}
        centered
        title="Ghi chú cuộc gọi"
      >
        <div className={styles.historyCallNoteTimeline}>
          <Timeline pending={true} pendingDot={null}>
            {listNote[0]?.note?.map((item) => (
              <Timeline.Item>
                <Typography.Paragraph className={styles.historyCallNoteTime}>
                  {moment.unix(item.create_at).format('DD-MM-YYYY')}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  <Typography.Text className={styles.historyCallNoteField}>
                    Nhân sự:{' '}
                  </Typography.Text>
                  <Typography.Text>{item.personnel}</Typography.Text>{' '}
                </Typography.Paragraph>
                <Typography.Paragraph>
                  <Typography.Text className={styles.historyCallNoteField}>
                    Nội dung:{' '}
                  </Typography.Text>
                  <Typography.Text> {item.content}</Typography.Text>
                </Typography.Paragraph>
              </Timeline.Item>
            ))}
          </Timeline>
        </div>
      </Modal>
    </>
  );
};

export default HistoryCall;
