import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const EditCategory = async (
  categoryId: string,
  title: string,
  description: string
) => {
  try {
    return axios({
      url: "",
      method: "POST",
      data: {
        query: `mutation UpdateCategory($categoryId: ID, $title: String, $description: String) {
                    updateCategory(categoryId: $categoryId, title: $title, description: $description) {
                        
                          _id
                          categoryType
                          title
                          description
                    }
                }`,
        variables: {
          categoryId,
          title,
          description,
        },
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const UpdateCategory = () => {
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
    }) => EditCategory(categoryId, title, description),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

export default UpdateCategory;
