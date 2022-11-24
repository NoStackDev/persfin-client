import axios from "axios";
import { useQuery } from "react-query";

const getSavings = async (userId: string) => {
  try {
    const res = await axios({
      url: "",
      method: "POST",
      data: {
        query: `query GetSavings($user: ID) {
                    savings(user: $user) {
                        _id
                        amount
                        time
                        modelType
                    }
                }`,
        variables: {
          user: userId,
        },
      },
    });
    return res.data.data.savings;
  } catch (err: any) {
    console.log(err.message);
  }
};

const FetchSavings = (userId: string) =>
  useQuery(["savings"], () => getSavings(userId));

export default FetchSavings;
