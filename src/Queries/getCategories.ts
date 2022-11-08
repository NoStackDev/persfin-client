import axios from "axios";

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

export default getCategories;
