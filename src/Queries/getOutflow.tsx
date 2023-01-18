import pb from "../lib/pocketbase";
import { useQuery } from "react-query";
import { OutflowType } from "../TypeDefs";
import { Record } from "pocketbase";

const getOutflows = async (): Promise<(OutflowType | Record)[]> => {
  return pb.collection("outflows").getFullList(200 /* batch size */, {
    sort: "-created",
  });
};

// export default getOutflows

const FetchOutflows = () =>
  useQuery(["outflows", pb.authStore.model?.id], getOutflows);

export default FetchOutflows;
