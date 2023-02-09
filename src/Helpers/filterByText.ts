import { Record } from "pocketbase";
import { BudgetType, InflowType, OutflowType } from "../TypeDefs";

const filterByText = (
  data: (BudgetType | InflowType | OutflowType | Record)[] | null,
  textFilter: string
) => {
  if (textFilter.trim() === "" || !data) {
    return data;
  }

  const newData = data.filter((obj) =>
    obj.title.toLowerCase().trim().includes(textFilter.toLowerCase().trim())
  );
  return newData;
};

export default filterByText;
