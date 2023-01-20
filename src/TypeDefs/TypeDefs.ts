interface PockectBaseType {
  id: string;
  created: string;
  updated: string;
  collectionId: string;
  collectionName: string;
  expand: {};
}

export interface InflowType extends PockectBaseType {
  title: string;
  amount: number;
  category: CategoryType;
  description: string;
}

export interface OutflowType extends PockectBaseType {
  title: string;
  amount: number;
  category: CategoryType;
  budget: string;
  item: string;
  description: string;
}

export interface BudgetType extends PockectBaseType {
  title: string;
  total: number;
  balance: number;
  status: string;
  description: string;
  items: BudgetItemType[];
  exhausted: boolean;
}

export type BudgetItemType = {
  id: string;
  title: string;
  amount: number;
  category: string | null;
  balance: number;
  description: string;
};

export interface SavingsType extends PockectBaseType {
  amount: number;
  modelType: string;
}

export interface CategoryType extends PockectBaseType {
  title: string;
  description: string;
}

export interface rangeInterface {
  min: Date;
  max: Date;
}

export interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}
