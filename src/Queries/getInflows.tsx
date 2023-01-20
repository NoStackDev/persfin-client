import pb from "../lib/pocketbase";
import { useQuery } from "react-query";
import { InflowType } from "../TypeDefs";
import { Record } from "pocketbase";

const getInflows = async (): Promise<(InflowType | Record)[]> => {
  return pb.collection("inflows").getFullList(200 /* batch size */, {
    sort: "-created",
    expand: "category",
  });
};

// export default getInflows

const FetchInflows = () =>
  useQuery(["inflows", pb.authStore.model?.id], getInflows);

export default FetchInflows;
