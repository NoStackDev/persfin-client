import { Record } from "pocketbase";
import {
  InflowType,
  BudgetType,
  SavingsType,
  OutflowType,
} from "../../../../../TypeDefs";

type DataObj = InflowType | BudgetType | SavingsType | OutflowType | Record;

const calculateFilteredAmount = (objArr: DataObj[] | null) => {
  if (objArr && objArr.length > 0) {
    const total = objArr.reduce((prevValue, currentObj) => {
      if (currentObj["@collectionName"] === "budgets") {
        return prevValue + (currentObj as BudgetType).total;
      }
      return (
        prevValue +
        (currentObj as InflowType | OutflowType | SavingsType).amount
      );
    }, 0);
    return total;
  } else return 0;
};

export default calculateFilteredAmount;
