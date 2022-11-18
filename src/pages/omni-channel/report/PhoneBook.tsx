import React from 'react';
import { Select, Button, Input, Table, Card, Segmented } from 'antd';
import { PlayCircleFilled, SearchOutlined, FilterOutlined, StarOutlined } from '@ant-design/icons';
import type { ColumnsType } from 'antd/es/table';
import { dataDanhba } from './FakeData';
import styles from '../report/style.less';


interface DataTypeDanhBa {
    key: string;
    stt: string;
    hovaten: string;
    sodidong: string;
    somaynhanh: string;
    email: string;
    loai: string;
}

const PhoneBook: React.FC = () => {

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
    ];

    return (
        <Card className={styles.detailCardLayout}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div style={{ marginLeft: '10px' }}>
                    <Segmented
                        size='middle'
                        options={[
                            {
                                label: 'Khách hàng',
                                value: 'Khách hàng'
                            },
                            {
                                label: 'Nội bộ',
                                value: 'Nội bộ'
                            }
                        ]}
                        className={styles.antSegmented}
                    />
                </div>
                <div>
                    <Button style={{ marginRight: '10px' }} type="text">
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
    )
}

export default PhoneBook;