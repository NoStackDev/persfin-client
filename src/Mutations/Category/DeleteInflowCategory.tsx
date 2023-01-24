import { useMutation } from "react-query";
import { useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";

const RemoveInflowCategory = async (categoryId: string) => {
  return pb.collection("inflowCategories").delete(categoryId);
};

const DeleteInflowCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ categoryId }: { categoryId: string }) =>
      RemoveInflowCategory(categoryId),
    onSuccess: () => queryClient.invalidateQueries("inflowCategories"),
  });
};

export default DeleteInflowCategory;
