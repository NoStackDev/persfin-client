import { useMutation, useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";

const EditOutflowCategory = async (
  categoryId: string,
  title: string,
  description: string
) => {
  return pb
    .collection("outflowCategories")
    .update(categoryId, { title, description });
};

const UpdateOutflowCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      categoryId,
      title,
      description,
    }: {
      categoryId: string;
      title: string;
      description: string;
    }) => EditOutflowCategory(categoryId, title, description),
    onSuccess: () => {
      queryClient.invalidateQueries("outflowCategories");
    },
  });
};

export default UpdateOutflowCategory;
