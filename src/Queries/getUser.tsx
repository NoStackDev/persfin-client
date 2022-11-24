import axios from "axios";
import { useQuery } from "react-query";

const getUser = async (userId: string) => {
  try {
    const res = await axios({
      url: "",
      method: "POST",
      data: {
        query: `
                query GetUser($user: ID){
                    user(user: $user) {
                    _id
                    email
                    firstname
                    lastname
                    othernames
                    profilePic
                    }
                }
                `,
        variables: {
          user: userId,
        },
      },
    });
    return res.data.data.user;
  } catch (err: any) {
    console.log(err.message);
  }
};

const FetchUser = (userId: string) =>
  useQuery(["user", userId], () => getUser(userId));

export default FetchUser;
