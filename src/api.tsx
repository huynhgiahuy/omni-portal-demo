import axios from "axios";
import { message } from 'antd';
import {
  CompanyBalanceSheet,
  CompanyCashFlow,
  CompanyIncomeStatement,
  CompanyKeyMetrics,
  CompanyProfile,
  CompanySearch,
  CompanyTenK,
  CompanyHistoricalDividend,
} from "./company";

export interface SearchResponse {
  data: CompanySearch[];
}

export const apiKey = "D4QQfbgsqa5qjvb65gUpoxhF8Fh2ktCD";

export const searchCompanies = async (query: string) => {
  const headerAuth = { Authorization: `Bearer ${localStorage.getItem("token")}` };
  try {
    const data = await axios.get<SearchResponse>(
      `https://financialmodelingprep.com/api/v3/search?query=${query}&limit=10&exchange=NASDAQ&apikey=${apiKey}`
      , { headers: headerAuth });
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      message.error(error.message);
      return error.message;
    } else {
      message.error('Unexpected error has occured');
      return "An expected error has occured.";
    }
  }
};

export const getCompanyProfile = async (query: string) => {
  try {
    const data = await axios.get<CompanyProfile[]>(
      `https://financialmodelingprep.com/api/v3/profile/${query}?apikey=${apiKey}`
      , { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    return data;
  } catch (error: any) {
    message.error(error.message);
  }
  return;
};

export const getKeyMetrics = async (query: string) => {
  try {
    const data = await axios.get<CompanyKeyMetrics[]>(
      `https://financialmodelingprep.com/api/v3/key-metrics-ttm/${query}?limit=40&apikey=${process.env.REACT_APP_API_KEY}`
      , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    return data;
  } catch (error: any) {
    message.error(error.message);
  }
  return;
};

export const getIncomeStatement = async (query: string) => {
  try {
    const data = await axios.get<CompanyIncomeStatement[]>(
      `https://financialmodelingprep.com/api/v3/income-statement/${query}?limit=50&apikey=${process.env.REACT_APP_API_KEY}`
      , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    return data;
  } catch (error: any) {
    message.error(error.message);
  }
  return;
};

export const getBalanceSheet = async (query: string) => {
  try {
    const data = await axios.get<CompanyBalanceSheet[]>(
      `https://financialmodelingprep.com/api/v3/balance-sheet-statement/${query}?limit=20&apikey=${process.env.REACT_APP_API_KEY}`
      , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    return data;
  } catch (error: any) {
    message.error(error.message);
  }
  return;
};

export const getCashFlow = async (query: string) => {
  try {
    const data = await axios.get<CompanyCashFlow[]>(
      `https://financialmodelingprep.com/api/v3/cash-flow-statement/${query}?limit=100&apikey=${process.env.REACT_APP_API_KEY}`
      , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    return data;
  } catch (error: any) {
    message.error(error.message);
  }
  return;
};

export const getTenK = async (query: string) => {
  try {
    const data = await axios.get<CompanyTenK[]>(
      `https://financialmodelingprep.com/api/v3/sec_filings/${query}?type=10-K&page=0&apikey=${process.env.REACT_APP_API_KEY}`
      , { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } });
    return data;
  } catch (error: any) {
    message.error(error.message);
  }
  return;
};

export const getHistoricalDividend = async (query: string) => {
  try {
    const data = await axios.get<CompanyHistoricalDividend>(
      `https://financialmodelingprep.com/api/v3/historical-price-full/stock_dividend/${query}?apikey=${process.env.REACT_APP_API_KEY}`
      , {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      });
    return data;
  } catch (error: any) {
    message.error(error.message);
  }
  return;
};
