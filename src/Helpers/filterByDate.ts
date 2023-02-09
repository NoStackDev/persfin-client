import { Record } from "pocketbase";
import {
  BudgetType,
  InflowType,
  OutflowType,
  SavingsType,
  TimeRangeInterface,
} from "../TypeDefs";

const filterByDate = (
  data:
    | (BudgetType | InflowType | OutflowType | SavingsType | Record)[]
    | undefined,
  filterRange: TimeRangeInterface | null
) => {
  if (!data) {
    return null;
  }

  if (!filterRange) {
    data.sort((a, b) => {
      return Number(b?.created) - Number(a?.created);
    });
    return data;
  }

  const range = filterRange.range();
  const filteredData = data.filter((obj) => {
    return (
      range.min <= new Date(obj.created) &&
      new Date(obj.created) <=
        new Date(
          range.max.getTime() +
            (1000 * 60 * 60 * 22 + 1000 * 60 * 59 + 1000 * 59)
        )
    );
  });

  filteredData.sort((a, b) => {
    return Number(b?.created) - Number(a?.created);
  });
  return filteredData;
};

export default filterByDate;
