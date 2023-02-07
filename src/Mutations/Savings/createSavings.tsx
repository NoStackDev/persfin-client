import { useMutation, useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";
import { SavingsType } from "../../TypeDefs";

const AddSavings = async (amount: number) => {
  return pb
    .collection("savings")
    .create({ user: pb.authStore.model?.id, amount });
};

const CreateSavings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ amount }: { amount: number }) => AddSavings(amount),
    onSuccess: () => {
      queryClient.invalidateQueries("savings");
    },
  });
};

export default CreateSavings;
