import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { SavingsType } from "../../TypeDefs";

const AddSavings = async (userId: string, amount: number) => {
  try {
    return axios({
      url: "",
      method: "POST",
      data: {
        query: `mutation AddSavings($user: ID, $amount: Float){
                    addSavings(user: $user, amount: $amount){
                        user {
                            _id
                            firstname
                            lastname
                        }
                        amount
                        time
                    }
                }`,
        variables: {
          user: userId,
          amount: amount,
        },
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};


const CreateSavings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, amount }: SavingsType & { userId: string }) =>
      AddSavings(userId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries("savings");
    },
  });
};

export default CreateSavings;
