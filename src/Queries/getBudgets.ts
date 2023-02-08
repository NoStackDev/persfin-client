import pb from "../lib/pocketbase";
import { useQuery } from "react-query";
import { BudgetType } from "../TypeDefs";
import { Record } from "pocketbase";

const getBudgets = async (): Promise<(BudgetType | Record)[]> => {
  return pb.collection("budgets").getFullList(200 /* batch size */, {
    sort: "-created",
  });
};

const useBudgetsQuery = () => {
  const queryInfo = useQuery({ queryKey: ["budgets"], queryFn: getBudgets });

  return {
    ...queryInfo,
    data: queryInfo.data?.map((budget) => {
      return { ...budget, items: JSON.parse(budget.items) } as BudgetType;
    }),
  };
};

export default useBudgetsQuery;
