import { Record as pbRecord } from "pocketbase";
import {
  InflowType,
  OutflowType,
  BudgetType,
  TimeRangeInterface,
} from "../../../../TypeDefs";

type ResultType = Record<string, SubResultInterface>;

interface SubResultInterface {
  labels: string[];
  colors: string[];
  amount: number[];
}

type DataObj = InflowType | OutflowType | BudgetType;

const generateLabelsColorsAmount = (
  dataset: Array<
    | (InflowType | pbRecord)[]
    | (OutflowType | pbRecord)[]
    | (BudgetType | pbRecord)[]
    | undefined
  >,
  filterRange: TimeRangeInterface | null,
) => {
  const result: ResultType = {};

  if (filterRange) {
    const filteredDataset = dataset.map((arr) => {
      if (!arr) {
        return null;
      }
      return filterData(arr, filterRange);
    });

    // loop over each array of arrays
    filteredDataset?.forEach((arr) => {
      // loop over objects in array
      arr?.forEach((obj: DataObj) => {
        // check if modelType already exist as key in result object
        if (!result[obj.collectionName]) {
          // check if modelType is budget, handle special
          if (obj.collectionName === "budgets") {
            result.budgets = {
              labels: [obj.title],
              colors: [generateColor([])],
              amount: [(obj as BudgetType).total],
            };
          } else {
            result[obj.collectionName] = {
              labels: [
                (obj as InflowType | OutflowType).expand.category?.title ||
                  "uncategorized",
              ],
              colors: [generateColor([])],
              amount: [(obj as InflowType | OutflowType).amount],
            };
          }
          return obj;
        }

        // handle budget scenario if result.budget already exists
        if (obj.collectionName === "budgets") {
          result[obj.collectionName].labels.push(obj.title);
          result[obj.collectionName].colors.push(
            generateColor(result[obj.collectionName].colors)
          );
          result[obj.collectionName].amount.push((obj as BudgetType).total);
        } else {
          // get index of category title in labels array
          const index = result[obj.collectionName].labels.findIndex((ele) => {
            if (!(obj as InflowType | OutflowType).expand.category?.title)
              return ele === "uncategorized";
            return (
              ele === (obj as InflowType | OutflowType).expand.category?.title
            );
          });
          // push if index is -1
          if (index === -1) {
            result[obj.collectionName].labels.push(
              (obj as InflowType | OutflowType).expand.category?.title ||
                "uncategorized"
            );
            result[obj.collectionName].colors.push(
              generateColor(result[obj.collectionName].colors)
            );
            result[obj.collectionName].amount.push(
              (obj as InflowType | OutflowType).amount
            );
          } else {
            result[obj.collectionName].amount[index] += (
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
  data:
    | (InflowType | pbRecord)[]
    | (OutflowType | pbRecord)[]
    | (BudgetType | pbRecord)[]
    | undefined,
  filterRange: TimeRangeInterface
) => {
  if (!data) {
    return null;
  }
  const range = filterRange.range();
  const filteredData = (data as any).filter((obj: DataObj) => {
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
