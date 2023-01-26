import PocketBase from "pocketbase";
import { BudgetType } from "../TypeDefs";

const pb = new PocketBase(process.env.REACT_APP_PB_URL);

export default pb;
