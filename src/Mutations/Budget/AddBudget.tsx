import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";
import { BudgetType, BudgetItemType } from "../../TypeDefs";

const AddBudget = async (
  userId: string,
  title: string,
  description: string,
  total: number,
  items: BudgetItemType[]
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

const CreateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      userId,
      title,
      description,
      total,
      items,
    }: BudgetType & { userId: string }) =>
      AddBudget(userId, title, description, total, items),
    onSuccess: () => {
      queryClient.invalidateQueries("budgets");
    },
  });
};

export default CreateBudget;
