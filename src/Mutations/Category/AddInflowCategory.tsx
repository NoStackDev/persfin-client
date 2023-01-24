import { useMutation, useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";
import { CategoryType } from "../../TypeDefs";

const AddInflowCategory = async (title: string, description: string) => {
  return pb
    .collection("inflowCategories")
    .create({ title, description, user: pb.authStore.model?.id });
};

const CreateInflowCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title, description }: CategoryType) =>
      AddInflowCategory(title, description),
    onSuccess: () => {
      queryClient.invalidateQueries("inflowCategories");
    },
  });
};

export default CreateInflowCategory;
