import { Link } from "react-router-dom";
import { PortfolioGet } from "@/models/Portfolio";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { Card } from "antd";
import styles from './CardPortfolio.css'

interface Props {
  portfolioValue: PortfolioGet;
  onPortfolioDelete: (symbol: string) => void;
}

const CardPortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div className={styles.myPortfolioList}>
      <Card>
        <Link
          to={`/omni-channel/search-page/company-profile/${portfolioValue.symbol}`}
          className={styles.myPortfolioListContent}
        >
          {portfolioValue.symbol}
        </Link>
        <br></br>
        <DeletePortfolio
          portfolioValue={portfolioValue}
          onPortfolioDelete={onPortfolioDelete}
        />
      </Card>
    </div>
  );
};

export default CardPortfolio;