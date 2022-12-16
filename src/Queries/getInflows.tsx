import axios from "axios";
import { useQuery } from "react-query";

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
                        modelType
                        createdAt
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

// export default getInflows

const FetchInflows = (userId: string) =>
  useQuery(["inflows"], () => getInflows(userId));

export default FetchInflows