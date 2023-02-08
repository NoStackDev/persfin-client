import { Record } from "pocketbase";
import { useMutation, useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";
import { BudgetItemType, BudgetType } from "../../TypeDefs";

const AddOutflow = async (
  title: string,
  amount: number,
  budget: BudgetType | Record | null,
  item: BudgetItemType,
  category: string,
  description: string
) => {
  return pb.collection("outflows").create({
    title,
    amount,
    budget,
    item,
    category,
    description,
    user: pb.authStore.model?.id,
  });
};

type Args = {
  title: string;
  amount: number;
  item: BudgetItemType;
  description: string;
  category: string;
  budget: BudgetType | Record | null;
};

const CreateOutflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      title,
      amount,
      budget,
      item,
      description,
      category,
    }: Args) => AddOutflow(title, amount, budget, item, category, description),
    onSuccess: () => {
      queryClient.invalidateQueries(["outflows"]);
      queryClient.invalidateQueries(["budgets"]);
    },
  });
};

export default CreateOutflow;
