import { useMutation } from "react-query";
import pb from "../../lib/pocketbase";
import { useQueryClient } from "react-query";
import { BudgetType, BudgetItemType } from "../../TypeDefs";

const AddBudget = async (
  title: string,
  description: string,
  total: number,
  items: BudgetItemType[]
) => {
  return pb
    .collection("budgets")
    .create({
      user: pb.authStore.model?.id,
      title,
      description,
      total,
      items: JSON.stringify(items),
    });
};

const CreateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, description, total, items }: BudgetType) =>
      AddBudget(title, description, total, items),
    onSuccess: () => {
      queryClient.invalidateQueries("budgets");
    },
  });
};

export default CreateBudget;
