import {
  InflowType,
  OutflowType,
  BudgetType,
  SavingsType,
} from "../../../Types";

type DataObj = InflowType[] | OutflowType[] | BudgetType[] | SavingsType[];

const collateData = (data: Array<DataObj | null>) => {
  const modedData = data.flat();
  modedData.sort((a, b) => {
    return Number(b?.time) - Number(a?.time);
  });
  return modedData;
};

export default collateData;
