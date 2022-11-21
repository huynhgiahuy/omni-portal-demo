import React, { useState } from 'react';
import { Card, Table, Button, Typography, Input, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { PlayCircleFilled, SearchOutlined, FilterOutlined, StarOutlined } from '@ant-design/icons';
import DownloadIcon from '../../../../public/cloud_download.svg';
import ExportIcon from '@/components/ExportIcon/ExportIcon';
//import FilterIcon from '../../../components/FilterIcon/filter_icon.png'
import PhoneCallOut from '../../../components/PhoneCall/phone_call_out_final.png'
import PhoneCallIn from '../../../components/PhoneCall/phone_call_in_final.png'
import PhoneCallGreen from '../../../../public/phone_call_green.svg';
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
            width: '100px',
            render: (text, record) => {
                return (<img src={PhoneCallGreen} />)
            }
        },

    ]

    return (
        <>
            <Card
                className={styles.detailCardLayout}
            >
                <div style={{ display: 'flex', justifyContent: 'right' }}>
                    <Button style={{ marginRight: '10px' }} type="text">
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
                />
            </Card>
        </>
    )
}

export default HistoryCall;