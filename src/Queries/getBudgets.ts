import axios from "axios";
import { useQuery } from "react-query";

const getBudgets = async (userId: string) => {
  try {
    const res = await axios({
      url: "",
      method: "POST",
      data: {
        query: `query GetBudgets($user: ID){
                    budgets(user: $user) {
                        _id
                        title
                        balance
                        total
                        time
                        items {
                            title
                            _id
                            amount
                            balance
                            category
                        }
                        modelType
                    }
                }`,
        variables: {
          user: userId,
        },
      },
    });
    return res.data.data.budgets;
  } catch (err: any) {
    console.log(err.message);
  }
};

// export default getBudgets;

const FetchBudgets = (userId: string) =>
  useQuery(["budgets"], () => getBudgets(userId));

export default FetchBudgets