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
//import { toast } from "react-toastify";
import { history } from "umi";

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
        }
      })
      .catch((e) => {
        console.log(e)
      });
  };

  const onPortfolioDelete = (symbol: string) => {
    portfolioDeleteAPI(symbol).then((res) => {
      if (res?.status === 200) {
        getPortfolio();
      }
    });
  };

  const onSearchSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    const result = await searchCompanies(search);
    //setServerError(result.data);
    if (typeof result === "string") {
      setServerError(result);
    } else if (Array.isArray(result.data)) {
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
      {serverError && <div>Unable to connect to API</div>}
    </>
  );
};

export default SearchPage;
