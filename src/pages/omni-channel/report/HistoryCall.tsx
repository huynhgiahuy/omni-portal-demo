import React from 'react';
import { Card, Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
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

const columns: ColumnsType<DataType> = [
    {
        title: 'Hướng cuộc gọi',
        dataIndex: 'huongcuocgoi',
        key: 'huongcuocgoi',
        align: 'center',
        width: '140px'
    },
    {
        title: 'Số máy gọi',
        dataIndex: 'somaygoi',
        key: 'somaygoi',
        align: 'center',
    },
    {
        title: 'Tên người gọi',
        dataIndex: 'tennguoigoi',
        key: 'tennguoigoi',
        align: 'center',
    },
    {
        title: 'Số máy nhận',
        dataIndex: 'somaynhan',
        key: 'somaynhan',
        align: 'center',
    },
    {
        title: 'Tên người nhận',
        dataIndex: 'tennguoinhan',
        key: 'tennguoinhan',
        align: 'center',
    },
    {
        title: 'Thời gian bắt đầu',
        dataIndex: 'thoigianbatdau',
        key: 'thoigianbatdau',
        align: 'center',
    },
    {
        title: 'Thời lượng',
        dataIndex: 'thoiluong',
        key: 'thoiluong',
        align: 'center',
    },
    {
        title: 'Kết quả',
        dataIndex: 'ketqua',
        key: 'ketqua',
        align: 'center',
    },
    {
        title: 'Ghi âm',
        dataIndex: 'ghiam',
        key: 'ghiam',
        align: 'center',
    },
    {
        title: 'Ghi chú',
        dataIndex: 'ghichu',
        key: 'ghichu',
        align: 'center',
    },

];

const data: DataType[] = [
    {
        key: '1',
        huongcuocgoi: 'gọi vào',
        somaygoi: '09098029992',
        tennguoigoi: 'Nguyễn Thu Hương',
        somaynhan: '109',
        tennguoinhan: 'Trần Hồng Quân',
        thoigianbatdau: '31/01/2022 19:09:09',
        thoiluong: '00:11:16',
        ketqua: 'Thành công',
        ghiam: 'ok',
        ghichu: 'test'
    },
    {
        key: '2',
        huongcuocgoi: 'gọi vào',
        somaygoi: '09098029992',
        tennguoigoi: 'Nguyễn Thu Hương',
        somaynhan: '109',
        tennguoinhan: 'Trần Hồng Quân',
        thoigianbatdau: '31/01/2022 19:09:09',
        thoiluong: '00:11:16',
        ketqua: 'Thành công',
        ghiam: 'ok',
        ghichu: 'test'
    },
    {
        key: '3',
        huongcuocgoi: 'gọi vào',
        somaygoi: '09098029992',
        tennguoigoi: 'Nguyễn Thu Hương',
        somaynhan: '109',
        tennguoinhan: 'Trần Hồng Quân',
        thoigianbatdau: '31/01/2022 19:09:09',
        thoiluong: '00:11:16',
        ketqua: 'Thành công',
        ghiam: 'ok',
        ghichu: 'test'
    },
    {
        key: '4',
        huongcuocgoi: 'gọi vào',
        somaygoi: '09098029992',
        tennguoigoi: 'Nguyễn Thu Hương',
        somaynhan: '109',
        tennguoinhan: 'Trần Hồng Quân',
        thoigianbatdau: '31/01/2022 19:09:09',
        thoiluong: '00:11:16',
        ketqua: 'Thành công',
        ghiam: 'ok',
        ghichu: 'test'
    },
    {
        key: '5',
        huongcuocgoi: 'gọi vào',
        somaygoi: '09098029992',
        tennguoigoi: 'Nguyễn Thu Hương',
        somaynhan: '109',
        tennguoinhan: 'Trần Hồng Quân',
        thoigianbatdau: '31/01/2022 19:09:09',
        thoiluong: '00:11:16',
        ketqua: 'Thành công',
        ghiam: 'ok',
        ghichu: 'test'
    },
];


const HistoryCall: React.FC = () => {
    return (
        <>
            <Card
                className={styles.detailCardLayout}
            >
                <Table
                    dataSource={data}
                    columns={columns}
                    style={{ padding: '10px' }}
                />

            </Card>
        </>
    )
}

export default HistoryCall;