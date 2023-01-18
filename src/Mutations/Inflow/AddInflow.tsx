import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const AddInflow = async (
  userId: string,
  title: string,
  amount: number,
  category: string,
  description: string
) => {
  try {
    return axios({
      url: "",
      method: "POST",
      data: {
        query: `
                mutation AddInflow($user: ID, $title: String, $amount: Float, $category: ID, $description: String, $receiptImage: [String]) {
                    addInflow(user: $user, title: $title, amount: $amount, category: $category, description: $description, receiptImage: $receiptImage) {
                        user {
                            id
                            firstname
                            lastname
                        }
                        id
                        title
                        category {
                            id
                            title
                            categoryType
                        }
                        amount
                    }
                }
                `,
        variables: {
          user: userId,
          title,
          amount,
          category,
          description,
        },
      },
    });
  } catch (err: any) {
    console.log(err.message);
    return err;
  }
};

type Args = {
  userId: string;
  title: string;
  amount: number;
  description: string;
  category: string;
};

const CreateInflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, title, amount, description, category }: Args) =>
      AddInflow(userId, title, amount, category, description),
    onSuccess: () => {
      queryClient.invalidateQueries("inflows");
    },
  });
};

export default CreateInflow;
