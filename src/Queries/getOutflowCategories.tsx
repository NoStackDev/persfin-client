import pb from "../lib/pocketbase";
import { useQuery } from "react-query";
import { CategoryType } from "../TypeDefs";
import { Record } from "pocketbase";

const getOutflowCategories = async (): Promise<(CategoryType | Record)[]> => {
  return pb.collection("outflowCategories").getFullList(200 /* batch size */, {
    sort: "-created",
  });
};

const FetchOutflowCategories = () =>
  useQuery(["outflowCategories", pb.authStore.model?.id], getOutflowCategories);

export default FetchOutflowCategories;
