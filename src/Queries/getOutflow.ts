import axios from "axios";

const getOutflows = async (userId: string) => {
  try {
    const res = await axios({
      url: "",
      method: "POST",
      data: {
        query: `query GetOutflows($user: ID) {
                    outflows(user: $user) {
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
    return res.data.data.outflows
  } catch (err: any) {
    console.log(err.message);
  }
};

export default getOutflows