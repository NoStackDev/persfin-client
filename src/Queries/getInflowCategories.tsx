import pb from "../lib/pocketbase";
import { useQuery } from "react-query";
import { CategoryType } from "../TypeDefs";
import { Record } from "pocketbase";

const getInflowCategories = async (): Promise<(CategoryType | Record)[]> => {
  return pb.collection("inflowCategories").getFullList(200 /* batch size */, {
    sort: "-created",
  });
};

const FetchInflowCategories = () =>
  useQuery("inflowCategories", getInflowCategories);

export default FetchInflowCategories;
