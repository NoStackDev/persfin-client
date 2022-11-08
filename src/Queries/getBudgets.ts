import axios from "axios";

const getBudgets = async (userId: string) => {
  try {
    return await axios({
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
  } catch (err: any) {
    console.log(err.message);
  }
};

export default getBudgets;
