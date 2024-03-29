import pb from "../../lib/pocketbase";
import { useMutation, useQueryClient } from "react-query";
import { CategoryType } from "../../TypeDefs";

const AddOutflowCategory = async (title: string, description: string) => {
  return pb
    .collection("outflowCategories")
    .create({ title, description, user: pb.authStore.model?.id });
};

const CreateOutflowCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, description }: CategoryType) =>
      AddOutflowCategory(title, description),
    onSuccess: () => {
      queryClient.invalidateQueries("outflowCategories");
    },
  });
};

export default CreateOutflowCategory;
