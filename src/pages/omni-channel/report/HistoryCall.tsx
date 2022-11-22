import React, { useState } from 'react';
import { Card, Table, Button, Typography, Input, Tag, Form, Select, Divider, DatePicker } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlayCircleFilled, SearchOutlined, FilterOutlined, DownOutlined, UpOutlined, EditOutlined } from '@ant-design/icons';
import DownloadIcon from '../../../../public/cloud_download.svg';
import ExportIcon from '@/components/ExportIcon/ExportIcon';
import PhoneCallOut from '../../../components/PhoneCall/phone_call_out_final.png'
import PhoneCallIn from '../../../components/PhoneCall/phone_call_in_final.png'
import { data, dataDanhba } from './FakeData';
import styles from '../report/style.less'

const { RangePicker } = DatePicker;
interface DataType {
    key: string;
    huongcuocgoi: string;
    somaygoi: string;
    tennguoigoi: string;
    somaynhan: string;
    tennguoinhan: string;
    thoigianbatdau: string;
    thoiluong: string;
    ketqua: string;
    ghiam: string;
    ghichu: string;
}

const HistoryCall: React.FC = () => {
    const [isClickFilterBtn, setClickFilterBtn] = useState(false);
    const [isActiveFilterBtn, setActiveFilterBtn] = useState(false);
    const [listValueHCG, setListValueHCG] = useState<string | any>('');
    const [listValueKQ, setListValueKQ] = useState<string | any>('');

    const [form] = Form.useForm();

    const handleViewResult = (result: any) => {
        let color;
        if (result === 'Thành công') {
            color = 'blue'
        }
        else if (result === 'Nhỡ trong hàng chờ') {
            color = 'red'
        }
        return (
            <Tag color={color}>{result}</Tag>
        )
    }

    const columns: ColumnsType<DataType> = [
        {
            title: 'Hướng cuộc gọi',
            dataIndex: 'huongcuocgoi',
            key: 'huongcuocgoi',
            align: 'center',
            width: '130px',
            render: (text, record) => {
                if (record.huongcuocgoi === 'gọi vào') {
                    return (
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                            <img src={PhoneCallIn} style={{ width: '15px', height: '15px', flex: 0.2 }} />
                            <Typography.Text style={{ flex: 0.5 }}>{record.huongcuocgoi}</Typography.Text>
                        </div>
                    )
                }
                return (
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <img src={PhoneCallOut} style={{ width: '15px', height: '15px', flex: 0.2 }} />
                        <Typography.Text style={{ flex: 0.5 }}>{record.huongcuocgoi}</Typography.Text>
                    </div>
                )
            }
        },
        {
            title: 'Số máy gọi',
            dataIndex: 'somaygoi',
            key: 'somaygoi',
            align: 'center',
            width: '10px'
        },
        {
            title: 'Tên người gọi',
            dataIndex: 'tennguoigoi',
            key: 'tennguoigoi',
            align: 'center',
            width: '150px'
        },
        {
            title: 'Số máy nhận',
            dataIndex: 'somaynhan',
            key: 'somaynhan',
            align: 'center',
            width: '110px'
        },
        {
            title: 'Tên người nhận',
            dataIndex: 'tennguoinhan',
            key: 'tennguoinhan',
            align: 'center',
            width: '140px'
        },
        {
            title: 'Thời gian bắt đầu',
            dataIndex: 'thoigianbatdau',
            key: 'thoigianbatdau',
            align: 'center',
            width: '150px'
        },
        {
            title: 'Thời lượng',
            dataIndex: 'thoiluong',
            key: 'thoiluong',
            align: 'center',
            width: '100px'
        },
        {
            title: 'Kết quả',
            dataIndex: 'ketqua',
            key: 'ketqua',
            align: 'center',
            width: '150px',
            render: (text, record) => {
                return (
                    <>
                        {handleViewResult(record.ketqua)}
                    </>
                )
            }
        },
        {
            title: 'Ghi âm',
            dataIndex: 'ghiam',
            key: 'ghiam',
            align: 'center',
            width: '100px',
            render: (text, record) => {
                return (
                    <>
                        <PlayCircleFilled style={{ color: '#1890ff', marginRight: '5px', fontSize: '25px' }} />
                        <img src={DownloadIcon} style={{ background: '#1890ff', padding: '3px', borderRadius: '30px', verticalAlign: 'sub' }} />
                    </>
                )
            }
        },
        {
            title: 'Ghi chú',
            dataIndex: 'ghichu',
            key: 'ghichu',
            align: 'center',
            width: '250px'
        },
        Table.EXPAND_COLUMN,
    ];

    const handleSelectValueHCG = (values: any) => {
        if (values !== undefined || values !== '') {
            setListValueHCG(values);
            setActiveFilterBtn(true);
        }
        else {
            setActiveFilterBtn(false);
        }
    }

    const handleSelectValueKQ = (values: any) => {
        if (values !== undefined || values !== '') {
            setListValueKQ(values);
            setActiveFilterBtn(true);
        }
        else {
            setActiveFilterBtn(false);
        }
    }

    const onReset = () => {
        form.resetFields();
        setActiveFilterBtn(false);
    };

    const handleSubmitNoteForm = (values: any) => {
        console.log(values);
    }

    const handleChangeValueRangePicker = (value: any, dateString: any) => {
        console.log(value, dateString);
    }

    return (
        <>
            <Card
                className={styles.detailCardLayout}
            >
                <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button
                        style={{ marginRight: '10px' }}
                        onClick={() => setClickFilterBtn(!isClickFilterBtn)}
                        className={isActiveFilterBtn ? `${styles.activeBtnFilter}` : `${styles.notActiveBtnFilter}`}
                    >
                        <FilterOutlined className={isActiveFilterBtn ? `${styles.activeIconFilter}` : `${styles.notActiveIconFilter}`} /> Bộ lọc
                    </Button>
                    <Input
                        style={{ width: '300px', marginRight: '10px' }}
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm"
                    />
                    <Button style={{ backgroundColor: '#7fb77e', color: '#fff' }}><ExportIcon /> Export</Button>
                </div>
                {isClickFilterBtn === true ? (
                    <div style={{ padding: '20px', backgroundColor: '#E8E8E8', marginLeft: '50%', marginTop: '10px' }}>
                        <Form layout='vertical' form={form}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', gap: 10 }}>
                                <div style={{ flex: 1 }}>
                                    <Form.Item label="Hướng cuộc gọi" name="Hướng cuộc gọi">
                                        <Select onChange={handleSelectValueHCG} value={listValueHCG}>
                                            <Select.Option value="Gọi ra">Gọi ra</Select.Option>
                                            <Select.Option value="Gọi vào">Gọi vào</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Form.Item label="Kết quả" name="Kết quả">
                                        <Select onChange={handleSelectValueKQ} value={listValueKQ}>
                                            <Select.Option value="Tất cả">Tất cả</Select.Option>
                                        </Select>
                                    </Form.Item>
                                </div>
                                <div style={{ flex: 1 }}>
                                    <Form.Item label="Thời gian" name="Thời gian">
                                        <RangePicker onChange={handleChangeValueRangePicker} placeholder={['Từ ngày', 'Đến ngày']}/>
                                    </Form.Item>
                                </div>
                            </div>
                            <Form.Item style={{ marginBottom: 'unset' }}>
                                <Button type='text' style={{ color: 'blue' }} onClick={onReset}>Reset</Button>
                            </Form.Item>
                        </Form>
                    </div>
                ) : ('')}
                <Table
                    dataSource={data}
                    columns={columns}
                    style={{ paddingLeft: '10px', paddingTop: '10px' }}
                    className={styles.tableStyle}
                    pagination={{
                        pageSize: 5,
                        showQuickJumper: true,
                        showSizeChanger: true,
                        locale: {
                            jump_to: 'Go to',
                            page: ''
                        }
                    }}
                    scroll={{ x: 300 }}
                    expandable={{
                        expandedRowRender: (record) => (
                            <>
                                <div style={{ textAlign: 'center', paddingTop: '5%' }}>
                                    <Typography.Text>Chưa có ghi chú</Typography.Text>
                                </div>
                                <div style={{ paddingTop: '5%' }}>
                                    <Divider orientation='left'>NhuVTT33 <EditOutlined /></Divider>
                                    <Form layout='vertical' onFinish={handleSubmitNoteForm}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                            <div style={{ flex: 1 }}>
                                                <Form.Item
                                                    name="note"
                                                    rules={[
                                                        {
                                                            required: true,
                                                            message: 'Vui lòng nhập ghi chú'
                                                        }
                                                    ]}
                                                >
                                                    <Input />
                                                </Form.Item>
                                            </div>
                                            <div style={{ marginLeft: '10px' }}>
                                                <Form.Item>
                                                    <Button style={{ backgroundColor: '#1890ff', color: '#fff' }} htmlType="submit">Lưu</Button>
                                                </Form.Item>
                                            </div>
                                        </div>
                                    </Form>
                                </div>
                            </>
                        ),
                        expandIcon: ({ expanded, onExpand, record }) =>
                            expanded ? (
                                <UpOutlined onClick={e => onExpand(record, e)} />
                            ) : (
                                <DownOutlined onClick={e => onExpand(record, e)} />
                            )
                    }}
                />
            </Card>
        </>
    )
}

export default HistoryCall;