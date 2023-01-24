import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";

const RemoveOutflowCategory = async (categoryId: string) => {
  return pb.collection("outflowCategories").delete(categoryId);
};

const DeleteOutflowCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId }: { categoryId: string }) =>
      RemoveOutflowCategory(categoryId),
    onSuccess: () => queryClient.invalidateQueries("outflowCategories"),
  });
};

export default DeleteOutflowCategory;
