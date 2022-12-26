import { InflowType, OutflowType, BudgetType, TimeRangeInterface } from "../../../../Types";

type ResultType = Record<string, SubResultInterface>;

interface SubResultInterface {
  labels: string[];
  colors: string[];
  amount: number[];
}

type DataObj = InflowType | OutflowType | BudgetType;

const generateLabelsColorsAmount = (
  dataset: Array<InflowType[] | OutflowType[] | BudgetType[]|null>,
  filterRange: TimeRangeInterface | null,
  category: boolean | undefined
) => { 
  const result: ResultType = {};

  if (filterRange) {
    const filteredDataset = dataset.map((arr) => {
      if (!arr) {
        return null
      }
      return filterData(arr, filterRange);
    });
    // loop over each array of arrays
    filteredDataset?.forEach((arr) => {
      // loop over objects in arrays
      arr?.forEach((obj: DataObj) => {
        // throw error if modelType does not exist in object
        if (!obj.modelType) {
          throw new Error(
            "objects in arrays need to have modelType properties to generate labels and colors"
          );
        }

        // check if modelType already exist as key in result object
        if (!result[obj.modelType]) {
          // check if modelType is budget, handle special
          if (obj.modelType === "budget") {
            result.budget = {
              labels: [obj.title],
              colors: [generateColor([])],
              amount: [(obj as BudgetType).total],
            };
          } else {
            result[obj.modelType] = {
              labels: [
                (obj as InflowType | OutflowType).category
                  ? (obj as InflowType | OutflowType).category.title
                  : "uncategorized",
              ],
              colors: [generateColor([])],
              amount: [(obj as InflowType | OutflowType).amount],
            };
          }
          return obj;
        }

        // handle budget scenario if result.budget already exists
        if (obj.modelType === "budget") {
          result.budget.labels.push(obj.title);
          result.budget.colors.push(generateColor(result.budget.colors));
          result.budget.amount.push((obj as BudgetType).total);
        } else {
          // get index of category title in labels array
          const index = result[obj.modelType].labels.findIndex((ele) => {
            if (!(obj as InflowType | OutflowType).category)
              return ele === "uncategorized";
            return ele === (obj as InflowType | OutflowType).category.title;
          });
          // push if index is -1
          if (index === -1) {
            result[obj.modelType].labels.push(
              (obj as InflowType | OutflowType).category
                ? (obj as InflowType | OutflowType).category.title
                : "uncategorized"
            );
            result[obj.modelType].colors.push(
              generateColor(result[obj.modelType].colors)
            );
            result[obj.modelType].amount.push(
              (obj as InflowType | OutflowType).amount
            );
          } else {
            result[obj.modelType].amount[index] += (
              obj as InflowType | OutflowType
            ).amount;
          }
        }
      });
    });
  }

  return result;
};

const filterData = (
  data: InflowType[] | OutflowType[] | BudgetType[] | null,
  filterRange: TimeRangeInterface
) => {
  if (!data) {
    return null;
  }
  const range = filterRange.range();
  const filteredData = (data as any).filter((obj: DataObj) => {
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

export default generateLabelsColorsAmount;
