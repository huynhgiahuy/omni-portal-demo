import React from "react"
import { Card, Form, Input, Select, Row, Col } from 'antd';
import styles from '../report/style.less'

const formItemLayout = {
    labelCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24
        },
        md: {
            span: 3,
        },
    },
    wrapperCol: {
        xs: {
            span: 24,
        },
        sm: {
            span: 24
        },
        md: {
            span: 5,
        },
    },
};

const GeneralStatistic: React.FC = () => {
    return (
        <>
            <Card
                className={styles.detailCardLayout}
            >
                <Form style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Row>
                        <Col md={10}>
                            <Form.Item
                                label="Loại thống kê"
                                name="Loại thống kê"
                            >
                                <Select defaultValue="1" placeholder="Please chose">
                                    <Select.Option value="1">Phần tử sự cố</Select.Option>
                                    <Select.Option value="2">Phần tử sự cố 2</Select.Option>
                                </Select>
                            </Form.Item>
                        </Col>
                    </Row>
                    

                </Form>
            </Card>
        </>
    )
}

export default GeneralStatistic