import { Record as pbRecord } from "pocketbase";
import { BudgetType, TimeRangeInterface } from "../../../../TypeDefs";

const filterData = (
  data: (BudgetType | pbRecord)[],
  filterRange: TimeRangeInterface
) => {
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
  return filteredData;
};

interface TotalBalance {
  balance: number;
  total: number;
}
const generateLabelsAmount = (data: (BudgetType | pbRecord)[] | undefined) => {
  if (data) {
    const labelAmount: Record<string, TotalBalance> = {};
    data.forEach((budget) => {
      labelAmount[budget.title] = {
        balance: budget.balance,
        total: budget.total,
      };
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
  totals: number[];
  budgetDataset: TotalBalance[];
}

const getLabelsColorsDataset = (
  dataset: (BudgetType | pbRecord)[] | undefined,
  filterRange: TimeRangeInterface | null
) => {
  const data: ResultInterface = {
    labels: [],
    colors: [],
    totals: [],
    budgetDataset: [],
  };

  if (dataset && filterRange) {
    const filteredDataset = filterData(dataset, filterRange);
    const dataLabelsAmount = generateLabelsAmount(filteredDataset);
    data.colors = generateColorArray(Object.keys(dataLabelsAmount));
    data.labels = Object.keys(dataLabelsAmount);
    data.budgetDataset = Object.values(dataLabelsAmount);
    for (let obj in dataLabelsAmount) {
      data.totals.push(dataLabelsAmount[obj].total);
    }
  }

  return data;
};

export default getLabelsColorsDataset;
