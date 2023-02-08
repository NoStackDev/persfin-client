import { Record } from "pocketbase";
import { OutflowType, TimeRangeInterface } from "../../../TypeDefs";

const filterDate = (
  data: (OutflowType | Record)[] | undefined,
  filterRange: TimeRangeInterface | null
) => {
  if (!data) {
    return null;
  }

  if (!filterRange) {
    data.sort((a, b) => {
      return Number(b?.created) - Number(a?.created);
    });
    return data;
  }

  const range = filterRange.range();
  const filteredData = data.filter((obj) => {
    return (
      range.min <= new Date(obj.created) &&
      new Date(obj.created) <=
        new Date(
          range.max.getTime() +
            (1000 * 60 * 60 * 22 + 1000 * 60 * 59 + 1000 * 59)
        )
    );
  });

  filteredData.sort((a, b) => {
    return Number(b?.created) - Number(a?.created);
  });
  return filteredData;
};

export default filterDate;
