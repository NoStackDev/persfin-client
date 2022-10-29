import axios from "axios";

const getSavings = async (userId: string) => {
  try {
    const res = await axios({
      url: "",
      method: "POST",
      data: {
        query: `query GetSavings($user: ID) {
                    savings(user: $user) {
                        _id
                        amount
                        time
                    }
                }`,
        variables: {
          user: userId,
        },
      },
    });
    return res.data.data.savings
  } catch (err: any) {
    console.log(err.message);
  }
};

export default getSavings