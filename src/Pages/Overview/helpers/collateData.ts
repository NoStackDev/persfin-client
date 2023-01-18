import { Record } from "pocketbase";
import {
  InflowType,
  OutflowType,
  BudgetType,
  SavingsType,
} from "../../../TypeDefs";

type DataObj =
  | (InflowType | Record)[]
  | (OutflowType | Record)[]
  | (BudgetType | Record)[]
  | (SavingsType | Record)[];

const collateData = (data: Array<DataObj | undefined>) => {
  const modedData = data.flat();
  modedData.sort((a, b) => {
    return Number(b?.created) - Number(a?.created);
  });
  return modedData;
};

export default collateData;
