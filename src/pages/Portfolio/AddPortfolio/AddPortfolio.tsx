import { Button } from "antd";

interface Props {
  onPortfolioCreate: (symbol: string) => void;
  symbol: string;
}

const AddPortfolio = ({ onPortfolioCreate, symbol }: Props) => {
  return (
    <Button
      type="primary"
      onClick={() => onPortfolioCreate(symbol)}
    >
      Add
    </Button>
  );
};

export default AddPortfolio;
