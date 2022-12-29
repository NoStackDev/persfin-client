import { SavingsType } from "../../../TypeDefs";

const calculateSavings = (objArr: SavingsType[] | null): number => {
  const total = objArr?.reduce((prevValue, currentObj) => {
    return prevValue + currentObj.amount;
  }, 0);

  return total ? total : 0;
};

export default calculateSavings;
