import pb from "../lib/pocketbase";
import { useQuery } from "react-query";
import { BudgetType } from "../TypeDefs";
import { Record } from "pocketbase";

const getBudgets = async (): Promise<(BudgetType | Record)[]> => {
  return pb.collection("budgets").getFullList(200 /* batch size */, {
    sort: "-created",
  });
};

const FetchBudgets = () =>
  useQuery(["budgets", pb.authStore.model?.id], getBudgets);

export default FetchBudgets;
