type Savings = {
  _id: string;
  amount: number;
  time: string;
};

type Transaction = {
  _id: string;
  title: string;
  amount: number;
  category: {
    _id: string;
    title: string;
    categoryType: string;
  };
  budget: string;
  description: string;
  receiptImage: string[];
  time: string;
  createdAt: Date;
};

export const calculateBalance = (
  savings: Savings[] | null,
  inflows: Transaction[] | null,
  outflows: Transaction[] | null
) => {
  const savingsAmount =
    savings?.reduce((prevValue, currentSavingsObj) => {
      return prevValue + currentSavingsObj.amount;
    }, 0) || 0;
  const inflowAmount =
    inflows?.reduce((prevValue, currentInflowObj) => {
      return prevValue + currentInflowObj.amount;
    }, 0) || 0;
  const outflowAmount =
    outflows?.reduce((prevValue, currentOutflowObj) => {
      return prevValue + currentOutflowObj.amount;
    }, 0) || 0;

  return inflowAmount - savingsAmount - outflowAmount;
};

export default calculateBalance;
