import axios from "axios";
import { useQuery } from "react-query";

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
                        budget
                        item
                        category {
                            _id
                            title
                            categoryType
                        }
                        modelType
                        createdAt
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

// export default getOutflows

const FetchOutflows = (userId: string) =>
  useQuery(["outflows"], () => getOutflows(userId));

export default FetchOutflows