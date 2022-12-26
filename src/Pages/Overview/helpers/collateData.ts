type InflowType = {
  _id: string;
  title: string;
  amount: number;
  category: CategoryType;
  description: string;
  time: string;
  createdAt: string;
  modelType: string;
};

type OutflowType = {
  _id: string;
  title: string;
  amount: number;
  category: CategoryType;
  budget: string;
  item: string;
  description: string;
  receiptImage: string[];
  time: string;
  createdAt: string;
  modelType: string;
};

type BudgetType = {
  _id: string;
  title: string;
  total: number;
  balance: number;
  status: string;
  description: string;
  items: BudgetItemType[];
  time: string;
  completed: boolean;
  createdAt: string;
  modelType: string;
};

type BudgetItemType = {
  _id: string;
  title: string;
  amount: number;
  category: string;
  balance: number;
  description: string;
};

type SavingsType = {
  _id: string;
  amount: number;
  time: string;
  modelType: string;
  title?: string;
  createdAt: string
};

type CategoryType = {
  _id: string;
  title: string;
  categoryType: string;
  description: string;
  createdAt: string;
};

type DataObj = InflowType[] | OutflowType[] | BudgetType[] | SavingsType[];

const collateData = (data: Array<DataObj | null>) => {
  const modedData = data.flat();
  modedData.sort((a, b) => {
    return Number(b?.time) - Number(a?.time);
  });
  return modedData;
};

export default collateData;
