import axios from "axios";
import { useMutation, useQueryClient } from "react-query";

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

type Args = {
  userId: string;
  amount: number;
};

const CreateSavings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, amount }: Args) => AddSavings(userId, amount),
    onSuccess: () => {
      queryClient.invalidateQueries("savings");
    },
  });
};

export default CreateSavings;
