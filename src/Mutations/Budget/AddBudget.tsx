import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";

interface ItemInterface {
  title: string;
  description: string;
  category: string;
  amount: number;
}

const AddBudget = async (
  userId: string,
  title: string,
  description: string,
  total: number,
  items: ItemInterface[]
) => {
  try {
    return axios({
      url: "",
      method: "POST",
      data: {
        query: `mutation AddBudget($user: ID, $title: String, $total: Float, $description: String, $items:[BudgetItemInput]){
                      addBudget(user: $user, title: $title, total: $total, description: $description, items: $items) {
                          _id
                          title
                          description
                          total
                          balance
                          items {
                              _id
                              title
                              description
                              amount
                              balance
                              category
                          }
                      }
                  }`,
        variables: {
          user: userId,
          title,
          description,
          total,
          items,
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
  total: number;
  description: string;
  items: ItemInterface[];
};

const CreateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, title, description, total, items }: Args) =>
      AddBudget(userId, title, description, total, items),
    onSuccess: () => {
      queryClient.invalidateQueries("budgets");
    },
  });
};

export default CreateBudget;
