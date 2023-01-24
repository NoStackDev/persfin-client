import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";

const RemoveBudget = async (budgetId: string) => {
  return pb.collection("budgets").delete(budgetId);
};

const DeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ budgetId }: { budgetId: string }) => RemoveBudget(budgetId),
    onSuccess: () => queryClient.invalidateQueries("budgets"),
  });
};

export default DeleteBudget;
