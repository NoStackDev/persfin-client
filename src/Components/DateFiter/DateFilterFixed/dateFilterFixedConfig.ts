import { TimeRangeInterface } from "../../../TypeDefs";

const createdRange: TimeRangeInterface[] = [
  {
    id: "thwk",
    title: "This Week",
    range: () => {
      const thisWeekStart = new Date(
        Date.now() - new Date(Date.now()).getDay() * 1000 * 60 * 60 * 24
      );
      const thisWeekEnd = new Date(Date.now());
      return {
        min: new Date(
          `${thisWeekStart.getFullYear()}-${
            thisWeekStart.getMonth() + 1
          }-${thisWeekStart.getDate()}`
        ),
        max: new Date(
          `${thisWeekEnd.getFullYear()}-${
            thisWeekEnd.getMonth() + 1
          }-${thisWeekEnd.getDate()}`
        ),
      };
    },
  },

  {
    id: "lswk",
    title: "Last Week",
    range: () => {
      const lastWeekStart = new Date(
        Date.now() -
          1000 * 60 * 60 * 24 * 7 -
          new Date(Date.now()).getDay() * 1000 * 60 * 60 * 24
      );
      const lastWeekEnd = new Date(
        Date.now() -
          1000 * 60 * 60 * 24 -
          new Date(Date.now()).getDay() * 1000 * 60 * 60 * 24
      );
      return {
        min: new Date(
          `${lastWeekStart.getFullYear()}-${
            lastWeekStart.getMonth() + 1
          }-${lastWeekStart.getDate()}`
        ),
        max: new Date(
          `${lastWeekEnd.getFullYear()}-${
            lastWeekEnd.getMonth() + 1
          }-${lastWeekEnd.getDate()}`
        ),
      };
    },
  },

  {
    id: "thmn",
    title: "This Month",
    range: () => {
      const thisMonthStart = new Date(
        Date.now() +
          1000 * 60 * 60 * 24 -
          new Date(Date.now()).getDate() * 1000 * 60 * 60 * 24
      );
      const thisMonthEnd = new Date(Date.now());
      return {
        min: new Date(
          `${thisMonthStart.getFullYear()}-${
            thisMonthStart.getMonth() + 1
          }-${thisMonthStart.getDate()}`
        ),
        max: new Date(
          `${thisMonthEnd.getFullYear()}-${
            thisMonthEnd.getMonth() + 1
          }-${thisMonthEnd.getDate()}`
        ),
      };
    },
  },

  {
    id: "lsmn",
    title: "Last Month",
    range: () => {
      const lastMonthStart = new Date(
        Date.now() -
          new Date(Date.now()).getDate() * 1000 * 60 * 60 * 24 +
          1000 * 60 * 60 * 24 -
          new Date(
            Date.now() - new Date(Date.now()).getDate() * 1000 * 60 * 60 * 24
          ).getDate() *
            1000 *
            60 *
            60 *
            24
      );
      const lastMonthEnd = new Date(
        Date.now() - new Date(Date.now()).getDate() * 1000 * 60 * 60 * 24
      );
      return {
        min: new Date(
          `${lastMonthStart.getFullYear()}-${
            lastMonthStart.getMonth() + 1
          }-${lastMonthStart.getDate()}`
        ),
        max: new Date(
          `${lastMonthEnd.getFullYear()}-${
            lastMonthEnd.getMonth() + 1
          }-${lastMonthEnd.getDate()}`
        ),
      };
    },
  },
];

export default createdRange;
