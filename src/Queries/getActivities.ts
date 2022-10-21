import axios from "axios";

const getActivities = async (userId: string) => {
  try {
    return await axios({
      url: "",
      method: "post",
      data: {
        query: `query GetTransactions($userId: ID!) {
                    transactions(user: $userId) {
                      amount
                      description
                      user {
                        firstname
                      }
                      category {
                        title
                      }
                    }
                  }`,
        variables: {
            userId
        }
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export default getActivities;
