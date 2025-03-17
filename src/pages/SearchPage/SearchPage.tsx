import { useState, ChangeEvent, SyntheticEvent, useEffect } from "react";
import { CompanySearch } from "../../company";
import { searchCompanies } from "../../api";
import Search from "@/components/Search/Search";
import ListPortfolio from "@/pages/Portfolio/ListPortfolio/ListPortfolio";
import CardList from "@/components/CardList/CardList";
import { PortfolioGet } from "@/models/Portfolio";
import {
  portfolioAddAPI,
  portfolioDeleteAPI,
  portfolioGetAPI,
} from "@/services/PortfolioService";
import { history } from "umi";
import { message, Card } from 'antd'

interface Props { }

const SearchPage = (props: Props) => {
  const [search, setSearch] = useState<string>("");
  const [portfolioValues, setPortfolioValues] = useState<PortfolioGet[] | null>([]);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
  const userToken = window.localStorage.getItem("token");

  useEffect(() => {
    if (userToken) {
      getPortfolio();
    }
    else {
      history.push("/user/login")
    }
  }, []);

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const getPortfolio = () => {
    portfolioGetAPI()
      .then((res) => {
        if (res?.data) {
          setPortfolioValues(res?.data);
        }
      })
      .catch((e) => {
        setPortfolioValues(null);
      });
  };

  const onPortfolioCreate = (symbol: string) => {
    portfolioAddAPI(symbol)
      .then((res) => {
        if (res?.status === 204) {
          getPortfolio();
          message.success('Thêm thành công!')
        }
      })
      .catch((e: any) => {
        message.warning(e);
      });
  };

  const onPortfolioDelete = (symbol: string) => {
    portfolioDeleteAPI(symbol).then((res) => {
      if (res?.status === 200) {
        getPortfolio();
        message.success('Xóa thành công!')
      }
    });
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    if (typeof result == 'string') {
      message.error('Không thể lấy dữ liệu!')
      setServerError(result);
    } else if (Array.isArray(result.data) && result.data.length > 0) {
      message.success('Lấy dữ liệu thành công!')
      setSearchResult(result.data);
    }
  };
  return (
    <>
      <Search
        onSearchSubmit={onSearchSubmit}
        search={search}
        handleSearchChange={handleSearchChange}
      />
      <ListPortfolio
        portfolioValues={portfolioValues!}
        onPortfolioDelete={onPortfolioDelete}
      />
      <CardList
        searchResults={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
      {serverError && <Card>Unable to connect to API</Card>}
    </>
  );
};

export default SearchPage;
