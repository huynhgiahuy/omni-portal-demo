import { Link } from "react-router-dom";
import { PortfolioGet } from "@/models/Portfolio";
import DeletePortfolio from "../DeletePortfolio/DeletePortfolio";
import { Card, Row, Col } from "antd";
import styles from './CardPortfolio.css'

interface Props {
  portfolioValue: PortfolioGet;
  onPortfolioDelete: (symbol: string) => void;
}

const CardPortfolio = ({ portfolioValue, onPortfolioDelete }: Props) => {
  return (
    <div className={styles.myPortfolioList}>
      <Row>
        <Col>
          <Card>
            <Link
              to={`/omni-channel/${portfolioValue.symbol}/company-profile`}
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
        </Col>
      </Row >
    </div>
  );
};

export default CardPortfolio;