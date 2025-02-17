import React from "react";
import { Card, } from "antd";
import { CompanySearch } from "../../company";
import styles from './CardList.css'
import AddPortfolio from "@/pages/Portfolio/AddPortfolio/AddPortfolio";

interface Props {
  searchResults: CompanySearch[];
  onPortfolioCreate: (symbol: string) => void;
}

const CardList: React.FC<Props> = ({
  searchResults,
  onPortfolioCreate,
}: Props): JSX.Element => {
  return (
    <>
      {searchResults.length > 0 ? (
        searchResults.map((result) => {
          return (
            <Card
              id={result.symbol}
              className={styles.cardList}
              key={result.symbol}
            >

              <div className={styles.cardListContent}>
                {result.symbol}_{result.name}_{result.exchangeShortName}_{result.currency}_{result.stockExchange}
                <AddPortfolio onPortfolioCreate={onPortfolioCreate} symbol={result.symbol} />
              </div>
            </Card>
          );
        })
      ) : null}
    </>
  );
};

export default CardList;
