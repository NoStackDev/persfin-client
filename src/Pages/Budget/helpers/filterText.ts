import { Record } from "pocketbase";
import { BudgetType } from "../../../TypeDefs";

const filterText = (
  data: (BudgetType | Record)[] | null,
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

export default filterText;
