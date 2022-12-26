import { InflowType, OutflowType, SavingsType } from "../../../Types";

export const calculateBalance = (
  savings: SavingsType[] | null,
  inflows: InflowType[] | null,
  outflows: OutflowType[] | null
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
