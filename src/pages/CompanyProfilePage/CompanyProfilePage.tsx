import { useEffect, useState } from "react";
import { CompanyProfile } from "@/company";
import { getCompanyProfile } from "@/api";
import { useParams } from "umi";
import CompanyDashboard from "@/components/CompanyDashboard/CompanyDashboardHeader/CompanyDashboardHeader";
import { PageLoading } from "@ant-design/pro-layout";

const CompanyProfilePage = () => {

    const [companyData, setCompanyData] = useState<CompanyProfile>();
    const { symbol } = useParams<{ symbol: string }>();

    const getCompanyDataList = async () => {
        const value = await getCompanyProfile(symbol);
        setCompanyData(value?.data[0]);
    }

    useEffect(() => {
        getCompanyDataList();
    }, [])

    return (
        <>
            {companyData ? (
                <CompanyDashboard data={companyData} />
            ) : (
                <PageLoading />
            )}
        </>
    )
}
export default CompanyProfilePage;