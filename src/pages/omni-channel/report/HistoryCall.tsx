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
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlayCircleFilled, SearchOutlined } from '@ant-design/icons';
import DownloadIcon from '../../../../public/cloud_download.svg';
import ExportIcon from '@/components/ExportIcon/ExportIcon';
import styles from '../report/style.less';
import { requestHistoryCallData } from './services';
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
  billsec?: string;
  hangup_cause?: string;
  record_path?: string;
  record_name?: string;
  note?: any[];
  caller_name?: string;
  receiver_name?: string;
  result?: string;
}

const HistoryCall: React.FC = () => {
  const [isView, setIsView] = useState<string>();

  const [listValueHCG, setListValueHCG] = useState<string[] | any>();
  const [listValueKQ, setListValueKQ] = useState<string[] | any>();
  const [valueFromDateTime, setValueFromDateTime] = useState<string | any>();
  const [valueToDateTime, setValueToDateTime] = useState<string | any>();
  const [valueKeyWord, setValueKeyWord] = useState<string | any>();

  const [listDataLSCG, setListDataLSCG] = useState<DataLSCGType[] | any>();
  const [listDataLSCGLength, setListDataLSCGLength] = useState<string | any>();
  const [ellipsis, setEllipsis] = useState<any>(true);

  const audioRef = useRef<any>();

  const [isVisibleModalAudio, setVisibleModalAudio] = useState(false);

  const [testAudioURL, setTestAudioURL] = useState<any>();

  const [pagination, setPagination] = useState<PaginationProps>({
    current: 1,
    pageSize: 5,
    showSizeChanger: true,
    showQuickJumper: true,
    pageSizeOptions: ['5', '10', '30', '50'],
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
      );
      if (!res.success) {
        if (res.error_code === 4030102) {
          setIsView('403');
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

  useEffect(() => {
    fetchListLSCGData.run(valueFromDateTime, valueToDateTime);
  }, [pagination]);

  const handleViewResult = (result: any) => {
    let color, newResult;
    if (result === 'success') {
      color = '#0096FF';
      newResult = 'Thành công';
    } else if (result === 'fail') {
      color = '#b20000';
      newResult = 'Thất bại';
    } else if (result === 'busy') {
      color = '#660000';
      newResult = 'Bận';
    } else if (result === 'cancel') {
      color = '#e50000';
      newResult = 'Hủy bỏ';
    } else if (result === 'no_answer') {
      color = '#b1b1b1';
      newResult = 'Không trả lời';
    } else if (result === 'rejected') {
      color = '#ff0000';
      newResult = 'Từ chối';
    } else if (result === 'missed') {
      color = '#9B26B6';
      newResult = 'Nhỡ trong hàng chờ';
    } else if (result === 'other_failure') {
      color = '#FFAC1C';
      newResult = 'Thất bại khác';
    }
    return <Tag color={color}>{newResult}</Tag>;
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
        url: `${api.UMI_API_BASE_URL}/voip-service/api/call/get_record_file_url`,
        method: 'POST',
        data: {
          call_id: fileId,
          record_name: recordName,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.data.success === true) {
        setTestAudioURL(response.data.data[0]);
      } else if (response.data.error_code === 4030102) {
        message.error('Bạn không có quyền nghe file ghi âm!');
      } else {
        message.error('Không thể nghe file ghi âm!');
      }
    } catch (e) {
      message.error('Không thể nghe file ghi âm!');
    }
  };

  const downloadAudio = async (fileId?: any, recordName?: any) => {
    try {
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
      if (response.data.success === true) {
        const audioFormatBlob = new Blob([response.data], { type: 'audio/*' });
        fileDownload(audioFormatBlob, recordName);
      } else if (response.data.error_code === 4030102) {
        message.error('Bạn không có quyền tải file ghi âm!');
      } else {
        message.error('Không thể tải file ghi âm!');
      }
    } catch (e) {
      message.error('Không thể tải file ghi âm!');
    }
  };

  const handleOpenModalPlaying = async (fieldId?: any, recordName?: any) => {
    setVisibleModalAudio(true);
    await playAudio(fieldId, recordName);
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
            <PlayCircleFilled
              style={{ color: '#1890ff', marginRight: '5px', fontSize: '25px' }}
              onClick={() => handleOpenModalPlaying(record._id, record.record_name)}
            />
            <img
              src={DownloadIcon}
              style={{
                background: '#1890ff',
                padding: '3px',
                borderRadius: '30px',
                verticalAlign: 'sub',
              }}
              onClick={() => downloadAudio(record._id, record.record_name)}
            />
          </>
        );
      },
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      width: '250px',
      render: (note: any[]) => {
        if (note.length > 2) {
          return (
            <>
              <Typography.Text>{note[0].content}</Typography.Text>
              <br></br>
              <br></br>
              <Typography.Text>{note[1].content}</Typography.Text>
              <br></br>
              <br></br>
              <Typography.Text
                style={
                  ellipsis
                    ? {
                        width: 200,
                      }
                    : undefined
                }
                ellipsis={true}
              >
                {note[2].content}...
              </Typography.Text>
            </>
          );
        } else {
          return note.map((item, index) => (
            <>
              <Typography.Text key={item.content}>{item.content}</Typography.Text>
              <br></br>
            </>
          ));
        }
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

  const handleSelectValueHCG = (values: any) => {
    if (values.length === 0) {
      setListValueHCG(undefined);
      setPagination({
        ...pagination,
        current: 1,
      });
    } else {
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
      setPagination({
        ...pagination,
        current: 1,
      });
    } else {
      setListValueKQ(values);
      setPagination({
        ...pagination,
        current: 1,
      });
    }
  };

  const handleChangeValueRangePicker = (value: any, dateString: any) => {
    if (dateString[0] === '' && dateString[1] === '') {
      setValueFromDateTime(undefined);
      setValueToDateTime(undefined);
      fetchListLSCGData.run(undefined, undefined);
    } else {
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
      listValueKQ === undefined &&
      valueKeyWord === undefined &&
      valueFromDateTime === undefined &&
      valueToDateTime === undefined
    ) {
      e.stopPropagation();
      e.preventDefault();
    } else {
      form.resetFields();
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
    <NoFoundPage
      status="403"
      title="403"
      subTitle="Bạn không có quyền xem trang Lịch sử cuộc gọi"
    />
  ) : (
    <>
      <Form className={styles.filterFormHistoryCall} layout="vertical" form={form}>
        <div>
          <div className={styles.filterFormHistoryCallDisplay}>
            <div style={{ width: '300px' }}>
              <Form.Item
                label="Hướng cuộc gọi"
                name="Hướng cuộc gọi"
                style={{ marginBottom: 'unset' }}
              >
                <Select onChange={handleSelectValueHCG} mode="multiple">
                  <Select.Option value="inbound" key="inbound">
                    Gọi vào
                  </Select.Option>
                  <Select.Option value="outbound" key="outbound">
                    Gọi ra
                  </Select.Option>
                  <Select.Option value="local" key="local">
                    Gọi nội bộ
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div style={{ width: '300px' }}>
              <Form.Item label="Kết quả" name="Kết quả" style={{ marginBottom: 'unset' }}>
                <Select onChange={handleSelectValueKQ} mode="multiple">
                  <Select.Option value="success" key="success">
                    Thành công
                  </Select.Option>
                  <Select.Option value="fail" key="fail">
                    Thất bại
                  </Select.Option>
                  <Select.Option value="busy" key="busy">
                    Bận
                  </Select.Option>
                  <Select.Option value="cancel" key="cancel">
                    Hủy bỏ
                  </Select.Option>
                  <Select.Option value="no_answer" key="no_answer">
                    Không trả lời
                  </Select.Option>
                  <Select.Option value="rejected" key="rejected">
                    Từ chối
                  </Select.Option>
                  <Select.Option value="missed" key="missed">
                    Nhỡ trong hàng chờ
                  </Select.Option>
                  <Select.Option value="other_failure" key="other_failure">
                    Thất bại khác
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div style={{ width: '300px' }}>
              <Form.Item label="Thời gian" name="Thời gian" style={{ marginBottom: 'unset' }}>
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
            <div style={{ paddingTop: '29px' }}>
              <Form.Item style={{ marginBottom: 'unset' }}>
                <Button type="text" style={{ color: 'blue' }} onClick={(e) => onResetFilter(e)}>
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
          <Button style={{ backgroundColor: '#7fb77e', color: '#fff' }} onClick={handleExportFile}>
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
    </>
  );
};

export default HistoryCall;
