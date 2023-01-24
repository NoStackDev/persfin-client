import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";

const AddOutflow = async (
  title: string,
  amount: number,
  budget: string,
  item: string,
  category: string,
  description: string
) => {
  console.table({ title, amount, budget, item, category, description });
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
  item: string;
  description: string;
  category: string;
  budget: string;
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
      queryClient.invalidateQueries("outflows");
      queryClient.invalidateQueries("budgets");
    },
  });
};

export default CreateOutflow;
