import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

const AddOutflow = async (
  userId: string,
  title: string,
  amount: number,
  budget: string,
  item: string,
  category: string,
  description: string
) => {
  try {
    return axios({
      url: "",
      method: "POST",
      data: {
        query: `mutation AddOutflow($user: ID, $title: String, $amount: Float, $category: ID, $budget: ID, $item: ID, $description: String, $receiptImage: [String], $modelType: String) {
                    addOutflow(user: $user, title: $title, amount: $amount, category: $category, budget: $budget, item: $item, description: $description, receiptImage: $receiptImage, modelType: $modelType) {
                        user {
                            _id
                            firstname
                            lastname
                        }
                        _id
                        title
                        category {
                            _id
                            title
                            categoryType
                        }
                        amount
                    }
                  }`,
        variables: {
          user: userId,
          title,
          amount,
          budget,
          item,
          category,
          description,
        },
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

type Args = {
  userId: string;
  title: string;
  amount: number;
  item: string;
  description: string;
  category: string;
  budget: string;
};

const CreateOutflow = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      title,
      amount,
      budget,
      item,
      description,
      category,
    }: Args) =>
      AddOutflow(userId, title, amount, budget, item, category, description),
    onSuccess: () => {
      queryClient.invalidateQueries("outflows");
      queryClient.invalidateQueries("budgets");
    },
  });
};

export default CreateOutflow;
