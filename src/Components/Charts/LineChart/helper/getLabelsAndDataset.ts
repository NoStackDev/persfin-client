type Transaction = {
  title: string;
  amount: number;
  transactionType: string;
  category: string;
  budget: string;
  description: string;
  receiptImage: string[];
  time: string;
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

const labelChoices = (filterRange: TimeRangeInterface | null) => {
  if (filterRange?.id === "thwk" || filterRange?.id === "lswk") {
    return ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  }
  if (filterRange?.id === "thmn" || filterRange?.id === "lsmn") {
    const range = filterRange?.range();
    let dates = [];
    for (let _ = 1; _ <= range.max.getDate(); _++) {
      dates.push(String(_).length > 1 ? String(_) : "0" + String(_));
    }
    return dates;
  }
  return [];
};

const filterData = (
  data: Transaction[] | null,
  filterRange: TimeRangeInterface
) => {
  if (!data) {
    return null;
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
  return filteredData;
};

const getLabelsAndDataset = (
  dataset: Array<Transaction[] | null> | null,
  filterRange: TimeRangeInterface | null
) => {
  if (filterRange && dataset) {
    const labels = labelChoices(filterRange);
    const data: number[][] = [];

    dataset.forEach((tranaction) => {
      const filteredData = filterData(tranaction, filterRange);
      const subData: number[] = [];

      labels.forEach((label) => {
        const total = filteredData?.reduce((prevValue, currenObj) => {
          if (
            new Date(Number(currenObj.time))
              .toDateString()
              .split(" ")
              .includes(label)
          ) {
            return prevValue + currenObj.amount;
          }
          return prevValue;
        }, 0);

        subData.push(total || 0);
      });

      data.push(subData);
    });

    return { labels, data };
  }

  return { labels: [], data: [] };
};

export default getLabelsAndDataset;
