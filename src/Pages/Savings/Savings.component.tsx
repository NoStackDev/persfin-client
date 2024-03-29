import "./Savings.style.scss";
import FilterBar from "../../Components/FilterBar";
import ActivityCard from "../../Components/ActivityCard";
import { useMemo, useState } from "react";
import { filterByDate } from "../../Helpers";
import {
  useInflowsQuery,
  useOutlflowsQuery,
  useSavingsQuery,
} from "../../Queries";

import { SavingsType, TimeRangeInterface } from "../../TypeDefs";
import CategoryChart from "../../Components/Charts/DoughnutChart/CategoryChart.component";

type Props = {};

const Savings = (props: Props) => {
  const [filterRange, setFilterRange] = useState<TimeRangeInterface | null>(
    null
  );
  const [textFilter, setTextFilter] = useState<string>("");

  // queries
  const { data: inflowsData } = useInflowsQuery();
  const { data: outflowsData } = useOutlflowsQuery();
  const { data: savingsData } = useSavingsQuery();

  const dateFiltered = useMemo(() => {
    return filterByDate(savingsData, filterRange) as SavingsType[];
  }, [savingsData, filterRange]);

  return (
    <main>
      <section className="filter-bar-section">
        <FilterBar
          setTextFilter={setTextFilter}
          setFilterRange={setFilterRange}
        />
      </section>
      <section id="savings-activity-section">
        <ActivityCard cardTitle="Savings" activities={dateFiltered} />
      </section>
      <section id="category-chart-section">
        <CategoryChart
          dataset={[outflowsData, inflowsData]}
          showFixedDateFilter={true}
        />
      </section>
    </main>
  );
};

export default Savings;
