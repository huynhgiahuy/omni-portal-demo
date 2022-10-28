import React from 'react';
import { Tabs, Button } from 'antd';
import { PlusOutlined} from '@ant-design/icons';
import styles from '../setting/style.less';

const ShiftInfo: React.FC = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '20px' }}>
            <div>
                <Button style={{ borderRadius: '4px' }}>Filter ngày</Button>
            </div>
            <div>
                <Tabs defaultActiveKey="1" className={styles.antShiftTabPane}>
                    <Tabs.TabPane tab="Ngày" key="1">
                        Content of Tab Pane Ngày
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tuần" key="2">
                        Content of Tab Pane Tuần
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Tháng" key="3">
                        Content of Tab Pane Tháng
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Năm" key="4">
                        Content of Tab Pane Năm
                    </Tabs.TabPane>
                </Tabs>
            </div>
            <div style={{ display: 'flex', gap: 10 }}>
                <Button style={{ borderRadius: '4px', backgroundColor: '#D3E1F0', color: '#0084FF', border: '#D3E1F0' }}>Today (05)</Button>
                <Button type='primary' style={{ borderRadius: '4px', color: '#fff' }}><PlusOutlined />Lịch mới</Button>
            </div>
        </div>
    )
}
export default ShiftInfo