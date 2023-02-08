import PocketBase from "pocketbase";

console.log(process.env.PB_URL || process.env.REACT_APP_PB_URL);

const pb = new PocketBase(process.env.PB_URL || process.env.REACT_APP_PB_URL);

export default pb;
