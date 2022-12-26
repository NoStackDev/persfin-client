import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { CategoryType } from "../../Types";

const AddCategory = async (
  userId: string,
  title: string,
  categoryType: string,
  description: string
) => {
  try {
    return axios({
      url: "",
      method: "POST",
      data: {
        query: `mutation AddCategory($user: ID, $title: String, $categoryType: String, $description: String) {
                    addCategory(user: $user, title: $title, categoryType: $categoryType, description: $description) {
                        
                          _id
                          categoryType
                          title
                          description
                    }
                }`,
        variables: {
          user: userId,
          title,
          description,
          categoryType,
        },
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const CreateCategory = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      title,
      description,
      categoryType,
    }: CategoryType & { userId: string }) =>
      AddCategory(userId, title, categoryType, description),
    onSuccess: () => {
      queryClient.invalidateQueries("categories");
    },
  });
};

export default CreateCategory;
