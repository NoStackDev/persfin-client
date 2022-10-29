import axios from "axios";

const getInflows = async (userId: string) => {
  try {
    const res = await axios({
      url: "",
      method: "POST",
      data: {
        query: `query GetInflows($user: ID) {
                    inflows(user: $user) {
                        _id
                        title
                        description
                        amount
                        time
                        receiptImage
                        category {
                            _id
                            title
                            categoryType
                        }
                    }
                }`,
        variables: {
          user: userId,
        },
      },
    });
    return res.data.data.inflows
  } catch (err: any) {
    console.log(err.message);
  }
};

export default getInflows