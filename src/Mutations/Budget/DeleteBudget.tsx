import { useMutation } from "react-query";
import axios from "axios";
import { useQueryClient } from "react-query";

const RemoveBudget = async (budget: string) => {
  try {
    return axios({
      url: "",
      method: "POST",
      data: {
        query: `mutation RemoveBudget($budget: ID){
                    deleteBudget(budget: $budget) {
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
          budget,
        },
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

const DeleteBudget = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ budget }: { budget: string }) => RemoveBudget(budget),
    onSuccess: () => queryClient.invalidateQueries("budgets"),
  });
};

export default DeleteBudget;
