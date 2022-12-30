import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";

const EditBudget = async (
  budgetId: string,
  title: string,
  total: number,
  balance: number,
  description: string,
  items: {
    _id: string;
    title: string;
    amount: number;
    balance: number;
    description: string;
    category: string;
  }
) => {
  try {
    return axios({
      url: "",
      method: "POST",
      data: {
        query: `mutation UpdateBudget($budgetId: ID, $title: String, $total: Float, $balance: Float, $description: String, $items:[BudgetItemInput]){
                        updateBudget(budgetId: $budgetId, title: $title, total: $total, balance: $balance, description: $description, items: $items) {
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
          budgetId,
          title,
          total,
          balance,
          description,
          items,
        },
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const UpdateBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      budgetId,
      title,
      total,
      balance,
      description,
      items,
    }: {
      budgetId: string;
      title: string;
      total: number;
      balance: number;
      description: string;
      items: {
        _id: string;
        title: string;
        amount: number;
        balance: number;
        description: string;
        category: string;
      };
    }) => EditBudget(budgetId, title, total, balance, description, items),
    onSuccess: () => {
      queryClient.invalidateQueries("budgets");
    },
  });
};

export default UpdateBudget;
