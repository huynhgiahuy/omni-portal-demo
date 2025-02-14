import { CompanyProfile } from "@/company";
import { Card, Row, Col } from "antd";
interface Props {
    data: CompanyProfile
}
const CompanyDashboardHeader = ({ data }: Props) => {
    return (
        <>
            <Row justify="space-between" align="top">
                <Col xs={2} sm={4} md={6} lg={8} xl={6}>
                    <Card>
                        <h2>Company Name</h2>
                        <div>{data.companyName}</div>
                    </Card>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={6}>
                    <Card>
                        <h2>Price</h2>
                        <div>{data.price}</div>
                    </Card>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={6}>
                    <Card>
                        <h2>DCF</h2>
                        <div>{data.dcf}</div>
                    </Card>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={6}>
                    <Card>
                        <h2>Sector</h2>
                        <div>{data.sector}</div>
                    </Card>
                </Col>
            </Row>
            {data.description ? <Row>
                <Col>
                    <Card>
                        <h2>Description</h2>
                        <div>{data.description}</div>
                    </Card>
                </Col>
            </Row> : null}
        </>
    )
}
export default CompanyDashboardHeader;