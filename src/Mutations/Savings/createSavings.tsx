import axios from "axios";
import { useMutation } from "react-query";

const AddSavings = async (userId: string, amount: number) => {
  try {
    const res = await axios({
      url: "",
      method: "POST",
      data: {
        query: `mutation AddSavings($user: ID, $amount: Float, $modelType: String){
                    addSavings(user: $user, amount: $amount, modelType: $modelType){
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
          modelType: "savings",
        },
      },
    });
    return res.data.data.savings
  } catch (err: any) {
    console.log(err.message);
  }
};

type args = {
  userId: string;
  amount: number;
};

const CreateSavings = () =>
  useMutation({ mutationFn: ({userId, amount}: args) => AddSavings(userId, amount) });

export default CreateSavings;
