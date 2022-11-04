type Transaction = {
  title: string;
  amount: number;
  transactionType: string;
  category: TransactionCategory;
  budget: string;
  description: string;
  receiptImage: string[];
  time: string;
};

type TransactionCategory = {
  _id: string;
  title: string;
  categoryType: string;
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


const generateLabelsAmount = (data: Transaction[] | null) => {
  if (data) {
    const labelAmount: Record<string, number> = {};
    data.map((ele) => {
      if (typeof labelAmount[ele.category.title] === "number") {
        labelAmount[ele.category.title] += ele.amount;
        return ele
      } else {
        labelAmount[ele.category.title] = ele.amount;
        return ele
      }
    });
    return labelAmount;
  }
  return {};
};

function hslToHex(h: number, s: number, l: number) {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, "0"); // convert to Hex and prefix "0" if needed
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

const generateColor = (colorsArray: string[]): string => {
  const hue = Math.round(Math.random() * 360);
  const saturation = Math.round(Math.random() * 100);
  const lightness = Math.round(Math.random() * 100);
  const colorHex = hslToHex(hue, saturation, lightness);

  if (colorsArray.includes(colorHex)) {
    return generateColor(colorsArray);
  }
  return colorHex;
};

const generateColorArray = (categories: string[] | null) => {
  let colorsArray: string[] = [];
  if (categories) {
    for (let _ = 0; _ < categories.length; _++) {
      colorsArray.push(generateColor(colorsArray));
    }
  }
  return colorsArray;
};

interface ResultInterface {
  labels: string[];
  colors: string[];
  amount: number[];
}

const getLabelsColorsDataset = (
  dataset: Array<Transaction[] | null> | null,
  filterRange: TimeRangeInterface | null
) => {
  const inflow: ResultInterface = {
    labels: [],
    colors: [],
    amount: [],
  };

  const outflow: ResultInterface = {
    labels: [],
    colors: [],
    amount: [],
  };

  if (dataset && filterRange) {
    const filteredDataset = dataset.map((arr) => {
      return filterData(arr, filterRange);
    });
    const inflowLabelsAmount = generateLabelsAmount(filteredDataset[0]);
    const outflowLabelsAmount = generateLabelsAmount(filteredDataset[1]);
    inflow.colors = generateColorArray(Object.keys(inflowLabelsAmount));
    outflow.colors = generateColorArray(Object.keys(outflowLabelsAmount));
    inflow.labels = Object.keys(inflowLabelsAmount);
    inflow.amount = Object.values(inflowLabelsAmount);
    outflow.labels = Object.keys(outflowLabelsAmount);
    outflow.amount = Object.values(outflowLabelsAmount);
  }

  return { inflow, outflow };
};

export default getLabelsColorsDataset;
