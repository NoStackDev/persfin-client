type Transaction = {
  title: string;
  amount: number;
  transactionType: string;
  category: string;
  budget: string;
  description: string;
  receiptImage: string[];
};

interface amountsInterface {
  balance: number;
  savings: number;
  inflow: number;
  inflowArray: number[];
  outflow: number;
  outflowArray: number[];
}

export const calculateAmount = (transactions: Transaction[] | null) => {
  let amounts: amountsInterface = {
    balance: 0,
    savings: 0,
    inflow: 0,
    inflowArray: [],
    outflow: 0,
    outflowArray: [],
  };

  // return amounts object if transactions is undefined
  if (!transactions) {
    return amounts;
  }

  return transactions?.reduce((amountsObj, nextTransaction) => {
    switch (nextTransaction.transactionType) {
      case "savings":
        amountsObj.balance -= nextTransaction.amount;
        amountsObj.savings += nextTransaction.amount;
        return amountsObj;

      case "inflow":
        amountsObj.balance += nextTransaction.amount;
        amountsObj.inflow += nextTransaction.amount;
        amountsObj.inflowArray.push(nextTransaction.amount);
        return amountsObj;

      case "outflow":
        amountsObj.balance -= nextTransaction.amount;
        amountsObj.outflow += nextTransaction.amount;
        amountsObj.outflowArray.push(nextTransaction.amount);
        return amountsObj;

      default:
        return amountsObj;
    }
  }, amounts);
};

export default calculateAmount;
