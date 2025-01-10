import CardPortfolio from "../CardPortfolio/CardPortfolio";
import { PortfolioGet } from "@/models/Portfolio";
import styles from './ListPortfolio.css'

interface Props {
  portfolioValues: PortfolioGet[];
  onPortfolioDelete: (symbol: string) => void;
}

const ListPortfolio = ({ portfolioValues, onPortfolioDelete }: Props) => {
  return (
    <>
      <h2 className={styles.myPortfolioHeader}>
        My Portfolio
      </h2>
      <div className={styles.myPortfolioContent}>
        {portfolioValues.length > 0 ? (
          portfolioValues.map((portfolioValue) => {
            return (
              <CardPortfolio
                portfolioValue={portfolioValue}
                onPortfolioDelete={onPortfolioDelete}
                key={portfolioValue.id}
              />
            );
          })
        ) : (
          <h3>
            Your portfolio is empty.
          </h3>
        )}
      </div>
    </>
  );
};

export default ListPortfolio;

