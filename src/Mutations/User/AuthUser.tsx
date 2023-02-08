import { useMutation, useQueryClient } from "react-query";
import pb from "../../lib/pocketbase";

const LogUserIn = async (email: string, password: string) => {
  try {
    return pb.collection("users").authWithPassword(email, password);
  } catch (err: any) {
    console.log(err.message);
  }
};

const AuthUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      LogUserIn(email, password),
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};

export default AuthUser;
