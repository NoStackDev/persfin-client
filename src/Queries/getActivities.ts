import axios from "axios";

const getActivities = async (userId: string) => {
  try {
    return await axios({
      url: "",
      method: "post",
      data: {
        query: `query GetTransactions($userId: ID!) {
                    transactions(user: $userId) {
                    _id
                      amount
                      description
                      transactionType
                      createdAt
                      title
                      user {
                        _id
                        firstname
                        lastname
                        othernames
                      }
                      category {
                        transactionType
                        title
                        _id
                      }
                    }
                  }`,
        variables: {
          userId,
        },
      },
    });
  } catch (err: any) {
    console.log(err.message);
  }
};

export default getActivities;
