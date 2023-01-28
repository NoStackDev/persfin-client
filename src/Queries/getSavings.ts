import { Record } from "pocketbase";
import { useQuery } from "react-query";
import pb from "../lib/pocketbase";
import { SavingsType } from "../TypeDefs";

const getSavings = async (): Promise<(SavingsType | Record)[]> => {
  return pb.collection("savings").getFullList(200 /* batch size */, {
    sort: "-created",
  });
};

const useSavingsQuery = () => useQuery(["savings"], getSavings);

export default useSavingsQuery;
