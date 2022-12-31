import { BudgetType } from "../../../TypeDefs";

const filterTag = (data: BudgetType[] | null, tagFilter: boolean | null) => {
  if (!data || tagFilter === null) {
    return data;
  }
  const newBudget = data.filter((obj) => obj.completed === tagFilter);
  return newBudget;
};

export default filterTag;
