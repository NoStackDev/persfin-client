import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";

const RemoveCategory = async (category: string) => {
  try {
    return axios({
      url: "",
      method: "POST",
      data: {
        query: `mutation RemoveCategory($category: ID){
                    deleteCategory(category: $category) {
                        _id
                        categoryType
                        title
                        description
                    }
                }`,
        variables: {
          category,
        },
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const DeleteCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ category }: { category: string }) =>
      RemoveCategory(category),
    onSuccess: () => queryClient.invalidateQueries("categories"),
  });
};

export default DeleteCategory;
