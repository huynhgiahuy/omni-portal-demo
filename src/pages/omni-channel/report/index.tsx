import React from "react";
import { Segmented } from 'antd';
import { BarChartOutlined, SwapOutlined, ScheduleOutlined, LineChartOutlined, PhoneOutlined } from '@ant-design/icons';
import styles from '../report/style.less'

const Report: React.FC = () => {
    return (
        <>
            <Segmented
                options={[
                    {
                        label: 'Thống kê chung',
                        value: 'Thống kê chung',
                        icon: <BarChartOutlined />
                    },
                    {
                        label: 'Bàn giao ca trực',
                        value: 'Bàn giao ca trực',
                        icon: <SwapOutlined />
                    },
                    {
                        label: 'Kế hoạch đêm',
                        value: 'Kế hoạch đêm',
                        icon: <ScheduleOutlined />
                    },
                    {
                        label: 'Năng suất nhân sự',
                        value: 'Năng suất nhân sự',
                        icon: <LineChartOutlined />
                    },
                    {
                        label: 'Lịch sử cuộc gọi',
                        value: 'Lịch sử cuộc gọi',
                        icon: <PhoneOutlined />
                    },
                ]}
                className={styles.antSegmented}
            />
        </>
    )
}

export default Report;