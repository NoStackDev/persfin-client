import axios from "axios";
import { useQuery } from "react-query";

const getCategories = async (userId: string) => {
  try {
    const res = await axios({
      url: "",
      method: "POST",
      data: {
        query: `query GetCategories($user: ID) {
                    categories(user: $user) {
                        _id
                        categoryType
                        title
                        description
                        modelType
                        createdAt
                    }
                }`,
        variables: {
          user: userId,
        },
      },
    });
    return res.data.data.categories;
  } catch (err: any) {
    console.log(err.message);
  }
};

const FetchCategories = (userId: string) =>
  useQuery(["categories"], () => getCategories(userId));

export default FetchCategories;
