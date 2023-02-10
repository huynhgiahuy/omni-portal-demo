import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Button,
  Typography,
  Input,
  Tag,
  Form,
  message,
  Spin,
  Modal,
  Timeline,
  Tooltip,
  Select,
  Empty,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  PlayCircleFilled,
  SearchOutlined,
  FormOutlined,
  InfoCircleFilled,
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
  OPTIONS_FILTER_HISTORY_CALL_DIRECTION,
  OPTIONS_FILTER_HISTORY_CALL_RESULT,
} from '@/constants';
import CustomizeRangePicker from '@/components/RangePicker';

interface PaginationProps {
  current: number;
  pageSize: number;
  showSizeChanger: boolean;
  showQuickJumper: boolean;
  pageSizeOptions: string[];
}
interface DataLSCGType {
  uuid: string;
  _id: string;
  call_direction?: string;
  sip_from_user?: string;
  caller_destination?: string;
  start_epoch?: any;
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

  const [listValueHCG, setListValueHCG] = useState<string[] | any>();
  const [listValueKQ, setListValueKQ] = useState<string[] | any>();
  const [valueFromDateTime, setValueFromDateTime] = useState<string | any>();
  const [valueToDateTime, setValueToDateTime] = useState<string | any>();
  const [valueKeyWord, setValueKeyWord] = useState<string | any>();
  const [sortColumn, setSortColumn] = useState<any>({ received_at: 0 });

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

  const [isLoadingExcel, setLoadingExcel] = useState(false);

  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '20', '30', '40', '50'],
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
        listValueKQ,
        valueKeyWord,
        sortColumn,
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
      const res: { success: boolean; data: any; error_code: number } =
        await requestGetDetailCallNote(token ? token : '', callId, phoneNumber, callDirection);
      if (res.success === false) {
        if (res.error_code === 4030102) {
          message.error('Bạn không có quyền xem ghi chú lịch sử cuộc gọi!');
        } else {
          message.error('Không thể xem ghi chú lịch sử cuộc gọi!');
        }
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
      color = '#FFAC1C';
      newResult = 'Từ chối';
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
      setTestAudioURL(response.data.data[0]);
    } catch (e: any) {
      if (e.response.status === 403) {
        message.error('Bạn không có quyền nghe file ghi âm!');
      } else {
        message.error('Không thể nghe file ghi âm!');
      }
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
      const audioFormatBlob = new Blob([response.data], { type: 'audio/*' });
      fileDownload(audioFormatBlob, recordName);
      setDownloadFile(false);
    } catch (e: any) {
      if (e.response.status === 403) {
        message.error('Bạn không có quyền tải file ghi âm!');
        setDownloadFile(false);
      } else {
        message.error('Không thể tải file ghi âm!');
        setDownloadFile(false);
      }
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
        return text === null || text === undefined
          ? '-'
          : moment.unix(text).format('DD-MM-YYYY HH:mm:ss');
      },
      sorter: true,
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
            {record.billsec === 0 || record.billsec === undefined ? (
              ''
            ) : (
              <Tooltip title="Nghe ghi âm">
                <PlayCircleFilled
                  style={{ color: '#1890ff', marginRight: '5px', fontSize: '25px' }}
                  onClick={() => handleOpenModalPlaying(record._id, record.record_name)}
                />
              </Tooltip>
            )}
            {isDownloadFile === true && record.billsec !== 0 && record._id === recordId ? (
              <Spin />
            ) : (isDownloadFile === false && record.billsec === 0) ||
              record.billsec === undefined ||
              (isDownloadFile === true && record.billsec === 0) ||
              record.billsec === undefined ? (
              ''
            ) : (
              <Tooltip title="Tải ghi âm">
                <img
                  src={DownloadIcon}
                  className={styles.fileDownloadIcon}
                  onClick={() => {
                    downloadAudio(record._id, record.record_name);
                    setRecordId(record._id);
                  }}
                />
              </Tooltip>
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
              onClick={() =>
                handleGetDetailCallNote(record.uuid, record.sip_from_user, record.call_direction)
              }
            />
          </Tooltip>
        );
      },
    },
    Table.EXPAND_COLUMN,
  ];

  const handleTableChange = (newPagination: any, filters: any, sorters: any) => {
    let received_at = 0;
    if (sorters.order === 'ascend') {
      received_at = 1;
    } else if (sorters.order === 'descend') {
      received_at = -1;
    } else {
      received_at = 0;
    }
    setSortColumn({ received_at });
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
  };

  const handleSelectValueHCG = (values: any) => {
    if (values.length === 0) {
      setListValueHCG(undefined);
      setHCGFilter(false);
      setPagination({
        ...pagination,
        current: 1,
      });
    } else {
      setHCGFilter(true);
      setListValueHCG(values);
      setPagination({
        ...pagination,
        current: 1,
      });
    }
  };

  const handleSelectValueKQ = (values: any) => {
    if (values.length === 0) {
      setListValueKQ(undefined);
      setKQFilter(false);
      setPagination({
        ...pagination,
        current: 1,
      });
    } else {
      setKQFilter(true);
      setListValueKQ(values);
      setPagination({
        ...pagination,
        current: 1,
      });
    }
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
      listValueKQ === undefined &&
      valueKeyWord === undefined &&
      valueFromDateTime === undefined &&
      valueToDateTime === undefined
    ) {
      e.stopPropagation();
      e.preventDefault();
    } else {
      form.resetFields();
      setHCGFilter(false);
      setKQFilter(false);
      setTimeFilter(false);
      setListValueHCG(undefined);
      setListValueKQ(undefined);
      setValueKeyWord(undefined);
      setValueFromDateTime(undefined);
      setValueToDateTime(undefined);
      setPagination({
        ...pagination,
        current: 1,
      });
    }
  };

  const handleExportFile = async () => {
    try {
      setLoadingExcel(true);
      const res = await axios({
        url: `${api.UMI_API_BASE_URL}/voip-service/api/call/export_call_history_excel`,
        method: 'POST',
        data: {
          direction: listValueHCG,
          result: listValueKQ,
          from_datetime: valueFromDateTime,
          to_datetime: valueToDateTime,
          search_name: valueKeyWord,
        },
        responseType: 'blob',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setLoadingExcel(false);
      fileDownload(res.data, 'history_call_report.xlsx');
    } catch (e: any) {
      if (e.response.status === 403) {
        setLoadingExcel(false);
        message.error('Bạn không có quyền xuất báo cáo!');
      } else {
        setLoadingExcel(false);
        message.error('Không thể xuất báo cáo!');
      }
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
            <div style={{ width: '300px' }}>
              <Form.Item
                label={
                  <Typography.Text className={isHCGFilter ? `${styles.filterFieldActive}` : ''}>
                    Hướng cuộc gọi
                  </Typography.Text>
                }
                name="Hướng cuộc gọi"
                style={{ marginBottom: 'unset' }}
              >
                <Select
                  onChange={handleSelectValueHCG}
                  mode="multiple"
                  maxTagCount="responsive"
                  placeholder="Tất cả"
                  options={OPTIONS_FILTER_HISTORY_CALL_DIRECTION}
                />
              </Form.Item>
            </div>
            <div style={{ width: '300px' }}>
              <Form.Item
                label={
                  <Typography.Text className={isKQFilter ? `${styles.filterFieldActive}` : ''}>
                    Kết quả
                  </Typography.Text>
                }
                name="Kết quả"
                style={{ marginBottom: 'unset' }}
              >
                <Select
                  onChange={handleSelectValueKQ}
                  mode="multiple"
                  maxTagCount="responsive"
                  placeholder="Tất cả"
                  options={OPTIONS_FILTER_HISTORY_CALL_RESULT}
                />
              </Form.Item>
            </div>
            <div style={{ width: '300px' }}>
              <Form.Item
                label={
                  <Typography.Text className={isTimeFilter ? `${styles.filterFieldActive}` : ''}>
                    Thời gian
                  </Typography.Text>
                }
                name="Thời gian"
                style={{ marginBottom: 'unset' }}
              >
                <CustomizeRangePicker handleChangeValueRangePicker={handleChangeValueRangePicker} />
              </Form.Item>
            </div>
            <div style={{ paddingTop: '29px' }}>
              <Form.Item style={{ marginBottom: 'unset' }}>
                <Button type="link" style={{ color: 'blue' }} onClick={(e) => onResetFilter(e)}>
                  Reset
                </Button>
              </Form.Item>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: '29px', display: 'flex', justifyContent: 'space-between' }}>
          <Form.Item name="search_name">
            <Input
              style={{ width: '300px', marginRight: '10px' }}
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
                    setPagination({
                      ...pagination,
                      current: 1,
                    });
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
            style={{ backgroundColor: '#7fb77e', color: '#fff' }}
            onClick={handleExportFile}
            loading={isLoadingExcel}
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
        locale={{
          triggerDesc: 'Chọn sắp xếp giảm dần',
          triggerAsc: 'Chọn sắp xếp tăng dần',
          cancelSort: 'Chọn hủy sắp xếp',
          emptyText: (
            <>
              <Empty description={false} />
              <p>Không có dữ liệu</p>
            </>
          ),
        }}
        expandable={{
          expandedRowRender: (record) => (
            <div
              style={{
                maxHeight: 250,
                overflowY: 'scroll',
                paddingTop: 10,
              }}
              className={styles.timelineLayout}
            >
              <Timeline pending={true} pendingDot={null}>
                <Timeline.Item>
                  <Typography.Paragraph style={{ color: '#1890ff', fontWeight: 'bold' }}>
                    09-02-2023 14:03:03
                  </Typography.Paragraph>
                  <Typography.Paragraph>KhuyenNNA đã chuyển tiếp cho HuyenLM</Typography.Paragraph>
                  <Typography.Paragraph>
                    <b style={{ textDecoration: 'underline' }}>Nội dung:</b> Giả định chuyển tiếp
                    cuộc gọi từ KhuyenNNA sang cho HuyenLM
                  </Typography.Paragraph>
                </Timeline.Item>
                <Timeline.Item>
                  <Typography.Paragraph style={{ color: '#1890ff', fontWeight: 'bold' }}>
                    09-02-2023 13:03:03
                  </Typography.Paragraph>
                  <Typography.Paragraph>HaoHG đã chuyển tiếp cho KhuyenNNA</Typography.Paragraph>
                  <Typography.Paragraph>
                    <b style={{ textDecoration: 'underline' }}>Nội dung:</b> Giả định chuyển tiếp
                    cuộc gọi từ HaoHG sang cho KhuyenNNA
                  </Typography.Paragraph>
                </Timeline.Item>
                <Timeline.Item>
                  <Typography.Paragraph style={{ color: '#1890ff', fontWeight: 'bold' }}>
                    09-02-2023 12:03:03
                  </Typography.Paragraph>
                  <Typography.Paragraph>MinhHD đã chuyển tiếp cho HaoHG</Typography.Paragraph>
                  <Typography.Paragraph>
                    <b style={{ textDecoration: 'underline' }}>Nội dung:</b> Giả định chuyển tiếp
                    cuộc gọi từ MinhHD sang cho HaoHG
                  </Typography.Paragraph>
                </Timeline.Item>
                <Timeline.Item>
                  <Typography.Paragraph style={{ color: '#1890ff', fontWeight: 'bold' }}>
                    09-02-2023 11:03:03
                  </Typography.Paragraph>
                  <Typography.Paragraph>HuyND đã chuyển tiếp cho MinhHD</Typography.Paragraph>
                  <Typography.Paragraph>
                    <b style={{ textDecoration: 'underline' }}>Nội dung:</b> Giả định chuyển tiếp
                    cuộc gọi từ HuyND sang cho MinhHD
                  </Typography.Paragraph>
                </Timeline.Item>
                <Timeline.Item>
                  <Typography.Paragraph style={{ color: '#1890ff', fontWeight: 'bold' }}>
                    09-02-2023 10:03:03
                  </Typography.Paragraph>
                  <Typography.Paragraph>HuyND đã nhận cuộc gọi từ Khách hàng</Typography.Paragraph>
                  <Typography.Paragraph>
                    <b style={{ textDecoration: 'underline' }}>Nội dung:</b> Giả định cuộc gọi đến
                    từ Khách hàng
                  </Typography.Paragraph>
                </Timeline.Item>
              </Timeline>
            </div>
          ),
          expandIcon: ({ expanded, onExpand, record }) =>
            expanded ? (
              <Tooltip title="Bỏ xem chi tiết">
                <InfoCircleFilled
                  style={{ color: '#1890ff', fontSize: 18 }}
                  className={styles.detailTransferCallIcon}
                  onClick={(e) => onExpand(record, e)}
                />
              </Tooltip>
            ) : (
              <Tooltip title="Xem chi tiết">
                <InfoCircleFilled style={{ fontSize: 16 }} onClick={(e) => onExpand(record, e)} />
              </Tooltip>
            ),
        }}
        scroll={{
          x: window.innerWidth < 1900 ? 100 : undefined,
        }}
        loading={{
          indicator: <Spin />,
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
        centered
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
            {listNote[0]?.note?.length ? (
              listNote[0]?.note?.map((item) => (
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
              ))
            ) : (
              <div style={{ textAlign: 'center' }}>
                <Typography.Text>Không có ghi chú</Typography.Text>
              </div>
            )}
          </Timeline>
        </div>
      </Modal>
    </>
  );
};

export default HistoryCall;
