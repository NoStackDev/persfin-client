type Transaction = {
  title: string;
  amount: number;
  transactionType: string;
  category: string;
  budget: string;
  description: string;
  receiptImage: string[];
};

export const calculateAmount = (transactions: Transaction[] | null) => {
  let amounts = {
    balance: 0,
    savings: 0,
    inflow: 0,
    outflow: 0,
  };

  // return amounts object if transactions is undefined
  if (!transactions) {
    return amounts
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
        return amountsObj;
      case "outflow":
        amountsObj.balance -= nextTransaction.amount;
        amountsObj.outflow += nextTransaction.amount;
        return amountsObj;
      default:
        return amountsObj;
    }
  }, amounts);
};

export default calculateAmount;
