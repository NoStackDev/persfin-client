import { useMutation, useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";

const EditInflowCategory = async (
  categoryId: string,
  title: string,
  description: string
) => {
  return pb
    .collection("inflowCategories")
    .update(categoryId, { title, description });
};

const UpdateInflowCategory = () => {
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
    }) => EditInflowCategory(categoryId, title, description),
    onSuccess: () => {
      queryClient.invalidateQueries("inflowCategories");
    },
  });
};

export default UpdateInflowCategory;
