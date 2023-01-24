import pb from "../../lib/pocketbase";
import { useMutation, useQueryClient } from "react-query";

const AddInflow = async (
  title: string,
  amount: number,
  category: string,
  description: string
) => {
  return pb.collection("inflows").create({
    user: pb.authStore.model?.id,
    title,
    amount,
    category,
    description,
  });
};

type Args = {
  title: string;
  amount: number;
  description: string;
  category: string;
};

const CreateInflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, amount, description, category }: Args) =>
      AddInflow(title, amount, category, description),
    onSuccess: () => {
      queryClient.invalidateQueries("inflows");
    },
  });
};

export default CreateInflow;
