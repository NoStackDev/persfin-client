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
  modelType: string;
};

type Savings = {
  _id: string;
  amount: number;
  time: string;
  modelType: string;
};

const collateData = (data: Array<Transaction[] | Savings[] | null>) => {
  const modedData = data.flat();
  modedData.sort((a, b) => {
    return Number(b?.time) - Number(a?.time);
  });
  return modedData;
};

export default collateData;
