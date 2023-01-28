import pb from "../lib/pocketbase";
import { useQuery } from "react-query";
import { OutflowType } from "../TypeDefs";
import { Record } from "pocketbase";

const getOutflows = async (): Promise<(OutflowType | Record)[]> => {
  return pb.collection("outflows").getFullList(200 /* batch size */, {
    sort: "-created",
    expand: "category",
  });
};

// export default getOutflows

const useOutlflowsQuery = () => useQuery(["outflows"], getOutflows);

export default useOutlflowsQuery;
