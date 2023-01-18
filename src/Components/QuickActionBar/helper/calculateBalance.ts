import { Record } from "pocketbase";
import { InflowType, OutflowType, SavingsType } from "../../../TypeDefs";

export const calculateBalance = (
  savings: (SavingsType | Record)[] | undefined,
  inflows: (InflowType | Record)[] | undefined,
  outflows: (OutflowType | Record)[] | undefined
) => {
  const savingsAmount =
    savings?.reduce((prevValue, currentSavingsObj) => {
      return prevValue + currentSavingsObj.amount;
    }, 0) || 0;
  const inflowAmount =
    inflows?.reduce((prevValue, currentInflowObj) => {
      return prevValue + currentInflowObj.amount;
    }, 0) || 0;
  const outflowAmount =
    outflows?.reduce((prevValue, currentOutflowObj) => {
      return prevValue + currentOutflowObj.amount;
    }, 0) || 0;

  return inflowAmount - savingsAmount - outflowAmount;
};

export default calculateBalance;
