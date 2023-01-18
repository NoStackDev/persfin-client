import pb from "../../lib/pocketbase";
import { useMutation, useQueryClient } from "react-query";

const CreateUser = async (
  email: string,
  password: string,
  confirmPassword: string
) => {
  try {
    return pb
      .collection("users")
      .create({ email, password, passwordConfirm: confirmPassword });
  } catch (err: any) {
    console.log(err.message);
  }
};

const AddUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      email,
      password,
      confirmPassword,
    }: {
      email: string;
      password: string;
      confirmPassword: string;
    }) => CreateUser(email, password, confirmPassword),
    onSuccess: () => {
      queryClient.invalidateQueries("user");
    },
  });
};

export default AddUser;
