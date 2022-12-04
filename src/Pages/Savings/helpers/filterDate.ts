type Savings = {
  _id: string;
  amount: number;
  time: string;
  modelType: string;
};
interface rangeInterface {
  min: Date;
  max: Date;
}

interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}

const filterDate = (
  data: Savings[] | null,
  filterRange: TimeRangeInterface | null
) => {
  if (!data) {
    return null;
  }

  if (!filterRange) {
    data.sort((a, b) => {
      return Number(b?.time) - Number(a?.time);
    });
    return data;
  }

  const range = filterRange.range();
  const filteredData = data.filter((obj) => {
    return (
      range.min <= new Date(Number(obj.time)) &&
      new Date(Number(obj.time)) <=
        new Date(
          range.max.getTime() +
            (1000 * 60 * 60 * 22 + 1000 * 60 * 59 + 1000 * 59)
        )
    );
  });

  filteredData.sort((a, b) => {
    return Number(b?.time) - Number(a?.time);
  });
  return filteredData;
};

export default filterDate;