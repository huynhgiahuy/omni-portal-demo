import axios from "axios";
import { PortfolioGet, PortfolioPost } from "@/models/Portfolio";
import { handleError } from "@/helpers/ErrorHandler";

const api = "http://localhost:5131/api/portfolio/";

export const portfolioAddAPI = async (symbol: string) => {
  try {
    const data = await axios.post<PortfolioPost>(api + `?symbol=${symbol}`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return data;
  } catch (error) {
    handleError(error);
  }
  return;
};

export const portfolioDeleteAPI = async (symbol: string) => {
  try {
    const data = await axios.delete<PortfolioPost>(api + `?symbol=${symbol}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return data;
  } catch (error) {
    handleError(error);
  }
  return;
};

export const portfolioGetAPI = async () => {
  try {
    const data = await axios.get<PortfolioGet[]>(api, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    });
    return data;
  } catch (error) {
    handleError(error);
  }
  return;
};
