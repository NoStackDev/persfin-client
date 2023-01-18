import { Record } from "pocketbase";
import { BudgetType } from "../../../TypeDefs";

const filterTag = (
  data: (BudgetType | Record)[] | undefined,
  tagFilter: boolean | null
) => {
  if (!data || tagFilter === null) {
    return data;
  }
  const newBudget = data.filter((obj) => obj.exhausted === tagFilter);
  return newBudget;
};

export default filterTag;
