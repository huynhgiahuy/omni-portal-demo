import styles from './DeletePortfolio.css'
import { Button } from "antd";
import { PortfolioGet } from "@/models/Portfolio";

interface Props {
  onPortfolioDelete: (symbol: string) => void;
  portfolioValue: PortfolioGet;
}

const DeletePortfolio = ({ onPortfolioDelete, portfolioValue }: Props) => {
  return (
    <Button className={styles.deleteButton} onClick={() => onPortfolioDelete(portfolioValue.symbol)} danger type="primary">
      Delete
    </Button>
  );
};

export default DeletePortfolio;
