interface rangeInterface {
  min: number;
  max: number;
}

interface TimeRangeInterface {
  id: string;
  title: string;
  range(): rangeInterface;
}

const timeRange: TimeRangeInterface[] = [
  {
    id: "thwk",
    title: "This Week",
    range: () => {
      return {
        min: Date.now() - new Date(Date.now()).getDay() * 1000 * 60 * 60 * 24,
        max: Date.now(),
      };
    },
  },

  {
    id: "lswk",
    title: "Last Week",
    range: () => {
      return {
        min:
          Date.now() -
          1000 * 60 * 60 * 24 * 7 -
          new Date(Date.now()).getDay() * 1000 * 60 * 60 * 24,
        max:
          Date.now() -
          1000 * 60 * 60 * 24 -
          new Date(Date.now()).getDay() * 1000 * 60 * 60 * 24,
      };
    },
  },

  {
    id: "thmn",
    title: "This Month",
    range: () => {
      return {
        min:
          Date.now() +
          1000 * 60 * 60 * 24 -
          new Date(Date.now()).getDate() * 1000 * 60 * 60 * 24,
        max: Date.now(),
      };
    },
  },

  {
    id: "lsmn",
    title: "Last Month",
    range: () => {
      return {
        min:
          Date.now() -
          new Date(Date.now()).getDate() * 1000 * 60 * 60 * 24 +
          1000 * 60 * 60 * 24 -
          new Date(
            Date.now() - new Date(Date.now()).getDate() * 1000 * 60 * 60 * 24
          ).getDate() *
            1000 *
            60 *
            60 *
            24,
        max: Date.now() - new Date(Date.now()).getDate() * 1000 * 60 * 60 * 24,
      };
    },
  },
];

export default timeRange;
