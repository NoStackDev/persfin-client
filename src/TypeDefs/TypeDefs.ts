export type InflowType = {
  _id: string;
  title: string;
  amount: number;
  category: CategoryType;
  description: string;
  time: string;
  createdAt: string;
  modelType: string;
};

export type OutflowType = {
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

export type BudgetType = {
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

export type BudgetItemType = {
  _id?: string;
  title: string;
  amount: number;
  category: string|null;
  balance: number;
  description: string;
};

export type SavingsType = {
    _id: string;
    amount: number;
    time: string;
    modelType: string;
    createdAt: string;
  };

export type CategoryType = {
  _id: string;
  title: string;
  categoryType: string;
  description: string;
  time: string;
  createdAt: string;
};

export interface rangeInterface {
  min: Date;
  max: Date;
}

export interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}
