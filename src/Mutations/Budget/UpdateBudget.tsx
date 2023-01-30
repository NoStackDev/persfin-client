import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";

const EditBudget = async (
  budgetId: string,
  title: string,
  total: number,
  balance: number,
  description: string,
  items: string
) => {
  return pb.collection("budgets").update(budgetId, {
    user: pb.authStore.model?.id,
    title,
    total,
    balance,
    description,
    items: JSON.stringify(items),
    exhausted: balance <= 0,
  });
};

const UpdateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      budgetId,
      title,
      total,
      balance,
      description,
      items,
    }: {
      budgetId: string;
      title: string;
      total: number;
      balance: number;
      description: string;
      items: string;
    }) => EditBudget(budgetId, title, total, balance, description, items),
    onSuccess: () => {
      queryClient.invalidateQueries("budgets");
    },
  });
};

export default UpdateBudget;
