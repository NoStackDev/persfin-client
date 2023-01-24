import PocketBase from "pocketbase";
import { BudgetType } from "../TypeDefs";

const pb = new PocketBase(process.env.REACT_APP_PB_URL);

pb.afterSend = function (response, data) {
  if (data.items[0].collectionName === "budgets") {
    data.items.map((item: BudgetType & { items: string }) =>
      Object.assign(item, { items: JSON.parse(item.items) })
    );
  }
  return data;
};

export default pb;
