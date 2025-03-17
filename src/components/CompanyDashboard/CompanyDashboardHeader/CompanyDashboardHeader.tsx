import { CompanyProfile } from "@/company";
import { Card, Row, Col, Typography } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { history } from "umi";
interface Props {
    data: CompanyProfile
}
const CompanyDashboardHeader = ({ data }: Props) => {

    const handleHistoryReturn = () => {
        history.push("/omni-channel/search-page")
    }

    return (
        <>
            <ArrowLeftOutlined
                style={{
                    cursor: 'pointer',
                    fontSize: 25,
                    marginBottom: '1rem'
                }}
                onClick={handleHistoryReturn}
            />
            <Typography.Text
                style={{
                    fontSize: 25,
                    marginLeft: '1rem',
                    fontWeight: 'bold'
                }}>
                {data.symbol}
            </Typography.Text>
            <Row align="top">
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
                <Col xs={2} sm={4} md={6} lg={8} xl={6}>
                    <Card>
                        <h2>Address</h2>
                        <div>{data.address}</div>
                    </Card>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={6}>
                    <Card>
                        <h2>Industry</h2>
                        <div>{data.industry}</div>
                    </Card>
                </Col>
                {data.website != null ? (
                    <Col xs={2} sm={4} md={6} lg={8} xl={6}>
                        <Card>
                            <h2>Website</h2>
                            <Typography.Link href={data.website} target="_blank">{data.website}</Typography.Link>
                        </Card>
                    </Col>
                ) : null}
                {data.phone != null ? (
                    <Col xs={2} sm={4} md={6} lg={8} xl={6}>
                        <Card>
                            <h2>Phone</h2>
                            <div>{data.phone}</div>
                        </Card>
                    </Col>
                ) : null}
            </Row>
            {data.description ? <Row>
                <Col>
                    <Card>
                        <h2>Description</h2>
                        <div style={{ textAlign: 'justify' }}>{data.description}</div>
                    </Card>
                </Col>
            </Row> : null}
        </>
    )
}
export default CompanyDashboardHeader;