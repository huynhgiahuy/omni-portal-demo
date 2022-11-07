import React, { useState } from 'react';
import { Card, Table, Select, Button, Typography, Input, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlayCircleFilled, SearchOutlined, FilterOutlined, StarOutlined } from '@ant-design/icons';
import DownloadIcon from '../../../../public/cloud_download.svg';
import ExportIcon from '@/components/ExportIcon/ExportIcon';
//import FilterIcon from '../../../components/FilterIcon/filter_icon.png'
import TwoArrowIcon from '../../../components/TwoArrowIcon/two_arrow_icon_final.png'
import PhoneCallOut from '../../../components/PhoneCall/phone_call_out_final.png'
import PhoneCallIn from '../../../components/PhoneCall/phone_call_in_final.png'
import { data, dataDanhba } from './FakeData';
import styles from '../report/style.less'

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
interface DataTypeDanhBa {
    key: string;
    stt: string;
    hovaten: string;
    sodidong: string;
    somaynhanh: string;
    email: string;
    loai: string;
}

const HistoryCall: React.FC = () => {
    const [isChangeViewHistory, setChangeViewHistory] = useState(true);

    const handleSelectHistory = (value: any) => {
        if (value === 'Lịch sử') {
            setChangeViewHistory(true);
            console.log('aa')
        }
        else if (value === 'Danh bạ') {
            setChangeViewHistory(false);
        }
    }
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
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                            <img src={PhoneCallIn} style={{ width: '20px', height: '20px' }} /><Typography.Text>{record.huongcuocgoi}</Typography.Text>
                        </div>
                    )
                }
                return (
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 10 }}>
                        <img src={PhoneCallOut} style={{ width: '20px', height: '20px' }} /><Typography.Text>{record.huongcuocgoi}</Typography.Text>
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
            width: '80px',
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
    ];

    const columnsDanhba: ColumnsType<DataTypeDanhBa> = [
        {
            title: '',
            dataIndex: 'stt',
            key: 'stt',
            align: 'center',
            width: '10px',
            render: (text, record) => <StarOutlined />
        },
        {
            title: 'Họ và tên',
            dataIndex: 'hovaten',
            key: 'hovaten',
            align: 'center',
            width: '10px'
        },
        {
            title: 'Số di động',
            dataIndex: 'sodidong',
            key: 'sodidong',
            align: 'center',
            width: '100px'
        },
        {
            title: 'Số máy nhánh',
            dataIndex: 'somaynhanh',
            key: 'somaynhanh',
            align: 'center',
            width: '100px'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center',
            width: '100px'
        },
        {
            title: 'Loại',
            dataIndex: 'loai',
            key: 'loai',
            align: 'center',
            width: '100px'
        },

    ]

    return (
        <>
            <Card
                className={styles.detailCardLayout}
            >
                {isChangeViewHistory === true ? (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ paddingLeft: '10px', width: '100px' }}>
                                <Select defaultValue="Lịch sử" onChange={handleSelectHistory} suffixIcon={<img src={TwoArrowIcon} style={{ width: '15px', height: '15px' }} />} style={{ border: 'unset' }}>
                                    <Select.Option value="Lịch sử" style={{ fontSize: '14px' }}>Lịch sử</Select.Option>
                                    <Select.Option value="Danh bạ" style={{ fontSize: '14px' }}>Danh bạ</Select.Option>
                                </Select>
                            </div>
                            <div>
                                <Button style={{ marginRight: '10px' }}>
                                    <FilterOutlined /> Bộ lọc
                                </Button>
                                <Input
                                    style={{ width: '300px', marginRight: '10px' }}
                                    addonBefore={<SearchOutlined />}
                                    placeholder="Tìm kiếm"
                                />
                                <Button style={{ marginRight: '10px' }}>Voice Analytics</Button>
                                <Button style={{ backgroundColor: '#7fb77e', color: '#fff' }}><ExportIcon /> Export</Button>
                            </div>
                        </div>
                        <Table
                            dataSource={data}
                            columns={columns}
                            style={{ paddingLeft: '10px', paddingTop: '10px' }}
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
                        />
                    </>

                ) : (
                    <>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                            <div style={{ paddingLeft: '10px', width: '100px' }}>
                                <Select defaultValue="Lịch sử" onChange={handleSelectHistory} suffixIcon={<img src={TwoArrowIcon} style={{ width: '15px', height: '15px' }} />} style={{ border: 'unset' }}>
                                    <Select.Option value="Lịch sử" style={{ fontSize: '14px' }}>Lịch sử</Select.Option>
                                    <Select.Option value="Danh bạ" style={{ fontSize: '14px' }}>Danh bạ</Select.Option>
                                </Select>
                            </div>
                            <div>
                                <Button style={{ marginRight: '10px' }}>
                                    <FilterOutlined /> Bộ lọc
                                </Button>
                                <Input
                                    style={{ width: '300px' }}
                                    addonBefore={<SearchOutlined />}
                                    placeholder="Tìm kiếm"
                                />
                            </div>
                        </div>
                        <Table
                            dataSource={dataDanhba}
                            columns={columnsDanhba}
                            style={{ paddingLeft: '10px', paddingTop: '10px' }}
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
                        />
                    </>
                )}
            </Card>
        </>
    )
}

export default HistoryCall;