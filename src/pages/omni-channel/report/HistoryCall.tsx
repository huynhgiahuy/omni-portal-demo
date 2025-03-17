import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Button,
  Typography,
  Input,
  Form,
  message,
  Spin,
  Modal,
  Timeline,
  Tooltip,
  Select,
  Empty,
} from 'antd';
import {
  CustomUI_CallDirection,
  customUI_SipFromUser,
  customUI_CallerName,
  customUI_CallerDestination,
  customUI_ReceiverName,
  customUI_StartEpoch,
  customUI_BillSec,
  customUI_Result,
  customUI_RecordAudio,
  customUI_Note,
  DataLSCGType,
  PaginationProps,
  ListNotesProps,
} from './CustomUIHistoryCall';
import type { ColumnsType } from 'antd/es/table';
import { SearchOutlined, InfoCircleFilled } from '@ant-design/icons';
import {
  requestHistoryCallData,
  requestGetDetailCallNote,
  requestGetDetailTransferHistoryCall,
} from './services';
import {
  OPTIONS_FILTER_HISTORY_CALL_DIRECTION,
  OPTIONS_FILTER_HISTORY_CALL_RESULT,
} from '@/constants';
import { useRequest } from 'umi';
import { debounce } from 'lodash';
import CustomizeRangePicker from '@/components/RangePicker';
import ExportIcon from '@/components/ExportIcon/ExportIcon';
import moment from 'moment';
import fileDownload from 'js-file-download';
import axios from 'axios';
import api from '@/api';
import NoFoundPage from '@/pages/404';
import styles from '../report/style.less';

const HistoryCall: React.FC = () => {
  const [isView, setIsView] = useState<string>();
  const [listNote, setListNote] = useState<ListNotesProps[]>([]);
  const [listExpandedRowKeys, setListExpandedRowKeys] = useState([]);

  const [listValueHCG, setListValueHCG] = useState<any>();
  const [listValueKQ, setListValueKQ] = useState<any>();
  const [valueFromDateTime, setValueFromDateTime] = useState<any>();
  const [valueToDateTime, setValueToDateTime] = useState<any>();
  const [valueKeyWord, setValueKeyWord] = useState<any>();
  const [sortColumn, setSortColumn] = useState<any>({ start_epoch: 0 });

  const [isHCGFilter, setHCGFilter] = useState(false);
  const [isKQFilter, setKQFilter] = useState(false);
  const [isTimeFilter, setTimeFilter] = useState(false);

  const [listDataLSCG, setListDataLSCG] = useState<any>();
  const [listDataLSCGLength, setListDataLSCGLength] = useState<any>();

  const [isVisibleModalAudio, setVisibleModalAudio] = useState(false);
  const [isVisibleModalNote, setVisibleModalNote] = useState(false);
  const [isDownloadFile, setDownloadFile] = useState(false);

  const audioRef = useRef<any>();
  const [testAudioURL, setTestAudioURL] = useState<any>();
  const [recordId, setRecordId] = useState<string>('');

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
          message.error('Không tìm thấy dữ liệu!');
          setListDataLSCG([]);
          setListDataLSCGLength(0);
          return;
        } else {
          message.error('Không tìm thấy dữ liệu!');
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
          const newData = res.map((item: { transferInfo: [] }) => ({ ...item, transferInfo: [] }));
          setListDataLSCG(newData);
        }
      },
    },
  );

  const fetchListDetailCallNote = useRequest(
    async (callId: string) => {
      const res: { success: boolean; data: any; error_code: number } =
        await requestGetDetailCallNote(token ? token : '', callId);
      if (res.success === false) {
        if (res.error_code === 4030102) {
          message.error('Bạn không có quyền xem ghi chú!');
          setVisibleModalNote(false);
        } else {
          message.error('Không thể xem ghi chú!');
          setVisibleModalNote(false);
        }
      } else {
        setListNote(res.data);
        setVisibleModalNote(true);
      }
      return res;
    },
    {
      manual: true,
    },
  );

  const fetchListDetailTransferCall = useRequest(
    async (callId: string) => {
      const res: { success: boolean; data: any; error_code: number } =
        await requestGetDetailTransferHistoryCall(token ? token : '', callId);
      if (res.success === false) {
        if (res.error_code === 4030102) {
          message.error('Bạn không có quyền xem chi tiết chuyển tiếp!');
        } else {
          message.error('Không thể xem ghi chi tiết chuyển tiếp!');
        }
      } else {
        const index = listDataLSCG.findIndex((item: { uuid: string }) => item.uuid === callId);
        const newDataTable = [...listDataLSCG];
        newDataTable[index].transferInfo = res.data;
        setListDataLSCG(newDataTable);
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

  const playAudio = async (fileId: string, recordName: string) => {
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
      setVisibleModalAudio(true);
    } catch (e: any) {
      if (e.response.data.error_code === 4030102) {
        message.error('Bạn không có quyền nghe file ghi âm!');
        setVisibleModalAudio(false);
      } else {
        message.error('Không thể nghe file ghi âm!');
        setVisibleModalAudio(false);
      }
    }
  };

  const downloadAudio = async (fileId: string, recordName: string) => {
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
      if (e.response.data.error_code === 4030102) {
        message.error('Bạn không có quyền tải file ghi âm!');
        setDownloadFile(false);
      } else {
        message.error('Không thể tải file ghi âm!');
        setDownloadFile(false);
      }
    }
  };

  const handleOpenModalPlaying = async (fieldId: string, recordName: string) => {
    await playAudio(fieldId, recordName);
  };

  const handleGetDetailCallNote = async (callId: string) => {
    await fetchListDetailCallNote.run(callId);
  };

  const columns: ColumnsType<DataLSCGType> = [
    {
      title: 'Hướng cuộc gọi',
      dataIndex: 'call_direction',
      key: 'call_direction',
      align: 'center',
      width: '130px',
      ...CustomUI_CallDirection.parsing(),
    },
    {
      title: 'Số máy gọi',
      dataIndex: 'sip_from_user',
      key: 'sip_from_user',
      align: 'center',
      width: '110px',
      ...customUI_SipFromUser.parsing(),
    },
    {
      title: 'Tên người gọi',
      dataIndex: 'caller_name',
      key: 'caller_name',
      align: 'center',
      width: '200px',
      ...customUI_CallerName.parsing(),
    },
    {
      title: 'Số máy nhận',
      dataIndex: 'caller_destination',
      key: 'caller_destination',
      align: 'center',
      width: '110px',
      ...customUI_CallerDestination.parsing(),
    },
    {
      title: 'Tên người nhận',
      dataIndex: 'receiver_name',
      key: 'receiver_name',
      align: 'center',
      width: '200px',
      ...customUI_ReceiverName.parsing(),
    },
    {
      title: 'Thời gian bắt đầu',
      dataIndex: 'start_epoch',
      key: 'start_epoch',
      align: 'center',
      width: '150px',
      sorter: true,
      ...customUI_StartEpoch.parsing(),
    },
    {
      title: 'Thời lượng',
      dataIndex: 'billsec',
      key: 'billsec',
      align: 'center',
      width: '100px',
      ...customUI_BillSec.parsing(),
    },
    {
      title: 'Kết quả',
      dataIndex: 'result',
      key: 'result',
      align: 'center',
      width: '150px',
      ...customUI_Result.parsing(),
    },
    {
      title: 'Ghi âm',
      width: '120px',
      align: 'center',
      ...customUI_RecordAudio.parsing(
        recordId,
        isDownloadFile,
        handleOpenModalPlaying,
        downloadAudio,
        setRecordId,
      ),
    },
    {
      title: 'Ghi chú',
      dataIndex: 'note',
      key: 'note',
      align: 'center',
      width: '100px',
      ...customUI_Note.parsing(handleGetDetailCallNote),
    },
    Table.EXPAND_COLUMN,
  ];

  const handleTableChange = (newPagination: any, filters: any, sorter: any) => {
    let start_epoch = 0;
    if (sorter.order === 'ascend') {
      start_epoch = 1;
    } else if (sorter.order === 'descend') {
      start_epoch = -1;
    } else {
      start_epoch = 0;
    }
    setSortColumn({ start_epoch });
    setPagination({
      ...pagination,
      current: newPagination.current,
      pageSize: newPagination.pageSize,
    });
    setListExpandedRowKeys([]);
  };

  const handleSelectValueHCG = (values: any) => {
    if (values.length === 0) {
      setListExpandedRowKeys([]);
      setListValueHCG(undefined);
      setHCGFilter(false);
      setPagination({
        ...pagination,
        current: 1,
      });
    } else {
      setListExpandedRowKeys([]);
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
      setListExpandedRowKeys([]);
      setListValueKQ(undefined);
      setKQFilter(false);
      setPagination({
        ...pagination,
        current: 1,
      });
    } else {
      setListExpandedRowKeys([]);
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
      setListExpandedRowKeys([]);
    } else {
      setTimeFilter(true);
      setValueFromDateTime(moment(dateString[0], 'DD-MM-YYYY').startOf('day'));
      setValueToDateTime(moment(dateString[1], 'DD-MM-YYYY').endOf('day'));
      fetchListLSCGData.run(
        moment(dateString[0], 'DD-MM-YYYY').startOf('day'),
        moment(dateString[1], 'DD-MM-YYYY').endOf('day'),
      );
      setListExpandedRowKeys([]);
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
      setListExpandedRowKeys([]);
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
        <>
          <div className={styles.filterFormHistoryCallDisplay}>
            <div style={{ width: '300px' }}>
              <Form.Item
                label={
                  <Typography.Text
                    className={
                      isHCGFilter ? `${styles.filterFieldActive}` : `${styles.filterFieldNoActive}`
                    }
                  >
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
                  notFoundContent={<Empty description="Không có dữ liệu" />}
                />
              </Form.Item>
            </div>
            <div style={{ width: '300px' }}>
              <Form.Item
                label={
                  <Typography.Text
                    className={
                      isKQFilter ? `${styles.filterFieldActive}` : `${styles.filterFieldNoActive}`
                    }
                  >
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
                  notFoundContent={<Empty description="Không có dữ liệu" />}
                />
              </Form.Item>
            </div>
            <div style={{ width: '300px' }}>
              <Form.Item
                label={
                  <Typography.Text
                    className={
                      isTimeFilter ? `${styles.filterFieldActive}` : `${styles.filterFieldNoActive}`
                    }
                  >
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
        </>
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
                    setListExpandedRowKeys([]);
                    setValueKeyWord(undefined);
                    fetchListLSCGData.run(valueFromDateTime, valueToDateTime);
                  } else {
                    setListExpandedRowKeys([]);
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
            style={{ backgroundColor: '#478D46', color: '#fff', fontWeight: 'bold' }}
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
          emptyText: <Empty description="Không có dữ liệu" />,
        }}
        expandable={{
          expandedRowKeys: listExpandedRowKeys,
          onExpandedRowsChange: (e: any) => {
            setListExpandedRowKeys(e);
          },
          expandedRowRender: (record) => {
            return (
              <div
                style={{
                  maxHeight: 250,
                  overflowY: 'scroll',
                  paddingTop: 50,
                }}
              >
                <Timeline style={{ padding: 'unset', margin: 'unset' }}>
                  {record.transferInfo.length ? (
                    record?.transferInfo
                      .slice(1)
                      .reverse()
                      .map((item) => (
                        <Timeline.Item
                          key={`${item.line}-${item.receiver_name}-${item.caller_name}`}
                        >
                          <Typography.Paragraph>
                            <Typography.Text style={{ fontWeight: 'bold' }}>
                              {item.caller_name}
                            </Typography.Text>{' '}
                            đã chuyển tiếp cho{' '}
                            <Typography.Text style={{ fontWeight: 'bold' }}>
                              {item.receiver_name}
                            </Typography.Text>
                          </Typography.Paragraph>
                        </Timeline.Item>
                      ))
                  ) : (
                    <Timeline.Item style={{ fontStyle: 'italic', color: 'rgba(0,0,0,0.5)' }}>
                      Không có dữ liệu chuyển tiếp
                    </Timeline.Item>
                  )}
                  <Timeline.Item>
                    <Typography.Paragraph>
                      {record.transferInfo.length ||
                        record.caller_destination === null ||
                        record.sip_from_user === null ? (
                        <>
                          <Typography.Text style={{ fontWeight: 'bold' }}>
                            {record?.transferInfo[0]?.receiver_name}
                          </Typography.Text>{' '}
                          đã nhận cuộc gọi từ{' '}
                          <Typography.Text style={{ fontWeight: 'bold' }}>
                            {record?.transferInfo[0]?.caller_name}
                          </Typography.Text>
                        </>
                      ) : record.transferInfo.length ||
                        record.receiver_name === null ||
                        record.caller_name === null ? (
                        <>
                          <Typography.Text style={{ fontWeight: 'bold' }}>
                            {record.caller_destination}
                          </Typography.Text>{' '}
                          đã nhận cuộc gọi từ{' '}
                          <Typography.Text style={{ fontWeight: 'bold' }}>
                            {record.sip_from_user}
                          </Typography.Text>
                        </>
                      ) : (
                        <>
                          <Typography.Text style={{ fontWeight: 'bold' }}>
                            {record.receiver_name}
                          </Typography.Text>{' '}
                          đã nhận cuộc gọi từ{' '}
                          <Typography.Text style={{ fontWeight: 'bold' }}>
                            {record.caller_name}
                          </Typography.Text>
                        </>
                      )}
                    </Typography.Paragraph>
                  </Timeline.Item>
                </Timeline>
              </div>
            );
          },
          onExpand(expanded, record) {
            expanded ? fetchListDetailTransferCall.run(record.uuid) : null;
          },
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
        title={
          <Typography.Text style={{ color: 'rgba(0,0,0,1)' }}>Nghe file ghi âm</Typography.Text>
        }
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
        title={
          <Typography.Text style={{ color: 'rgba(0,0,0,1)' }}>Ghi chú cuộc gọi</Typography.Text>
        }
      >
        <div className={styles.historyCallNoteTimeline}>
          <Timeline pending={true} pendingDot={null}>
            {listNote[0]?.note?.length ? (
              listNote[0]?.note?.map((item) => (
                <Timeline.Item key={`${item.create_at}-${item.personnel}-${item.content}`}>
                  <Typography.Paragraph className={styles.historyCallNoteTime}>
                    {moment.unix(item.create_at).format('DD-MM-YYYY HH:mm:ss')}
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
                <Typography.Text style={{ color: 'rgba(0,0,0,1)' }}>
                  Không có ghi chú
                </Typography.Text>
              </div>
            )}
          </Timeline>
        </div>
      </Modal>
    </>
  );
};

export default HistoryCall;
